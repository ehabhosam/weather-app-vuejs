<template>
  <div class="containerr">
    <h3 class="brand">the weather</h3>
    <div>
      <h1 class="temp">16&#176;</h1>
      <div class="city-time">
        <h1 class="name">Cairo</h1>
        <small>
          <span class="time">06:09</span>
          -
          <span class="date">Monday Sep 7</span>
        </small>
      </div>
      <div class="weather">
        <img
          src="../assets/icons/snowicon.png"
          alt="icon"
          width="50"
          height="50"
        />
        <span class="condition">Rainy</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WeatherStatus'
  }

</script>

<style>
.containerr {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  padding: 2em 3em 4em 3em;
}
.containerr > div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.city-time,
.temp,
.weather {
  margin: 0 1em;
}
.city-time > h1 {
  margin: 0;
  margin-bottom: 0.2em;
  font-size: 4em;
}
.temp {
  font-size: 7em;
  margin: 0;
}
.weather img {
  display: block;
  margin: 0.5em 0;
}
</style>
