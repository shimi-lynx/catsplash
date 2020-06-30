<template>
  <section class="hero is-large hero__background">
    <div class="hero-body">
      <div class="container">
        <h1 class="title has-text-white">Cat Splash</h1>
        <h2 class="subtitle has-text-white">猫画像投稿サイト</h2>
        <h2 class="subtitle has-text-white">
          個人制作の
          <a
            class="has-text-white font__underline"
            href="https://github.com/shimi-lynx/catsplash"
            target="_blank"
          >ポートフォリオサイト</a>
          です。
        </h2>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero__background {
  margin-bottom: 40px;
  background-image: url("https://shimi-lynx-cat.s3-ap-northeast-1.amazonaws.com/catdeilaDbkdelQPiryNbArggga.jpg");
  background-size: cover;
  background-position: center;
}

.font__underline {
  text-decoration: underline;
  text-decoration-color: #ffffff;
}
</style>