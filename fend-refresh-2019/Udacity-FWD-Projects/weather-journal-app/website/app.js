/* Global Variables */
//get the apiKey from  Token.zip
const apiKey = "";
const baseURL = "http://api.openweathermap.org/data/2.5/forecast?id=";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//Calling for API
/*http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}*/

//london id = 2643743

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
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData

    } catch (error) {
        console.log("error", error);
    }
}

//getWeatherDatafromServer is a GET function that receives data from the server
const getWeatherDatafromServer = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'GET',
    });

    try {
        const newData = await response.json();
        return newData

    } catch (error) {
        console.log("error", error);
    }
}

//performAction function that calls getWeatherData functions with user parameters to retrieve data from the API and then calls postWeatherDataToServer to post this received data to the server
function performAction(e) {
    let newZip = document.getElementById('zip').value;
    getWeatherData(baseURL, newZip, apiKey)

        //This part call the postWeatherDataToServer function to post retireved data from the api to the server and this data includes date and temperature and user entered feeling
        .then(function (data) {
            //Retrieve user entered feeling
            let userEnteredResponse = document.getElementById('feelings').value;
            //The following variables retrieves date and temperature from the response received from weather API and they use DOT notation to access those values from the body of the response object from the API 
            let retrievedDate = data.list[0].dt_txt;
            let retrievedTemperature = data.list[0].main.temp;
            let retrievedWeather = data.list[0].weather[0].description;
            let icon = data.list[0].weather[0].icon;
            let retrievedLocation = data.city.name;
            console.log(retrievedLocation);
            //This part calls the postWeatherDataToServer function to POST data to the server
            postWeatherDataToServer('/addToProjectData', {
                location: retrievedLocation,
                temperature: retrievedTemperature,
                date: retrievedDate,
                userResponse: userEnteredResponse,
                weather: retrievedWeather
            })
            //This part save the retrieved icon that correspond to weather state from the API and saves its URL in img element source to display it in the UI
            document.getElementById('weatherImage').src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        })

        //This part calls the getWeatherDatafromServer function to GEt the stored data from the server and selects the latest data object from the retrieved data from the server and updates HTML file elements to display the retireved data 
        .then(function (data) {
            getWeatherDatafromServer('getProjectData')
                .then(function (data) {

                    // document.getElementById('toDisplayTest').innerHTML = "<img src=" + data + ">";

                    let latestData = data[(data.length - 1)];
                    let lastLocation = latestData.location
                    let lastDate = latestData.date;
                    let lastTemperature = latestData.temperature;
                    let lastResponse = latestData.userResponse;
                    let lastWeather = latestData.weather;
                    document.getElementById('location').innerHTML = "Location : " + lastLocation;
                    document.getElementById('date').innerHTML = "Date : " + lastDate.slice(0, 10);
                    //.slice(0, 10)
                    document.getElementById('temp').innerHTML = "Temperature : " + Math.round(lastTemperature) + ' degrees';
                    //Math.round(allData.temp)+ 'degrees'
                    document.getElementById('content').innerHTML = "Feeling : " + lastResponse;
                    document.getElementById('weather').innerHTML = "Weather : " + lastWeather;

                })

        })


};


//Event listener for generate button
document.getElementById('generate').addEventListener('click', performAction);