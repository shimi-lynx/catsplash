<template>
  <div>
    <h3>Photo List</h3>
    <b-button @click="getstorage" type="is-warning">get json</b-button>
    <p>{{hoge}}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      hoge: ""
    };
  },
  methods: {
    async getjson() {
      const HOGE = await axios.get("/photos", {
        headers: this.$store.state.auth.header
      });
      console.log(this.$store.state.auth.header);
      this.hoge = HOGE;
    },
    getstorage() {
      if (sessionStorage.AuthData) {
        this.hoge = JSON.parse(sessionStorage.getItem("AuthData"));
        // this.hoge = this.hoge.auth.header.client;
      } else {
        this.hoge = "NULLだよー";
      }

      console.log(sessionStorage);
    }
  }
};
</script>
