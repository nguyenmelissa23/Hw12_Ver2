// const inquirer = require("inquirer");
// const Command = require("./bamazonCommand");
// const Customer = require("./bamazonCustomer");
// const Manager = require("./bamazonManager");

// const Store = {   
//     displayItems: function(options){
//         let query = 'SELECT * FROM products';
//         connection.query(query, function(err, result){
//             if (err) throw err;
//             for (let i=0; i<result.length; i++){
//                 console.log(`
//                 Product Name:   ${result[i].product_name}
//                 Price:          ${result[i].price}
//                 Item ID:        ${result[i].item_id}
//                 Department:     ${result[i].department_name}
//                 Stock Quantity: ${result[i].stock_quantity}
//                 ==============================================
//                 `);
//             }
//             options();
//         }); 
//     },

//     // seeUpdatedInfo: function(id, quantity, cost){
//     //     let query = 'SELECT * FROM products WHERE ?';
//     //     let data = {item_id : id};
//     //     let totalCost = quantity*cost;
//     //     connection.query(query, data, function(err, result){
//     //         if (err) throw err;
//     //         console.log(`
//     //             Product Name:   ${result[0].product_name}
//     //             Price:          ${result[0].price}
//     //             Item ID:        ${result[0].item_id}
//     //             Department:     ${result[0].department_name}
//     //             Stock Quantity: ${result[0].stock_quantity}
//     //             ==============================================
//     //         `);
//     //         console.log(`
//     //             YOUR PURCHASE SUMMARY:
//     //             Product Name:   ${result[0].product_name}
//     //             Unit Price:     ${result[0].price}
//     //             Total Cost:     ${totalCost}
//     //         `);
//     //         options();
//     //     }); 
//     // },

//     ifInStock: function(role, id, requiredQuantity, action){
//         let query = 'SELECT * FROM products WHERE ?';
//         let data = {item_id: id};
//         connection.query(query, data, function(err, result){
//             if (err) throw err;
//             console.log('getting stock quantity');
//             console.log("RESULT" + JSON.stringify(result));
//             let stockQuantity = result[0].stock_quantity;
//             let item = result[0].product_name;
//             let cost = result[0].price;
//             let itemID = result[0].item_id;
//             if (stockQuantity < parseInt(requiredQuantity,4)){
//                 console.log('Insufficient quantity');
//                 console.log('Choose different item');
//                 if (role === "Customer") Command.customerOpt();
//                 else if (role === 'Manager') Command.managerOpt();
//             } else if (stockQuantity >= parseInt(requiredQuantity,4)){
//                 console.log('Item is in stock');
//                 console.log('Proceeding your order...');
//                 console.log("buyItem()");
//                 let newQuantity = action(item, stockQuantity, requiredQuantity);
//                 Store.updateQuantity(role, newQuantity, requiredQuantity, itemID, cost);
//             } else if (!stockQuantity){
//                 console.log('Possible error');
//                 if (role === "Customer") Customer.customerOpt();
//                 else if (role === 'Manager') Manager.managerOpt();
//             }
//         });    
//     },

//     updateQuantity: function (role,newQuantity, buyQuantity, id, cost){
//         let query = 'UPDATE products SET ? WHERE ?';
//         let data = [{
//             stock_quantity: newQuantity
//         },{
//             item_id: id
//         }];
//         connection.query(query , data, function(err){
//             if (err) throw err;
//             if (role ==='Supervisor' || role === 'Manager'){ 
//                 console.log(`
//                 Product Name:   ${result[0].product_name}
//                 Price:          ${result[0].price}
//                 Item ID:        ${result[0].item_id}
//                 Department:     ${result[0].department_name}
//                 Stock Quantity: ${result[0].stock_quantity}
//                 ==============================================
//             `   );
//                 Command.managerOpt();
//             } else if (role==='Customer'){
//                 Store.purchaseSummary(id, buyQuantity ,cost,Command.customerOpt);
//             }
//         });
//     },

//     purchaseSummary: function(id, quantity, cost){
//         let query = 'SELECT * FROM products WHERE ?';
//         let data = {item_id : id};
//         let totalCost = quantity*cost;
//         connection.query(query, data, function(err, result){
//             if (err) throw err;
//             console.log(`
//                 YOUR PURCHASE SUMMARY:
//                 Product Name:   ${result[0].product_name}
//                 Unit Price:     ${result[0].price}
//                 Total Cost:     ${totalCost}
//             `);
//             Customer.customerOpt();
//         }); 
//     }

// };

// module.exports = Store;