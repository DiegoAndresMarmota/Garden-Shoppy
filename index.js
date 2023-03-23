const express = require('express');
const dotenv = require('dotenv');

//Configuration .env
dotenv.config();

//Create Express Application
const app = express();
const port = process.env.PORT || 8000;

//Define First Route
app.get('/', (req, res) => {
    res.send('Welcome Node')
});

//Execute App
app.listen(port, () => {
    console.log(`GardenShoppy Server: Running at http://localhost:${port}`
    );
})