# HOS-Schaufenster

Diese Dokumentation soll ein Leitfaden sein, damit ein Nachnutzer das
HOS-Schaufenster auf einer neuen Maschine installieren und starten kann.


## Voraussetzungen

Voraussetzung ist die Verfügbarkeit eines  Linux-Servers mit einer
installierten, aktuellen Ubuntu-Distribution. Das kann
auch ein virtualisierter Server auf einem Windows-PC oder einem Mac sein.

Desweiteren wird ein Account (Konto/Zugang) zum Server benötigt, der
sudo-Rechte verfügt.


## Installation des Suchindexes (Solr)

Bevor wir die Middleware in Form des CMS TYPO3 installieren, installieren
wir den Suchindex. Am besten geht das mit wget. Dieses nützlich Script lässt sich
mit:

```sh
$ sudo apt install wget
```
leicht installieren. 

### Installation Java

<img
src="https://mindsquare.de/files/java.jpeg" width=70 />

Apache Solr ist ein Javaprogramm. Es wird ie Version 7 oder 8 benötigt. Deswegen müssen wir als Vorbedingung diese
Paket gegebenfalls installieren. Deswegen testen wir die ordnungsgemäße
Verfügbarkeit mit:

```sh
$ cd
$ java -version
java version "1.8.0_144"
Java(TM) SE Runtime Environment (build 1.8.0_144-b01)
Java HotSpot(TM) 64-Bit Server VM (build 25.144-b01, mixed mode)
```

