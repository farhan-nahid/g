const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

console.log();

const port = process.env.PORT ||  5000;

app.use(cors())
app.use(bodyParser.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2xoju.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const eventCollection = client.db("volunteer").collection("events");



    app.post('/addEvent', (req, res)=>{
      const newEvent = req.body;
      console.log('adding event', newEvent);
      eventCollection.insertOne(newEvent)
      .then (result =>{
        res.send(result.insertedCount > 0)
        console.log("insertedCount", result.insertedCount);
      })
    })

    app.get('/events', (req, res)=>{
      eventCollection.find()
      .toArray((err, items)=>{
        res.send(items)
       // console.log('from database', events);
      })
    })
});



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})