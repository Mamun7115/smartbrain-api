//NPMs
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();

// API REQUEST HANDLERS
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


//DATABSE CONNECTION
const knex = require('knex');
const { handleImage } = require('./controllers/image');

const db = knex({
    client:'pg',
    connection:{
        host:'127.0.0.1',
        user:'postgres',
        password:'test',
        database:'smartbrain'
    }
})



// MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());




// SIGNIN API
app.post('/signin', (req,res) => {
    signin.handleSignIn(req,res,db,bcrypt)
});


// REGISTER API 
app.post('/register', (req,res) =>{
    register.handleRegister(req,res,db,bcrypt)
});

// PROFILE ID API 
app.get('/profile/:id', (req,res) =>{
    profile.handleProfile(req,res,db)
});


// IMAGE API
app.put('/image', (req,res) => {
    image.handleImage(req,res,db)
});






// SERVER RUNNING ON PORT /-/-/-/-
app.listen(5000, ()=>{
    console.log('App is running on port 5000');
});






