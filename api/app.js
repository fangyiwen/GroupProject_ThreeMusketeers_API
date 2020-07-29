const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const commentsRoutes = require('./routes/comments-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);

app.use('/api/users', usersRoutes);

app.use('/api/comments', commentsRoutes);

app.use((req, res, next) => {
  throw new HttpError('No route found.', 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    next(error);
  } else {
    res.status(error.code || 404);
    res.json({ message: error.message || 'Error occurred.' });
  }
});

app.listen(8000);
