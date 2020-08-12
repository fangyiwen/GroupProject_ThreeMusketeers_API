const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyB2GEsGixSm9xrawPeXgzMmfoGjCkRS2WA';

async function getCoordsForAddress(address) {
    return {
        lat: 40.7484474,
        lng: -73.9871516
    };
    console.log('starting get coordinates');
    console.log(encodeURIComponent(address));
    const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                address
            )}&key=${API_KEY}`
    );

    console.log('get response');

    const data = response.data;


    if (!data || data.status === 'ZERO_RESULTS') {
        const error = new HttpError(
            'Could not find location for the specified address.',
            422
        );
        console.log(error);
        console.log("Outputting default coordinates")
        return {
            lat: 40.7484474,
            lng: -73.9871516
        };

    }

    return data.results[0].geometry.location;
}

module.exports = getCoordsForAddress;
