<template>
  <div class="containerr">
    <h3 class="brand">Weather Now</h3>
    <table>
      <tr class="left-col temp">
        <td colspan="2" style="position: relative">
          {{temprature}}&#176;
          <a class="more-details-btn" href="#/more-details">More Details</a>
        </td>
      </tr>
      <tr class="middle-col">
        <td class="upperRow" :style="{'font-size': windowWidth <=500? 30/cityName.length + 'vh': '3.7rem'}">{{cityName}}</td>
        <td class="dateTime">
          <span class="time">{{time}}&nbsp;</span>
          -&nbsp;
          <span class="date">11/9/2022</span>
        </td>
      </tr>
      <tr class="right-col">
        <td class="upperRow"><div style="width:6vh; height: 6vh;"><img
          :src="imageSrc"
          alt="icon"
        /></div></td>
        <td>{{condition}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'WeatherStatus',
    data: ()=>({
      windowWidth: window.innerWidth
    }),
    props: {
      temprature: [String, Number],
      cityName: String,
      time: String,
      date: String,
      condition: String,
      imageSrc: String
    },
    mounted(){
      window.addEventListener('resize', () => { this.windowWidth = window.innerWidth} )
    }
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

table {
  display: flex;
  width: 90vw;
  max-width: 650px;
}
td {
  display: flex;
  flex-direction: column;
  text-align: justify;
  font-size: calc(1px * 100vw2);
}

tr {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.dateTime {
  display: flex;
  flex-direction: row;
}
.upperRow {
  height: 7vh;
  font-size: 3rem;
}
.upperRow > div > img {
  scale: 2
}
.left-col {
  justify-content: flex-start;
}
.middle-col {
  padding-left: 10px
}
.right-col {
  align-items: center;
}

  .temp {
  font-size: 6rem;
  margin: 0;
}
.name {
  font-size: 10px;
}
.left-col {
  width: 25%;
}
.middle-col {
  width: auto;
}
.right-col {
  width: 25%;
}


@media screen and (max-width: 500px) {
  .temp {
  font-size: 4rem;
  margin: 0;
}
.name {
  font-size: 10px;
}
.left-col {
  width: 25%;
}
.middle-col {
  width: 45%;
}
.right-col {
  width: 25%;
}
}
/* tr > td:nth-child(2){
  translate: 0 -20px;
} */
a.more-details-btn {
    font-size: 15px;
    position: absolute;
    bottom: 10px;
    text-decoration: none;
    color: #fa6d1b;
}
</style>
