require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const port = 3000;

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/api/qoutes',  async (req, res) => {
    const url = 'https://api.api-ninjas.com/v1/quotes';
    const apiKey = process.env.ApiNinjas_key;

    try {
        const response = await axios.get(url, {
            headers: {
                'X-Api-Key': apiKey
            }
        })
        res.json(response.data);
    }
    catch(error) {
        res.status(500).json({ error: 'Failed to fetch qoute'});
    }
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});