const mongoose = require('mongoose');
const config = require('../config/database');
const Word = require('./word');

// User schema
const collectionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    words: {
        type: [Word.Schema]
    }
});


const Collection = module.exports = mongoose.model('Collection', collectionSchema);

const collectionsSchema = mongoose.Schema({
    collections: {
        type: [collectionSchema]
    }
});


module.exports.addCollection = function (name, callback) {
    name.save(callback);
};

module.exports.getAllCollections = function (callback) {
    Collection.find({}, function(err, collections) {
        if(err) console.log(err);
        else callback(collections);
  });
};

module.exports.addWordInCollection = function (word, id, callback) {
    Collection.findById(id, function(err, collection) {
        if(err) console.log(err);
        else callback(collection);
  });
};