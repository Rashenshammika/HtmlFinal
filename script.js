const userLocation = document.getElementById("userLocation"),
weatherIcon = document.querySelector(".weatherIcon"),
temperature = document.querySelector(".temperature"),
description = document.querySelector(".description"),
city = document.querySelector(".city"),
HValue = document.getElementById("HValue"),
WValue = document.getElementById("WValue"),
COUNTRYValue = document.getElementById("COUNTRYValue"),
CValue = document.getElementById("CValue"),
UVValue = document.getElementById("UVValue"),
PValue = document.getElementById("PValue"),
DValue = document.getElementById("DValue");

// Forecast = document.getElementById(".Forecast ");






WEATHER_API=`https://api.weatherapi.com/v1/current.json?key=0c4184ffbcad4aa7b3653754240909&q=`;
function findUserLocation(){
    fetch(WEATHER_API+userLocation.value).then((res)=>res.json()).then((data)=>{
        console.log(data);
   
        weatherIcon.innerHTML =`<img src="${data.current.condition.icon}" alt="${data.current.condition.text}">`;
        temperature.innerText = (data.current.temp_c)+"  °C  ";
        DValue.innerText = data.current.last_updated;
        description.innerHTML = data.current.condition.text;
        city.innerHTML = data.location.name;
        HValue.innerHTML = (data.current.humidity)+" %";
        WValue.innerHTML = (data.current.wind_kph)+" m/s";
        COUNTRYValue.innerHTML = data.location.country;
        CValue.innerHTML = (data.current.cloud+" %");
        UVValue.innerHTML = data.current.uv;
        PValue.innerHTML = (data.current.pressure_in)+" hpa";
        

    } )
}

// WEATHER_API=`https://api.weatherapi.com/v1/history.json?key=0c4184ffbcad4aa7b3653754240909&q=`;
// function findUserHistory(){
//     fetch(WEATHER_API+ userHistory.value).then((res)=>res.json()).then((data)=>{
//         console.log(data);
   

//         MondayValue.innerHTML = "";
      

//     } )
// }


// WEATHER_API_History=`https://api.weatherapi.com/v1/forecast.json?key=0c4184ffbcad4aa7b3653754240909&q=`;
// function findUserHistory(){
//     fetch(WEATHER_API_History+userHistory.value).then((res)=>res.json()).then((data)=>{
//         console.log(data);
   

//         MondayValue.innerHTML = "";
      

//     } )
// }
