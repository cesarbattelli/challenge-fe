<template>
  <div>
    <Header class="header"></Header>
    <div class="main">
      <Nuxt />
    </div>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
export default {
  name: "default",
};
</script>

<style scoped>
.header {
  height: 10vh;
  position: fixed;
  top: 0px;
  width: 100%;
}
.main {
  background-color: #222;
  color: #fff;
  min-height: 80vh;
  overflow: scroll;
  padding: 60px 40px 60px 40px;
}

.footer {
  bottom: 0px;
  height: 10vh;
  position: fixed;
  width: 100%;
}
</style>
