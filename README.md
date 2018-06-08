# HOS-Discovery

This repo describes the using of the TYPO3-Extensions `discovery`. The extension extends the [typo3find extension](https://github.com/subugoe/typo3-find) of subugoe and is for the HamburgOpenScience project
"hos-discovery"

<img src="https://raw.githubusercontent.com/subhh/HOS-TYPO3-discovery/master/screenshots/ss01.png"
width=420 /> 
<img src="https://raw.githubusercontent.com/subhh/HOS-TYPO3-discovery/master/screenshots/ss02.png"
width=420 /> 
<img src="https://raw.githubusercontent.com/subhh/HOS-TYPO3-discovery/master/screenshots/ss03.png"
width=420 /> 
<img src="https://raw.githubusercontent.com/subhh/HOS-TYPO3-discovery/master/screenshots/ss04.png"
width=420 />

## Architecture

* LAMP Stack
* TYPO3
* Extension find (subgoe)
* Extension discovery (sbhh) 

## Installation of HOS on CentOS

### Prerequisites

The start point is a preconfigured CentOS machine with running web server. 

## Software stack

* Apache server with TYPO3 on port 80/443
* Solr on port 9883
* Apache reverseProxy for exposing solr to port 80/443

### Modification of apache
In folder `/etc/httpd/sites-available` we place a file `schaufenster.conf` with content below:

```
<VirtualHost *:80>
    ServerName openscience.hamburg.de
    <Directory />
        Options +FollowSymLinks
       AllowOverride None
    </Directory>
    <Directory /var/www/html/schaufenster >
        Options +FollowSymLinks
        AllowOverride None
	      Require all granted
    </Directory>
    DocumentRoot /var/www/html/schaufenster
    DirectoryIndex index.html index.php   
    
    ProxyPreserveHost On
    ProxyRequests Off
  // for arcgis map tiles:
   ProxyPass /ArcGIS/  https://server.arcgisonline.com/
   ProxyPassReverse /ArcGIS https://server.arcgisonline.com/
  // for stamen map tiles:
   ProxyPass /Stamen  https://stamen-tiles-a.a.ssl.fastly.net/toner-lite/
   ProxyPassReverse /Stamen/  https://stamen-tiles-a.a.ssl.fastly.net/toner-lite/
  // for some stuff from cloudfare CDN:
   ProxyPass /Cloud/  https://cdnjs.cloudflare.com/
   ProxyPassReverse /Cloud/  https://cdnjs.cloudflare.com/
</VirtualHost>
```

### Installing solr

#### Installing Java

Before starting, update your system with the latest versions of installed packages.

`sudo yum update`

You will need to install the latest version of Java on your server as Java is a prerequisite for installing Solr.

To install Java, run the following command:

`sudo yum install java-1.8.0-openjdk.x86_64`

### Downloading and Installing Apache Solr

First you will need to download the latest version of Apache Solr from the Apache website.

You can easily download it using the wget command:

`wget http://apache.org/dist/lucene/solr/7.3.1/solr-7.3.1.tgz`

Once the download is completed, extract the service installation file with the following command:

`tar xzf solr-7.3.1.tgz solr-7.3.1/bin/install_solr_service.sh --strip-components=2`

Install Solr as a service by running the following command:

`sudo bash ./install_solr_service.sh solr-7.3.1.tgz`

### Potential pitfalls

#### JAVA_HOME
Maybe in file `/etc/profile.d/jdk.sh` is a comamnd like `export JAVA_HOME=/usr/lib/jvm/java-1.7.0` and the server will controled by Chef and your editings will removed by Chef then you have to set a solr specific JAVA_HOME in `/etc/default/solr.in.sh`:

`SOLR_JAVA_HOME="/usr/lib/jvm/java-1.8.0"`

#### Open file limit and Max processes limit
Maybe the command `sudo service solr start` answered with:

```
[WARN] *** Your open file limit is currently 1024.
It should be set to 65000 to avoid operational disruption.
If you no longer wish to see this warning, set SOLR_ULIMIT_CHECKS to false in your profile or solr.in.sh
[WARN] *** Your Max Processes Limit is currently 4096.
It should be set to 65000 to avoid operational disruption. 
```

In this case `/etc/security/limits.conf` will extended by:

```
solr             soft    nofile          65000
solr             hard    nofile          65000
solr             soft    nproc           65000
solr             hard    nproc           65000
```

#### Exposing solr admin UI

In some cases the server is behind firewall and/or load balancer and port 9883 is denied. In this case a new virtual server will added.

```
<VirtualHost *:80>
    # 212.1.41.47
    ServerAdmin netadmin@sub.uni-hamburg.de
    ServerName hosindex.openscience.hamburg.de
   		
    <Directory />
        Options +FollowSymLinks
       AllowOverride None
    </Directory>
   
     <Proxy /solrAdmin >
        Require all granted
     </Proxy>
    
     <Proxy /solrQuery >
        Require all granted
     </Proxy>

     <Location /solrAdmin/>
	AuthType Basic
	AuthName "Restricted Files"
	AuthBasicProvider file
	AuthUserFile "/etc/httpd/.htpassword"
	Require user solr
     </Location>	
    ProxyPreserveHost On
     ProxyRequests Off   
     ProxyPass /solrAdmin  http://localhost:8983/solr
     ProxyPassReverse /solrAdmin http://localhost:8983/solr
     		
</VirtualHost>
```
