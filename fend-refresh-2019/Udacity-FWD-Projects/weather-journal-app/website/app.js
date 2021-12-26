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

//Get request using async function and fetch
const getWeatherData = async (URL, zip, key) => {

    const res = await fetch(URL + zip + key)
    try {

        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

//getAction function that calls getWeatherData functions with user parameters
function performGetAction(e) {
    let newZip = document.getElementById('zip').value;
    getWeatherData(baseURL, newZip, apiKey);
}


//Event listener for generate button
document.getElementById('generate').addEventListener('click', performGetAction);