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
  },
  meta: {
    type: mongoose.Schema({
      wt: {
        time: {
          type: Number,
          min: 0
        },
        percent: {
          type: Number,
          min: 0,
          max: 100
        }
      },
      tw: {
        time: {
          type: Number,
          min: 0
        },
        percent: {
          type: Number,
          min: 0,
          max: 100
        }
      },
      aw: {
        time: {
          type: Number,
          min: 0
        },
        percent: {
          type: Number,
          min: 0,
          max: 100
        }
      }
    }, {
      _id: false
    })
  }
});


const Collection = module.exports = mongoose.model('Collection', collectionSchema);

const collectionsSchema = mongoose.Schema({
  collections: {
    type: [collectionSchema]
  }
});
module.exports.getCollectionById = function (id, callback) {
  Collection.findById(id, callback);
};

module.exports.addCollection = function (name, callback) {
  name.save(callback);
};

module.exports.getGlobalCollections = function (callback) {
  Collection.find({}, function (err, collections) {
    if (err) console.log(err);
    else callback(collections);
  });
};

module.exports.addWordInCollection = function (id, word, callback) {
  Collection.findById(id, function (err, collection) {
    collection.words.push(word);
    if (err) console.log(err);
    else collection.save(callback);
  });
};
