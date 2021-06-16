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

        // user the connection
        connection.query('SELECT * FROM user', (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.render('client/clients', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n' + rows);
        });
    })
}

// find
exports.find = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId);

        // user the connection
        connection.query('SELECT * FROM user WHERE company_name LIKE ? OR country LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.render('client/clients', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n' + rows);
        });
    })
}

exports.form = (req,res) => {
    res.render('client/addclient');
};

//add new client
exports.create = (req, res) => {
    const {company_name, address, country, website, category, contact_person, contact_number, contact_designation, contact_email, purchasing_person, purchasing_number, purchasing_designation, purchasing_email, rnd_person, rnd_number, rnd_designation, rnd_email, ship_to, bill_to, payment_terms} = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId);

        // user the connection
        connection.query('INSERT INTO user SET company_name = ?, address= ?, country= ? , website = ?, category =?, contact_person =?, contact_number =?, contact_designation =?, contact_email =?, purchasing_person =?, purchasing_number =?, purchasing_designation =?, purchasing_email =?, rnd_person =?, rnd_number =?, rnd_designation =?, rnd_email =?, ship_to =?, bill_to =?, payment_terms =?',[company_name, address, country, website, category, contact_person, contact_number, contact_designation, contact_email, purchasing_person, purchasing_number, purchasing_designation, purchasing_email, rnd_person, rnd_number, rnd_designation, rnd_email, ship_to, bill_to, payment_terms], (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.render('client/addclient', { alert: 'User added successfully!' });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n' + rows);
            res.redirect('/clients');
        });
    })
}

//edit client
exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId);

        // user the connection
        connection.query('SELECT * FROM user Where client_id = ? ', [req.params.client_id] , (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.render('client/editclient', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n' + rows );
        });
    })
}

// Update User
exports.update = (req, res) => {
    const { company_name, address, country, website, category, contact_person, contact_number, contact_designation, contact_email, purchasing_person, purchasing_number, purchasing_designation, purchasing_email, rnd_person, rnd_number, rnd_designation, rnd_email, ship_to, bill_to, payment_terms } = req.body;
  
    pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);
      // User the connection
      connection.query('UPDATE user SET company_name = ?, address= ?, country= ? , website = ?, category =?, contact_person =?, contact_number =?, contact_designation =?, contact_email =?, purchasing_person =?, purchasing_number =?, purchasing_designation =?, purchasing_email =?, rnd_person =?, rnd_number =?, rnd_designation =?, rnd_email =?, ship_to =?, bill_to =?, payment_terms =? WHERE client_id = ?', [company_name, address, country, website, category, contact_person, contact_number, contact_designation, contact_email, purchasing_person, purchasing_number, purchasing_designation, purchasing_email, rnd_person, rnd_number, rnd_designation, rnd_email, ship_to, bill_to, payment_terms, req.params.client_id], (err, rows) => {
        // When done with the connection, release it
        connection.release();
  
        if (!err) {
  
          pool.getConnection((err, connection) => {
            if (err) throw err; // not connected!
            console.log('Connected as ID ' + connection.threadId);
            // User the connection
            connection.query('SELECT * FROM user WHERE client_id = ?', [req.params.client_id], (err, rows) => {
              // When done with the connection, release it
              connection.release();
              if (!err) {
                res.render('client/editclient', { rows, alert: `${company_name} has been updated.` });
              } else {
                console.log(err);
              }
              console.log('The data from user table: \n', rows);
            });
          });
  
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
        res.redirect('/clients');
      });
    });
};


//delete
exports.delete = (req, res) => {
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

// //viewall
exports.viewall = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId);

        // user the connection
        connection.query('SELECT * FROM user WHERE client_id = ?', [req.params.client_id], (err, rows) => {
            // when done with connection release it 
            connection.release();

            if (!err) {
                res.render('client/viewclient', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n' + rows);
        });
    })
}