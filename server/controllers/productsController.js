const mysql = require('mysql');


//connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
})

// //view
exports.view = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId);

        // products the connection
        connection.query('SELECT * FROM products', (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.render('products/products', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from products table: \n' + rows);
        });
    })
}

// find
exports.find = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId);

        // user the connection
        connection.query('SELECT * FROM products WHERE supplier LIKE ? OR project_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.render('products/products', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from products table: \n' + rows);
        });
    })
}

exports.form = (req,res) => {
    res.render('products/addproduct');
};

//add new client
exports.create = (req, res) => {
    const { category, product_type, description, size, interface, lens_make, lens_part, vcm_make, vcm_part, sensor_make, sensor_part, customer, project_name, customer_product_id, supplier, supplier_project, approved_version, approved_date, supplier_product_id, buying_price,selling_price, margin, margin_percentage, annual_volume } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId);

        // user the connection
        connection.query('INSERT INTO products SET  category =?, product_type =?, description =?, size =?, interface =?, lens_make =?, lens_part =?, vcm_make =?, vcm_part =?, sensor_make =?, sensor_part =?, customer =?, project_name =?, customer_product_id =?, supplier =?, supplier_project =?, approved_version =?, approved_date =?, supplier_product_id =?, buying_price =?, selling_price =?, margin =?, margin_percentage =?, annual_volume =?',[ category, product_type, description, size, interface, lens_make, lens_part, vcm_make, vcm_part, sensor_make, sensor_part, customer, project_name, customer_product_id, supplier, supplier_project, approved_version, approved_date, supplier_product_id, buying_price, selling_price, margin, margin_percentage, annual_volume], (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.render('products/addproduct', { alert: 'Product added successfully!' });
            } else {
                console.log(err);
            }
            console.log('The data from products table: \n' + rows);
            res.redirect('products');
        });
    })
}

//edit client
exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId);

        // user the connection
        connection.query('SELECT * FROM products Where products_id = ? ', [req.params.products_id] , (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.render('products/editproduct', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from products table: \n' + rows );
        });
    })
}

// Update User
exports.update = (req, res) => {
    const { category, product_type, description, size, interface, lens_make, lens_part, vcm_make, vcm_part, sensor_make, sensor_part, customer, project_name, customer_product_id, supplier, supplier_project, approved_version, approved_date, supplier_product_id, buying_price, selling_price, margin, margin_percentage, annual_volume } = req.body;
  
    pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);
      // User the connection
      connection.query('UPDATE products SET category =?, product_type =?, description =?, size =?, interface =?, lens_make =?, lens_part =?, vcm_make =?, vcm_part =?, sensor_make =?, sensor_part =?, customer =?, project_name =?, customer_product_id =?, supplier =?, supplier_project =?, approved_version =?, approved_date =?, supplier_product_id =?, buying_price =?, selling_price =?, margin =?, margin_percentage =?, annual_volume =? WHERE products_id = ?', [ category, product_type, description, size, interface, lens_make, lens_part, vcm_make, vcm_part, sensor_make, sensor_part, customer, project_name, customer_product_id, supplier, supplier_project, approved_version, approved_date, supplier_product_id, buying_price, selling_price, margin, margin_percentage, annual_volume, req.params.products_id], (err, rows) => {
        // When done with the connection, release it
        connection.release();
  
        if (!err) {
  
          pool.getConnection((err, connection) => {
            if (err) throw err; // not connected!
            console.log('Connected as ID ' + connection.threadId);
            // products the connection
            connection.query('SELECT * FROM products WHERE products_id = ?', [req.params.products_id], (err, rows) => {
              // When done with the connection, release it
              connection.release();
              if (!err) {
                res.render('products/editproduct', { rows, alert: `${category} has been updated.` });
              } else {
                console.log(err);
              }
              console.log('The data from products table: \n', rows);
            });
          });
  
        } else {
          console.log(err);
        }
        console.log('The data from products table: \n', rows);
        res.redirect('/products');
      });
    });
};


// //delete
// exports.delete = (req, res) => {
//     pool.getConnection((err, connection) => {
//         if (err) throw err; //not connected
//         console.log('Connected as ID' + connection.threadId);

//         // products the connection
//         connection.query('DELETE FROM products Where products_id = ? ', [req.params.products_id] , (err, rows) => {
//             // when done with connection release it 
//             connection.release();

//             if (!err) {
//                 res.redirect('/clients');
//             } else {
//                 console.log(err);
//             }
//             console.log('The data from products table: \n' + rows );
//         });
//     })
//     // pool.getConnection((err, connection) => {
//     //     if (err) throw err;
//     //     connection.query('DELETE FROM products WHERE products_id = ?', ['removed', req.params.products_id], (err, rows) => {
//     //       connection.release() // return the connection to pool
//     //       if (!err) {
//     //         let removedproducts = encodeURIComponent('products successeflly removed.');
//     //         res.redirect('/?removed=' + removedproducts);
//     //       } else {
//     //         console.log(err);
//     //       }
//     //       console.log('The data from beer table are: \n', rows);
//     //     });
//     // });
// }

// //viewall
exports.viewall = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId);

        // products the connection
        connection.query('SELECT * FROM products WHERE products_id = ?', [req.params.products_id], (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.render('products/viewproduct', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from products table: \n' + rows);
        });
    })
}