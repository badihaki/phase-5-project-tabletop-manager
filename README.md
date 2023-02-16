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

# To Do
User:
    X Can make a new user
    X Can log in a user
    X Clean up routes
    X Show errors on login
    X Incorporate Error component if needed
Groups:
    X Can make a new group
    - New groups need unique names
    - Can update a group
    - Can delete a group INCLUDE all memberships and group messages associated with group
    - Can join a group as a membership
    X Incorporate Error component if needed
    - Creating a new group does not automatically add to users page. Needs a refresh!? ** Find out what updates user groups and add the new group to this when creating a new group, OR change where user's group list pulls from, EG pull from groups context instead of whatever it is now **
Group Messages
    - Can send group messages
    - Can stream new messages simultaneously between clients
    - Incorporate Error component if needed
Characters
    X Fix character form
    X Can create a new character
    X Can update a character
    X Can delete a character
    X Error messages correctly show