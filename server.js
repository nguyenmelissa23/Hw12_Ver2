const mysql = require("mysql");
const inquirer = require("inquirer");
let userInfo;
let connection;
const Command = require("./bamazonCommand");
const connectInfo = function(){
        inquirer.prompt([
            {
                name:"user",
                message: "Sever Username: "
            }, {
                type: "password",
                name: "pwd",
                message: "Server Password: "
            }
        ]).then(function(ans){
            console.log('server function');
            userInfo = {user: ans.user, pwd: ans.pwd};
            connectServer();
        });
    };
function connectServer(){
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306, 
        user: userInfo.user,
        password: userInfo.pwd, 
        database: "bamazon_db"
    });
    connection.connect(function(err){
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        
    });
}

//console.log(JSON.stringify(JSON.stringify(Command)));
//Command.switchView();
module.exports = {connection: connection, 
                connectInfo: connectInfo};

