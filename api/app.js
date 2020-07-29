const express = require('express');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const commentsRoutes = require('./routes/comments-routes');

const app = express();

app.use('/api/places', placesRoutes);

app.use('/api/users', usersRoutes);

app.use('/api/comments', commentsRoutes);

app.listen(8000);
