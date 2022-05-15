<template>
  <!-- <va-button-group flat class="mb-4"> -->
  <div>
    <va-button icon="visibility" color="info" @click="showHistory" />
    <va-modal
      v-model="showHistoryModal"
      title="گزارش"
      hide-default-actions
      overlay-opacity="0.5"
    >
      <div class="va-table-responsive">
        <table class="va-table va-table--hoverable">
          <thead>
            <tr>
              <th>ردیف</th>
              <th>تاریخ</th>
              <th>ساعت</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(history, index) in operatorHistory" :key="history.id">
              <td>{{ index + 1 }}</td>
              <td>
                {{ new Date(history.updated_at).toLocaleDateString("fa-IR") }}
              </td>
              <td>
                {{ getTime(history.updated_at) }}
              </td>
              <td v-if="history.state == true">
                <va-icon
                  name="radio_button_checked"
                  color="#03fc0b"
                  class="mr-4"
                />
              </td>
              <td v-else-if="history.state == false">
                <va-icon
                  name="radio_button_checked"
                  color="#d44242"
                  class="mr-4"
                />
              </td>
              <td v-else>{{ history.data }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </va-modal>
    <va-modal
      v-model="showChartModal"
      title="گزارش"
      hide-default-actions
      overlay-opacity="0.5"
    >
      <div class="container">
        <div class="row mt-5" v-if="sensorData.length > 0">
          <div class="col">
            <h2>نمودار سنسور</h2>
            <line-chart :chartData="sensorData" :options="chartOptions" :label="chart"></line-chart>
          </div>
        </div>
      </div>
    </va-modal>
    <va-button icon="edit" color="info" @click="showModal = !showModal" />

    <va-modal
      v-model="showModal"
      title="ویرایش"
      hide-default-actions
      overlay-opacity="0.5"
    >
      <component
        :is="{ ...editComp }"
        :operator-id="operatorId"
        :fetch-data="fetchData"
        :hide-modal="closeModal"
        :sensor-id="sensorId"
      ></component>
    </va-modal>
    <va-button
      icon="delete"
      color="danger"
      @click="showDeleteModal = !showDeleteModal"
    />
    <va-modal
      v-model="showDeleteModal"
      title="حذف"
      hide-default-actions
      overlay-opacity="0.5"
    >
      <va-alert color="danger" icon="info" center class="mb-4">
        آیا از حذف این مورد مطمئنید؟
      </va-alert>
      <va-button outline text-color="#ff1100" @click="deleteOperator"
        >بلی</va-button
      >
      <va-button
        outline
        text-color="#000000"
        @click="showDeleteModal = !showDeleteModal"
        >خیر</va-button
      >
    </va-modal>
  </div>
</template>

<script>
import { API_URL } from "../constant";
import { getToken } from "../utility";
import LineChart from "./LineChart.vue";

export default {
  data() {
    return {
      showModal: false,
      showDeleteModal: false,
      showHistoryModal: false,
      showChartModal: false,
      operatorHistory: [],
      sensorData: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  components: { LineChart },
  methods: {
    showHistory() {
      let URL = "";
      const token = getToken();
      if (this.operatorId) {
        URL = API_URL + "/api/device/operator/" + this.operatorId + "/history";
        this.axios
          .get(URL, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              this.operatorHistory = response.data.results;
            }
          });
        this.showHistoryModal = !this.showHistoryModal;
      } else if (this.sensorId) {
        URL = API_URL + "/api/device/sensor/" + this.sensorId + "/history";
        this.axios
          .get(URL, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              response.data.results.forEach((element) => {
                const date =
                  new Date(element.updated_at).toLocaleDateString("fa-IR") +
                  " " +
                  this.getTime(element.updated_at);

                this.sensorData.push({ date, total: element.data });
              });
              console.log(this.sensorData);
            }
          });
        this.showChartModal = !this.showChartModal;
      }
    },

    closeModal() {
      this.showModal = !this.showModal;
    },
    deleteOperator() {
      let URL = "";
      if (this.operatorId)
        URL = API_URL + "/api/device/operator/" + this.operatorId;
      else if (this.sensorId)
        URL = API_URL + "/api/device/sensor/" + this.sensorId;
      const token = getToken();
      this.axios
        .delete(URL, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.$vaToast.init({
              message: "با موفقیت حذف شد",
              color: "success",
              duration: 4000,
              position: "top-left",
            });
            this.showDeleteModal = !this.showDeleteModal;
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
    getTime(timestamp) {
      const d = new Date(timestamp);
      let h = d.getHours();
      let m = d.getMinutes();
      let s = d.getSeconds();
      if (m < 10) m = "0" + m;
      if (h < 10) h = "0" + h;
      if (s < 10) s = "0" + s;
      const t = h + ":" + m + ":" + s;
      return t;
    },
  },

  props: ["editComp", "operatorId", "fetchData", "sensorId"],
};
</script>

<style scoped>
.va-button {
  margin-left: 9px;
}

.va-modal .va-alert {
  padding: 25px;
}
</style>