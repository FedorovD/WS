const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Collection = require('../models/collection');



router.post('/add', (req, res, next) => {
    console.log(req);
    let newCollection = new Collection({
        name: req.body.name,
        description: req.body.description | '',
    });

    Collection.addCollection(newCollection, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to add collection'
            });
        } 
        else {
            res.json({
                success: true,
                msg: 'Collection added'
            });
        }
    });
});


router.get('/getAll', (req, res) => {
    Collection.getAllCollections((collections, err) => {
        if(err) console.log(err);
        else res.send(collections);
    });
});


module.exports = router;