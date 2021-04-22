const express = require('express');
const app = express();

const itemRoutes = require('./routes/item');

app.use('/api/items', itemRoutes);

const port = 3000;
app.listen(port, () => console.log(`Server running at port ${port}`));
