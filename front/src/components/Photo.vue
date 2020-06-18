<template>
  <div class="column is-4">
    <figure>
      <img :src="`${s3url}${src}`" />
    </figure>
  </div>
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
