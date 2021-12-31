// Setup empty JS object to act as endpoint for all routes
projectData = [];
const port = 3000;

// Require Express to run server and routes
const http = require('http');
const express = require('express');
/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const server = app.listen(port, listening);
function listening() {
    console.log(`Server running on localhost: ${port}`);
};

//GET method
app.get("/getProjectData", (req, res) => {
    res.send(projectData);
});

//POST method
app.post("/addToProjectData", (req, res) => {
    //To be modified
    console.log(req.body);
    console.log('Post received');
    // projectData.push(req.body);
    //Data Parts
    let newEntry = {
        location: req.body.location,
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse,
        weather: req.body.weather
    };
    projectData.push(newEntry);
    console.log(projectData);
});