Falls Java nicht installiert sein sollte, dann ist [dieser Link](https://tecadmin.net/install-oracle-java-8-ubuntu-via-ppa/)
zielführend.

Nun wechseln wir in das Verzeichnis `/opt` und starten

```sh
$ cd /opt
$ wget http://www.apache.org/dist/lucene/solr/7.3.0/solr-7.3.0.tgz 
```

Falls `wget` noch nicht auf der Maschine verfügbar sein sollte, holen wir
das mit:

```sh
$ sudo apt install wget
```
nach. 

Eventuell gibt es von Solr frischere Versionen, dann ist es sinnvoll obigen
Link anzupassen. Auf [dieser Seite](http://www.apache.org/dist/lucene/solr/)
findet sich immer der aktuelle Stand. 

### Installation von Solr

<img src="http://lucene.apache.org/solr/assets/identity/Solr_Logo_on_white.png"
width=60 />

Nun liegt im Verzeichnis `/opt` der gezippte Tarball. Mit nachfolgendem
Kommando wird das Paket ausgepackt:

```sh
$ sudo tar xzf solr-7.3.0.tgz solr-7.3.0/bin/install_solr_service.sh --strip-components=2
sudo bash ./install_solr_service.sh solr-7.3.0.tgz
```
Dieses Installationsscript legt einen User `solr` an und baut
Startscripte, damit wir über Kommandozeilenbefehle den Solr starten und
stoppen können und fügt einen entsprechenden Mechanismus der Bootsequenz des
Servers zu. Damit ist Solr auch nach einem Wiederhochfahren der Maschine
verfügbar. 

### Test der Solrinstallation

Mittels
```sh
$ sudo service solr stop
$ sudo service solr start
$ sudo service solr status
```
Sollte sich Solr steuern lassen. Falls die Maschine im Internet sichtbar
ist, dann kann die Solr-Administrationsoberfläche über den Port *8983*
erreicht werden. 

### Installation der Firewall
Aus Sicherheitsgründen sollten sowenig wie nötig offene Ports nach außen
sichtbar und erreichbar sein. Wir werden später ``nginx` als Portmapper
einsetzen. Jetzt ist der richtige Zeitpunkt `ufw` zu installieren. `ufw` ist
ein Wrapper um iptables.
```sh
$ sudo apt-get install ufw
```
Mit 
```sh
sudo ufw status
```
lässt sich die Funktion im Überblick anzeigen.
Als erstes sperren wir also den solr-Port mit:

```sh
$ sudo ufew deny 8983/tcp
```

### Installation von nginx als Portwrapper
<img src="https://www.cbronline.com/wp-content/uploads/2016/07/NGINX.png"
width=50 />

Aus Sicherheitsgründen wird nach außen neben Port 22 nur Port 80 bzw. 443
geöffnet. Damit das so funktioniert, setzen wir nginx als ReverseProxy ein.
```sh
$ sudo apt-get install nginx
```
Nachdem der Webserver installiert ist, kann er wie gewohnt mit
```sh
$ sudo service nginx stop
```
gestoppt und mit 
```sh
$ sudo service nginx start
```    
gestartet werden.

### Einrichtung der Wrapper
Unter `/etc/nginx/sites-available` legen wir mit eine Datei `wrapper` mit
folgendem Inhalt an:

```
server {
    listen *:80; # IPv4
    server_name SERVER_NAME;

    location ^~ /solrAdmin/ {
	allow 134.100.174.111           
  	deny all;	
	auth_basic "Eingeschraenkter Zugriff";
	auth_basic_user_file /etc/nginx/.htpasswd; 
    	proxy_set_header X-Real-IP  $remote_addr;
    	proxy_set_header X-Forwarded-For $remote_addr;
    	proxy_set_header Host $host;
	proxy_pass http://127.0.0.1:8983/solr/;
    }
    location ^~ /solrQuery {
        proxy_set_header X-Real-IP  $remote_addr;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:8983/solr/$http_SolrCoreName/query;
    }
    location  ^~ /  {
        proxy_set_header X-Real-IP  $remote_addr;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:81/;
    }
}

```
Betrachten wir die Abteilungen im Einzelnen:

#### solrAdmin
Der Zugang `solrAdmin` hat zwei Funktionen: er ermöglicht den Zugang zur
Weboberfläche der Solr-Administration und erlaubt die Manipulation des Cores
über curl-Befehle. Aus offensichtlichen Gründen muss dieser Punkt besonders
robust sein. Zum einen ist der Zugang nur über eine IP-Adresse erlaubt und
zum Zweiten ist der Zugang mit Basic Authorization (Login/Password)
geschützt. Um `.htpasswd` zu generieren kann man solche [OnlineTools](http://www.htaccesstools.com/htpasswd-generator/)
nutzen oder man nutzt die Shell:
```
$ sudo  htpasswd -c /etc/nginx/.htpasswd solradmin
```

#### solrQuery
Um den Index für mobile Endgeräte verfügbar zu machen benötigen wir einen
lesenden Zugang ohne IP-Beschränkung. Bei Nutzung von URls wie
```
http://HOSTNAME/solrQuery
```
wird intern der query-Endpunkt angesprochen. Der SolrCore wird über einen
besonderen HTTP-Request-Header angesteuert. Nachfolgend ein
Implementierungsbeispiel:
```javascript
var xhr = Network.createHTTPClient({
	onload : function(e) {
		var payload = JSON.parse(this.responseData);
		Promise.resolve(payload);
	},
	onerror : function(E) {
		Promise.reject();
	},
	timeout : 5000
});
var url = "http://xxx.100.28.175/solrQuery/"; // don't forget the trailing /!
xhr.open("POST", url);
xhr.setRequestHeader("SolrCoreName","MASTER"); // <== this is the mentioned corename
var query = ['q=*:*', 'rows=500'].join('&');
xhr.send(query);
```  
#### Default
Alle andere Requests landen auf Port 81, auf dem die noch zu installierende
TYPO3-Instanz läuft. 

## Aktivierung des ReverseProxies

Um die Datei `wrapper` wirksam weerden zu lassen, setzen wir einen
symbolischen Link von Verzeichnis `sites-available` zu `sites-enabled` und
restarten den Server:
```sh
$ sudo ln -s /etc/nginx/sites-available/wrapper /etc/nginx/sites-enabled/wrapper
$ sudo service nginx restart
```
## Möglicher Fallstrick
Auf Port 80 läuft schon ein Server. In diesem Fall den Prozess killen und
die entspechende Konfiguration beispielsweise im Apache deaktivieren.

## Installation der TYPO3-Instanz

Eine grossartiges Rezept hat [Felix Lohmeier](https://github.com/felixlohmeier/summerschool-openrefine/blob/master/katalog-mit-typo3-find/installation-von-typo3-und-typo3-find.md)
geschrieben. Wir haben uns davon inspirieren lassen.

### Benötigte Pakete (Apache, MySQL, PHP, Composer) installieren

```
$ sudo apt-get install apache2 libapache2-mod-php7.1 php7.1 php7.1-mysql mysql-server php-gd php-json php-imagick php-mbstring php-curl php-apcu php-soap php-xml php-zip composer
```
Während der Installation müssen Sie ein Root-Passwort für MySQL vergeben. Denken Sie sich eins aus
(beispielsweise ``qwertz`) und notieren Sie dies.

### Konfiguration MySQL

Wenn die Installation abgeschlossen ist, müssen wir eine Datenbank und eine/n Nutzer/in anlegen:
```
    mysql -u root -p
```
Das öffnet nach erfolgreicher Eingabe öffnet sich ein mySQL-Monitorprogramm.
Dort ist es angebracht folgende vier Kommandos abzusetzen – das Semikolon am
Ende nicht vergessen! `secretpassword` durch eine Eigenschöpfung ersetzen! 

Abschließen kann man den Monitor mit `quit` verlassen.     

### Konfiguration PHP

### Portanpassung 80 => 81

### TYPO3 mit Composer installieren

Wir nutzen eine Distribution von Cedric Ziel, die TYPO3 und die Erweiterung TYPO3-find beinhaltet. Die Installation erfolgt mit Hilfe des Tools Composer, das wir im ersten Schritt zusammen mit den anderen Paketen installiert haben.

Geben Sie folgende Befehle ins Terminal ein:

```
$ cd /var/www/
$ sudo composer create-project cedricziel/typo3-find-distribution katalog dev-master
$ cd katalog
$ sudo chown www-data:www-data -R web
$ sudo touch web/FIRST_INSTALL
$ sudo sh -c 'echo "<VirtualHost *:81>
        DocumentRoot /var/www/katalog/web
        ServerName katalog
        Options -Indexes
        DirectoryIndex index.php index.html
</VirtualHost>" > /etc/apache2/sites-available/katalog.conf'
$ sudo a2ensite katalog.conf
$ sudo a2dissite 000-default.conf
$ sudo service apache2 reload
```

### Konfiguration von TYPO3 mit dem Installationsassistent

Nach der Installation erreichen Sie TYPO3 unter der Adresse http://localhost. Dort treffen Sie zunächst auf den Installationsassistenten.

*    In Schritt 2 muss als Username typo3_db_user und das von Ihnen für den Nutzer typo3_db_user gesetzte Passwort (secretpassword) eingetragen werden.
*    In Schritt 3 wählen Sie "use an existing empty database"
*    In Schritt 4 müssen Sie einen weiteren Account anlegen, diesmal für die Administration von TYPO3. Notieren Sie sich Benutzername und Passwort.
*    Wählen Sie in Schritt 5 die Option Yes, create a base empty page to start from.



### Installation des Schaufensters