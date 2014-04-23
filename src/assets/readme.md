# Site Starter - Assets

## Introduction

This document is an introduction to the Site Starter asset files and how to use them.

## CSS/Sass

CSS for this project is created using the Sass pre-processor. The **/assets/sass/** directory contains the source files and these should be compiled to the **assets/css/** directory.

### 1. Components

### 2. Framework

## JavaScript

Custom JavaScript for this project should be created as a series of modules under the top-level "Site" namespace. 

### Initialising modules

Each module a project uses is initialised by calling its public **init()** function in the **Modules.init()** function of the **Site.js** file.

As most of the modules used will be DOM-related, calling their **init** functions should happen within the jQuery "document ready" function.

### Event-based messaging



### Publish/Subscribe messaging

## Images and Fonts

## Workflow Tools

### CodeKit

CodeKit can be used to process both the Sass files to CSS and the JavaScript module and library files to production-ready, optimised files.