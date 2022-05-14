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
    <div>
      <va-modal
      v-model="showNewModal"
      title="ایجاد"
      hide-default-actions
      overlay-opacity="0.5"
      >
        <div class="row">
    <div class="flex md6 lg12">
      <va-card>
        <va-card-title>مشخصات</va-card-title>
        <va-card-content>
          <div>
            <va-form
              style="width: 300px"
              tag="form"
              @submit.prevent="handleSubmit"
            >
              <va-input class="mb-4" label="نام" v-model="Oname" />
              <va-input class="mb-4" label="نوع" v-model="type" />
              <va-input label="لوکیشن" v-model="location_id" />
              <va-button type="submit" class="mt-2"> ثبت </va-button>
            </va-form>
          </div>
        </va-card-content>
      </va-card>
    </div>
  </div>
  
      </va-modal>
    </div>
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
          <td v-if="operator.location != null">{{ operator.location.name }}</td>
          <td v-else></td>
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
      Oname: "",
      type: "",
      location_id: null,
      showNewModal: false,
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
    handleSubmit() {
      const URL = API_URL + "/api/device/operator";
      const token = getToken();
      this.axios
        .post(
          URL,
          {
            name: this.Oname,
            type: this.type,
            location_id: this.location_id,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.$vaToast.init({
              message: "با موفقیت ایجاد شد" + this.name,
              color: "success",
              duration: 4000,
              position: "top-left",
            });
            this.showNewModal = !this.showNewModal;
            this.fetchData();
          }
        })
        .catch((error) => {
          const { response } = error;
          Object.keys(response.data).map((e) => {
            this.$vaToast.init({
              message: `${e} : ${response.data[e]}`,
              color: "danger",
              duration: 5000,
              position: "top-left",
            });
          });
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
.va-button{
  direction: initial;
  margin-right: 10%;
}
.va-input{
  margin-left: 6px;
}
</style>