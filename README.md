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
width=100 />
Aus Sicherheitsgründen wird nach außen neben Port 22 nur Port 80 bzw. 443
geöffnet. Damit das so funktioniert, setzen wir nginx als ReverseProxy ein.

    

## Installation der LAMP-Umgebung

Eine grossartiges Rezept hat [Felix Lohmeier](https://github.com/felixlohmeier/summerschool-openrefine/blob/master/katalog-mit-typo3-find/installation-von-typo3-und-typo3-find.md)
geschrieben. Wir haben uns davon inspirieren lassen.

