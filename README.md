Set Up
In order to run the servers, fork and clone this repository, cd to directory, and run these commands in order:

Start the Postgresql server: $ sudo service postgresql start
Start rails server $ rails s
Start npm server $ npm start --prefix client

admin email & pass
lookout@xoingzd.space // abc123
dev emails:
devX@xoingzd.space

# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

Start the Postgresql server: $ sudo service postgresql start
Start rails server $ rails s
Start npm server $ npm start --prefix client

Notes: 12/16/22
- take out users routes
 - get '/me' needs to be changed to 'users#show'