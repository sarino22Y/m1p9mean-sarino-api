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

const passport = require("passport");

const app = express();
const port = process.env.PORT || 3000;
// const connectionString = "mongodb://localhost:27017/ekaly22y";
// const connectionString = "mongodb+srv://sarino:Sarino22Y@cluster0.xzdv9.mongodb.net/ekaly22y?retryWrites=true&w=majority";
const connectionString = "mongodb+srv://sarino:Sarino22Y@cluster0.pm0o0gg.mongodb.net/ekaly22y?retryWrites=true&w=majority";

// app.use((req, res, next) =>{
//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

require("./middlewares/passport")(passport);

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


// User Router Middleware
app.use("/api/users", require("./routes/userRoutes"));

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