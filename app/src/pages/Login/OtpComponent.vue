<template>
  <q-dialog v-model="showPrompt">
    <q-card>
      <q-card-section>
        <div class="text-h4">Note: Check otp in your email</div>
      </q-card-section>
      <q-form @submit="onSubmit">
        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="token"
            label="Enter OTP"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="this.promptFn" />
          <q-btn flat label="Ask for new token" />
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
    };
  },
  props: {
    prompt: Boolean,
    promptFn: Function,
  },
  computed: {
    showPrompt: function () {
      return this.prompt;
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      try {
        let auth = await this.$store.dispatch("auth/validate", {token: this.token, email: this.$store.state.auth.credentials.userInfo.email});
        console.log(auth);
        this.promptFn();
        if (this.$store.state.auth.credentials.otp_auth){
          return this.$router.push('/homepage')
        }
      } catch (e) {
        this.$notify({
          group: 'auth',
          title: 'Access Denied',
          text: 'Please check your email for the OTOP',
          type: 'error'
        })
      }
    },
  },
};
</script>
