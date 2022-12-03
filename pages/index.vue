<template>
  <div v-if="counters.length">
    <div class="orderRow">
      <div class="orderName">
        <div class="pointer" @click="sortCounters('name')">
          <font-awesome-icon :icon="['fas', 'sort']" style="font-size: 20px" />
          Ordenar por nombre
        </div>
      </div>
      <div class="orderCount">
        <div class="pointer" @click="sortCounters('count')">
          <font-awesome-icon :icon="['fas', 'sort']" style="font-size: 20px" />
          Ordernar por contador
        </div>
      </div>
    </div>

    <transition-group name="flip-list" tag="div">
      <Counter
        v-for="counter in counters"
        v-bind:key="counter.id"
        :id="counter.id"
        :name="counter.name"
        :count="counter.count"
      ></Counter>
    </transition-group>
  </div>
  <div v-else class="emptyMessage">Sin contadores registrados</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "IndexPage",
  data() {
    return {
      orderParams: { param: "name", order: "asc" },
      isSorted: false,
    };
  },
  methods: {
    sortCounters(param: string) {
      this.orderParams = {
        param,
        order: this.orderParams.order === "asc" ? "desc" : "asc",
      };
      console.log(
        "🚀 ~ file: index.vue:37 ~ sortCounters ~ this.orderParams",
        this.orderParams
      );
    },
  },
  computed: {
    counters() {
      const c: any = this.$store.state.counters.filter((x: any) => {
        return true;
      });
      console.log("🚀 ~ file: index.vue:43 ~ counters ~ c", this.orderParams);

      if (this.orderParams.order === "asc") {
        return c.sort((a: any, b: any) =>
          a[this.orderParams.param] > b[this.orderParams.param] ? 1 : -1
        );
      } else {
        return c.sort((a: any, b: any) =>
          a[this.orderParams.param] < b[this.orderParams.param] ? 1 : -1
        );
      }
    },
  },
});
</script>

<style scoped>
.orderRow {
  flex: 1;
  height: 30px;
  margin: 10px;
  color: rgb(139, 137, 137);
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 0 10px 0 10px;
}
@media (max-width: 500px) {
  .orderRow {
    display: inline-block;
  }
}

.orderName {
  flex: 1;
}

.flip-list-move {
  transition: transform 0.5s;
}

.emptyMessage {
  text-align: center;
  font-style: italic;
  color: #777a7a;
  margin-top: 100px;
}
</style>
