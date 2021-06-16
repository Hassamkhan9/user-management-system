const mysql = require('mysql');


//connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
})


//view
exports.view = (req, res) => {   
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId);

        // user the connection
        connection.query('SELECT * FROM supplier WHERE payment_terms IS NOT NULL', (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.render('suppliers/supplierDues', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from supplier table: \n' + rows);
        });
    })
};