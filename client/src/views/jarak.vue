<template>
  <div class="container">
    <h1>
      <div>
        <i class="fa fa-medkit" :style="{ fontSize: '48px', color: 'black' }"></i>
        <br />
      </div>
      Nearest Hospital
    </h1>
    <div class="section">
          <button class="location-button" @click="searchLocation">Search Location : {{ currentCity }}</button>
        </div>
    <div class="grid-container">
      <div class="grid-item-left">
        <div class="section">
          <button class="hospital-button" @click="searchNearestHospitals">Find Nearest Hospitals</button>
        </div>
        <!-- <ul class="hospital-list">
          <li v-for="h in sortedHospitals" :key="h.display_name">
            <span class="display-name">{{ h.display_name }}</span>
            <p class="distance">Distance: {{ h.distance.toFixed(2) }} km</p>
          </li>
        </ul> -->
     </div>
     <div class="grid-item-right">
        <div class="search-bar">
            <input class="form-control" type="text" v-model="searchQuery" placeholder="Search Hospital" @input="searchHospitals" />
        </div>
      </div>
    </div>
    <ul class="hospital-list">
          <li v-for="h in sortedHospitals" :key="h.display_name">
            <span class="display-name">{{ h.display_name }}</span>
            <p class="distance">Distance: {{ h.distance.toFixed(2) }} km</p>
          </li>
        </ul>
      
    </div>
    
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  display: flex;
  justify-content: center;
}

.grid-item-left {
  grid-column: 1;
}

.grid-item-right {
  grid-column: 2;
}

.section {
    display: flex;
  justify-content: center;
}
.location-button{
  /* padding: 20px; */
  margin: 10px;
}

.search-bar{
  margin: 10px;

}

.hospital-button {
  margin: 10px;
}

</style>


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
  created() {},
  methods: {
    getDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of the earth in km
      const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
      const dLon = this.deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) *
          Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in km
      return d;
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
    getCurrentCity(position) {
      let lat = position?.coords.latitude;
      let long = position?.coords.longitude;

      if (lat && long) {
        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=jsonv2`
          )
          .then((response) => {
            const city = response.data.display_name;

            this.currentCity = city;
          });
      }
    },
    searchLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getCurrentCity);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    searchNearestHospitals() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let lat = position?.coords.latitude;
          let long = position?.coords.longitude;

          if (lat && long) {
            axios
              .get(
                `https://nominatim.openstreetmap.org/search.php?q=hospital&format=json&bounded=1&viewbox=${
                  long - 0.5
                },${lat - 0.5},${long + 0.5},${lat + 0.5}&limit=10`
              )
              .then((response) => {
                let hospital = response.data;
                hospital.forEach((h) => {
                  h.distance = this.getDistance(lat, long, h.lat, h.lon);
                });
                hospital.sort((a, b) => a.distance - b.distance); // Mengurutkan rumah sakit berdasarkan jarak terendah
                this.hospitals = hospital;
                this.sortedHospitals = hospital; // Menyimpan hasil pengurutan pada sortedHospitals
              });
          }
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    searchHospitals() {
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          this.sortedHospitals = this.hospitals.filter(h => h.display_name.toLowerCase().includes(query));
        } else {
          this.sortedHospitals = this.hospitals;
        }
      },
  },
};
</script>