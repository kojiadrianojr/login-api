<template>
  <q-form class="q-gutter-md">
    <q-input label="name" rounded outlined v-model="credentials.name">
      <template v-slot:before>
        <q-icon name="perm_identity" />
      </template>
    </q-input>
    <q-input label="email" rounded outlined v-model="credentials.email">
      <template v-slot:before>
        <q-icon name="email" />
      </template>
    </q-input>
    <q-input label="username" rounded outlined v-model="credentials.username">
      <template v-slot:before>
        <q-icon name="account_circle" />
      </template>
    </q-input>
    <q-input label="password" rounded outlined :type="show.pass? 'text':'password'" v-model="credentials.password">
      <template v-slot:before>
        <q-icon name="vpn_key" />
      </template>
      <template v-slot:append>
        <q-icon
          :name="show.pass?'visibility':'visibility_off'"
          class="cursor-pointer"
          @click="show.pass=!show.pass"
        />
      </template>
    </q-input>
    <q-input label="confirm password" rounded outlined :type="show.c_pass? 'text':'password'" v-model="credentials.confirm_password">
      <template v-slot:before>
        <q-icon name="lock"></q-icon>
      </template>
      <template v-slot:append>
        <q-icon
          :name="show.c_pass?'visibility':'visibility_off'"
          class="cursor-pointer"
          @click="show.c_pass=!show.c_pass"
        />
      </template>
    </q-input>
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
};
</script>