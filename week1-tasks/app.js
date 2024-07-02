require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/api/quotes',  async (req, res) => {
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
        res.status(500).json({ error: 'Failed to fetch quote'});
    }
});

app.get('/api/search', (req, res) => {
    const authorName = req.query.author;

    fs.readFile('quotes.json', 'utf8', (err, data) => {
        if(err) {
            res.status(500).json({error:`Failed to load the quotes`});
            return;
        }
        const quotes = JSON.parse(data);
        const quote = quotes.find(q => q.author.toLowerCase() === authorName.toLowerCase());

        if(quote) {
            res.json(quote);
        } else {
            res.status(404).json({error : `Quote not found for the requested author`});
        }
    })
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});