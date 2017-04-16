

const inquirer = require("inquirer");
const Table = require("cli-table");
require("console.table");
let tableArr; 

const Supervisor = {
    supervisorOpt : function(){
        inquirer.prompt([{
            type: 'list', 
            name: 'action',
            message: 'Choose the next action: ',
            choices: ['VIEW PRODUCT SALES BY THE DEPARTMENT', 'CREATE NEW DEPARTMENT','EXIT STORE']
        }]).then(function(ans){
            if (ans.action === 'VIEW PRODUCT SALES BY THE DEPARTMENT'){
                console.log('Department output');
                Supervisor.viewProductSale();
            }
            else if (ans.action === 'CREATE NEW DEPARTMENT') {
                console.log('All departments');
                Supervisor.createNewDepartment();
            } else console.log('Have a nice day!');
        });
    }, 

    viewProductSale : function(){
        let query = 'SELECT * FROM departments';
        connection.query(query, function(err, result){
            if (err) throw err;
            console.table(result);
            Supervisor.supervisorOpt();
        }); 
    },

    createNewDepartment: function(){
        inquirer.prompt([{
            name: 'name',
            message: 'Department Name: '
        },{
            name: 'cost',
            message: 'Overhead Cost: '
        },{
            name: 'totalsales',
            message: 'Total Sales: '
        }]).then(function(ans){
            let query = `INSERT INTO departments (department_id, department_name, over_head_costs, total_sales) VALUES (?,?,?,?)`;
            let data = [null, ans.name, parseFloat(ans.cost),parseFloat(ans.totalsales)];
            connection.query(query, data, function(err){
                if (err) throw err;
                Supervisor.displayNewDepartment(("WHERE department_name='" + ans.name+"'"));
            });
        });
    },

    displayNewDepartment: function(where){
        let query = 'SELECT * FROM departments ' + where + ';';
        console.log(query);
        connection.query(query, function(err,result){
            console.table(result);
            Supervisor.supervisorOpt();
        });
    }


};

module.exports = Supervisor;