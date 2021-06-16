const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const { response } = require('express');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//parsing middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

//static files
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('views/images'));

//templating engine
app.engine('hbs', exphbs({ extname: '.hbs'}));
app.set('view engine', 'hbs');

var hbs = exphbs.create({});
//select helper
hbs.handlebars.registerHelper('select', function(selected, options) {
    return options.fn(this).replace(
        new RegExp(' value=\"' + selected + '\"'),
        '$& selected="selected"');
});

//connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
})

//connect to database
pool.getConnection((err, connection)=>{
    if(err) throw err; //not connected
    console.log('Connected as ID' + connection.threadId)
})


var routes = require('./server/routes/user');
app.use('/', routes);

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/', (req, res) => {
    res.render('invoice.html')
});


app.listen(port, () => console.log(`Listening on port ${port}`));

