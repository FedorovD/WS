const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

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
    }
    // ,
    // own_collections: {
    //     type: String
    // }
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
