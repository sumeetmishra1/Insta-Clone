const mysql= require('mysql2');
const pool = mysql.createPool({
    host :'localhost',
    user:'root',
    database:'insta-clone',
    password:'sumit@1234'
})

module.exports=pool.promise();