const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');


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




module.exports = router;