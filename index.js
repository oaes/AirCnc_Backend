const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();

const uri = process.env.DB_PATH;


const MongoClient = require('mongodb').MongoClient;

let   client = new MongoClient(uri, { useNewUrlParser: true });

 app.post("/addHome", (req, res) => {
  const homeRules = req.body;
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((error) => {
    const collection = client.db("hotelsearchapp").collection("homes");
    collection.insert(homeRules, (err, result) => {
      if (err) {
        console.log(err);
        console.log(error)
        res.status(500).send({ message: err });
      } else {
        res.send(result.ops[0]);
      }
    });
    
  });
});


 app.post("/addHome", (req, res) => {
  const homeDetails = req.body;
  const key = req.params.key;
  const homeKeys = req.body;
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((error) => {
    const collection = client.db("hotelsearchapp").collection("homeDetails");
    collection.insert(homeDetails, (err, result) => {
      if (err) {
        console.log(err);
        console.log(error)
        res.status(500).send({ message: err });
      } else {
        res.send(result.ops[0]);
      }
    });
    
  });
});

app.post('/homeDetails', (req, res) =>{
  const key = req.params.key;
  const homeKeys = req.body;
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
      const collection = client.db("hotelsearchapp").collection("homeDetails");
      collection.find({key: { $in: homeKeys }}).toArray((err, documents)=>{
          if(err){
              console.log(err)
              res.status(500).send({message:err});
          }
          else{
              res.send(documents);
          }
      });
     
    });
});
app.get('/homeDetails/:key', (req, res) =>{
  const key = req.params.key;    
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
      const collection = client.db("hotelsearchapp").collection("homeDetails");
      collection.find({key}).toArray((err, documents)=>{
          if(err){
              console.log(err)
              res.status(500).send({message:err});
          }
          else{
              res.send(documents[0]);
          }
      });
      
    });
});

 
  app.get("/experiences", (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect((error) => {
      const collection = client.db("hotelsearchapp").collection("experiences");
      collection.find().toArray((err, documents) => {
        if (err) {
          console.log(err);
          console.log(error)
          res.status(500).send({ message: err });
        } else {
          res.send(documents);
        }
      });
    });
  });


  app.get("/", (req, res) => {
    res.send("<h1>air-cnc Backend Server</h1>");
  });

const port = process.env.PORT || 5000;
app.listen(port, () => { console.log("Listening at port 5000");
});