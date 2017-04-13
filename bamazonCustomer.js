const mysql = require("mysql");
const inquirer = require("inquirer");
const Command = require("./bamazonCommand");
const Store = require("./storeFunctions");

const Customer = {

    userBuyInput: function(){
        inquirer.prompt([{
            name: 'id',
            message: 'Please input the id of the item you would like to buy: '
        },{
            name: 'num',
            message: 'Please input the quantity of the item you are buying: '
        }]).then(function(ans){ 
            console.log('checking if the item is in stock');
            Store.ifInStock(ans.id, ans.num, buyItem, customerOpt);
        });
    },

    // ifInStock: function(id, buyQuantity){
    //     let query = 'SELECT * FROM products WHERE ?';
    //     let data = {item_id: id};
    //     connection.query(query, data, function(err, result){
    //         if (err) throw err;
    //         console.log('getting stock quantity');
    //         console.log("RESULT" + JSON.stringify(result));
    //         let stockQuantity = result[0].stock_quantity;
    //         let item = result[0].product_name;
    //         let cost = result[0].price;
    //         let itemID = result[0].item_id;
    //         if (stockQuantity < parseInt(buyQuantity,5)){
    //             console.log('Insufficient quantity');
    //             console.log('Choose different item');
    //             Command.customerOpt();
    //         } else if (stockQuantity >= parseInt(buyQuantity,5)){
    //             console.log('Item is in stock');
    //             console.log('Proceeding your order...');
    //             console.log("buyItem()");
    //             let newQuantity = buyItem(item, stockQuantity, buyQuantity);
    //             Store.updateQuantity(newQuantity, itemID);
    //             Customer.purchaseSummary(itemID, buyQuantity, cost);
    //             Command.customerOpt();
    //         } else if (!stockQuantity){
    //             console.log('Possible error');
    //             Command.customerOpt();
    //         }
    //     });    
    // },

    buyItem: function(item, stockQuantity, buyQuantity){
        let newQuantity = stockQuantity - buyQuantity;
        if (newQuantity < 0) console.log('not enough stock');
        return newQuantity;
    },

    updateQuantity: function (quantity, id){
        let query = 'UPDATE products SET ? WHERE ?';
        let data = [{
            stock_quantity: quantity
        },{
            item_id: id
        }];
        connection.query(query , data, function(err){
            if (err) throw err;
            console.log('Update quantity = ' + quantity + ' for item with id of ' + id);
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
            Command.customerOpt();
        }); 
    }

};

module.exports = Customer; 

