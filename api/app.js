const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

// Local MongoDB URI: mongodb://localhost/explore_world_heritage_sites
// MongoDB Atlas URI: mongodb+srv://myatlasuser:P1LpC0IAnIL128vt@cluster0.cte3n.mongodb.net/explore_world_heritage_sites?retryWrites=true&w=majority
mongoose
  .connect(`${process.env.DB_SERVER}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
