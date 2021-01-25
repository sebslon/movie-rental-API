const mongoose = require('mongoose');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true}, { useUnifiedTopology: true })
  .then(() => console.log('Connected with Vidly DataBase'))
  .catch(err => console.error('Could not connect with mongoDB'));

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));