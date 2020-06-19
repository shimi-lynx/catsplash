<template>
  <figure class="figure_padding">
    <img :src="`${s3url}${src}`" />
  </figure>
</template>

<script>
export default {
  props: ["src"],
  data() {
    return {
      s3url: process.env.VUE_APP_S3_URL
    };
  }
};
</script>

<style scoped>
.figure_padding {
  padding-bottom: 8px;
}
</style>
