# nodejs-sample-task
This is a sample application, providing a bookstorage-like functionality over the web, in order to
showcase and expose technical stack and techniquest to be used on larger projects.

Sample task for nodejs, extjs, mongodb, elasticSearch. The app is ready to be deployed to the Heroku
cloud hosting, however may also be easily ran locally.

Created and maintained by Logicify [http://logicify.com](http://logicify.com). We use it also as a kickstarter
app when we need to have a typical one started. It is released under MIT, and really not a rocket science - please
feel free to fork it and use. Pull requests with improvements and new features are also welcome.

You can see the app instance on [http://http://nodejs-sample-task.logicify.com/](http://nodejs-sample-task.logicify.com/)

# Content
- [nodejs-sample-task](#nodejs-sample-task)
- [Content](#content)
    - [Prerequisites](#prerequisites)
    - [Building and installing](#building-and-installing)
        - [Test project](#test-project)
    - [Features list](#features-list)
        - [express.js](#expressjs)
        - [mongodb](#mongodb)
        - [elasticsearch](#elasticsearch)
        - [extjs](#extjs)
        - [json-validation](#json-validation)
        - [basic authentication](#basic-authentication)
    - [Changelog](#changelog)
        - [2014/03/26](#20140326)
        - [2014/03/07](#20140307)
    - [Team](#team)

## Prerequisites
 * Mongodb (2.x)
 * Elasticsearch (last version)
 * Node v0.10 with npm

 Details about installation of these can be found on [Prerequisites] page

## Building and installing
Just make sure mongodb and ellasticsearch services are up and running. 

Then, carry on to building application. First, run

 ```
 npm install
 ```

This will install the dependencies. Then,

```
npm start
```

This will launch our init script. You will be prompted to insert demo data into the DB. We strongly recommend to do it before the first time launch.  On the command line where you ran the node, you will observe the notice with the URL the app is
accessible on. Visit that URL in browser, and you are in!

### Test project

First, make sure the project is built and running successfully.

Then simply run the
```
npm test
```
from within the project directory. This should result in the tests running and producing a specification-like
 output of the tests.



## Features list
We have a lot to show in our sample project. Below please find list of features you may probably be interested in.

### express.js

All this application is based on using [express.js]https://github.com/visionmedia/express) library. This library suits our aim fine and it is easy to setup. So not much to talk, just check out our code.

Related code parts:

 * ```app.js``` file contains our *Application* object. This object is build on top of express
 * ```server.js``` file is used with ```npm start``` to bootstrap and run server

### mongodb

It is very powerful document database. You can read about mongo by [link](https://www.mongodb.org/) in more detail. We use mongo to store our book objects as a json-based documents.

Related code parts:

 * ```book-data-provider.js``` encapsulates all methods related to work with mongo

### elasticsearch

This feature is used for fast full text search through all books stored in the system. Here is the related [link to elasticsearch site](http://www.elasticsearch.org/)

Code parts:

 * ```book-search.js``` file with Search object. This object has methods related working with elasticsearch. These are - create, update index and search through it.

### extjs

Basically user interface of our application is build using `Sencha Ext JS` project. Use [link](http://www.sencha.com/products/extjs/)  to learn more about this library.
Main concept of using extjs is to build one page rich web application.

Related code parts:

* ```public/app``` folder and ```public/app.js``` file hold all files with extjs code
* ```public``` folder mapped with our `Application` as a placeholder of static files as well
 
### json-validation

We obviously need to validate user's input before processing. On large number of input it can become a mess. Its great to have strict data contract between input and processing backend. Good way to achieve this is usage of  JSON schema based validator.  
Please checkout [json-validator](http://github.com/kriszyp/json-schema) and related [json-schema](http://json-schema.org/) notation.

Related code parts:

 * **json-schema** dependency in ```package.json```
 *  ```lib/validator.js``` library
 *  ```book/book-validation-schema.js``` file with all book validation schemas
 *  *mountAPI* method of the **Application** object in the ```app.js``` file. Here we add validation middleware to every routes required for user data checks

### basic authentication

As an example of using authentication and authorization process we opt the basic authentication approach.
In our **nodejs-sample-task** we created a single User with **name:** *"valid"* and **password:** *"user"*.

Related code parts:

 * ```index.html``` was renamed to ```secret.html```
 * it is created new ```index.html``` file
 * ```Application``` object was changed to suit basic auth
 * client code files ```List.js``` and ```BookController.js``` was changed
 * it was extended tests as well

## Changelog

### 2014/03/26

 * changes in startup procedure

### 2014/03/07

 * json-validation
 * basic auth 
 
## Team
Thanks to everyone who contributed to this sample application:

 * Pavel Knorr
 * Vadim Didenko
 * Igor Cherednichenko
 * Alex Cherednichenko
 * Konstantin Kovtushenko
 * Sergey Tityenok