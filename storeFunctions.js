const Command = require("./bamazonCommand");

const Store = {   
    displayItems: function(optFunct){
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
            optFunct();
        }); 
    },

    seeUpdatedInfo: function(id, quantity, cost){
        let query = 'SELECT * FROM products WHERE ?';
        let data = {item_id : id};
        let totalCost = quantity*cost;
        connection.query(query, data, function(err, result){
            if (err) throw err;
            console.log(`
                Product Name:   ${result[0].product_name}
                Price:          ${result[0].price}
                Item ID:        ${result[0].item_id}
                Department:     ${result[0].department_name}
                Stock Quantity: ${result[0].stock_quantity}
                ==============================================
            `);
            console.log(`
                YOUR PURCHASE SUMMARY:
                Product Name:   ${result[0].product_name}
                Unit Price:     ${result[0].price}
                Total Cost:     ${totalCost}
            `);
            options();
        }); 
    },

    ifInStock: function(id, requiredQuantity, action, options){
        let query = 'SELECT * FROM products WHERE ?';
        let data = {item_id: id};
        connection.query(query, data, function(err, result){
            if (err) throw err;
            console.log('getting stock quantity');
            console.log("RESULT" + JSON.stringify(result));
            let stockQuantity = result[0].stock_quantity;
            let item = result[0].product_name;
            let cost = result[0].price;
            let itemID = result[0].item_id;
            if (stockQuantity < parseInt(requiredQuantity,5)){
                console.log('Insufficient quantity');
                console.log('Choose different item');
                Command.options();
            } else if (stockQuantity >= parseInt(requiredQuantity,5)){
                console.log('Item is in stock');
                console.log('Proceeding your order...');
                console.log("buyItem()");
                let newQuantity = action(item, stockQuantity, requiredQuantity);
                Store.updateQuantity(newQuantity, itemID);
                Command.options();
                //purchaseSummary(itemID, buyQuantity, cost);
            } else if (!stockQuantity){
                console.log('Possible error');
                Command.options();
            }
        });    
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
    }

};

module.exports = Store;