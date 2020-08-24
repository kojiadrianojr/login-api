<template>
  <q-dialog v-model="showPrompt">
    <q-card>
      <q-card-section>
        <div class="text-h4">Note: Check otp in your email</div>
      </q-card-section>
      <q-form @submit="onSubmit">
        <q-card-section class="q-pt-none">
          <q-input dense v-model="token" label="Enter OTP" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="onCancel" />
          <q-btn
            flat
            label="Ask for new token"
            @click="request_otp"
            :disabled="dis_button? true:false"
          />
          <q-btn label="Authenticate" color="primary" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "OTPComp",
  data() {
    return {
      show: this.prompt,
      token: "",
      dis_button: false,
    };
  },
  props: {
    prompt: Boolean,
    promptFn: Function,
  },
  computed: {
    showPrompt: function () {
      return this.prompt;
    },
    getButton: function () {
      return this.dis_button;
    },
  },
  methods: {
    setButton() {
      this.dis_button = !this.dis_button;
    },
    onCancel() {
      this.$store.dispatch("auth/logout", {
        token: "",
        userInfo: {},
        authenticated: false,
        otp_auth: false,
      });
      this.promptFn();
      this.$notify({
        group: "auth",
        title: "Hey, here's what you did wrong",
        text: "You forgot/didn't enter your OTP!",
        type: "warn"
      })
    },
    async onSubmit(e) {
      e.preventDefault();
      try {
        let auth = await this.$store.dispatch("auth/validate", {
          otpToken: this.token,
          email: this.$store.state.auth.credentials.userInfo.email,
        });
        console.log(auth);
        // this.promptFn();
        if (this.$store.state.auth.credentials.otp_auth) {
          this.$notify({
            group: "auth",
            title: "Access Granted",
            text: "Enjoy your visit!",
            type: "success",
          });
          return this.$router.push("/homepage");
        }
      } catch (e) {
        this.$notify({
          group: "auth",
          title: "Access Denied",
          text: "Please check your email for the OTP",
          type: "error",
        });
      }
    },
    async request_otp(payload) {
      let email = this.$store.state.auth.credentials.userInfo.email;
      let jwtToken = this.$store.state.auth.credentials.token;
      let new_token = this.$store.dispatch("auth/generate_otp", {
        email,
        jwtToken,
      });
      this.$notify({
        group: "auth",
        title: "OTP sent!",
        text: "Check your email!",
        type: "success",
      });
      this.setButton();
      setTimeout(() => {
        this.setButton();
      }, 30000);
    },
  },
};
</script>
