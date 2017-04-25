const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Word = require('../models/word');
const User = require('../models/user');
const Collection = require('../models/collection');


// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: `Failed to register user ${err}`
            });
        } else {
            res.json({
                success: true,
                msg: 'User registered'
            });
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;


    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                msg: 'User not found'
            });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({
                    success: false,
                    msg: 'Wrong password'
                });
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    res.json({
        user: req.user
    });
});

router.get('/getAllUsers', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    if (req.user.rights != 0) {
        return res.json({
            success: false,
            msg: 'You are now allowed'
        });
    } else {
        User.find({}, function (err, users) {
            if (err) console.log(err);
            else res.send(users);
        });
    }

});




router.get('/getAddedCollections', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    User.getAddedCollections(req.user, (err, collections)=>{
        if(err) return res.json({success: false,msg: `${err}`});
        return res.json({success: true, collections: collections});
    });

});


router.post('/subscribeToCollection', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let query = {
        "collection_id": req.body.id,
        "user": req.user
    };
    User.subscribeToCollection(query, (err, user) => {
        if(err) return res.json({success: false,msg: `${err}`});
        return res.json({success: true, msg: `${query.collection_id} added`});

});   
});


router.post('/createOwnCollection', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let query = {
        newCollection: new Collection({
        name: req.body.name,
        description: req.body.description || '',
        words: []
    }),
    user: req.user
    };
    User.createOwnCollection(query, (err, data)=>{
        if(err) return res.json({success: false,msg: `${err}`});
        else return res.json({success: true, msg: `${query.newCollection} created`});
    });
});


router.post('/addWordInOwnCollection', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let query = {
        newWord: new Word({
            english: req.body.english,
            russian: req.body.russian,
            example: req.body.example || ''
    }),
    user: req.user,
    collection: req.body.collection
    };
    User.putWordInOwnCollection(query, (err, data)=>{
        if(err) return res.json({success: false,msg: `${err}`});
        else return res.json({success: true, msg: `${query.newWord} added`});
    });
});

module.exports = router;