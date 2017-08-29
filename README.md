# README

Der aktuelle Branch ist `erster-versuch`. Dort befinden sich die wichtigsten Entwicklungen (im Prozess).

Zur Vereinfachung wurde mithilfe von Docker eine Entwicklungsumgebung ermöglicht. Du musst also lediglich die Docker Community Edition [installieren](https://docs.docker.com/engine/installation/) und auch [docker-compose](https://docs.docker.com/compose/install/).

Clone das Repo mit `$ git clone https://github.com/lauralindal/semester-on-rails.git`. Wechsle in das Projekt-Verzeichnis mit `$ cd semester-on-rails`.

Baue das Projekt mit `$ docker-compose build web`.

Starte das Projekt mit `$ docker-compose up web`.

Der Semesterplaner läuft dann auf Port `5000`.

Mit `$ docker-compose run [Befehl]` kannst du Befehle in den Container reinreichen.

Viel Spaß beim Entwickeln!
