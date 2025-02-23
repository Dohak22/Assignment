const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());


app.post("/analyze-sentiment", (req, res) => {
    console.log("Calling ML API...");

    const text = req.body.text;

    
    if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Invalid input, expected {'text': 'some sentence'}" });
    }

    
    axios.post("http://127.0.0.1:5000/predict", { text : text})
        .then((mlres) => {
            console.log("ML API Response:", mlres.data);
            res.json(mlres.data);
        })
        .catch((error) => {
            console.error("Error calling Flask API:", error.message);
            res.status(500).json({ error: "ML API request failed" });
        });
});

// Start Express server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Express server running on http://127.0.0.1:${PORT}`);
});
