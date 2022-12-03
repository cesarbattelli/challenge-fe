import { GetterTree, ActionTree, MutationTree } from "vuex";
import { MAX_COUNT, MIN_COUNT } from "~/constants/constants";

export const state = () => ({
  test: "hola",
  counters: process.client ? ,
});

export const mutations = {
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

  create(state, name) {
    const maxId = state.counters.length
      ? Math.max.apply(
          null,
          state.counters.map((c) => {
            return c.id;
          })
        )
      : 1;
    state.counters.push({ id: maxId + 1, name, count: 0 });
    if (process.client) {
      localStorage.setItem("counters", JSON.stringify(state.counters));
    }
  },

  remove(state, id) {
    const index = state.counters.findIndex((c) => c.id === id);
    if (index > -1) {
      state.counters.splice(index, 1);
    }
  },
};
