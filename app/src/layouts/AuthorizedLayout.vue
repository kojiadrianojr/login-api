<template>
  <q-layout view="lHh Lpr lFf">
    <h1>YOU ARE LOGGED IN!!!!</h1>
    <q-btn label="logout" @click="onLogout" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
  name: "AuthLayout",
  // preFetch({ store }) {
  //   console.log(store.state.auth.credentials.authenticated);
  // },
  methods: {
    async onLogout() {
      try {
        let response = await this.$store.dispatch("auth/logout", {
          token: "",
          userInfo: {},
          authenticated: false,
          otp_auth: false
        });
        this.$notify({
          group: "auth",
          title: response.title,
          text: response.desc,
          type: "success",
        });
        window.location.href="/"
      } catch (e) {
        console.log(e);
        // this.$notify({
        //   group: 'auth',
        //   title: 'Error!',
        //   text: 'Error!',
        //   type: 'error',
        // });
      }
    },
  },
};
</script>