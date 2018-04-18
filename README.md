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
sudo apt install wget
```
leicht installieren. 


## Installation der LAMP-Umgebung

Eine grossartiges Rezept hat [Felix Lohmeier](https://github.com/felixlohmeier/summerschool-openrefine/blob/master/katalog-mit-typo3-find/installation-von-typo3-und-typo3-find.md)
geschrieben. Wir haben uns davon inspirieren lassen.

