require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productsRouter = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Rute untuk API produk
app.use('/api/products', productsRouter);

app.listen(PORT, () => {
    console.log(`Server backend berjalan pada port ${PORT}`);
});
