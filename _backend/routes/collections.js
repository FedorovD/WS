const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Collection = require('../models/collection');
const Word = require('../models/word');


router.post('/add', (req, res, next) => {
    let newCollection = new Collection({
        name: req.body.name,
        description: req.body.description || '',
    });

    Collection.addCollection(newCollection, (err, collection) => {
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


router.post('/addWordInCollection', (req, res, next) => {
    let collection_id = req.body.id;
    let newWord = new Word({
        english: req.body.word.english,
        russian: req.body.word.russian,
        example: req.body.word.example || ''
    });

    Collection.addWordInCollection(collection_id, newWord, (err, collection) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to add word in collection'
            });
        } 
        else {
            res.json({
                success: true,
                msg: 'Word added in collection'
            });
        }
    });
});



module.exports = router;