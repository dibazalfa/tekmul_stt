<template>
    <div class="container">
      <h1>
        <div>
          <i class="fa fa-medkit" :style="{ fontSize: '48px', color: 'black' }"></i>
          <br />
        </div>
        Nearest Hospital
      </h1>
      <div class="grid-container">
        <div class="grid-item-left">
          <div class="section">
            <button class="location-button" @click="searchLocation">Search Location</button>
            <p class="location-text">Current Location: <span class="location">{{ currentCity }}</span></p>
            <div class="search-bar">
              <input class="form-control" type="text" v-model="searchQuery" placeholder="Search Hospital" />
              <button class="search-button" @click="searchHospitals">Search</button>
            </div>
          </div>
        </div>
        <div class="grid-item-right">
          <div class="section">
            <button class="hospital-button" @click="searchNearestHospitals">Find Nearest Hospitals</button>
          </div>
          <ul class="hospital-list">
            <li v-for="h in filteredHospitals" :key="h.display_name">
              <span class="display-name">{{ h.display_name }}</span>
              <p class="distance">Distance: {{ h.distance.toFixed(2) }} km</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "Hospitals",
    data() {
      return {
        currentCity: "",
        hospitals: [],
        sortedHospitals: [],
        searchQuery: "",
      };
    },
    computed: {
      filteredHospitals() {
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          return this.sortedHospitals.filter(h => h.display_name.toLowerCase().includes(query));
        } else {
          return this.sortedHospitals;
        }
      }
    },
    methods: {
      // ...
      searchHospitals() {
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          this.sortedHospitals = this.hospitals.filter(h => h.display_name.toLowerCase().includes(query));
        } else {
          this.sortedHospitals = this.hospitals;
        }
      },
      // ...
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
    margin: 0 auto;
  }
  
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  
  .grid-item-left {
    grid-column: 1;
  }
  
  .grid-item-right {
    grid-column: 2;
  }
  
  .search-bar {
    display: flex;
    align-items: center;
  }
  
  .search-bar input {
    flex-grow: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .search-bar button {
    margin-left: 10px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
  }
  
  </style>
  