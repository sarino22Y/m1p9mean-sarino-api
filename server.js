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

const app = express();
const port = process.env.PORT || 3000;
const connectionString = "mongodb://localhost:27017/ekaly22y";

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


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
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