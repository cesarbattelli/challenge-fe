import { MAX_COUNT, MIN_COUNT } from "~/constants/constants";

export const state = () => ({
  counters: [],
  filters: [],
});

export const mutations = {
  initializeStore(state) {
    state.counters =
      process.client && localStorage.getItem("counters")
        ? JSON.parse(localStorage.getItem("counters"))
        : [];
    state.filters =
      process.client && sessionStorage.getItem("filters")
        ? JSON.parse(sessionStorage.getItem("filters"))
        : [];
  },
  increment(state, id) {
    const counter = state.counters.find((c) => {
      return c.id === id;
    });
    counter.count < MAX_COUNT && counter.count++;
  },

  decrement(state, id) {
    const counter = state.counters.find((c) => c.id === id);
    counter.count > MIN_COUNT && counter.count--;
  },

  createCounter(state, name) {
    const maxId = state.counters.length
      ? Math.max.apply(
          null,
          state.counters.map((c) => {
            return c.id;
          })
        )
      : 1;
    state.counters.push({ id: maxId + 1, name, count: 0 });
  },

  removeCounter(state, id) {
    const index = state.counters.findIndex((c) => c.id === id);
    if (index > -1) {
      state.counters.splice(index, 1);
    }
  },

  createFilter(state, { value, operator }) {
    state.filters.push({ operator, value });
  },

  removeFilter(state, index) {
    state.filters.splice(index, 1);
  },
};
