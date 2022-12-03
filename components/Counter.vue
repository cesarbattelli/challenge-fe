<template>
  <div>
    <div class="container">
      <div class="name">{{ name }}</div>
      <div class="counter">
        <!-- <button @click="decrement"> -->
        <font-awesome-icon
          class="iconButton"
          @click="decrement"
          :icon="['fas', 'minus']"
        />
        <!-- </button> -->
        <div class="count">{{ count }}</div>
        <font-awesome-icon
          class="iconButton"
          @click="increment"
          :icon="['fas', 'plus']"
        />
      </div>
      <div class="actions">
        <font-awesome-icon
          @click="remove"
          class="pointer red"
          :icon="['fas', 'trash']"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Counter",
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  methods: {
    increment() {
      this.$store.commit("increment", this.id);
    },
    decrement() {
      this.$store.commit("decrement", this.id);
    },
    remove() {
      this.$store.commit("remove", this.id);
    },
  },
};
</script>

<style scoped>
.container {
  flex: 1;
  height: 50px;
  background-color: #fafafa;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 10px;
  color: #000;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 0 20px 0 20px;
}
.name {
  flex: 1;
  font-size: 1.5rem;
}
.counter {
  display: flex;
  margin: 10px;
  width: 80px;
  text-align: center;
}
.count {
  width: 30px;
}
</style>
