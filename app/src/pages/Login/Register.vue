<template>
  <q-form class="q-gutter-md" @submit="onSubmit">
    <q-input
      label="name"
      rounded
      outlined
      v-model="credentials.name"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please enter your name!!!']"
    >
      <template v-slot:before>
        <q-icon name="perm_identity" />
      </template>
    </q-input>
    <q-input
      label="email"
      rounded
      outlined
      v-model="credentials.email"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please enter your email!!!']"
    >
      <template v-slot:before>
        <q-icon name="email" />
      </template>
    </q-input>
    <q-input
      label="username"
      rounded
      outlined
      v-model="credentials.username"
      lazy-rules
      :rules="[
        val => (val && val.length > 0) || 'Please enter your username!!!'
      ]"
    >
      <template v-slot:before>
        <q-icon name="account_circle" />
      </template>
    </q-input>
    <q-input
      label="password"
      rounded
      outlined
      :type="show.pass ? 'text' : 'password'"
      v-model="credentials.password"
      lazy-rules
      :rules="[
        val => (val && val.length > 0) || 'Please enter your password!!!'
      ]"
    >
      <template v-slot:before>
        <q-icon name="vpn_key" />
      </template>
      <template v-slot:append>
        <q-icon
          :name="show.pass ? 'visibility' : 'visibility_off'"
          class="cursor-pointer"
          @click="show.pass = !show.pass"
        />
      </template>
    </q-input>
    <q-input
      label="confirm password"
      rounded
      outlined
      :type="show.c_pass ? 'text' : 'password'"
      v-model="credentials.confirm_password"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please enter your name!!!']"
    >
      <template v-slot:before>
        <q-icon name="lock"></q-icon>
      </template>
      <template v-slot:append>
        <q-icon
          :name="show.c_pass ? 'visibility' : 'visibility_off'"
          class="cursor-pointer"
          @click="show.c_pass = !show.c_pass"
        />
      </template>
    </q-input>
    <q-btn color="primary" label="Register" type="submit" />
  </q-form>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      show: {
        pass: false,
        c_pass: false,
      },
      credentials: {
        name: "",
        email: "",
        username: "",
        password: "",
        confirm_password: "",
      },
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      try {
        let response = await this.$store.dispatch('auth/register', this.credentials);
        this.$notify({
          group: "auth",
          title: `Hello ${response.data.user} !`,
          text: response.data.msg,
          type: "success",
        });
      } catch (e) {
        this.$notify({
          group: "auth",
          title: "Check your credentials",
          text: e.response.data,
          type: "error",
        });
      }
    },
  },
};
</script>
