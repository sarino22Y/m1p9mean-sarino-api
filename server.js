const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const platRoute = require('./routes/platRoutes');
const restaurantRoute = require('./routes/restaurantRoutes');
const commandeRoute = require('./routes/commandeRoutes');
const livraisonRoute = require('./routes/livraisonRoutes');
const userRoute = require('./routes/userRoutes');
const privilegeRoute = require('./routes/privilegeRoutes');
const assUserPrivilegeRoute = require('./routes/assUserPrivilegeRoutes');

// passport
const passport = require('passport');
const session = require('express-session');
require("./passport-config");

const app = express();
const port = process.env.PORT || 3000;
const connectionString = "mongodb://localhost:27017/ekaly22y";
// const connectionString = "mongodb+srv://sarino:sarino@cluster0.xzdv9.mongodb.net/ekaly22y?retryWrites=true&w=majority";


// Connecter à mongodb.
mongoose.connect(connectionString);

// Connection reussi.
mongoose.connection.on('connected', () =>{
    console.log('Mongodb connected at port 27017.');
});

// Connection erreur.
mongoose.connection.on('error', (err) =>{
    console.log(err);
});

// passport.
app.use(session({
    name: 'myname.sid',
    resave: false,
    saveUninitialized: true,
    secret: 'secret',
    cookie: {
        maxAge: 36000000,
        httpOnly: false,
        secure: false
    }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: ['http://localhost:4200'],
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', platRoute);
app.use('/api', restaurantRoute);
app.use('/api', commandeRoute);
app.use('/api', livraisonRoute);
app.use('/api', userRoute);
app.use('/api', privilegeRoute);
app.use('/api', assUserPrivilegeRoute);

app.get('/', (req, res) =>{
    res.send("Vous êtes connecté(e) sur Node depuis le port " + port +'.');
});

app.listen(port, function() {
    console.log('Server has been starded at port ' + port + '.');
});