<template>
  <div class="containerr">
    <h3 class="brand">Weather Now</h3>
    <table>
      <tr class="left-col temp">
        <td colspan="2" style="position: relative">
          {{temprature}}&#176;
        </td>
      </tr>
      <tr class="middle-col">
        <td class="upperRow" :style="{'font-size': windowWidth <=500? 30/cityName.length + 'vh': '3.7rem'}">{{cityName}}</td>
        <td class="dateTime">
          <span class="time">{{displayTime(timezone)}}&nbsp;</span>
          -&nbsp;
          <span class="date">{{displayDate(timezone)}}</span>
        </td>
      </tr>
      <tr class="right-col">
        <td class="upperRow">
          <div style="width:6vh; height: 6vh;">
            <!-- <img
            :src="imageSrc"
            alt="icon"
            /> -->
            <img
              :src="require(`@/assets/forecast/${imageSrc}.svg`)"
              alt="icon"
              height="20"/>
          </div>
        </td>
        <td>{{condition}}</td>
      </tr>
      <tr class="col-more">
        <a class="more-details-btn" href="#/more-details">
          <div class="btn-more">
            <i class=" fa fa-solid fa-angle-up"></i>
          </div>
        </a>
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
      timezone: String,
      condition: String,
      imageSrc: String
    },
    mounted(){
      window.addEventListener('resize', () => { this.windowWidth = window.innerWidth} )
    },
    methods: {
      displayTime(zone){
        if (zone){
          const date = new Date().toLocaleString("en-US", {timeZone: zone});
          return date.split(', ')[1].split(':').slice(0,2).join(':')
        }
      },
      displayDate(zone){
        if (zone){
          const date = new Date().toLocaleString("en-US", {timeZone: zone});
          return date.split(', ')[0]
        }
      },
      
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
  max-width: 750px;
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
  transform: scale(2)
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
  width: 20%;
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
    color: #fa6d1b;
}
.col-more{
  width: 3vw;
}
.btn-more {
  height: 7vh;
  width: 7vh;
  border-radius: 10px;
  position: absolute;
  transform: translate(0,-20vh);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: bold;
  transition: all 0.5s;
  background: rgba(0, 0, 0, 0.3);
}
.btn-more > i {
  transform: rotate(90deg)
}
.btn-more:hover {
  background: rgba(0, 0, 0, 0.5);
  color: #fa6d1b;
  transform: scale(1.1) translate(0,-20vh); 
}
@media screen and (max-width: 500px) {
  .btn-more{
    /* translate: 7vw -15vh; */
    transform: translate(7vw,-15vh);
  }
  .right-col{
    width: 8%;
  }
  .containerr{
    left: -15px
  }
  .btn-more:hover {
    transform: scale(1.1) translate(7vw,-15vh); 
  }
}
</style>
