// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
const sr = new Recognition()

export const useApp = defineStore({
  id: "App",
  state: () => ({
    //define di sini 
      transcript: "",
      detail: false,
      selectedSlug: '',
      language: "id-ID",
      label: "",
      names: [],
      base_prices: [],
      external_id: "",
      items: [],
      details: {},
      image_urls: [],
      selling_unit: [],
      hospitals: [],
      rating: null
  }),
  actions: {
    //taruh function2nya di sini
    startRecording() {
      const recognition =
        new window.webkitSpeechRecognition() || new window.SpeechRecognition();
      recognition.lang = this.language;

      recognition.onstart = () => {
        console.log("Recognition started");
      };

      recognition.onresult = (event) => {
        // const result = event.results[0];
        this.transcript = event.results[0][0].transcript;
        this.items = [];

        const q = this.transcript;
        console.log(this.transcript);
        fetch(`http://localhost:3000/api/search?q=${q}`)
          .then((response) => response.json())
          .then((data) => {
            const results = data.result.map((obj) => ({
              name: obj.name,
              base_price: obj.base_price,
              image_url: obj.image_url,
              selling_unit: obj.selling_unit,
              slug: obj.slug,
              // rating: this.getStoredRating(obj.slug)
            }));
            this.items = results;
            this.generateRandomRating();
            console.log(this.items);
          });
      };

      recognition.onerror = (event) => {
        console.log("Recognition error:", event.error);
      };

      recognition.onend = () => {
        console.log("Recognition ended");
      };

      if (this.language === recognition.lang) {
        recognition.start();
      }
    },

    generateRandomRating() {
      const min = 3.9;
      const max = 5.0;
      this.items.forEach((item) => {
        item.rating = ((Math.random() * (max - min)) + min).toFixed(1);
      });
      // this.items.forEach((item) => {
      //   item.rating = ((Math.random() * (max - min)) + min).toFixed(1);
      //   this.storeRating(item.slug, item.rating); // Menyimpan rating ke localStorage
      // });
    },

    recommendationTranscript() {
      this.items = [];
      const q = this.transcript;
      console.log(this.transcript);
      fetch(`http://localhost:3000/api/search?q=${q}`)
        .then((response) => response.json())
        .then((data) => {
          const results = data.result.map((obj) => ({
            name: obj.name,
            base_price: obj.base_price,
            image_url: obj.image_url,
            selling_unit: obj.selling_unit,
            slug: obj.slug,
            // rating: this.getStoredRating(obj.slug)
          }));
          this.items = results;
          this.generateRandomRating();
          console.log(this.items);
        });
    },

    sortItems(sortBy) {
      if (sortBy === 'lowestPrice') {
        this.items.sort((a, b) => a.base_price - b.base_price);
      } else if (sortBy === 'highestPrice') {
        this.items.sort((a, b) => b.base_price - a.base_price);
      } else if (sortBy === 'Rating') {
        this.items.sort((a, b) => b.rating - a.rating);
      }
    },

    clearTranscript() {
      this.transcript = "";
    },

    detailTranscript(slug) {
      const that = this
      this.details = {}

      const q = slug;
      console.log(slug);
      fetch(`http://localhost:3000/api/detail?q=${q}`)
        .then((response) => response.json())
        .then((data) => {
          that.details = data
          console.log(that.details);
        });
    },

  // storeRating(slug, rating) {
  //   localStorage.setItem(`rating_${slug}`, rating); // Menyimpan rating ke localStorage dengan key yang unik berdasarkan slug
  // },
  // getStoredRating(slug) {
  //   return localStorage.getItem(`rating_${slug}`) || null; // Mengambil rating dari localStorage berdasarkan slug
  // }
}
})
