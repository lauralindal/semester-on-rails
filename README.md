# README

Diese Anwendung ist eine Weiterentwicklung des [Semesterplaners](https://github.com/lauralindal/dein-semesterplaner). Dieser Prototyp zeigt eine Übersicht über bisher absolvierte, angefangene und noch zu erledigende Module im Rahmen einer Studienordnung. Außerdem berechnet der Semesterplaner die erreichten Leistungspunkte und schätzt die Dauer der restlichen Studienzeit. Kurse für das kommende Semester lassen sich ebenfalls auswählen und die dazugehörigen Termine werden in einem Kalender angezeigt.

Aktuell verwendet die Anwendung eine Mischung aus Mock-Daten und jene, die dich Hochschule frei zur Verfügung stellt.


### Setup

Der aktuelle Branch ist `erster-versuch`. Dort befinden sich die wichtigsten Entwicklungen (im Prozess).

Zur Vereinfachung wurde mithilfe von Docker eine Entwicklungsumgebung ermöglicht. Du musst also lediglich die Docker Community Edition [installieren](https://docs.docker.com/engine/installation/) und auch [docker-compose](https://docs.docker.com/compose/install/).

Clone das Repo mit `$ git clone https://github.com/lauralindal/semester-on-rails.git`. Wechsle in das Projekt-Verzeichnis mit `$ cd semester-on-rails`.

Baue das Projekt mit `$ docker-compose build web`.

Starte das Projekt mit `$ docker-compose up web`.

(Gegebenenfalls musst du noch `$ docker-compose run web yarn install` laufen lassen.)

Der Semesterplaner läuft dann auf Port `5000`.

Installieren die Migrations mit `$ docker-compose run web rails db:migrate RAILS_ENV=development`.

Mit `$ docker-compose run [Befehl]` kannst du weitere Befehle in den Container reinreichen.

Viel Spaß beim Entwickeln!

### Troubleshooting

Bei der Fehlermeldung `A server is already running. Check /usr/app/tmp/pids/server.pid` musst du lediglich die dort genannte Datei löschen `$ rm tmp/pids/server.pid`.
