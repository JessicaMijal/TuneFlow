const mysql = require('mysql2');

const connection = mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'',
    database:'tuneflow'
});

connection.connect((err)=>{

    if(err){

        console.log(err);

    }else{

        console.log("Base de datos conectada");
    }
});

module.exports = connection;