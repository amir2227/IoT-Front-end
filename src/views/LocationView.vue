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
      @keyup="fetchLocationData"
    />
    <va-button
      icon-right="create"
      text-color="#45ffaa"
      @click="showLocationModal = !showLocationModal"
      >ایجاد</va-button
    >
  </div>
  <div>
    <va-modal
      v-model="showLocationModal"
      title="ایجاد"
      hide-default-actions
      overlay-opacity="0.5"
    >
      <div class="row">
        <div class="flex md12 lg12">
          <va-card>
            <va-card-title>مشخصات</va-card-title>
            <va-card-content>
              <div>
                <va-form
                  style="width: 300px"
                  tag="form"
                  @submit.prevent="handleSubmit"
                >
                  <va-input class="mb-4" label="نام" v-model="name" />
                  <va-input class="mb-4" label="نوع" v-model="type" />
                  <div style="max-width: 300px">
                    <va-select
                      class="mb-4"
                      label="انتخاب والد"
                      :options="options"
                      v-model="parent_id"
                      :track-by="(option) => option.value"
                      :value="(option) => option.value"
                      searchable
                    />
                  </div>
                  <va-button type="submit" class="mt-2"> ثبت </va-button>
                </va-form>
              </div>
            </va-card-content>
          </va-card>
        </div>
      </div>
    </va-modal>
  </div>
  <div class="va-table-responsive">
    <table class="va-table va-table--hoverable">
      <thead>
        <tr>
          <th>ردیف</th>
          <th>نام</th>
          <th>نوع</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(location, index) in locations" :key="location.id">
          <td>{{ index + 1 }}</td>
          <td>{{ location.name }}</td>
          <td>{{ location.type }}</td>

          <td>
            <ButtonGroup
              :edit-comp="Edit"
              :location-id="location.id"
              :fetch-location-data="fetchLocationData"
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
      locations: [],
      options: [],
      showLocationModal: false,
      perPage: 3,
      name: "",
      type: "",
      value: "",
      parent_id: null,
      currentPage: 1,
      filter: "",
      Edit: EditOperator,
    };
  },
  methods: {
    fetchLocationData() {
      const URL = API_URL + "/api/device/location/?key=" + this.filter;
      const token = getToken();
      this.axios
        .get(URL, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.locations = response.data.data;
        });
    },
    handleSubmit() {
      const URL = API_URL + "/api/device/location";
      const token = getToken();
      this.axios
        .post(
          URL,
          {
            name: this.name,
            type: this.type,
            parent_id: this.parent_id,
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
            this.showLocationModal = !this.showLocationModal;
            this.fetchLocationData();
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
  watch: {
    locations(newLocations, oldLocations) {
      newLocations.length > 0 &&
        this.locations.map((loc) =>
          this.options.push({ text: loc.name, textBy: loc.type, value: loc.id })
        );

      console.log("fuck befor");
      console.log(this.options);
      console.log("fuck");
    },
  },
  mounted() {
    this.fetchLocationData();
  },
  components: { ButtonGroup, EditOperator },
};
</script>
<style scoped>
.va-table {
  width: 100%;
}
.va-button {
  direction: initial;
  margin-right: 40px;
}
</style>