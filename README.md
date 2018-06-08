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

* <img src="https://s24255.pcdn.co/wp-content/uploads/2017/05/lamp_stack.jpg
  width0100 />
width=100 />
* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Logo_TYPO3.svg/1200px-Logo_TYPO3.svg.png" width=100 />TYPO* <img src="data:image/png;base64,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" width=100 />Extension find (subgoe)
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
