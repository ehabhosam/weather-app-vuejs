<template>
  <div class="panel">
    <div id="locationInput">
      <input v-model="searchValue" type="text" class="search" placeholder="Search Location..." />
      <button class="submit" @click="handleSearch(searchValue.split(' ')[0])">
        <i class="fas fa-search"></i>
      </button>
    </div>
    <ul class="cities">
      <li class="city" v-for="city in citiesArray" :key="city" @click="setViewCity(city)">{{city}}</li>
    </ul>

    <ul class="details">
      <h4>Weather Details</h4>
      <li>
        <span>Cloudy</span>
        <span class="cloud">{{cloudy}}%</span>
      </li>
      <li>
        <span>Humidity</span>
        <span class="humidity">{{humidity}}%</span>
      </li>
      <li>
        <span>Wind</span>
        <span class="wind">{{wind}}km/h</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'AppPannel',
    data: ()=>({
      searchValue: '', 
      citiesArray: ['Cairo', 'Tokyo', 'Paris', 'Mexico']
    }),
    props: {
      cloudy: [String, Number],
      humidity: [String, Number],
      wind: [String, Number], 
      handleSearch: Function,
      setViewCity: Function, 
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
</style>
