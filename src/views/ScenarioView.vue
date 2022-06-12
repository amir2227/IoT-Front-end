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
    <va-button
      icon-right="create"
      text-color="#45ffaa"
      @click="showNewModal = !showNewModal"
      >ایجاد</va-button
    >
  </div>
  <div>
    <va-modal
      v-model="showNewModal"
      title="ایجاد"
      size="large"
      hide-default-actions
      overlay-opacity="0.5"
    >
      <va-form style="width: 100%" tag="form" @submit.prevent="handleSubmit">
        <div class="row">
          <div class="flex md12 lg12">
            <va-card>
              <va-card-content style="width: 100%">
                <div>
                  <va-input
                    class="mb-4"
                    label="توضیحات"
                    v-model="description"
                  />
                </div>
              </va-card-content>
            </va-card>
          </div>
        </div>
        <div class="row">
          <div class="flex md6 lg6">
            <va-card>
              <va-card-content style="width: 100%">
                <div>
                  <va-input
                    class="mb-4"
                    label="توضیحات"
                    v-model="description"
                  />
                </div>
              </va-card-content>
            </va-card>
          </div>
          <div class="flex md6 lg6">
            <va-card>
              <va-card-content style="width: 100%">
                <div>
                  <va-input
                    class="mb-4"
                    label="توضیحات"
                    v-model="description"
                  />
                </div>
              </va-card-content>
            </va-card>
          </div>
        </div>
        <va-button type="submit" class="mt-2"> ثبت </va-button>
      </va-form>
    </va-modal>
  </div>
  <div class="flex md12 lg12">
    <div class="va-table-responsive">
      <table class="va-table va-table--hoverable va-table--clickable">
        <thead>
          <tr>
            <th>ردیف</th>
            <th>توضیحات</th>
            <th>تعداد سنسورها</th>
            <th>تعداد عملگرها</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(scenario, index) in scenarios" :key="scenario.id">
            <td>{{ index + 1 }}</td>
            <td>{{ scenario.description }}</td>
            <td>{{ scenario.effective_sensors.length }}</td>
            <td>{{ scenario.target_operators.length }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { API_URL } from "../constant";
import { getToken } from "../utility";
export default {
  data() {
    return {
      scenarios: [],
      showNewModal: false,
      description: null,
    };
  },
  methods: {
    fetchData() {
      const URL = API_URL + "/api/scenario";
      const token = getToken();
      this.axios
        .get(URL, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.scenarios = response.data;
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<style scoped>
.va-table {
  width: 100%;
}
.va-table th {
  font-weight: bolder;
  font-size: 15px;
}
.va-button {
  direction: initial;
  margin-right: 10%;
}
.va-input {
  margin-left: 6px;
}
.va-card {
  width: 100%;
  margin: 8px 2px 0 0;
}

</style>
<style>
.va-modal__inner{
    background: red;
}
</style>