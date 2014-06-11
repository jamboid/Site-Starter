# Front-End Workflow - Documentation

## Introduction

A typical modern front-end workflow is a pretty complex beast, encompassing some or all of the following:

* Using CSS Pre-processors such as Sass or Less
* Working with Sass/Less libraries
* Debugging, linting and optimising JavaScript files
* Optimising images
* Copying files from one location to another

# Gulp

Gulp is a JavaScript task runner that automates many of the tasks mentioned above.

It is built on top of Node.js and is run locally from the command line.

# Getting Gulp up and running

You will need to install the following on your machine:

* Node.js
* Sass
* Git


## Advantages

1. It's fast
2. Different chains of tasks can be created for different circumstances (e.g. Development vs. Staging vs. Live environments)
3. It allows custom, per-project builds to be created and maintained in project configuration files
4. Package dependencies are managed using the Node Packet Manager (NPM) and don't need to be added to the project's Git repository