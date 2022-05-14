 <template >
  <div class="va-table-responsive">
    <table class="va-table va-table--hoverable">
      <thead>
        <tr>
          <th>ردیف</th>
          <th>تاریخ</th>
          <th>وضعیت</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(history, index) in operatorHistory" :key="history.id">
          <td>{{ index + 1 }}</td>
          <td>
            {{ new Date(history.updated_at).toLocaleDateString("fa-IR") }}
          </td>
          <td v-if="history.state == true">
            <va-icon name="radio_button_checked" color="#03fc0b" class="mr-4" />
          </td>
          <td v-else>
            <va-icon name="radio_button_checked" color="#d44242" class="mr-4" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { API_URL } from "../constant";
import { getToken } from "../utility";
export default {
  data() {
    return {
      operatorHistory: [],
    };
  },
  methods: {
    showHistory() {
      this.showHistoryModal = !this.showHistoryModal;
      const URL =
        API_URL + "/api/device/operator/" + this.operatorId + "/history";
      const token = getToken();
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
    },
  },
  mounted() {
    this.showHistory();
  },
  props: ["operatorId", "hideModal"],
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