<template>
    <div class="temp-bar" style="width: 100%;">
        <span v-if="dayPrev === 'Today'" class="today-temp-circle" :style="'right: ' + (((currentTemp - minDaysTemp) / maxDaysTemp) * 100) + '%;'"></span>
        <span :style="'width: ' + (((minTemp - minDaysTemp) / maxDaysTemp) * 100) + '%;'"></span>
        <span class="active-range" :style="'width: ' + (((maxTemp / maxDaysTemp) * 100) - (((minTemp - minDaysTemp) / maxDaysTemp) * 100)) + '%;'"></span>
        <span :style="'width: ' + (100 - (((((minTemp - minDaysTemp) / maxDaysTemp) * 100)) + (((maxTemp / maxDaysTemp) * 100) - (((minTemp - minDaysTemp) / maxDaysTemp) * 100)))) + '%;'"></span>
    </div>
</template>

  <script>
    export default {
      name: 'TempBarComponent',
      data: ()=>({
      }),
      props: {
        dayPrev: String,
        minDaysTemp: Number,
        maxDaysTemp: Number,
        currentTemp: Number,
        minTemp: Number,
        maxTemp: Number,
      },
      mounted(){
      }
    }

  </script>

  <style>
.temp-bar {
    margin: 0 !important;
    padding: 10px;
    position: relative;
}
.temp-bar span {
    height: 5px;
    display: inline-block;
    background-color: rgba(4, 4, 4, 0.327);
    border-radius: 15px;
}

.temp-bar .active-range {
    background-image: linear-gradient(45deg, #a0fb6d, #bed213, #f29a3c);
}

span.today-temp-circle {
    height: 7px;
    width: 7px;
    background-color: #fff;
    position: absolute;
    bottom: 16px;
}

  </style>
