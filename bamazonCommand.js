const mysql = require("mysql");
const inquirer = require("inquirer");
const Customer = require("./bamazonCustomer");
const Manager = require("./bamazonManager");
const Store = require("./storeFunctions");
const Supervisor = require("./bamazonSupervisor");

const Command = {

    switchView: function(){
        inquirer.prompt({
            type: 'list', 
            name: 'view', 
            message: 'Choose the view mode: ', 
            choices: ['Supervisor','Manager', 'Customer']
        }).then(function(ans){
            if (ans.view === 'Manager'){
                Manager.managerOpt();
            } else if (ans.view === 'Customer'){
                Customer.customerOpt();
            } else if (ans.view === 'Supervisor'){
                Supervisor.supervisorOpt();
            }
        });
    }
};

module.exports = Command;
const Server = require("./server");
Server(Command.switchView);




