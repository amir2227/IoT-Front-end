<template>
  <va-data-table :items="sensors" />
</template>
<script>
import { API_URL } from "../constant";
import { getToken } from "../utility";

export default {
  data() {
    return {
      sensors: [],
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
};
</script>
