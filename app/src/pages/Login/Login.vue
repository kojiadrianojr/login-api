<template>
  <div>
    <q-form class="q-gutter-md" @submit="onSubmit" v-if="!OTP_config.prompt">
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
    <OTPComp :prompt="OTP_config.prompt" :promptFn="showPrompt" />
  </div>
</template>

<script>
import OTPComp from "./OtpComponent";
export default {
  name: "LoginForm",
  components: {
    OTPComp,
  },
  data() {
    return {
      credentials: {
        username: "",
        password: "",
      },
      showPass: false,
      OTP_config: {
        prompt: false,
      },
    };
  },
  methods: {
    // ...mapActions(['login']),
    showPrompt() {
      this.OTP_config.prompt = !this.OTP_config.prompt;
    },
    async onSubmit(e) {
      e.preventDefault(e);
      const { username, password } = this.credentials;
      if (username === "" && password === "") {
        return this.$notify({
          group: "auth",
          title: "Please, Please, Please Check!",
          text: "Please fill out require fields!",
          type: "warning",
        });
      }
      try {
        let response = await this.$store.dispatch(
          "auth/login",
          this.credentials
        );
        this.$notify({
          group: "auth",
          title: `Hello ${response.data.userInfo.name} !`,
          text: "Login succesfully!",
          type: "success",
        });
        //enable the modal for sms
        this.showPrompt();
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
