# Back-end

## Contents:

- [Back-end](#Back-end)
- [Database dump (sql ή json)](#Database-dump)
- [Back-end functional tests](#Back-end-functional-tests)
- [Back-end unit tests](#Back-end-unit-tests)
- [RESTful API](#RESTful-API)

## Back-end

In the back-end, we implement the following:

#### REST API

1. Administrative endpoints
2. System functionalities (remaining endpoints)
3. Other endpoints necessary for the use cases or to ensure smooth interaction with the Frontend

#### Database Connection

## Installation

To install the back-end, copy the files from the back-end folder to your desired directory.  
Install the necessary packages:

```sh
npm install
```

## Execution

To execute the back-end, navigate using the command line to the directory that you have your back-end files and run the _server.js_:

```sh
node server.js
```
## Database Dump

The database dump consists of the following:

- The database schema
- Truncated data used to populate the database

### Database Setup

Make sure that MySQL is running. (For example, ensure that XAMPP is active with both Apache and MySQL services running.)

- In command prompt, navigate to xampp/mysql/bin directory.

- Inside the directory execute the following command:

```sh
mysql -u root -p
```

- Create a new database for this project:

```sh
create database `your database name`;
```

- Now load the dump into the new database:
```sh
mysql -u root -p `your database name` < path\to\ntuaflix_dump.sql
```
We have now successfully copied and loaded the database. Alternatively, we can only load the database
schema, without any data:

```sh
mysql -u root -p `your database name` < path\to\ntuaflix-schema.sql
```








## Back-end functional tests


























## Back-end unit tests


































## RESTful API




