const express = require('express');
const router = express.Router();
const config = require('../config');
//const admin = require('firebase-admin');
//const db = admin.firestore();


router.post('/', function(req, res) {
    console.log(req);
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    fetch(config.urlPlaces + "&key=" + config.apiKey + "&location=" + latitude + "," + longitude
    ).then(results => {
        return results.json();
    }).then(data=> {
        return data.results;
    }).then(results => {
        let pictures = results.map(place => (
            {
                id: place.id,
                name: place.name,
                photo_url: config.url_photos +
                    "&key=" + config.apiKey +
                    "&photoreference=" + place.photos[0].photo_reference
            }
        ));
        console.log(pictures);
        res.send(pictures);
    }).catch(error => {
        res.status(500).send(error);
    });
});

// TO IMPLEMENT
/*
router.post('/like', function(res, req){
    req = req.req;
    const uid = req.body.uid;
    const place_id = req.body.id;
    const place_name = req.body.name;
    const photo_url = req.body.photo_url;
    const docRef = db.collection(uid).doc(place_id);

    docRef.set({
        judgement: "like",
        place_name: place_name,
        photo_url: photo_url
    }).catch(error => {
       console.log(error);
    });
});

router.get('/like', function(res, req){
    const uid = req.req.query.uid;
    console.log(uid);
    const collection = db.collection(uid);
    const likes = collection.where('judgement', '==', 'like');
    console.log(likes);
    db.collection(uid).get().then((snapshot) => {
       console.log(snapshot.docs);
    });
})


router.dislike('/dislike', function(res, req){

});*/


module.exports = router;