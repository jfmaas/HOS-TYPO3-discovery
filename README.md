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

* <img
  src="data:image/png;base64,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"
width=100 />LAMP Stack
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
