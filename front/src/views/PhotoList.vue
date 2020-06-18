<template>
  <div class="container">
    <div class="columns is-multiline">
      <Photo v-for="item in itemUrls" :key="item.id" :src="item.filename" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Photo from "../components/Photo";

export default {
  components: {
    Photo
  },
  data() {
    return {
      itemUrls: null
    };
  },
  methods: {
    async getPhotoLists() {
      const response = await axios.get("/photos");
      this.itemUrls = response.data;
    }
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
