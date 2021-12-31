/* Global Variables */
const apiKey = "&appid=8e0cdec5c29046e2430cfa30678d7707";
const baseURL = "http://api.openweathermap.org/data/2.5/forecast?id=";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//Calling for API
/*http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}*/

//london id = 2643743

//524901 is the zip code

/*api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=8e0cdec5c29046e2430cfa30678d7707*/

//getWeatherData is a GET request that uses async function and fetch to retrieve data from weather API
const getWeatherData = async (URL, zip, key) => {

    const res = await fetch(URL + zip + key)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

//postWeatherDataToServer is a POST function that posts data to the server
const postWeatherDataToServer = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        // console.log(newData);
        return newData

    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

//getWeatherDatafromServer is a GET function that receives data from the server
const getWeatherDatafromServer = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.       
    });

    try {
        const newData = await response.json();
        // console.log('this is received data')
        // console.log(newData);
        return newData

    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

//performAction function that calls getWeatherData functions with user parameters to retrieve data from the API and then calls postWeatherDataToServer to post this received data to the server
function performAction(e) {
    let newZip = document.getElementById('zip').value;
    const testZip = '4350049'
    //Chage testZip to newZip to add user entered zip
    getWeatherData(baseURL, newZip, apiKey)

        //This part call the postWeatherDataToServer function to post retireved data from the api to the server and this data includes date and temperature and user entered feeling
        .then(function (data) {
            //Retrieve user entered feeling
            let userEnteredResponse = document.getElementById('feelings').value;
            //The following 2 variables retrieves date and temperature from the response received from weather API and they use DOT notation to access those values from the body of the response object from the API 
            let retrievedDate = data.list[0].dt_txt;
            let retrievedTemperature = data.list[0].main.temp;
            //This part calls the postWeatherDataToServer function to POST data to the server
            postWeatherDataToServer('/addToProjectData', {
                temperature: retrievedTemperature,
                date: retrievedDate,
                userResponse: userEnteredResponse
            })
        })


        .then(function (data) {
            getWeatherDatafromServer('getProjectData')
                .then(function (data) {

                    // document.getElementById('toDisplayTest').innerHTML = "<img src=" + data + ">";

                    let latestData = data[(data.length - 1)];
                    let lastDate = latestData.date;
                    let lastTemperature = latestData.temperature;
                    let lastResponse = latestData.userResponse;
                    document.getElementById('date').innerHTML = "Date : " + lastDate;
                    document.getElementById('temp').innerHTML = "Temperature : " + lastTemperature;
                    document.getElementById('content').innerHTML = "Feeling : " + lastResponse;

                })

        })


};


//Event listener for generate button
document.getElementById('generate').addEventListener('click', performAction);