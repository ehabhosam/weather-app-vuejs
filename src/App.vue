<template>
  <div class="loader-container" v-if="bgsrc.length === 0">
    <div class="lds-ellipsis" ><div></div><div></div><div></div><div></div></div>
  </div>
  <div class="weather-app" v-else>

    <img v-for="(background_s , i) in backgroundSources" :src="require(`${bgsrc}`)" alt="background" :key="i" :style="background_s === bgsrc && viewStylesObject">

    <WeatherStatus
      :temprature="this.weather.temprature"
      :cityName="this.weather.cityName"
      :condition="this.weather.condition"
      :imageSrc="this.weather.imageSrc"
      :timezone="this.timezone"
    />
    <component :is="currentView" v-bind="panelComponentProps"/>


  </div>
</template>

<script>
  import axios from 'axios';
  import { ref } from "vue";
  import WeatherStatus from "./components/WeatherStatus.vue";
  import AppPannel from "./components/AppPannel.vue";
  import WeatherMoreDetails from "./components/WeatherMoreDetails.vue";
  import { useToast } from 'vue-toastification'
  import "vue-toastification/dist/index.css";
  const openWeatherMapApiKey = 'edff1731bf07907b1780b8f660dd1b79';

  const panelRoutes = {
    '/': AppPannel,
    '/more-details': WeatherMoreDetails
  }

  export default {
    components: {
      WeatherStatus,
      AppPannel,
    },

    data: ()=> ({
        currentPath: window.location.hash,
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
        timezone:null,
        bgsrc: "",
      }),
      setup() {
        // Get toast interface
        const toast = useToast();
        // Make it available inside methods
        const backgroundSources = ref([
          "./assets/night/cloudynight.jpg",
          "./assets/day/rainyday.jpg",
          "./assets/day/suunyday.jpg",
          "./assets/night/snownight.jpg",
        ])
        const viewStylesObject = { visibility: "visible", opacity: 1}
        return { toast, backgroundSources, viewStylesObject  }
      },
      methods: {
        async getCurrentLocation({ coords }){
          const { longitude, latitude } = coords;
          this.location = {
            longitude,
            latitude
          }
          const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.location.latitude.toFixed(2)}&lon=${this.location.longitude.toFixed(2)}&appid=${openWeatherMapApiKey}&units=metric`);
          const cityName = result.data.name;
          this.fetchWeatherData(cityName);
        },
        async fetchWeatherData(cityName = "Cairo"){
          const FORECAST_SERVICE_API_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
          const FORECAST_SERVICE_API_KEY = "NBXC3DJ3JW93CZASYE8XWA3PU";
          let link; 
          link = `${FORECAST_SERVICE_API_URL}${cityName}?unitGroup=metric&elements=datetime%2Ctempmax%2Ctempmin%2Ctemp%2Cconditions%2Cicon%2Cwindspeed%2Chumidity%2Ccloudcover%2CdatetimeEpoch&include=days&key=${FORECAST_SERVICE_API_KEY}&contentType=json`
          try {
            const result = await axios.get(link); 
            const { resolvedAddress, days, timezone } = result.data;
            const { temp, conditions, cloudcover, humidity, windspeed, icon } = days[0];
            this.weather = {
                cityName: resolvedAddress.split(',')[0],
                temprature: Math.round(temp),
                condition: conditions,
                cloudy: cloudcover,
                humidity,
                wind: windspeed,
                imageSrc: icon
              }
            this.timezone = timezone; 
              if (icon.includes('day')){
                // day
                if (icon.includes('snow') ||
                icon.includes('thunder') ||
                icon.includes('showers') ||
                icon.includes('hail') ||
                icon.includes('sleet') ||
                icon.includes('rain')){
                  this.bgsrc = './assets/day/rainyday.jpg';
                }else {
                  this.bgsrc = './assets/day/suunyday.jpg'
                }
              }else {
                // night
                if (icon.includes('snow') ||
                icon.includes('thunder') ||
                icon.includes('showers') ||
                icon.includes('hail') ||
                icon.includes('sleet') ||
                icon.includes('rain')){
                  this.bgsrc = './assets/night/snownight.jpg';
                }else {
                  this.bgsrc = './assets/night/cloudynight.jpg'
                }
              } 
          } catch (error) {
            this.toast.error('Invaild address');
          }
        },

        async permissionFailed(){
          this.toast.info('location permission denied. Default city (Cairo) will be used.')
          this.fetchWeatherData();
        },
        isViewing(src){
          return src === this.bgsrc;
        }
      },
      mounted(){
        window.addEventListener('hashchange', () => {
          this.currentPath = window.location.hash
        });
      },
      computed: {
        currentView() {
          return panelRoutes[this.currentPath.slice(1) || '/'] || "<template><h1>404 Not found</h1></template>"
        },
        panelComponentProps() {
          if (this.currentView.name === 'AppPannel') {
            return {
              cloudy: this.weather.cloudy,
              humidity: this.weather.humidity,
              wind: this.weather.wind,
              handleSearch: this.fetchWeatherData,
              setViewCity: this.fetchWeatherData
            }
          } else if(this.currentView.name === 'WeatherMoreDetails') {
            return {
              lat: this.location.latitude,
              lon: this.location.longitude,
            }
          }
          return {};
        }
      },
      created() {
        const perm = navigator.geolocation;
        setTimeout(()=>{
          perm.getCurrentPosition(this.getCurrentLocation, this.permissionFailed);
        },2000)
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

  overflow-x: hidden;
}
.weather-app > img {
  object-fit: cover;
  width: 100%;
  height: 100vh;
  position: absolute;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}


/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 3s !important;
  scale: 2;
}

.fade-enter,
.fade-leave-to{
  opacity: 0 !important;
} */

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

/* loader */
.loader-container {
  background-image: url('./assets/day/suunyday.jpg');
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .5s;
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}

</style>



