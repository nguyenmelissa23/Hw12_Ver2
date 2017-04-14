const mysql = require("mysql");
const inquirer = require("inquirer");
const Command = require("./bamazonCommand");

const connectServer = function(options){
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306, 
        user: 'melissa',
        password: 'mypassword', 
        database: "bamazon_db"
    });
    connection.connect(function(err){
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        options();
    });
}

module.exports = connectServer;
               

