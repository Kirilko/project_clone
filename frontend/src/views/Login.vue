<template>
  <b-container>
    <b-row class="mt-5">
      <b-col sm="2"></b-col>
      <b-col class="my-1" order-sm="12" order="1" sm="8">
        <b-card class="">
          <h1>PolyEngineering</h1>
        <h3 class="mt-2">
          Система подготовки противодействию социальной инженерии.
        </h3>
          <v-text-field label='Логин' v-model="username"></v-text-field>
          <v-text-field label='Пароль' v-model="password" type="password"></v-text-field>
          <v-btn @click="login" block color="primary">Войти</v-btn>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",

    };
  },
  methods: {
    async login() {
      await this.$store.dispatch("login", {
        username: this.username,
        password: this.password,
      });
      this.$router.replace({ name: "Index" });
    },
  },
  beforeMount() {
    if (this.$store.state.isAuthenticated) {
      this.$router.replace({ name: "Index" });
    }
  },
};
</script>

<style>
.temp {
  width: 80px;
}
</style>