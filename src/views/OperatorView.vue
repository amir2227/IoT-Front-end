<template>
  <div class="row">
    <va-input
      class="flex mb-2 md3"
      type="number"
      placeholder="Items..."
      label="Items per page"
      v-model.number="perPage"
    />

    <va-input
      class="flex mb-2 md3"
      type="number"
      placeholder="Page..."
      label="Current page"
      v-model.number="currentPage"
    />

    <va-input
      class="flex mb-2 md3"
      placeholder="Filter..."
      v-model="filter"
      @change="bb"
    />
  </div>
  <div class="va-table-responsive">
    <table class="va-table va-table--hoverable">
      <thead>
        <tr>
          <th>ردیف</th>
          <th>نام</th>
          <th>نوع</th>
          <th>لوکیشن</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="operator in operators" :key="operator.id">
          <td>{{ operator.id }}</td>
          <td>{{ operator.name }}</td>
          <td>{{ operator.type }}</td>
          <td>{{ operator.location }}</td>
          <td>
            <ButtonGroup />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { API_URL } from "../constant";
import { getToken } from "../utility";
import ButtonGroup from "../components/ButtonGroup.vue";

export default {
  data() {
    return {
      operators: [],
      perPage: 3,
      currentPage: 1,
      filter: "",
    };
  },

  mounted() {
    const URL = API_URL + "/api/device/operator";
    const token = getToken();
    this.axios
      .get(URL, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.operators = response.data.data;
      });
  },
  components: { ButtonGroup },
};
</script>
<style scoped>
.va-table {
  width: 100%;
}
</style>