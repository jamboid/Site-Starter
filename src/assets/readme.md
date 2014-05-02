# Site Starter - Assets Workflow

## Introduction

This document is an introduction to the Site Starter asset files and how to use them.

## CSS/Sass

CSS for this project is created using the Sass pre-processor. The **/assets/sass/** directory contains the source files and these should be compiled to the **assets/css/** directory.

### 1. Framework

The **Framework** directory contains 


### 2. Components

The **Components** directory contains Sass files that correspond to page components and other elements such the page grid. This is where the bulk of a project's custom Sass code will go. How the Components files are organised depends on the overall approach

### 3. Dependencies



## JavaScript

### Modules and Constructor Objects

Custom JavaScript for this project should be created as a series of self-contained modules under the top-level "Site" namespace.

Each module should correspond to a specific type of page component (e.g. **Site.navigation** for all nav menu-related JavaScript) or general area of concern (e.g. **Site.events** for global events functionality).

The main elements of page component-focused modules are **Object Constructors**. Each of these corresponds to a specific type of page component and each instance of a page component should have a corresponding object that manages its functionality.

### Module Functions





### Initialising modules

Each module a project uses is initialised by calling its public **init()** function in the **Modules.init()** function of the **Site.js** file.

For modules that are reliant on a loaded DOM, call their **init** functions within the jQuery "document ready" function.

### Events and Messaging

The JavaScript framework uses a standard set of tools for handling events and communicating between modules and the objects they contain.

#### Structure of DOM components

To understand how events and messaging work in this framework, it is first important to understand how page components with JS functionality are created and managed.

Every instance of a page JS component has a corresponding Component Object, created by a constructor, that manages its functionality. This includes how events are handled and messages are sent between components.

The idea  to create a set of components that are loosely-coupled to each other

#### Delegate Events

Delegate event listeners for user-generated events are attached to the **<body>** using the **createDelegatedEventListener** function in the **Site.events** module.

These event listeners then trigger custom event messages specific to the component object that directly control the functionality of the components.

While this approach is a little convoluted, it has the following advantages:

* A single event listener handles events for all instances of a component, current and future.
* User-generated events are decoupled from the functionality of a component so it can be controlled and communicated with more flexibly.
* Accessing and controlling functionality with custom events reduces potential conflicts and effects due to bubbling of standard events.

#### Custom Events

The functions of a page component should be triggered and controlled via custom event listeners within the component object. This provides a uniform interface for both targeted and global messages.


### Publish/Subscribe Messaging

In addition to the targeted event-based messaging described above, the framework also uses a **Publish/Subscribe** system (currently provided by a simple jQuery plugin) for fully decoupled, global messaging.

Each Object Constructor should include a **subscribeToEvents** method that subscription calls using the **jQuery.pubsub** plugin's **$.subscribe** function.

The format of the publish/subscribe messages should take the following form:

**area-of-concern/action**

This is to maintain a level of organisation of messages and also to avoid confusion with custom event names.



## Images and Fonts

## Workflow Tools

### CodeKit

CodeKit is an app that wraps a lot of CLI-based front-end workflow tools, such as Sass, JSHint and Autoprefixer, in a nice  GUI. It is the default tool for our Build Workflow.

#### Setting up a CodeKit project

All the files CodeKit is concerned with should be located in the **theme-name/assets** folder, so you should select that as the project folder in CodeKit. The "assets" name in the CodeKit project list can be changed to something better.

#### Differences between Versions 1 and 2

CodeKit has been used since we started using Sass, but with the recent release of CodeKit 2, we can use it to do some new things.

**Configuration Files**

CodeKit creates a **codekit.config** file for each project, which stores all the project settings and allows them to be shared across machines. Adding a project containing a config file to CodeKit should be as simple as adding the project root folder (this will be the theme assets folder for most Drupal sites) to CodeKit.

**(Currently) No Library Dependencies**

With the addition of Autoprefixer, CodeKit 2 removes the need to use the Bourbon Sass library, which was mainly used for vendor prefixes, and so the reference to it has been removed from the framework.

Legacy projects using earlier versions of the Site Starter framework can be used with CodeKit 2 and it will automatically detect the requirement for Bourbon. You should make sure the options to use Autoprefixer is turned off for these projects.

