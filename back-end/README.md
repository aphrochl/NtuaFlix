# Back-end

Ενδεικτικά περιεχόμενα:

- [Back-end](#Back-end)
- [Database dump (sql ή json)](#Database-dump)
- [Back-end functional tests](#Back-end-functional-tests)
- [Back-end unit tests](#Back-end-unit-tests)
- [RESTful API](#RESTful-API)



## Back-end

Στο Back-end υλοποιουμε τα εξης :ΟΛΑ




## Installation for back-end 


```sh
git clone 
```
go to the project directory
```sh
cd NTUAflix
```
install dependencies
```sh
npm install
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




