<template>
  <div class="container">
    <span class="total">
      Total: <span class="totalNum">{{ total }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    total() {
      return this.$store.state.counters.reduce((total, counter) => {
        total += counter.count;
        return total;
      }, 0);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  height: 50px;
  background-color: #7600e4;
  justify-content: flex-end;
  align-items: center;
}
.total {
  margin-right: 120px;
  color: #e2d7d7;
  align-items: center;
  display: flex;
}
.totalNum {
  margin-left: 5px;
  font-size: 2rem;
}
</style>
