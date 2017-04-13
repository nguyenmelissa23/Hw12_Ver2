CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT(11) auto_increment NOT NULL,
    product_name VARCHAR(256) NOT NULL,
    department_name VARCHAR(256) NOT NULL, 
    price DECIMAL(11,2) NOT NULL, 
    stock_quantity INT(10) default 0,
    PRIMARY KEY (`item_id`),
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES  (1,"Surf Board","Sporting Goods",400.00,1),
        (2,"Magic Wand","Magic",700.05,50),
        (3,"Secret Potion","Magic",100, 20),
        (4,"Diamond Sunglasses","Clothing and Accessories",100000,10),
        (5,"Gold Bugatti","Automobiles",30000,5),
        (6,"Engine-Powered Pogo Stick","Toys",1000,10),
        (7,"Mandles","Clothing and Accessories",100,15),
        (8,"Metal Bed","Furniture",300,5),
        (9,"Metal Lifejacket","Sporting Goods",100,0 ),
        (10,"Non-Functional City Bus","Automobile", 20000,10 );

-- Challenge 3: 

CREATE TABLE departments(
   department_id INT(11) auto_increment NOT NULL, 
   department_name VARCHAR(256) NOT NULL, 
   over_head_costs DECIMAL(10,2) NOT NULL, 
   total_sales INT(11) default 0 NOT NULL, 
   PRIMARY KEY (`department_id`) 
);
