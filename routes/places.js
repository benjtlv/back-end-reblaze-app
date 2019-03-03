const express = require('express');
const router = express.Router();
const config = require('../config');

router.post('/', function(req, res) {
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
                photo_ref: config.url_photos +
                    "&key=" + config.apiKey +
                    "&photoreference=" + place.photos[0].photo_reference
            }
        ));
        res.send(pictures);
    }).catch(error => {
        res.status(500).send(error);
    });
});


module.exports = router;