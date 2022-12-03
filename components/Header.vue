<template>
  <div class="container">
    <button class="btn" @click="create" :disabled="disableCreation">
      Nuevo contador
    </button>
  </div>
</template>

<script>
import { MAX_COUNTERS } from "~/constants/constants";

export default {
  name: "Header",

  methods: {
    async create() {
      // this.$swal("Success!", "Transaction was successful", "success");
      const { value: nameInput } = await this.$swal.fire({
        input: "text",
        title: "Nuevo contador",
        inputPlaceholder: "Ingrese un nombre",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "El nombre es requerido";
          } else if (value.length > 20) {
            return "El nombre no puede contener más de 20 caracteres";
          }
        },
      });

      if (nameInput) {
        this.$store.commit("create", nameInput);
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
  display: flex;
  height: 50px;
  background-color: #7600e4;
  justify-content: flex-end;
  align-items: center;
}

.btn {
  height: 30px;
  margin: 10px;
  cursor: pointer;
  border: none;
  color: white;
  background-color: #7178df;
  padding: 0 10px 0 10px;
}

.btn:hover {
  background-color: #f6f8;
}
</style>
