<template>
  <div class="weather-app">
    <WeatherStatus />
    <AppPannel />
  </div>
</template>

<script>
import WeatherStatus from "./components/WeatherStatus.vue";
import AppPannel from "./components/AppPannel.vue";
export default {
  components: {
    WeatherStatus,
    AppPannel,
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: "Rubik", sans-serif;
  background: #111;
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
  background: url(./assets/day/rainyday.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: #fff;
  position: relative;
  transition: 500ms;
  opacity: 1;
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
    font-size: 10px;
  }
}
@media screen and (max-height: 300px) {
  .weather-app {
    min-height: 40em;
  }
}
</style>
