const firebase = require('firebase')
var express = require('express');
var router = express.Router();
const admin = require('firebase-admin');
const cred = require('./careful-emitter-233015-firebase-adminsdk-aiyj3-d236636cb8.json');

firebase.initializeApp({
    apiKey: " AIzaSyBw48pYn-PdTQ6s3raxUjZjefROaNjKIpU ",
    credential: admin.credential.cert(cred),
    databaseURL: "https://careful-emitter-233015.firebaseio.com"
});


router.post('/sign-up', function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body)
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function() {
            res.send(200);
        })
        .catch( function(error){
            res.send(error);
        });
});

router.post('/sign-in', function(req, res) {
    const email = req.email;
    const password = req.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function() {
            res.send(200);
        })
        .catch(function(error){
            res.send(error);
        })
});



module.exports = router;


