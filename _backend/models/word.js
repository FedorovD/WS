const mongoose = require('mongoose');
const config = require('../config/database');
// const mongooseAlgolia = require('mongoose-algolia');


// User schema
const wordSchema = mongoose.Schema({
    english: {
        type: String,
        required: true
    },
    russian: {
        type: String,
        required: true
    },
    example: {
        type: String
    }
});

const wordsSchema = mongoose.Schema({
    words: {
        type: [wordSchema]
    }
});


// wordSchema.plugin(mongooseAlgolia,{
//   appId: '4UYAGS071T',
//   apiKey: 'e813de32bfb954cd4bdfa7cac76c0740',
//   indexName: 'words', //The name of the index in Algolia, you can also pass in a function 
//   selector: 'english russian example', //You can decide which field that are getting synced to Algolia (same as selector in mongoose) 
// //   populate: {
// //     path: 'words',
// //     select: 'english'
// //   },
// //   defaults: {
// //     author: 'unknown'
// //   },
// //   mappings: {
// //     word: function(value) {
// //       return `${value}`
// //     }
// //   },
//   debug: true // Default: false -> If true operations are logged out in your console 
// });


 


const Word = module.exports = mongoose.model('Word', wordSchema);



// Word.SyncToAlgolia(); //Clears the Algolia index for this schema and synchronizes all documents to Algolia (based on the settings defined in your plugin settings) 
// Word.SetAlgoliaSettings({
//   searchableAttributes: ['english','russian'] //Sets the settings for this schema, see [Algolia's Index settings parameters](https://www.algolia.com/doc/api-client/javascript/settings#set-settings) for more info. 
// });

// module.exports.getUserById = function (id, callback) {
//     User.findById(id, callback);
// };

// module.exports.getUserByUsername = function (username, callback) {
//     const query = {
//         username: username
//     };
//     User.findOne(query, callback);
// };

module.exports.addWord = function (newWord, callback) {
    newWord.save(callback);
};

module.exports.getAllWords = function (callback) {
    Word.find({}, function(err, words) {
        if(err) console.log(err);
        else callback(words);
  });
};

//Надо пересмотреть
module.exports.deleteWord = function (id, callback) {
    Word.find({'_id': id }, (err, id)=>{
        if(err) console.log(err);
    }).remove( callback );

};

    
//     Word.find({}, function(err, words) {
//         if(err) console.log(err);
//         else callback(words);
//   });

// module.exports.getAllUsers = function (username, callback) {

//     User.find({}, function(err, users) {
//     let allUsers = {};

//     users.forEach(function(user) {
//       allUsers[user._id] = user;
//     });

//     res.send(allUsers);  
//   });


