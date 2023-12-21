require('dotenv').config()
const express = require('express');
const cors = require('cors');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// const stripe = require("stripe")(process.env.Payment_SECRET);

/* All require statements must in top portion to access desired components / functions */

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
// console.log('Secret: ', process.env.Payment_SECRET);

const app = express();


app.use(cors({
    origin: [ "http://localhost:5173", "https://tourist-guides-mnh.web.app" ],
    credentials: true
}));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        

    } catch (error) {
        console.log(error);
    }
}
run().catch(console.dir);





app.get('/', (_req, res) => {
    res.send('Dream Place App is running');
})

app.listen(port, () => {
    console.log(`Dream Place server is running on ${port}`);
})