README
======

gangofbb-rest-api
-----------------

REST API for gang-of-bb

[http://gangofbb.bhtz.fr/](http://gangofbb.bhtz.fr/)

Requirements
------------

node.js >= 0.8
mysql

Installation
------------

git clone https://github.com/gang-of-bb/gangofbb-rest-api.git

Getting started
---------------

Create mysql database called 'movies'

	create database movies;

Update database :

	mysql -u user -p password movies < movies.sql

### With node :
	
	node app.js

### With microscope

	npm install microscope -g

Run the following command at project root:

	microscope server

Licence
-------

MIT