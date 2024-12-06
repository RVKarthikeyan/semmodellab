for shopping app 
CREATE DATABASE shopping_app;

USE shopping_app;

CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO items (name, price, image_url) VALUES
('Apple', 1.00, 'https://via.placeholder.com/150'),
('Banana', 0.50, 'https://via.placeholder.com/150'),
('Orange', 0.80, 'https://via.placeholder.com/150');

Railway
Setup
1. Database in XAMPP
Create a database named railway_system.
Add two tables: trains and bookings.
Table: trains

Field	Type	Notes
id	INT	Primary key, auto-increment
train_name	VARCHAR(50)	Name of the train
available_seats	INT	Number of available seats
Table: bookings

Field	Type	Notes
id	INT	Primary key, auto-increment
train_id	INT	Foreign key referencing trains.id
passenger_name	VARCHAR(50)	Name of the passenger

Auth:
2. Create a Database
Create a database named user_auth.
Add a table users with columns:
id (INT, primary key, auto_increment)
username (VARCHAR, unique)
password (VARCHAR)

library:
Create a database named library and a table books:

sql

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    status ENUM('available', 'borrowed') DEFAULT 'available'
);