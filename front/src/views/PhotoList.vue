<template>
  <div>
    <Hero></Hero>
    <div class="container">
      <div class="is-3-columns-grid">
        <div>
          <Photo v-for="item in column_1_photoData" :key="item.id" :item="item" />
        </div>
        <div>
          <Photo v-for="item in column_2_photoData" :key="item.id" :item="item" />
        </div>
        <div>
          <Photo v-for="item in column_3_photoData" :key="item.id" :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Photo from "../components/Photo";
import Hero from "../components/Hero";
import { mapGetters } from "vuex";

export default {
  components: {
    Photo,
    Hero
  },
  data() {
    return {
      column_1_photoData: null,
      column_2_photoData: null,
      column_3_photoData: null,
      params: {
        photo: {
          account_id: 9
        }
      }
    };
  },
  methods: {
    async getPhotoLists() {
      console.log("start get photo data");
      const response = await axios.get("/photos", this.params);
      console.log(response);
      let i = 3;
      let column_1_photoData = [];
      let column_2_photoData = [];
      let column_3_photoData = [];

      for (let item of response.data) {
        if (i % 3 === 0) {
          column_1_photoData.push(item);
        }
        if (i % 3 === 1) {
          column_2_photoData.push(item);
        }
        if (i % 3 === 2) {
          column_3_photoData.push(item);
        }
        i++;
      }

      this.column_1_photoData = column_1_photoData;
      this.column_2_photoData = column_2_photoData;
      this.column_3_photoData = column_3_photoData;
    }
  },
  computed: {
    ...mapGetters({ currentUserID: "auth/currentUserID" })
  },
  watch: {
    $route: {
      async handler() {
        await this.getPhotoLists();
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.is-3-columns-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(338px, 1fr));
  grid-column-gap: 15px;
}
</style>
