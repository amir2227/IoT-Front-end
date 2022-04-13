<template>
  <va-card style="padding: 0.75rem">
    <va-card-title>ثبت نام</va-card-title>
    <va-card-content>
      <va-form style="width: 300px" tag="form" @submit.prevent="handleSubmit">
        <va-input v-model="fullname" label="نام و نام خانوادگی" />
        <va-input v-model="phone" label="شماره همراه" />
        <va-input v-model="username" label="نام کاربری" />

        <va-input
          class="mt-2"
          v-model="password"
          type="password"
          label="کلمه عبور"
        />

        <va-button type="submit" class="mt-2"> ثبت نام </va-button>
      </va-form>
      <router-link to="/">ورود</router-link>
    </va-card-content>
  </va-card>
</template>

<script>
import { API_URL } from "../constant";
import { getCurrentInstance } from "vue";

export default {
  data() {
    return {
      username: "",
      password: "",
      fullname: "",
      phone: "",
    };
  },
  methods: {
    handleSubmit() {
      const SIGNUP_URL = API_URL + "/api/auth/signup";
      this.axios
        .post(SIGNUP_URL, {
          username: this.username,
          password: this.password,
          fullname: this.fullname,
          phone: this.phone,
        })
        .then((response) => {
          if (response.status === 200) {
            this.$vaToast.init({
              message: "ثبت نام موفقیت آمیز بود",
              color: "success",
              duration: 5000,
              position: "top-left",
            });
            this.$router.push("/");
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
};
</script>
