<template>
  <div class="pointer filterLabel" @click="addFilter()">
    <font-awesome-icon class="iconButton white" :icon="['fas', 'filter']" />
    Nuevo filtro
  </div>
</template>

<script>
import { MAX_COUNT, MIN_COUNT } from "~/constants/constants";
export default {
  name: "FilterButton",
  methods: {
    async addFilter() {
      const { value } = await this.$swal.fire({
        title: "Nuevo filtro",
        html: `<div class="filtersInputs">
            <select id="operator"class="swal2-input no-margin">
              <option value="gt">Mayor</option>
              <option value="lt">Menor</option>
              </select>
          <input id="value" class="swal2-input no-margin">
          </div>`,
        showCancelButton: true,
        preConfirm: () => {
          const operator = document.getElementById("operator").value;
          const value = document.getElementById("value").value;

          if (!value) {
            this.$swal.showValidationMessage(`Valor requerido`);
          } else if (value < MIN_COUNT || value > MAX_COUNT) {
            this.$swal.showValidationMessage(
              `El valor debe estar entre ${MIN_COUNT} y ${MAX_COUNT}`
            );
          } else {
            return { operator, value };
          }
        },
      });

      if (value) {
        this.$store.commit("createFilter", { ...value });
      }
    },
  },
};
</script>

<style>
.filterLabel {
  display: flex;
  justify-content: flex-end;
}
.filtersInputs {
  display: flex;
  justify-content: center;
}
.swal2-input {
  font-size: 1rem !important;
}

.no-margin {
  margin: 10px !important;
}

.iconButton {
  margin-right: 5px;
}
</style>
