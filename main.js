
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');


let cityInput = "Recife";


cities.forEach((city) => {
  city.addEventListener('click', (e) => {
    
    cityInput = e.target.innerHTML;
    
    fetchWeatherData();
    //animação fade
    app.style.opacity = "0";
  });
})

//evento submit
form.addEventListener('submit', (e) => {
  /* Alerta se clicar no buscar e tiver em branco*/
  if(search.value.length == 0) {
    alert('Por favor, escreva o nome de uma cidade');
  } else {
    
    cityInput = search.value;
    
    fetchWeatherData();
    //Remover texto no input
    search.value = "";
    
    app.style.opacity = "0";
  }
  
  
  e.preventDefault();
});

/*Dias da semana*/
function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Domingo", 
    "Segunda-feira", 
    "Terça-feira", 
    "Quarta-feira", 
    "Quinta-feira", 
    "Sexta-feira", 
    "Sábado"
  ];
  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

/* Fetch API*/
function fetchWeatherData() {

fetch(`https://api.weatherapi.com/v1/current.json?key=e0c1a083d9094ababd0211848210510&q=${cityInput}`)
 
  .then(response => response.json())
  .then(data => {
    
    console.log(data);
    
    /*temperatura e condição do tempo das cidades */
    temp.innerHTML = data.current.temp_c + "&#176;";
    conditionOutput.innerHTML = data.current.condition.text;
    
    /* Dia e hora das cidades selecionadas*/
    const date = data.location.localtime;
    const y = parseInt(date.substr(0, 4));
    const d = parseInt(date.substr(5, 2));
    const m = parseInt(date.substr(8, 2));
    const time = date.substr(11); 
    
    
    /*Novo Formato: 17:53 - Sexta 9, 10 2021*/
    dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
    timeOutput.innerHTML = time;
    
    nameOutput.innerHTML = data.location.name;
   
    const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
    /*Icones do tempo*/
    icon.src = "./icons/" + iconId;
    
    //Add detalhes do tempo
    cloudOutput.innerHTML = data.current.cloud + "%";
    humidityOutput.innerHTML = data.current.humidity + "%";
    windOutput.innerHTML = data.current.wind_kph + "km/h";
    
    //default tempo do dia
    let timeOfDay = "day";

    // id única para cada condição do tempo
    const code = data.current.condition.code; 
    
    //Mudar para noite quando for noite na cidade 
    if(!data.current.is_day) {
      timeOfDay = "night";
    } 
    
    if(code == 1000) { 
      /*Tempo limpo*/
      app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;

      /*mudar cor do button para dia e noite */
      btn.style.background = "#e5ba92";
      if(timeOfDay == "night") {
        btn.style.background = "#181e27";
      }
    }
    /*Tempo nublado*/
    else if (
      code == 1003 ||
      code == 1006 ||
      code == 1009 ||
      code == 1030 ||
      code == 1069 ||
      code == 1087 ||
      code == 1135 ||
      code == 1273 ||
      code == 1276 ||
      code == 1279 ||
      code == 1282
    ) {
      app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
      btn.style.background = "#fa6d1b";
      if(timeOfDay == "night") {
        btn.style.background = "#181e27";
      }
    /*Chuva*/
    } else if (
      code == 1063 ||
      code == 1069 ||
      code == 1072 ||
      code == 1150 ||
      code == 1153 ||
      code == 1180 ||
      code == 1183 ||
      code == 1186 ||
      code == 1189 ||
      code == 1192 ||
      code == 1195 ||
      code == 1204 ||
      code == 1207 ||
      code == 1240 ||
      code == 1243 ||
      code == 1246 ||
      code == 1249 ||
      code == 1252 
    ) {
      app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
      btn.style.background = "#647d75";
      if(timeOfDay == "night") {
        btn.style.background = "#325c80";
      }
    /*Neve*/
    } else {
      app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
      btn.style.background = "#4d72aa";
      if(timeOfDay == "night") {
        btn.style.background = "#1b1b1b";
      }
    }
    
    app.style.opacity = "1";
  })
  /*Alert para erro*/
  .catch(() => {
    alert('Cidade não encontrada, pro favor, tente novamente');
    app.style.opacity = "1";
  });
}


fetchWeatherData();


app.style.opacity = "1";
  




