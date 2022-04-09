<template>
  <va-card style="padding: 0.75rem">
    <va-card-title>Login</va-card-title>
    <va-card-content>
      <va-form style="width: 300px" tag="form" @submit.prevent="handleSubmit">
        <va-input v-model="username" label="Username" />

        <va-input
          class="mt-2"
          v-model="password"
          type="password"
          label="Password"
        />

        <va-button type="submit" class="mt-2"> Login </va-button>
      </va-form>
    </va-card-content>
  </va-card>
</template>

<script>
import { API_URL } from "../constant";
export default {
  mounted() {
    console.log("hi");
  },
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
        });

      this.$router.push("/dashboard");
    },
  },
};
</script>
