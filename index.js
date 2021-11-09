var container = document.getElementById("main-container");
var searchCity = document.getElementById("searchCity"); //formulario
var searchInput = document.getElementById("searchInput");
var degreeNumber = document.getElementById("degreeNumber");
var description = document.getElementById("description");
var timeZone = document.getElementById("timeZone");
var date = document.getElementById("date");
var lastUpdated = document.getElementById("lastUpdated");
var min = document.getElementById("min");
var max = document.getElementById("max");
var humidity = document.getElementById("humidity");
var pressure = document.getElementById("pressure");
var feelLike = document.getElementById("feel-like");
var wind = document.getElementById("wind");
var loader = document.getElementById("loader");
var animatedIcon = document.getElementById("animatedIcon");
var dayAnimatedIcon = document.getElementById("dayAnimatedIcon");
const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

//MODAL
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];


/** Cargar la pagina con ciudad por defecto */
window.onload = () => {
    getWeatherData("Huelva");
}

/** FUNCIONES */

// tiempo actual
const getWeatherData = (city) => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=99353870a7ee4c96884112825212910&q=${city}&days=3&aqi=no&alerts=no&lang=es`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
}

// setear tiempo actual
const setWeatherData = (data) => {
    //fecha actual
    let rawDate = data.current.last_updated_epoch * 1000;
    const dateObject = new Date(rawDate);
    const humanDate = dateObject.toUTCString();
    var splitDate = humanDate.split(" ");
    var finalDate = `${splitDate[1]} ${splitDate[2]} ${splitDate[3]}`;

    //hora ultima actualizacion
    var lastUpdatedHourSplit = data.current.last_updated.split(" ")
    var lastUpdatedHour =lastUpdatedHourSplit[1]

    console.log(data)

    lastUpdated.textContent = `Act ${lastUpdatedHour}`;
    degreeNumber.textContent = Math.round(data.current.temp_c);
    description.textContent = data.current.condition.text;
    timeZone.textContent = data.location.name;
    date.textContent = finalDate;
    animatedIcon.src = setIcon(data.current.condition.text);
    setDetails(data)
    nextDays(data.forecast);
    cleanUp();
}

// detalles de tiempo actual
const setDetails = (data) => {
   // console.log(data)
    let datos = data.current;
    humidity.textContent = `${datos.humidity}%`
    pressure.textContent = `${datos.pressure_mb}mb`
    wind.textContent = `${datos.wind_kph}km/h`
    feelLike.textContent = `${Math.round(datos.feelslike_c)}º`
}

// tiempo en los proximos 3 dias
const nextDays = (data) => {
    let datos = data.forecastday;
    const days = document.getElementsByClassName('day')
    let icon1 = document.getElementById("dayIcon-1")
    let icon2 = document.getElementById("dayIcon-2")
    let icon3 = document.getElementById("dayIcon-3")

    let dayDate1 = document.getElementById("day-date-1")
    let dayDate2 = document.getElementById("day-date-2")
    let dayDate3 = document.getElementById("day-date-3")

    let rawDate1 = datos[0].date_epoch * 1000
    let objectDate1 = new Date(rawDate1)

    let rawDate2 = datos[1].date_epoch * 1000
    let objectDate2 = new Date(rawDate2)

    let rawDate3 = datos[2].date_epoch * 1000
    let objectDate3 = new Date(rawDate3)

    // dia 1
    icon1.src = setIcon(datos[0].day.condition.text)
    dayDate1.textContent = `${weekDays[objectDate1.getDay()]}  ·  ${datos[0].day.condition.text}  ·  ${Math.round(datos[0].day.maxtemp_c)}º/ ${Math.round(datos[0].day.mintemp_c)}º`


    // dia 2
    icon2.src = setIcon(datos[1].day.condition.text);
    dayDate2.textContent = `${weekDays[objectDate2.getDay()]}  ·  ${datos[1].day.condition.text}  ·  ${Math.round(datos[1].day.maxtemp_c)}º/ ${Math.round(datos[1].day.mintemp_c)}º`


    // dia 3
    icon3.src = setIcon(datos[2].day.condition.text);
    dayDate3.textContent = `${weekDays[objectDate3.getDay()]}  ·  ${datos[2].day.condition.text}  ·  ${Math.round(datos[2].day.maxtemp_c)}º/ ${Math.round(datos[2].day.mintemp_c)}º`

}

// fecha actual
const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

// ocultar spinner de carga y mostrar container
const cleanUp = () => {
    loader.style.display = 'none';
   // container.style.display = 'flex';
}

// mostrar cada icono referente al tiempo
const setIcon = (weather) => {
    switch (weather) {
        case 'Soleado':
                return 'animated/day.svg';
            break;
        case 'Parcialmente nublado':
                return 'animated/cloudy-day-1.svg';
            break;
        case 'Nublado':
                return 'animated/cloudy.svg';
            break;
        case 'Cielo cubierto':
                return 'animated/cloudy.svg';
            break;
        case 'Neblina':
                return 'animated/cloudy.svg';
            break;
        case 'Lluvia  moderada a intervalos':
                return 'animated/rainy-5.svg';
            break;
        case 'Nieve moderada a intervalos en las aproximaciones':
                return 'animated/snowy-4.svg';
            break;
        case 'Aguanieve moderada a intervalos en las aproximaciones':
                return 'animated/snowy-4.svg';
            break;
        case 'Llovizna helada a intervalos en las aproximaciones':
                return 'animated/rainy-2.svg';
            break;
        case 'Chubascos de nieve':
                return 'animated/snowy-5.svg';
            break;
        case 'Ventisca':
                return 'animated/cloudy.svg';
            break;
        case 'Niebla moderada':
                return 'animated/cloudy-day-3.svg';
            break;
        case 'Niebla helada':
                return 'animated/snowy-3.svg';
            break;
        case 'Llovizna a intervalos':
                return 'animated/rainy-1.svg';
            break;
        case 'Llovizna':
                return 'animated/rainy-2.svg';
            break;
        case 'Llovizna helada':
                return 'animated/rainy-2.svg';
            break;
        case 'Fuerte llovizna helada':
                return 'animated/rainy-3.svg';
            break;
        case 'Lluvias ligeras a intervalos':
                return 'animated/rainy-2.svg';
            break;
        case 'Ligeras lluvias':
                return 'animated/rainy-2.svg';
            break;
        case 'Periodos de lluvia moderada':
                return 'animated/rainy-2.svg';
            break;
        case 'Lluvia moderada':
                return 'animated/rainy-4.svg';
            break;
        case 'Periodos de fuertes lluvias':
                return 'animated/rainy-4.svg';
            break;
        case 'Fuertes lluvias':
                return 'animated/rainy-4.svg';
            break;
        case 'Ligeras lluvias heladas':
                return 'animated/snowy-1.svg';
            break;
        case 'Lluvias heladas fuertes o moderadas':
                return 'animated/snowy-6.svg';
            break;
        case 'Ligeras precipitaciones de aguanieve':
                return 'animated/rainy-2.svg';
            break;
        case 'Aguanieve fuerte o moderada':
                return 'animated/rainy-3.svg';
            break;
        case 'Nevadas ligeras a intervalos':
                return 'animated/snowy-2.svg';
            break;
        case 'Nevadas ligeras':
                return 'animated/snowy-2.svg';
            break;
        case 'Nieve moderada a intervalos':
                return 'animated/snowy-2.svg';
            break;
        case 'Nieve moderada':
                return 'animated/snowy-6.svg';
            break;
        case 'Nevadas intensas':
                return 'animated/snowy-6.svg';
            break;
        case 'Fuertes nevadas':
                return 'animated/snowy-6.svg';
            break;
        case 'Granizo':
                return 'animated/rainy-7.svg';
            break;
        case 'Ligeras precipitaciones':
                return 'animated/rainy-2.svg';
            break;
        case 'Lluvias fuertes o moderadas':
                return 'animated/rainy-6.svg';
            break;
        case 'Lluvias torrenciales':
                return 'animated/rainy-7.svg';
            break;
        case 'Ligeros chubascos de aguanieve':
                return 'animated/snowy-2.svg';
            break;
        case 'Chubascos de aguanieve fuertes o moderados':
                return 'animated/rainy-2.svg';
            break;
        case 'Ligeras precipitaciones de nieve':
                return 'animated/rainy-5.svg';
            break;
        case 'Chubascos de nieve fuertes o moderados':
                return 'animated/snowy-5.svg';
            break;
        case 'Ligeros chubascos acompañados de granizo':
                return 'animated/rainy-7.svg';
            break;
        case 'Chubascos fuertes o moderados acompañados de granizo':
                return 'animated/rainy-7.svg';
            break;
        case 'Intervalos de lluvias ligeras con tomenta en la región':
                return 'animated/thunder.svg';
            break;
        case 'Lluvias con tormenta fuertes o moderadas en la región':
                return 'animated/thunder.svg';
            break;
        case 'Nieve moderada con tormenta en la región':
                return 'animated/thunder.svg';
            break;
        case 'Nieve moderada o fuertes nevadas con tormenta en la región':
                return 'animated/thunder.svg';
            break;

        default:
                return 'animated/cloudy-day-1.svg';
            break;

    }
}

// escuchar evento submit al buscar ciudad
searchCity.addEventListener("submit", e => {
    e.preventDefault();
    getWeatherData(searchInput.value)
    searchInput.value = "";
});

// Abrir modal
btn.onclick = function() {
  modal.style.display = "block";
}

// Cerrar modal con la X
span.onclick = function() {
  modal.style.display = "none";
}

// Cerrar modal cuando click fuera del modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}