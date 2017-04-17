const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Collection = require('../models/collection');
const Word = require('../models/word');
// User schema
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    added_collections: {
        type: [String]
    },
    own_collections: {
        type: [Collection.Schema]
    }
});

const usersSchema = mongoose.Schema({
    users: {
        type: [userSchema]
    }
});




const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
    const query = {
        username: username
    };
    User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
  });
};

module.exports.getAllUsers = function (username, callback) {

    User.find({}, function(err, users) {
    let allUsers = {};

    users.forEach(function(user) {
      allUsers[user._id] = user;
    });

    res.send(allUsers);  
  });

};

module.exports.subscribeToCollection = function (data, callback) {
    let collection_id = data.collection_id;
    Collection.getCollectionById(collection_id, (err, collection)=> {
        if(err){
            return callback(`${collection_id} don't exist`, "");
        } else {
            
          let user = data.user;
         User.findOne(user, (err, user)=>{
        if(err) return console.log(err);

        if(user.added_collections.indexOf(collection_id) == -1) {
            user.added_collections.push(collection_id);
            user.save(callback);
        }else callback(`${collection_id} added already`, "");
    });

        }
    });
};


module.exports.createOwnCollection = function (data, callback) {
    let newCollection = data.newCollection;
    let user = data.user;
    let allCollectionsName=[];
    user.own_collections.forEach(item => allCollectionsName.push(item.name));
     User.findOne(user, (err, res)=>{
        if(err) return console.log(err);
        if(allCollectionsName.indexOf(newCollection.name) > -1) return callback(`${newCollection.name} exists already`, "");
        else {
            user.own_collections.push(newCollection);
            user.save(callback);
        }
    });
};

module.exports.putWordInOwnCollection = function (data, callback) {
    let newWord = new Word(data.newWord);
    let _user = data.user;
    let collection_id = data.collection._id;

    // console.log(newWord);
    // console.log(collection);
    User.findById(_user._id, (err,user)=>{
        if(err) return console.log(err);
        // console.log(newWord);
        for (let i = 0; i < user.own_collections.length; i++){
             if(user.own_collections[i]._id == collection_id){
                  console.log(user);
                  console.log(_user);
                  console.log(user === _user);
                user.own_collections[i].words.push(newWord);
               
                // console.log('user', _user.own_collections[i].words);
                user.save(callback);
             }
             
        }
    });
};

