FROM ruby:2.4.1-alpine

# install some packages that we will need later

RUN apk --update add --virtual build-base ruby-dev build-dependencies
RUN apk add nodejs
RUN apk add tzdata

RUN mkdir /usr/app
WORKDIR /usr/app
ADD Gemfile /usr/app/Gemfile
ADD Gemfile.lock /usr/app/Gemfile.lock
RUN bundle install

# Hausaufgabe: App soll auf localhost:3030 laufen
# yarn, npm, js-packages, foreman 
