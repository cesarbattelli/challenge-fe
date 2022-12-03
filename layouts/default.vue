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
  position: fixed;
  top: 0px;
  height: 10vh;
  width: 100%;
}
.main {
  background-color: #222;
  color: #fff;
  padding: 60px 40px 60px 40px;
  min-height: 80vh;
  overflow: scroll;
}

.footer {
  position: fixed;
  bottom: 0px;
  height: 10vh;
  width: 100%;
}
</style>
