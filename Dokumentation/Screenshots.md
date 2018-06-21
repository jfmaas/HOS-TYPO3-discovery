# Making screenshots

In some cases we need screenshosts as thumbnails for rendering. Because of cross-site-restrictions we need a program on server. 

## Which tool?

A standard tool is [phantomjs](http://phantomjs.org/).

## How calling as web service?

### CGI-module

For this way [cgi-node](http://www.cgi-node.org/) is available. The general principe is to call a special javascript script. This script proceeds the logic by usage of `/us`