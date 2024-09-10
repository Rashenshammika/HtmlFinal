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


//----------------------------- current weather -------------------------------

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
        

 //---------------------- past data / next data --------------------------

 let getDay = `${data.location.localtime}`;
 const setdate = new Date(getDay);
 let date = setdate.getDate();
 let month = setdate.getMonth();
 let year = setdate.getFullYear();

 const headers = [
     "NheaderMon",
     "NheaderTue",
     "NheaderWed",
     "NheaderThu",
     "NheaderFri"

 ]

 const temperatures = [
     "NtempretureMonTxt",
     "NtempretureTueTxt",
     "NtempretureWedTxt",
     "NtempretureThuTxt",
     "NtempretureFriTxt"
 ];
 const images = [
     "NMondayImg",
     "NTuesdayImg",
     "NWednesdayImg",
     "NThursdayImg",
     "NFridayImg"

 ]
 const headersP = [
     "PheaderMon",
     "PheaderTue",
     "PheaderWed",
     "PheaderThu",
     "PheaderFri"
 ];
 
 const temperaturesP = [
     "PtempretureMonTxt",
     "PtempretureTueTxt",
     "PtempretureWedTxt",
     "PtempretureThuTxt",
     "PtempretureFriTxt"
 ];
 
 const imagesP = [
     "PMondayImg",
     "PTuesdayImg",
     "PWednesdayImg",
     "PThursdayImg",
     "PFridayImg"
 ];
 

 WEATHER_API_FUTURE = `https://api.weatherapi.com/v1/forecast.json?key=0c4184ffbcad4aa7b3653754240909&q=${userLocation.value}&dt=`;
 WEATHER_API_HISTORY=`https://api.weatherapi.com/v1/history.json?key=0c4184ffbcad4aa7b3653754240909&q=${userLocation.value}&dt=`;

 if ((month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) && (date == 31 || date == 30 || date == 29 || date == 28 || date == 27 || date == 26)) {
     handleFutureDates(year, month, date, 5);
     handlePastDates(year, month, date, 5);
 } else if ((month == 3 || month == 5 || month == 8 || month == 10) && (date == 30 || date == 29 || date == 28 || date == 27 || date == 26 || date == 25)) {
     handleFutureDates(year, month, date, 5);
     handlePastDates(year, month, date, 5);

 } else if (month == 1 && (date == 28 || date == 29)) {
     handleFutureDates(year, month, date, 5);
     handlePastDates(year, month, date, 5);
 } else {
     handleFutureDates(year, month, date, 5);
     handlePastDates(year, month, date, 5);
 }



 function handlePastDates(year, month, date, numberOfDays) {
     let pastDates = [];
     for (let i = 1; i <= numberOfDays;i++) {
         let pastDate = new Date(year, month, date - i);

         let pastYear = pastDate.getFullYear();
         let pastMonth = pastDate.getMonth()+1;
         let pastDay = pastDate.getDate();

         let paddedMonth = pastMonth.toString().padStart(2, '0');
         let paddedDay = pastDay.toString().padStart(2, '0');

         let setDate = `${pastYear}-${paddedMonth}-${paddedDay}`;
        pastDates.push(setDate);
     }

     pastDates.forEach((setDate, index) => {
         const weeksetDate = new Date(setDate);
       
         
         const formatdate = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(weeksetDate);

         fetch(  WEATHER_API_HISTORY + setDate)
             .then((res) => res.json())
             .then((data) => {
                 const headerElement = document.getElementById(headersP[index]);
                 const tempElement = document.getElementById(temperaturesP[index]);
                 const imageElement = document.getElementById(imagesP[index]);
 
                
                 headerElement.innerText=formatdate;
               
                 
                 let maxTemp = Math.round(data.forecast.forecastday[0].day.maxtemp_c);
               tempElement.textContent=maxTemp+"°C";
               
                imageElement.src=`${data.forecast.forecastday[0].day.condition.icon}`;
                
             });
     });
 }

 function handleFutureDates(year, month, date, numberOfDays) {
     let futureDates = [];
     for (let i = 1; i <= numberOfDays; i++) {
         let futureDate = new Date(year, month, date + i);

         let futureYear = futureDate.getFullYear();
         let futureMonth = futureDate.getMonth() + 1;
         let futureDay = futureDate.getDate();

         let paddedMonth = futureMonth.toString().padStart(2, '0');
         let paddedDay = futureDay.toString().padStart(2, '0');

         let setDate = `${futureYear}-${paddedMonth}-${paddedDay}`;
         futureDates.push(setDate);
     }


     futureDates.forEach((setDate, index) => {
         const weeksetDate = new Date(setDate);
         const formatdate = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(weeksetDate);

         fetch(WEATHER_API_FUTURE + setDate)
             .then((res) => res.json())
             .then((data) => {
                 const headerElement = document.getElementById(headers[index]);
                 const tempElement = document.getElementById(temperatures[index]);
                 const imageElement = document.getElementById(images[index]);
 
                 headerElement.innerText=formatdate;
                 let maxTemp = Math.round(data.forecast.forecastday[0].day.maxtemp_c);
               tempElement.textContent=maxTemp+"°C";
               
                imageElement.src=`${data.forecast.forecastday[0].day.condition.icon}`;
             });
     });
 }

} )
}