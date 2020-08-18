<template>
  <q-form class="q-gutter-md" @submit="onSubmit">
    <q-input
      v-model="credentials.username"
      label="Username *"
      rounded
      outlined
      type="text"
      lazy-rules
      :rules="[
         val => val && val.length > 0 || 'Please enter your username!!!'
        ]"
    >
      <template v-slot:before>
        <q-icon name="account_circle" />
      </template>
    </q-input>
    <q-input
      v-model="credentials.password"
      label="Password *"
      rounded
      outlined
      :type="showPass? 'text':'password'"
      lazy-rules
      :rules="[
          val => val && val.length > 0 || 'Please enter your password!!!'
        ]"
    >
      <template v-slot:before>
        <q-icon name="vpn_key" />
      </template>
      <template v-slot:append>
        <q-icon
          :name="showPass?'visibility':'visibility_off'"
          class="cursor-pointer"
          @click="showPass=!showPass"
        />
      </template>
    </q-input>
    <q-btn label="Login" color="primary" type="submit" />
  </q-form>
</template>

<script>

export default {
  name: "LoginForm",
  data() {
    return {
      credentials: {
        username: "",
        password: "",
      },
      showPass: false,
    };
  },
  methods: {
    // ...mapActions(['login']),
    async onSubmit(e) {
      e.preventDefault(e);
      try {
        let response = await this.$store.dispatch("auth/login", this.credentials);
        this.$notify({
          group: "auth",
          title: `Hello ${response.data.userInfo.name} !`,
          text: "Login succesfully!",
          type: "success",
        });
         this.$router.push(this.$route.query.redirect || 'homepage');
  
      } catch (e) {
        this.$notify({
          group: "auth",
          title: "Check your credentials",
          text: e.response.data.msg,
          type: "error",
        });
      }
    },
  },
};
</script>
