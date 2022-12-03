<template>
  <div class="container">
    <button class="btn" @click="create" :disabled="disableCreation">
      Nuevo contador
    </button>
  </div>
</template>

<script>
import { MAX_COUNTERS, MAX_COUNTER_NAME_LENGTH } from "~/constants/constants";

export default {
  name: "Header",

  methods: {
    async create() {
      const { value: nameInput } = await this.$swal.fire({
        input: "text",
        title: "Nuevo contador",
        inputPlaceholder: "Ingrese un nombre",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "El nombre es requerido";
          } else if (value.length > MAX_COUNTER_NAME_LENGTH) {
            return `El nombre no puede contener más de ${MAX_COUNTER_NAME_LENGTH} caracteres`;
          }
        },
      });

      if (nameInput) {
        this.$store.commit("createCounter", nameInput);
      }
    },
  },
  computed: {
    disableCreation() {
      return this.$store.state.counters.length === MAX_COUNTERS;
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

.btn {
  background-color: #7178df;
  border: none;
  color: white;
  cursor: pointer;
  height: 30px;
  margin: 10px;
  padding: 0 10px 0 10px;
}

.btn:hover {
  background-color: #f6f8;
}

.filter {
  border-radius: 8px;
  border: 1px solid #fff;
  color: #fafafa;
  padding: 10px;
}
</style>
