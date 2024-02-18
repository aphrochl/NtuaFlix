# Back-end

Ενδεικτικά περιεχόμενα:

- [Back-end](#Back-end)
- [Database dump (sql ή json)](#Database-dump)
- [Back-end functional tests](#Back-end-functional-tests)
- [Back-end unit tests](#Back-end-unit-tests)
- [RESTful API](#RESTful-API)



## Back-end

Στο Back-end υλοποιούμε τα εξής:

#### REST Api

1. Διαχειριστικά endpoints
2. Λειτουργίες συστήματος (υπόλοιπα endpoints)
3. Άλλα endpoints απαραίτητα για τα use cases ή για την ομαλή λειτουργία του Frontend

#### Database Connection





## Installation

To install the back-end, copy the files in the back-end folder into your desired directory.
Install the packages:

```sh
npm init
```
```sh
npm install
```




## Execution

To execute the back-end, navigate using the command line to the directory that you have your back-end files and run the _server.js_:

```sh
node server.js
```





## Database dump
Αποτελειται απο τα εξης:


-Schema της βασης 
-τα δεδομενα truncated data που κανουμε populate τη βαση 



### Database Setup

Βεβαιωθείτε ότι το MySQL λειτουργεί. (Για παράδειγμα, βεβαιωθείτε ότι το XAMPP είναι ενεργό με ενεργό το Apache και το MySQL)


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




