const firebase = require('firebase');
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const cred = require('../firebase-credentials.json');
const config = require('../config');

firebase.initializeApp({
    apiKey: config.apiKey,
    credential: admin.credential.cert(cred),
    databaseURL: config.databaseURL
});


router.post('/sign-up', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(response) {
            res.send(response);
        })
        .catch( function(error){
            res.status(500).send(error);
        });
});

router.post('/sign-in', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(response) {
            res.send(response);
        })
        .catch(function(error){
            res.status(500).send(error);
        })
});


module.exports = router;


