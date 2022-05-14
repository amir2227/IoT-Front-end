<template>
  <va-card style="padding: 0.75rem">
    <va-card-title>ورود</va-card-title>
    <va-card-content>
      <va-form style="width: 300px" tag="form" @submit.prevent="handleSubmit">
        <va-input v-model="username" label="نام کاربری" />

        <va-input
          class="mt-2"
          v-model="password"
          type="password"
          label="کلمه عبور"
        />

        <va-button type="submit" class="mt-2"> ورود </va-button>
      </va-form>
      <router-link to="/signup">ثبت نام</router-link>
    </va-card-content>
  </va-card>
</template>

<script>
import { API_URL } from "../constant";
export default {
  mounted() {},
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      const login_URL = API_URL + "/api/auth/signin";
      this.axios
        .post(login_URL, {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("profile", JSON.stringify(response.data));
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          const { response } = error;
          if (response.status === 401) {
            this.$vaToast.init({
              message: "نام کاربری یا کلمه عبور اشتباه است",
              color: "danger",
              duration: 5000,
              position: "top-left",
            });
          }
        });
    },
  },
};
</script>
