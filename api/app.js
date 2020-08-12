const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const commentsRoutes = require('./routes/comments-routes');
const customPlacesRoutes = require('./routes/custom-places-router');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/uploads/avatars', express.static(path.join('uploads', 'avatars')));

// handle CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/places', placesRoutes);

app.use('/api/customPlaces', customPlacesRoutes);

app.use('/api/users', usersRoutes);

app.use('/api/comments', commentsRoutes);


app.use((req, res, next) => {
  throw new HttpError('No route found.', 404);
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    next(error);
  } else {
    res.status(error.code || 404);
    res.json({ message: error.message || 'Error occurred.' });
  }
});

mongoose
  .connect(`${process.env.DB_SERVER}`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
