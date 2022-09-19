<template>
    <div class="panel">
        <div id="locationInput">
            <a class="submit" href="#/">
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
        <table class="forecast-table">
            <thead style="padding-bottom: 6px;">
                <tr>
                    <th colspan="5">
                        <i class="fa fa-calendar" style="margin-right: 6px;"></i>
                        <span>16-DAY FORECAST</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(day, i) in forecastData.days" :key="i">
                    <td width="15%">{{ day.datetime }}</td>
                    <td width="15%">
                        <img
                        :src="require(`@/assets/forecast/${day.icon}.svg`)"
                        :alt="day.conditions"
                        height="20"/>
                    </td>
                    <td width="15%" style="opacity: 0.75">{{ day.tempmin }}&#176;</td>
                    <td width="40%"><TempBarComponent :dayPrev="day.datetime" :currentTemp="day.temp" :minTemp="day.tempmin" :maxTemp="day.tempmax" :maxDaysTemp="forecastData.maxDaysTemp" :minDaysTemp="forecastData.minDaysTemp"/></td>
                    <td width="15%">{{ day.tempmax }}&#176;</td>
                </tr>
            </tbody>
        </table>
    </div>
  </template>

  <script>

    import axios from 'axios';
    import TempBarComponent from './TempBarComponent.vue';

    const FORECAST_SERVICE_API_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
    const FORECAST_SERVICE_API_KEY = "NBXC3DJ3JW93CZASYE8XWA3PU";

    export default {
      name: 'WeatherMoreDetails',
      data: () => ({
        forecastData: {}
      }),
      components: {TempBarComponent},
      props: {
        lat: [Number],
        lon: [Number]
      },
      methods: {
        getForecastServiceUrl(){
            return `${FORECAST_SERVICE_API_URL}/${this.lat},${this.lon}/?unitGroup=metric&elements=datetime%2Ctempmax%2Ctempmin%2Ctemp%2Cconditions%2Cicon&include=days&key=${FORECAST_SERVICE_API_KEY}&contentType=json`;
        },
        async getForecastData(){
            await axios.get(this.getForecastServiceUrl()).then((data) => {
                this.forecastData = data.data;
                console.log(data.data); 

                this.forecastData.minDaysTemp = 99999999;
                this.forecastData.maxDaysTemp = -99999999;

                this.forecastData.days.forEach((day) => {
                    this.forecastData.minDaysTemp =
                        day.tempmin < this.forecastData.minDaysTemp
                        ?
                        day.tempmin
                        :
                        this.forecastData.minDaysTemp;

                    this.forecastData.maxDaysTemp =
                        day.tempmax > this.forecastData.maxDaysTemp
                        ?
                        day.tempmax
                        :
                        this.forecastData.maxDaysTemp;

                    day.datetime = new Date(day.datetime);
                    day.datetime =
                        day.datetime.toDateString() === (new Date()).toDateString()
                        ?
                        "Today"
                        :
                        day.datetime.toLocaleString('en-us', { weekday: 'short' });
                });
            });
        }
      },
      created() {
        this.getForecastData();
      }
    }

  </script>

  <style>
  .panel {
    position: absolute;
    width: 35%;
    height: 100%;
    top: 0;
    right: 0;
    background: rgba(110, 110, 110, 0.25);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    z-index: 1;
    padding: 3em 2em;
    overflow-y: scroll;
  }
  .panel div {
    margin-bottom: 2em;
  }
  .submit {
    position: absolute;
    top: 0;
    right: 0;
    padding: 1em;
    margin: 0;
    border: none;
    outline: none;
    background: #fa6d1b;
    color: #fff;
    cursor: pointer;
    font-size: 1.2em;
    transition: 0.4s;
  }
  .submit:hover {
    background: #fff !important;
    color: #000;
  }
  .search {
    background: none;
    border: none;
    border-bottom: 1px #ccc solid;
    padding: 0 1em 0.5em 0;
    width: 80%;
    color: #fff;
    font-size: 1.1em;
  }
  .search:focus {
    outline: none;
  }
  .search::placeholder {
    color: #fff;
  }
  .panel ul {
    padding: 0 0 1em 0;
    margin: 2em 0;
    border-bottom: 1px #ccc solid;
  }
  .panel ul li {
    color: #ccc;
    margin: 2.5em 0;
  }
  .panel ul h4 {
    margin: 3em 0;
  }
  .city {
    display: block;
    cursor: pointer;
  }
  .city:hover {
    color: #fff;
  }
  .details li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  table.forecast-table {
    display: table;
    min-width: unset !important;
    margin: 0 auto;
    width: 100%;
}
table.forecast-table tr {
    display: table-row;
    border-bottom: 1px solid #0000003d;
}
  table.forecast-table td {
    display: table-cell;
  }
  </style>
