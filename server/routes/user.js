const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const supplierController = require('../controllers/supplierController');     
const productsController = require('../controllers/productsController');     
const clientDuesController = require('../controllers/clientDuesController');
const supplierDuesController = require('../controllers/supplierDuesController');
const deleteController = require('../controllers/deleteController');

//create, find, delete, update
router.get('/clients', userController.view);
router.get('/supplier', supplierController.view);
router.get('/products', productsController.view);
router.get('/clientDues', clientDuesController.view);
router.get('/supplierDues', supplierDuesController.view);


router.post('/clients', userController.find);
router.post('/supplier', supplierController.find);
router.post('/products', productsController.find);

router.get('/addclient', userController.form);
router.get('/addsupplier', supplierController.form);
router.get('/addproduct', productsController.form);

router.post('/addclient', userController.create);
router.post('/addsupplier', supplierController.create);
router.post('/addsproduct', productsController.create);

router.get('/editclient/:client_id', userController.edit);
router.get('/editsupplier/:supplier_id', supplierController.edit);
router.get('/editproduct/:products_id', productsController.edit);

router.post('/editclient/:client_id', userController.update);
router.post('/editsupplier/:supplier_id', supplierController.update);
router.post('/editproduct/:products_id', productsController.update);


router.get('/viewclient/:client_id', userController.viewall);
router.get('/viewsupplier/:supplier_id', supplierController.viewall);
router.get('/viewproduct/:products_id', productsController.viewall);

router.get('/clients/:client_id', deleteController.client);
router.get('/supplier/:supplier_id',deleteController.supplier);
router.get('/products/:products_id',deleteController.product);




module.exports = router;