const mongoose = require('mongoose');

const { Schema } = mongoose;

const placeSchema = new Schema({
  pid: { type: String, required: true },
  world_heritage_list: {
    category: { type: String, required: true },
    criteria_txt: { type: String, required: true },
    danger: { type: String },
    date_inscribed: { type: String, required: true },
    extension: { type: String, required: true },
    http_url: { type: String, required: true },
    id_number: { type: String, required: true },
    image_url: { type: String, required: true },
    iso_code: { type: String, required: true },
    justification: { type: String },
    latitude: { type: String, required: true },
    location: { type: String },
    longitude: { type: String, required: true },
    region: { type: String, required: true },
    revision: { type: String, required: true },
    secondary_dates: { type: String },
    short_description: { type: String, required: true },
    site: { type: String, required: true },
    states: { type: String, required: true },
    transboundary: { type: String, required: true },
    unique_number: { type: String, required: true },
  },
});

module.exports = mongoose.model('Place', placeSchema);
