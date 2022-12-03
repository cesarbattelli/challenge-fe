<template>
  <div v-if="allCounters.length">
    <div class="orderRow">
      <div class="orderName">
        <div class="pointer" @click="sortCounters('name')">
          <font-awesome-icon :icon="['fas', 'sort']" />
          Ordenar por nombre
        </div>
      </div>
      <div class="orderCount">
        <div class="pointer" @click="sortCounters('count')">
          <font-awesome-icon :icon="['fas', 'sort']" />
          Ordernar por contador
        </div>
      </div>
      <div class="searchContainer">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        <input
          type="text"
          class="searchInput"
          placeholder="Buscar..."
          @keyup="search"
          v-model="searchTerm"
        />
      </div>

      <div class="filtersContainer">
        <filter-button></filter-button>
      </div>
    </div>

    <div class="filterRow">
      <div class="filter" v-for="(filter, index) in filters" :key="index">
        <span>
          {{
            `${filter.operator === "gt" ? "Mayor" : "Menor"} a ${filter.value}`
          }}
        </span>
        <span class="pointer iconDelete" @click="removeFilter(index)">
          <font-awesome-icon :icon="['fas', 'xmark']" />
        </span>
      </div>
    </div>

    <transition-group name="flip-list" tag="div">
      <Counter
        v-for="counter in filteredCounters"
        :key="counter.id"
        :id="counter.id"
        :name="counter.name"
        :count="counter.count"
      ></Counter>
    </transition-group>
    <div v-if="filteredCounters.length === 0" class="emptyMessage">
      Sin contadores que cumplan los filtros seleccionados
    </div>
  </div>
  <div v-else class="emptyMessage">Sin contadores registrados</div>
</template>

<script lang="ts">
import Vue from "vue";
import FilterButton from "~/components/FilterButton.vue";

export default Vue.extend({
  components: { FilterButton },
  name: "IndexPage",
  beforeCreate() {
    this.$store.commit("initializeStore");

    this.$store.subscribe((mutation, state) => {
      localStorage.setItem("counters", JSON.stringify(state.counters));
      sessionStorage.setItem("filters", JSON.stringify(state.filters));
    });
  },
  data() {
    return {
      orderParams: { param: "name", order: "asc" },
      isSorted: false,
      searchTerm: "",
    };
  },
  methods: {
    sortCounters(param: string) {
      this.orderParams = {
        param,
        order: this.orderParams.order === "asc" ? "desc" : "asc",
      };
    },
    removeFilter(index: number) {
      this.$store.commit("removeFilter", index);
    },
    search() {},
  },
  computed: {
    allCounters() {
      return this.$store.state.counters;
    },
    filteredCounters() {
      const filters = this.filters;

      const counterFilters: any = this.$store.state.counters.filter(
        (x: any) => {
          let match = true;
          // filters
          filters.map((f: any) => {
            if (f.operator === "gt") {
              match = x.count > f.value;
            } else {
              match = x.count < f.value;
            }
          });

          return (
            match &&
            x.name.toUpperCase().includes(this.searchTerm.toUpperCase())
          );
        }
      );

      if (this.orderParams.order === "asc") {
        return counterFilters.sort((a: any, b: any) =>
          a[this.orderParams.param] > b[this.orderParams.param] ? 1 : -1
        );
      } else {
        return counterFilters.sort((a: any, b: any) =>
          a[this.orderParams.param] < b[this.orderParams.param] ? 1 : -1
        );
      }
    },

    filters() {
      return this.$store.state.filters;
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
  /* justify-content: center; */
  align-content: center;
  align-items: center;
  /* padding: 0 10px 0 10px; */
}
@media (max-width: 500px) {
  .orderRow {
    display: inline-block;
  }
  .filtersContainer {
    justify-content: flex-start !important;
    margin-bottom: 10px !important;
  }

  .filterRow {
    justify-content: flex-start !important;
    flex-wrap: wrap;
    overflow-x: auto;
  }

  .filter {
    margin-bottom: 10px;
  }
}

.filterRow {
  color: rgb(139, 137, 137);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px;
}

.orderName {
  margin-bottom: 10px;
  margin-right: 20px;
  min-width: 190px;
}

.orderCount {
  margin-bottom: 10px;
  margin-right: 20px;
  min-width: 190px;
}

.filtersContainer {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
}

.filter {
  color: #fff;
  background-color: #7178df;
  padding: 5px 10px 5px 10px;
  border-radius: 25px;
  font-size: 0.8rem;
  margin-right: 10px;
  min-width: 75px;
  text-align: center;
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

.iconDelete:hover {
  color: tomato;
}

.searchContainer {
  margin-bottom: 10px;
  margin-right: 20px;
  min-width: 190px;
}

.searchInput {
  background-color: #222;
  border: none;
  border-bottom: 1px solid #777a7a;
  color: #777a7a;
}
</style>
