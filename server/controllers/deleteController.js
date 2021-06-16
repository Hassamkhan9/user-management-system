const mysql = require('mysql');


//connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
})


//delete
exports.client = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId);

        // user the connection
        connection.query('DELETE FROM user Where client_id = ? ', [req.params.client_id] , (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.redirect('/clients');
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n' + rows );
        });
    })
    // pool.getConnection((err, connection) => {
    //     if (err) throw err;
    //     connection.query('DELETE FROM user WHERE client_id = ?', ['removed', req.params.client_id], (err, rows) => {
    //       connection.release() // return the connection to pool
    //       if (!err) {
    //         let removedUser = encodeURIComponent('User successeflly removed.');
    //         res.redirect('/?removed=' + removedUser);
    //       } else {
    //         console.log(err);
    //       }
    //       console.log('The data from beer table are: \n', rows);
    //     });
    // });
}

//delete
exports.supplier = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId);

        // user the connection
        connection.query('DELETE FROM supplier Where supplier_id = ? ', [req.params.supplier_id] , (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.redirect('/supplier');
            } else {
                console.log(err);
            }
            console.log('The data from supplier table: \n' + rows );
        });
    })
    // pool.getConnection((err, connection) => {
    //     if (err) throw err;
    //     connection.query('DELETE FROM supplier WHERE supplier_id = ?', ['removed', req.params.supplier_id], (err, rows) => {
    //       connection.release() // return the connection to pool
    //       if (!err) {
    //         let removedUser = encodeURIComponent('Supplier successeflly removed.');
    //         res.redirect('/?removed=' + removedUser);
    //       } else {
    //         console.log(err);
    //       }
    //       console.log('The data from beer table are: \n', rows);
    //     });
    // });
}

//delete
exports.product = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId);

        // products the connection
        connection.query('DELETE FROM products Where products_id = ? ', [req.params.products_id] , (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.redirect('/products');
            } else {
                console.log(err);
            }
            console.log('The data from products table: \n' + rows );
        });
    })
    // pool.getConnection((err, connection) => {
    //     if (err) throw err;
    //     connection.query('DELETE FROM products WHERE products_id = ?', ['removed', req.params.products_id], (err, rows) => {
    //       connection.release() // return the connection to pool
    //       if (!err) {
    //         let removedproducts = encodeURIComponent('products successeflly removed.');
    //         res.redirect('/?removed=' + removedproducts);
    //       } else {
    //         console.log(err);
    //       }
    //       console.log('The data from beer table are: \n', rows);
    //     });
    // });
}