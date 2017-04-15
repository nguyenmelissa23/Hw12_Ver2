const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("cli-table"); //https://www.npmjs.com/package/cli-table
const Store = require("./storeFunctions");
const Command = require("./bamazonCommand");

const Manager = {

    managerOpt : function(){
        inquirer.prompt([{
            type: 'list', 
            name: 'action',
            message: 'Choose the next action: ',
            choices: ['VIEW PRODUCTS FOR SALE', 'VIEW LOW INVENTORY', 'ADD TO INVENTORY', 'ADD NEW PRODUCT', 'EXIT STORE']
        }]).then(function(ans){
            if (ans.action === 'VIEW PRODUCTS FOR SALE'){
                Manager.displayItems(Manager.managerOpt);
            }
            else if (ans.action === 'VIEW LOW INVENTORY') {
                console.log('view low inventory');
                Manager.viewLowInventory();
            } else if (ans.action === 'ADD TO INVENTORY') {
                console.log('updateToInventory');
                Manager.updateInventory();
            } else if (ans.action === 'ADD NEW PRODUCT') {
                console.log('addNewProduct()');
                Manager.addNewProduct();
            } else console.log('Have a nice day!');
        });
    },

    displayItems: function(){
        let query = 'SELECT * FROM products';
        connection.query(query, function(err, result){
            if (err) throw err;
            for (let i=0; i<result.length; i++){
                console.log(`
                Product Name:   ${result[i].product_name}
                Price:          ${result[i].price}
                Item ID:        ${result[i].item_id}
                Department:     ${result[i].department_name}
                Stock Quantity: ${result[i].stock_quantity}
                ==============================================
                `);
            }
            Manager.managerOpt();
        }); 
    },

    viewLowInventory: function(){
        let query = 'SELECT * FROM products';
        connection.query(query, function(err, result){
            let lowInventory = [];
            if (err) throw err;
            console.log('Items with quantity less than 5: ')
            for (let i = 0; i < result.length; i++){
                if (result[i].stock_quantity < 5){
                    console.log(`
                    ${result[i].item_id} - ${result[i].product_name}
                    `);
                }
            }
            Manager.managerOpt();
        });
    },

    updateInventory: function(){
        inquirer.prompt([{
            name: 'id',
            message: 'Item ID: '
        },{
            name: 'quantity',
            message: 'Incoming Quantity: '
        }]).then(function(ans){
            connection.query('SELECT stock_quantity FROM products WHERE ? ', {item_id: ans.id}, 
                function(err,result){
                    quantityResult = (result[0].stock_quantity) + parseFloat(ans.quantity);
                    Manager.updateQuantity(quantityResult, ans.id);
            });
        });
    },

    updateQuantity: function(quantity,id){
        connection.query('UPDATE products SET ? WHERE ?' , 
        [{stock_quantity: quantity},{item_id: id}], 
            function(err){
                if (err) throw err;
                Manager.displayNewItem(('WHERE item_id=' + id));
        });
    },

    addNewProduct: function(){
        inquirer.prompt([{
            name: 'name',
            message: 'Product Name: '
        },{
            name: 'price',
            message: 'Price: '
        },{
            name: 'department',
            message: 'Department: '
        },{
            name: 'quantity',
            message: 'Stock quantity: '
        }
        ]).then(function(ans){
            let query = `INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES (?,?,?,?,?)`;
            let data = [null, ans.name, ans.department,parseFloat(ans.price),parseFloat(ans.quantity)];
            connection.query(query, data, function(err, result){
                if (err) throw err;
                Manager.displayNewItem('');
            });
        });
    },

    displayNewItem: function(where){
         connection.query('SELECT * FROM products ' + where, function(err,result){
            //console.log(result);
            for (let i = 0; i < result.length; i++){
                if (i === (result.length-1)){
                    console.log(`
            Product Name:   ${result[i].product_name}
            Price:          ${result[i].price}
            Item ID:        ${result[i].item_id}
            Department:     ${result[i].department_name}
            Stock Quantity: ${result[i].stock_quantity}
            ==============================================
            `);
                }
            }
            Manager.managerOpt();
        });
    }
    
};
module.exports = Manager; 
