<template>
  <div class="va-table-responsive">
    <table class="va-table va-table--hoverable">
      <thead>
        <tr>
          <th>ردیف</th>
          <th>نام</th>
          <th>نوع</th>
          <th>لوکیشن</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sensor, index) in sensors" :key="sensor.id">
          <td>{{ index + 1 }}</td>
          <td>{{ sensor.name }}</td>
          <td>{{ sensor.type }}</td>
          <td v-if="sensor.location != null">{{ sensor.location.name }}</td>
          <td v-else></td>
          <td>
            <ButtonGroup 
            :sensor-id="sensor.id" 
            :edit-comp="Edit"
            :fetch-data="fetchData"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div></div>
</template>
<script>
import { API_URL } from "../constant";
import { getToken } from "../utility";
import ButtonGroup from "../components/ButtonGroup.vue";
import EditSensor from "../components/EditSensor.vue";

export default {
  data() {
    return {
      sensors: [],
      value: 1,
      pageSize: 3,
      currentPage: 1,
      Edit: EditSensor,
    };
  },
  methods: {
    fetchData() {
      const login_URL = API_URL + "/api/device/sensor";
      const token = getToken();
      this.axios
        .get(login_URL, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.sensors = response.data;
          this.value = response.data.length;
        });
    },
    nextPage: function () {
      if (this.currentPage * this.pageSize < this.sensors.length)
        this.currentPage++;
    },
    prevPage: function () {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
  mounted() {
    this.fetchData();
  },
  components: { ButtonGroup, EditSensor },
};
</script>
<style scoped>
.va-table {
  width: 100%;
}
</style>