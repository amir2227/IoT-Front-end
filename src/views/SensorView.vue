<template>
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
      <tr v-for="sensor in sensors" :key="sensor.id">
        <td>{{sensor.id}}</td>
        <td>{{sensor.name}}</td>
        <td>{{sensor.type}}</td>
        <td>{{sensor.location}}</td>
        <td>
          <ButtonGroup />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div>
    <va-pagination
      :visible-pages="7"
      v-model="value"
      :total="100"
      boundary-numbers
      :page-size="3"
    />
    Current value: {{ value }}
  </div>
</template>
<script>
import { API_URL } from "../constant";
import { getToken } from "../utility";
import ButtonGroup from "../components/ButtonGroup.vue";

export default {
    data() {
        return {
            sensors: [],
            value: 1
        };
    },
    mounted() {
        const login_URL = API_URL + "/api/device/sensor";
        const token = getToken();
        this.axios
            .get(login_URL, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((response) => {
            console.log(response.data);
            this.sensors = response.data;
            
        });
    },
    components: { ButtonGroup }
};
</script>
<style scoped>
.va-table {
width: 100%;
}

</style>