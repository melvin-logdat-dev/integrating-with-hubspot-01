const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PRIVATE_APP_TOKEN = process.env.PRIVATE_APP_TOKEN;

const CUSTOM_OBJECT_ID = process.env.CUSTOM_OBJECT_ID;

app.get('/', async (req, res) => {
    const gamesEndpoint = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_ID}?properties=name,publisher,price`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_TOKEN}`,
        'Content-Type': 'application/json'
    };
   
    try {
        const response = await axios.get(gamesEndpoint, { headers });
        const data = response.data.results;
        
        res.render('homepage', { data });
    } catch(error) {
        console.error(error);
        res.status(500).send('Error retrieving data');
    }
});

app.get('/update-cobj', (req, res) => {
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

app.post('/update-cobj', async (req, res) => {
    const newRecord = {
        properties: {
            "name": req.body.name,
            "publisher": req.body.publisher,
            "price": req.body.price
        }
    };

    const createEndpoint = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_ID}`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_TOKEN}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.post(createEndpoint, newRecord, { headers });
        
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating custom object record');
    }
});   

app.listen(3000, () => console.log('Listening on http://localhost:3000'));