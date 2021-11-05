const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

require('base-64');
const fileUpload = require('express-fileupload');
const fs = require("fs-extra");
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

const uri = "mongodb+srv://fiction:fiction123@cluster0.7e7ad.mongodb.net/sbdc-sfdc?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const sbdcCollection = client.db("sbdc-sfdc").collection("sbdc-application");
    const sfdcCollection = client.db("sbdc-sfdc").collection("sfdc-application");
    app.post("/sfdc-application", (req, res) => {
        const submitData = req.body;
        sfdcCollection.insertOne(submitData)
            .then(result => {
                res.send(result);
            })
    })
    app.post("/sbdc-application", (req, res) => {
        const submitData = req.body;
        sbdcCollection.insertOne(submitData)
            .then(result => {
                res.send(result);
            })
    })
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})