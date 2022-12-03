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
  align-items: center;
  background-color: #7600e4;
  display: flex;
  height: 50px;
  justify-content: flex-end;
}
.total {
  align-items: center;
  color: #e2d7d7;
  display: flex;
  margin-right: 120px;
}
.totalNum {
  font-size: 2rem;
  margin-left: 5px;
}
</style>
