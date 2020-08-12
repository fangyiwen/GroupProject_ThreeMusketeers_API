const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyB2GEsGixSm9xrawPeXgzMmfoGjCkRS2WA';

async function getCoordsForAddress(address) {

    console.log('starting get coordinates');
    console.log(encodeURIComponent(address));
    let response;
    try {
        response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
        )}&key=${API_KEY}`);
        console.log(response);
    } catch (error) {
        console.log(error);
        console.error(error);
    }

    /*const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                address
            )}&key=${API_KEY}`
    );
    console.log('get response');
    console.log(response);
                        */
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
