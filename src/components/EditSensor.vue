 <template >
  <div class="row">
    <div class="flex md6 lg12">
      <va-card>
        <va-card-title> مشخصات سنسور</va-card-title>
        <va-card-content>
          <div>
            <va-form
              style="width: 300px"
              tag="form"
              @submit.prevent="handleSubmit"
            >
              <va-input class="mb-4" label="نام" v-model="name" />
              <va-input class="mb-4" label="نوع" v-model="type" />
              <va-input label="لوکیشن" v-model="location_id" />
              <va-button type="submit" class="mt-2"> ثبت </va-button>
            </va-form>
          </div>
        </va-card-content>
      </va-card>
    </div>
  </div>
  <div class="row">
    <div class="flex md6 lg12"></div>
  </div>
</template>
<script>
import { API_URL } from "../constant";
import { getToken } from "../utility";

export default {
  data() {
    return {
      sensor: {},
      state: true,
      name: "",
      type: "",
      location: null,
      location_id: null,
    };
  },
  mounted() {
    const URL = API_URL + "/api/device/sensor/" + this.sensorId;
    const token = getToken();
    this.axios
      .get(URL, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        this.state = response.data.state;
        this.name = response.data.name;
        this.type = response.data.type;
        this.location = response.data.location;
      });
  },
  props: ["sensorId", "fetchData", "hideModal"],
  methods: {
    handleSubmit() {
      const URL = API_URL + "/api/device/sensor/" + this.sensorId;
      const token = getToken();
      this.axios
        .patch(
          URL,
          {
            name: this.name,
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
          this.fetchData();
          this.hideModal();
        })
        .catch((error) => {});
    },
  },
};
</script>
<style scoped>
.va-switch {
  direction: ltr;
}
.row {
  margin-top: 6px;
}
</style>