<template>
  <div class="container">
    <h1>
      <div>
        <i class="fa fa-medkit" :style="{ fontSize: '48px', color: 'black' }"></i>
        <br />
        TalkCare 
      </div>
    </h1>

    <div class="input">
      <button class="fa fa-play" @click="App.startRecording" > </button>
      <button class="fa fa-trash" @click="App.clearTranscript"></button>
      <button @click="App.findNearestHospital()"><router-link to='/jarak'>Nearest Hospitals</router-link></button>
    </div>

    <br><br>

    <div class="input">
      <input class="form-control" type="text" v-model="App.transcript" />
    </div>

    <br><br>

    <div class="search">
      <button class="fa fa-search" @click="App.recommendationTranscript()"></button>
    </div>

    <br><br>

    <div v-if="App.transcript">

      <!-- <div class="sort-buttons">
        <button @click="App.sortItems('lowestPrice')">Sort by Lowest Price</button>
        <button @click="App.sortItems('highestPrice')">Sort by Highest Price</button>
        <button @click="App.sortItems('Rating')">Sort by Rating</button>
      </div> -->

      <div class="sort-options">
        <label>
            <input type="checkbox" @click="App.toggleSort('lowestPrice')" v-model="App.sortLowestPrice">
            Sort by Lowest Price
        </label>
        <label>
            <input type="checkbox" @click="App.toggleSort('highestPrice')" v-model="App.sortHighestPrice">
            Sort by Highest Price
        </label>
        <label>
            <input type="checkbox" @click="App.toggleSort('Rating')" v-model="App.sortRating">
            Sort by Rating
        </label>
      </div>


      <ul class="output">
        <li v-for="(item, index) in App.items" :key="index">
          <div class="theitem">{{ item.name }}</div>
          <img :src="item.image_url" />
          <p>Harga: Rp{{ item.base_price }} {{ item.selling_unit }}</p>
          <p>★ {{ item.rating }}</p>
          <router-link class="button-name" :to="{path: '/about', query:{slug: item.slug}}">Detail</router-link>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import {useApp} from '../stores/index';

export default {
  data() {
    return {
      
    }
  }, 
  setup() {
    const App = useApp();
    App.sortType = []; // Initialize sortType as an empty array
    return {
      App,
    }
  },
  mounted() {
    this.App.generateRandomRating();
  }
}
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
h1 {
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  color: #000000;
  margin-bottom: 50px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}


.container {
  max-width: 800px;
  margin: auto;
  padding-top: 50px;
  font-family: sans-serif;
}

.form-control {
  width: 70%;
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

.input {
  display: flex;
  align-items: center;
  justify-content: center;
}

.input2 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search {
  display: flex;
  justify-content: center;
}

.sort-buttons {
  display: flex;
  justify-content: space-between;
}

.sort-buttons button {
  width: calc(33.33% - 10px);
  margin-bottom: 15px;
}

button {
  margin: 0 10px;
 justify-content: center;
}

button {
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

button:hover {
  background-color:  #007bff;
  box-shadow: 0px 15px 20px rgba(164, 187, 236, 0.812);
  color: #fff;
  transform: translateY(-7px);
}

button:active {
  transform: translateY(-1px);
}

.output {
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  color: #000000;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.output li {
  width: calc(33.33% - 10px);
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.output li:hover {
  transform: translateY(-5px);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

.output li img {
  max-width: 100%;
  height: auto;
}

.output li p {
  margin: 10px;
  font-size: 16px;
  color: #555;
}

.theitem {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  background-image: linear-gradient(to bottom right, #007bff, #00bcd4);
}

.button-name {
 align-items: center;
 appearance: none;
 background-color: #FCFCFD;
 border-radius: 4px;
 border-width: 0;
 box-shadow: rgba(45, 35, 66, 0.2) 0 2px 4px,rgba(45, 35, 66, 0.15) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
 box-sizing: border-box;
 color: #36395A;
 cursor: pointer;
 display: inline-flex;
 font-family: "Poppins", sans-serif;
 height: 36px;
 justify-content: center;
 line-height: 1;
 list-style: none;
 overflow: hidden;
 padding-left: 16px;
 padding-right: 16px;
 position: relative;
 text-align: left;
 text-decoration: none;
 transition: box-shadow .15s,transform .15s;
 user-select: none;
 -webkit-user-select: none;
 touch-action: manipulation;
 white-space: nowrap;
 will-change: box-shadow,transform;
 font-size: 13px;
 margin-bottom: 10%;
}

.button-name:focus {
 box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.button-name:hover {
 box-shadow: rgba(45, 35, 66, 0.3) 0 4px 8px, rgba(45, 35, 66, 0.2) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
 transform: translateY(-2px);
}

.button-name:active {
 box-shadow: #D6D6E7 0 3px 7px inset;
 transform: translateY(2px);
}

.detail {
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: normal;
}

</style>