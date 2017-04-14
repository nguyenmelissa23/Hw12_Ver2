const mysql = require("mysql");
const inquirer = require("inquirer");
const Customer = require("./bamazonCustomer");
const Manager = require("./bamazonManager");
const Store = require("./storeFunctions");

const Command = {

    switchView: function(){
        inquirer.prompt({
            type: 'list', 
            name: 'view', 
            message: 'Choose the view mode: ', 
            choices: ['Supervisor','Manager', 'Customer']
        }).then(function(ans){
            if (ans.view === 'Manager'){
                Command.managerOpt();
            } else if (ans.view === 'Customer'){
                Command.customerOpt();
            } else if (ans.view === 'Supervisor'){
                Command.supervisorOpt();
            }
        });
    },

    managerOpt : function(){
        inquirer.prompt([{
            type: 'list', 
            name: 'action',
            message: 'Choose the next action: ',
            choices: ['VIEW PRODUCTS FOR SALE', 'VIEW LOW INVENTORY', 'ADD TO INVENTORY', 'ADD NEW PRODUCT']
        }]).then(function(ans){
            if (ans.action === 'VIEW PRODUCTS FOR SALE'){
                Store.displayItems(Command.managerOpt);
            }
            else if (ans.action === 'VIEW LOW INVENTORY') {
                console.log('view low inventory');
                //Manager.viewLowInventory();
            } else if (ans.action === 'ADD TO INVENTORY') {
                console.log('updateToInventory');
                // Manager.updateInventory();
            } else if (ans.action === 'ADD NEW PRODUCT') {
                console.log('addNewProduct()');
                // Manager.addNewProduct();
            }
        });
    },

    customerOpt : function(){
        inquirer.prompt([{
            type: 'list', 
            name: 'action',
            message: 'Choose the next action: ',
            choices: ['SEE ALL ITEMS', 'BUY ITEM', 'EXIT STORE']
        }
        ]).then(function(ans){
            Server.connectServer(Server.userInfo);
            if (ans.action === 'SEE ALL ITEMS'){
                Store.displayItems();
            }
            else if (ans.action === 'BUY ITEM') {
                userBuyInput();
            } else console.log('Have a nice day!');
        });
    },

    supervisorOpt : function(){
        inquirer.prompt([{
            type: 'list', 
            name: 'action',
            message: 'Choose the next action: ',
            choices: ['SEE DEPARTMENT OUTPUT', 'SEE ALL DEPARTMENT','EXIT STORE']
        }
        ]).then(function(ans){
            Server.connectServer(Server.userInfo);
            if (ans.action === 'SEE DEPARTMENT OUTPUT'){
                console.log('Department output');
            }
            else if (ans.action === 'SEE ALL DEPARTMENT') {
                console.log('All departments');
            } else console.log('Have a nice day!');
        });
    }

};

module.exports = Command;
const Server = require("./server");
Server(Command.switchView);




