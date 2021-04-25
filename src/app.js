const express = require('express');
var cors = require('cors');
const app = express();

const itemRoutes = require('./routes/item');

var corsOptions = { origin: 'http://localhost:4200' };

app.use('/api/items', cors(corsOptions), itemRoutes);

const port = 3000;
app.listen(port, () => console.log(`Server running at port ${port}`));
