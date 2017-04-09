const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/database');

const Word = require('./models/word');
const Collection = require('./models/collection');

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log(`Connected to DB ${config.database}`);
});


mongoose.connection.on('error', (err) => {
    console.log(`DB error: ${err}`);
});

const app = express();


const users = require('./routes/users');
const collections = require('./routes/collections');


const port = 4201;

app.use(cors());

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
 
app.use('/users', users);
app.use('/collections', collections);

 

app.get('/', (req, res) => {
    res.send('api');
});


app.post('/add', (req, res, next) => {
    let newWord = new Word({
        english: req.body.english,
        russian: req.body.russian,
        example: req.body.example,
    });

    Word.addWord(newWord, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to add word'
            });
        } 
        else {
            res.json({
                success: true,
                msg: 'Word added'
            });
        }
    });
});

app.get('/getAll', (req, res) => {
    Word.getAllWords((words, err) => {
        if(err) console.log(err);
        else res.send(words);
    });
});


//Работает, но надо пересмотреть
app.delete('/delete/*', (req, res, next) => {
    let splitUrl = req.url.split('/');
    let id = splitUrl[splitUrl.length-1];


    Word.deleteWord(id, (err, callback) => {
         if (err) {
            res.json({
                success: false,
                msg: `Failed to add word, err: {{err}}`
            });
        } 
        else {
            res.json({
                success: true,
                msg: 'Word added'
            });
        }
    });
});





app.listen(port, () => {
    console.log(`Server stated on port ${port}`);
});