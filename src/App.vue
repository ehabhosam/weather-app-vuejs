<template>
  <div class="weather-app">
    <img :src="bgsrc? require(`${bgsrc}`): ''" alt="Background">
    <WeatherStatus 
      :temprature="this.weather.temprature"
      :cityName="this.weather.cityName"
      :condition="this.weather.condition"
      :imageSrc="this.weather.imageSrc"
      :date="this.timestamp.date"
      :time="this.timestamp.time"
    />
    <AppPannel 
      :cloudy="this.weather.cloudy"
      :humidity="this.weather.humidity"
      :wind="this.weather.wind"
    />
  </div>
</template>

<script>
  import axios from 'axios'; 
  import WeatherStatus from "./components/WeatherStatus.vue";
  import AppPannel from "./components/AppPannel.vue";

  const openWeatherMapApiKey = 'edff1731bf07907b1780b8f660dd1b79'; 

  export default {
    components: {
      WeatherStatus,
      AppPannel,
    },
    data: ()=> ({
        weather: {
          cityName: "",
          temprature: "",
          condition: "",
          cloudy: "",
          humidity: "",
          wind: "",
          imageSrc: ""
        },
        location: {
          longitude: null, 
          latitude: null, 
        },
        timestamp: {
          time: "",
          date: "",
        },
        bgsrc: ""
      }),
      methods: {
        getCurrentLocation({coords}){
          const { longitude, latitude } = coords;
          this.location = {
            longitude,
            latitude
          }
          this.getWeatherData(); 
        },

        async getWeatherData(){
          //fetching weather data from OpenWeatherApi
          const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.location.latitude.toFixed(2)}&lon=${this.location.longitude.toFixed(2)}&appid=${openWeatherMapApiKey}&units=metric`);
          const {name, main, weather, clouds,wind} = result.data;
          const source =  `http://openweathermap.org/img/wn/${weather[0].icon}.png`; 
          // setting fetched data
          this.weather = {
            cityName: name,
            temprature: Math.round(main.temp), 
            condition: weather[0].main,
            cloudy: clouds.all,
            humidity: main.humidity,
            wind: wind.speed,
            imageSrc: source
          }

          // setting background based on weather
          if (weather[0].icon[2] === 'd'){
            console.log('day')
            // day
            if (weather[0].main === 'Snow' ||
            weather[0].main === 'Thunderstorm' ||
            weather[0].main === 'Drizzle' ||
            weather[0].main === 'Rain'){
              this.bgsrc = './assets/day/rainyday.jpg';
            }else {
              this.bgsrc = './assets/day/sunnyday.jpg'
            }
          }else {
            // night
            if (weather[0].main === 'Snow' ||
            weather[0].main === 'Thunderstorm' ||
            weather[0].main === 'Drizzle' ||
            weather[0].main === 'Rain'){
              this.bgsrc = './assets/night/snownight.jpg';
            }else {
              this.bgsrc = './assets/night/cloudynight.jpg'
            }
          }
        },

        async permissionFailed(){
          // alert("Location Permission is denied. We will get default City weather (Cairo).");
          const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Mansoura&appid=${openWeatherMapApiKey}&units=metric`);
          console.log(result.data)
          const {name, main, weather, clouds,wind} = result.data;
          const source =  `http://openweathermap.org/img/wn/${weather[0].icon}.png`; 
          this.weather = {
            cityName: name,
            temprature: Math.round(main.temp), 
            condition: weather[0].main,
            cloudy: clouds.all,
            humidity: main.humidity,
            wind: wind.speed,
            imageSrc: source
          }
          console.log(this.weather)
        },

        getNow() {
          const today = new Date();
          const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
          const time = today.getHours() + ":" + today.getMinutes();
          this.timestamp = {
            time,
            date,
          }
        }, 
        getImgUrl(picurl) {
          return require(picurl)
        }
      },
      mounted(){
        const perm = navigator.geolocation;
        perm.getCurrentPosition(this.getCurrentLocation, this.permissionFailed);
      },
      created() {
        this.getNow()
        setInterval(this.getNow, 5000);
      }
  };
</script>

<style>
body {
  margin: 0;
  font-family: "Rubik", sans-serif;
  background: #111;
  overflow-x: hidden;
}
* {
  box-sizing: border-box;
}
h1,
h2 {
  font-weight: 400;
}
.weather-app {
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: #fff;
  position: relative;
  transition: 500ms;
  opacity: 1;
  overflow-x: hidden;
}
.weather-app > img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.weather-app::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 0;
}
@media screen and (max-width: 800px) {
  .panel,
  .containerr {
    position: relative;
    width: 100%;
    top: initial;
  }
}

@media screen and (max-width: 500px) {
  html {
    font-size: 16px;
  }
}
@media screen and (max-height: 300px) {
  .weather-app {
    min-height: 40em;
  }
}
</style>
