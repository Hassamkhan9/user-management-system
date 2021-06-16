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
        connection.query('SELECT * FROM supplier', (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.render('suppliers/supplier', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from supplier table: \n' + rows);
        });
    })
};


// find
exports.find = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId);

        // user the connection
        connection.query('SELECT * FROM supplier WHERE company_name LIKE ? OR country LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.render('suppliers/supplier', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from supplier table: \n' + rows);
        });
    })
}


exports.form = (req,res) => {
    res.render('suppliers/addsupplier');
};


//add new supplier
exports.create = (req, res) => {
    const {company_name, address, country, website, category, contact_person, contact_number, contact_designation, contact_email, sales_person, sales_number, sales_designation, sales_email, rnd_person, rnd_number, rnd_designation, rnd_email, ship_to, bill_to, payment_terms } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId);

        // user the connection
        connection.query('INSERT INTO supplier SET company_name = ?, address= ?, country= ? , website = ?, category =?, contact_person =?, contact_number =?, contact_designation =?, contact_email =?, sales_person =?, sales_number =?, sales_designation =?, sales_email =?, rnd_person =?, rnd_number =?, rnd_designation =?, rnd_email =?, ship_to =?, bill_to =?, payment_terms =?',[company_name, address, country, website, category, contact_person, contact_number, contact_designation, contact_email, sales_person, sales_number, sales_designation, sales_email, rnd_person, rnd_number, rnd_designation, rnd_email, ship_to, bill_to, payment_terms], (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.render('suppliers/addsupplier', { alert: 'Supplier added successfully!' });
            } else {
                console.log(err);
            }
            console.log('The data from supplier table: \n' + rows);
            res.redirect('/supplier');
        });
    })
}


//edit supplier
exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId);

        // user the connection
        connection.query('SELECT * FROM supplier Where supplier_id = ? ', [req.params.supplier_id] , (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.render('suppliers/editsupplier', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from supplier table: \n' + rows );
        });
    })
}

// Update supplier
exports.update = (req, res) => {
    const { company_name, address, country, website, category, contact_person, contact_number, contact_designation, contact_email, sales_person, sales_number, sales_designation, sales_email, rnd_person, rnd_number, rnd_designation, rnd_email, ship_to, bill_to, payment_terms } = req.body;
  
    pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);
      // User the connection
      connection.query('UPDATE supplier SET company_name = ?, address= ?, country= ? , website = ?, category =?, contact_person =?, contact_number =?, contact_designation =?, contact_email =?, sales_person =?, sales_number =?, sales_designation =?, sales_email =?, rnd_person =?, rnd_number =?, rnd_designation =?, rnd_email =?, ship_to =?, bill_to =?, payment_terms =? WHERE supplier_id = ?', [company_name, address, country, website, category, contact_person, contact_number, contact_designation, contact_email, sales_person, sales_number, sales_designation, sales_email, rnd_person, rnd_number, rnd_designation, rnd_email, ship_to, bill_to, payment_terms, req.params.supplier_id], (err, rows) => {
        // When done with the connection, release it
        connection.release();
  
        if (!err) {
  
          pool.getConnection((err, connection) => {
            if (err) throw err; // not connected!
            console.log('Connected as ID ' + connection.threadId);
            // User the connection
            connection.query('SELECT * FROM user WHERE supplier_id = ?', [req.params.supplier_id], (err, rows) => {
              // When done with the connection, release it
              connection.release();
              if (!err) {
                res.render('suppliers/editsupplier', { rows, alert: `${company_name} has been updated.` });
              } else {
                console.log(err);
              }
              console.log('The data from supplier table: \n', rows);
            });
          });
  
        } else {
          console.log(err);
        }
        console.log('The data from supplier table: \n', rows);
        res.redirect('/supplier');
      });
    });
};



//delete
exports.delete = (req, res) => {
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


// //viewall
exports.viewall = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId);

        // user the connection
        connection.query('SELECT * FROM supplier WHERE supplier_id = ?', [req.params.supplier_id], (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.render('suppliers/viewsupplier', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from supplier table: \n' + rows);
        });
    })
}