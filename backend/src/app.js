const express =require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/properties", (req, res) => {
    const properties = [
        { id: 1, name: "Property 1", price: 100000 },
        { id: 2, name: "Property 2", price: 150000 },
        { id: 3, name: "Property 3", price: 200000 },
    ];
    res.json(properties);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

