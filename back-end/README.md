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




```sh
mysql -u root -p
```
create a new database for this project.
```sh
create database `your database name`;
```

for the following command replace `/path/to/db.sql` with the actual path to the sql file which is located in the `utils` folder inside the `api-backend` folder in the root of the project.
```
SOURCE /path/to/db.sql;
```
```
exit;
```

populate the database with data
```sh
node script.js

```


















## Back-end functional tests


























## Back-end unit tests


































## RESTful API




