
 <template>
  <div class="row">
    <div class="flex md6 lg6">
      <va-card stripe stripe-color="success">
        <va-card-content>
          <h4>
            نام کاربری: <span> {{ user.username }} </span>
          </h4>
        </va-card-content>
      </va-card>
    </div>
    <div class="flex md6 lg6">
      <va-card stripe stripe-color="success">
        <va-card-content>
          <h4>
            نام و نام خانوادگی: <span> {{ user.fullname }} </span>
          </h4>
        </va-card-content>
      </va-card>
    </div>
    <div class="row">
      <div class="flex md6 lg6">
        <va-card stripe stripe-color="success">
          <va-card-content>
            <h4>
              شماره همراه: <span>{{ user.phone }}</span>
            </h4>
          </va-card-content>
        </va-card>
      </div>
      <div class="flex md6 lg6">
        <va-card stripe stripe-color="success">
          <va-card-content>
            <h4>
              سطح دسترسی:
              <span v-for="role in user.roles" :key="role.id">{{
                role.name
              }}</span>
            </h4>
          </va-card-content>
        </va-card>
      </div>
    </div>
  </div>
  <div class="row" style="margin-top: 28px">
    <div class="flex md12 lg12">
      <va-card stripe stripe-color="danger">
        <va-card-content>
          <h4>
            توکن: <span :hidden="hidden_token">{{ user.token }}</span>
            <va-button
              :rounded="false"
              text-color="#09ff00"
              class="mr-4"
              :hidden="!hidden_token"
              @click="hidden_token = !hidden_token"
              >نمایش</va-button
            >
          </h4>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>
<script>
import { API_URL } from "../constant";
import { getToken } from "../utility";
export default {
  data() {
    return {
      user: [],
      hidden_token: true,
    };
  },
  methods: {
    fetchUserData() {
      const URL = API_URL + "/api/user/profile";
      const token = getToken();
      this.axios
        .get(URL, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.user = response.data;
        });
    },
  },
  mounted() {
    this.fetchUserData();
  },
};
</script>
<style>
.content {
  height: 100%;
  display: inline-flex;
  width: 100%;
}
.dashboard-content {
  padding: 2rem 2rem;
  width: inherit;
}
.va-card {
  margin-right: 80px;
  margin-top: 20px;
  font-size: 20px;
  padding: 20px 0px 20px 0px;
}
.va-button {
  float: left;
}
span {
  float: left;
}
</style>
