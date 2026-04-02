const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://mishti-houses-frontend.onrender.com"
     ],
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes/main.routes'));

app.get("/", (req, res) => {
    res.send("Property created successfully");
});

module.exports = app;