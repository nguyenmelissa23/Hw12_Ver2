const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("cli-table"); //https://www.npmjs.com/package/cli-table
const Store = require("./storeFunctions");
const Manager = {

    viewLowInventory: function(){
        let query = 'SELECT * FROM products';
        connection.query(query, function(err, result){
            let lowInventory = [];
            if (err) throw err;
            for (let i = 0; i < result.length; i++){
                if (result[i].stock_quantity < 5){
                    

                }
            }
        });
    },

    updateInventory: function(){

    },

    addNewProduct: function(){

    }

};
module.exports = Manager; 
