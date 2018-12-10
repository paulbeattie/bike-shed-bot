const express = require('express');
const app = express();
const port = 3000;
const gs = require('./src/index');

app.get('/', (req, res ) => gs.getShedCode(req, res));

app.listen(port, () => console.log(`App listening on ${port}!`));
