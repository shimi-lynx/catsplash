<template>
  <div>
    <h3>Photo List</h3>

    <br />
    <b-button @click="replaceTest" type="is-warning">get</b-button>
    <p>{{hoge}}</p>
    <br />
    <p>{{fuga}}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      hoge: "",
      fuga: ""
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
    },
    getStateUser() {
      this.hoge = this.$store.state.auth.user;
      this.fuga = this.$store.state.auth.header;
    },
    replaceTest() {
      const targetUrl =
        "https://shimi-lynx-cat.s3.ap-northeast-1.amazonaws.com/uploads/photo/hogehoge/fugafuga.jpg";
      this.hoge = process.env.VUE_APP_S3_URL;
      this.fuga = targetUrl.replace(process.env.VUE_APP_S3_URL, "");
    }
  }
};
</script>
