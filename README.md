# The Group Manager - README
The Group Manager is a tool designed to help table top gamers get together and have fun by providing a space with which they can communicate and coordinate.

# Purpose
The purpose of this webapp is to provide a the ability to create and join groups based on games being played, and to provide a message-board-like space where the group can coordinate activities.

Originally, the idea was for a real-time chat catalog utilizing Action Cable's Broadcasting module. While this was abandonned due to time constraints, the  base functionality is there.

# Local Set Up

In order to run this project, fork and clone this repository, cd to directory, and run these commands in order:

Start the Postgresql server: $ sudo service postgresql start
Start rails server $ rails s
Start npm server $ npm start --prefix client