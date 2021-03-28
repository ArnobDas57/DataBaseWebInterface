const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();

mongoose.connect(
    process.env.MONGODB_URI,
    {useNewUrlParser: true,
    useUnifiedTopology: true},
    () => console.log('connected to db') 
);

const users = require('./routes/users');
const secure = require('./routes/secure');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(cors());

app.use('/', express.static(__dirname + '/src/dist/src')); 

app.use('/users', users);
app.use('/secure', secure);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});