import express from "express";
import {MongoClient} from 'mongodb';
const app = express();
import cors from 'cors';
const url = "mongodb+srv://dhanushsriram810:Dhan810@cluster0.xvploiz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);
await client.connect();
console.log("Database connected  successfully");
app.use(cors());

app.get("/",function(req,res){
    res.send("Hello World");
});

app.get("/dashboard",async function(req,res){
    const getMethod=await client.db("Table").collection("dashboard").find({}).toArray();
    res.status(200).send(getMethod);
});

//  app.get("/weathercomp",async function(req,res){
//      const getMethod=await client.db("Table").collection("WeatherComp").find({}).toArray();
//      res.status(200).send(getMethod);
//  });

 app.get('/weathercomp', (req, res) => {
     const weatherData = {
       temperature: 45,
       precipitation: 42,
       humidity: 57
     };
  
     res.json(weatherData);
  });

//  app.get("/weatherdata",async function(req,res){
//      const getMethod=await client.db("Table").collection("WeatherData").find({}).toArray();
//      res.status(200).send(getMethod);
//  });

//  app.get('/weatherdata/:name', async (req, res) => {
//     try {
//       const city = req.params.name;

//       // Query the database for weather details of the specified city
//       const db = client.db('Table');
//       const collection = db.collection('WeatherData');
//       const weatherData = await collection.findOne({ city });

//       if (!weatherData) {
//         return res.status(404).json({ message: 'Weather data not found for the specified city' });
//       }

//       // Send the fetched weather details as a response
//       res.status(200).json(weatherData);
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });

const apiKey = '150145a9ec15a24744e27e869b84f8f9';

app.get('/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data from the OpenWeatherMap API');
    }
    
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/forecast/:city', async (req, res) => {
    try {
      const city = req.params.city;
  
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data from the OpenWeatherMap API');
      }
      
      const data = await response.json();
  
      res.status(200).send(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
app.listen(4000,() => 
console.log("server connected"));