const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

// Relay endpoint for submitting a text-to-3D request
app.post('/relay/text-to-3d', async (req, res) => {
    try {
        const response = await axios.post('https://api.meshy.ai/v1/text-to-3d', req.body, {
            headers: {
                'Authorization': req.header('Authorization'),
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Relay endpoint for retrieving the 3D model using the ID
app.get('/relay/text-to-3d/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://api.meshy.ai/v1/text-to-3d/${req.params.id}`, {
            headers: {
                'Authorization': req.header('Authorization')
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Relay server running on port ${port}`);
});
