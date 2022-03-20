require('rootpath')();
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const UserDB = require('./helpers/db');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');



//run express app
const app = express();

//load env vars
dotenv.config({ path: './config/config.env' });

//connect to database
UserDB();

//view engine
app.set('views', path.join(__dirname, 'views'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.get('/DatabaseApi', (req, res) => {
    res.json({
        message: 'welcome to the API'
    });
});

//process user entries
app.use('/register',(req, res) => {
    new user({
        fullname: req.body.fullname,
        email: req.body.email,
        dob: req.body.dob,
        ethnicity: req.body.ethnicity,
        gender: req.body.gender,
        relationship: req.body.relationship,
        employment: req.body.employment,
        children: req.body,children
    }).save((err, doc) => {
        if(err) {
            res.json(err)
        } else {
            res.send('successfully inserted')
        }
    });
});

//Enable cors
app.use(cors());


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} mode on
    ${PORT}`)
});
