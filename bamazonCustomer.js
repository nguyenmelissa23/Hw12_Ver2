const mysql = require("mysql");
const inquirer = require("inquirer");
const Command = require("./bamazonCommand");
const Server = require("./server");

const Customer = {

    customerOpt : function(){
        inquirer.prompt([{
            type: 'list', 
            name: 'action',
            message: 'Choose the next action: ',
            choices: ['SEE ALL ITEMS', 'BUY ITEM', 'EXIT STORE']
        }
        ]).then(function(ans){
            if (ans.action === 'SEE ALL ITEMS'){
                Store.displayItems(Customer.customerOpt);
            }
            else if (ans.action === 'BUY ITEM') {
                Customer.userBuyInput(Customer.customerOpt);
            } else {
                console.log('Have a nice day!');
                // Command.switchView();
            }
        });
    },

    userBuyInput: function(options){
        inquirer.prompt([{
            name: 'id',
            message: 'Id of the item: '
        },{
            name: 'num',
            message: 'Quantity: '
        }]).then(function(ans){ 
            console.log('Checking if the item is in stock');
            Customer.ifInStock(ans.id, ans.num);
        });
    },

    ifInStock: function(id, requiredQuantity){
        let query = 'SELECT * FROM products WHERE ?';
        let data = {item_id: id};
        connection.query(query, data, function(err, result){
            if (err) throw err;
            console.log('Getting stock quantity');
            let stockQuantity = result[0].stock_quantity;
            let item = result[0].product_name;
            let cost = result[0].price;
            let itemID = result[0].item_id;
            if (stockQuantity < parseInt(requiredQuantity,4)){
                console.log('Insufficient quantity');
                console.log('Choose different item');
                Customer.customerOpt();
            } else if (stockQuantity >= parseInt(requiredQuantity,4)){
                console.log('Item is in stock');
                console.log('Proceeding your order...');
                let newQuantity = Customer.buyItem(item, stockQuantity, requiredQuantity);
                Customer.updateQuantity(newQuantity, requiredQuantity, itemID, cost);
            } else if (!stockQuantity){
                console.log('Possible error');
                Customer.customerOpt();
            }
        });    
    },

    buyItem: function(item, stockQuantity, buyQuantity){
        let newQuantity = stockQuantity - buyQuantity;
        if (newQuantity < 0) console.log('Not enough stock');
        return newQuantity;
    },

    updateQuantity: function (newQuantity, buyQuantity, id, cost){
        let query = 'UPDATE products SET ? WHERE ?';
        let data = [{
            stock_quantity: newQuantity
        },{
            item_id: id
        }];
        connection.query(query , data, function(err){
            if (err) throw err;
            Customer.purchaseSummary(id, buyQuantity, cost);
        });
    },

    purchaseSummary: function(id, quantity, cost){
        let query = 'SELECT * FROM products WHERE ?';
        let data = {item_id : id};
        let totalCost = quantity*cost;
        connection.query(query, data, function(err, result){
            if (err) throw err;
            console.log(`
                YOUR PURCHASE SUMMARY:
            Product Name:   ${result[0].product_name}
            Unit Price:     ${result[0].price}
            Total Cost:     ${totalCost}
            `);
            Customer.customerOpt();
        }); 
    }

};

module.exports = Customer; 

