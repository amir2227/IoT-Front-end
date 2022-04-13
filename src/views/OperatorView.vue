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
      @keyup="fetchData"
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
          <th>وضعیت</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(operator, index) in operators" :key="operator.id">
          <td>{{ index + 1 }}</td>
          <td>{{ operator.name }}</td>
          <td>{{ operator.type }}</td>
          <td>{{ operator.location }}</td>
          <td v-if="operator.state == true">
            <va-icon name="radio_button_checked" color="#03fc0b" class="mr-4" />
          </td>
          <td v-else>
            <va-icon name="radio_button_checked" color="#d44242" class="mr-4" />
          </td>

          <td>
            <ButtonGroup
              :edit-comp="Edit"
              :operator-id="operator.id"
              :fetch-data="fetchData"
            />
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
import EditOperator from "../components/EditOperator.vue";

export default {
  data() {
    return {
      operators: [],
      perPage: 3,
      currentPage: 1,
      filter: "",
      Edit: EditOperator,
    };
  },
  methods: {
    fetchData() {
      const URL = API_URL + "/api/device/operator/?key=" + this.filter;
      const token = getToken();
      this.axios
        .get(URL, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.operators = response.data.data;
        });
    },
  },
  mounted() {
    this.fetchData();
  },
  components: { ButtonGroup, EditOperator },
};
</script>
<style scoped>
.va-table {
  width: 100%;
}
</style>