const express = require('express');
const port = 3000;
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profiles = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
});

db.select('*').from('users').then(data => {
    console.log(data);
});

app.use(express.json()); ///nos permite usar el parseador de json
app.use(cors());


app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', 
 (req, res) => { signin.handleSignin(req, res, db, bcrypt)}
);

app.post('/register',
 (req, res) => {register.handleRegister(req, res, db, bcrypt)}//dependencies used in another file
);
//

app.get('/profile/:id', 
(req, res) => {profiles.handleProfiles(req, res, db)}
);

app.put('/image', 
    (req,res) => {image.handleImage(req, res, db)}
);

app.post('/imageurl', 
(req, res) => {image.handleApiCall(req,res)}
);


app.listen(port, () => {
    console.log('app is running on port 3000.')
})


/* maqueta de nuestra API
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/