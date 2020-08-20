<template>
  <q-page>
    <h1>Simple Auth App</h1>
    <q-card class="card">
      <q-img src="./../../assets/61675_1_miscellaneous_digital_art_awesome_scenery.jpg" />
      <q-card-section class="card-section">
        <keep-alive>
          <component :action="ChangeForm" :is="FormComponent"></component>
        </keep-alive>
      </q-card-section>
      <q-card-actions class="actions" left>
        <q-btn
          :label="isRegister? 'Have an Account? Sign in!': 'Create Account'"
          color="primary"
          flat
          @click.prevent="ChangeForm"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>
<script>
import LoginForm from "./Login";
import RegisterForm from "./Register";
import { mapGetters, Store } from "vuex";
export default {
  name: "LoginComponent",
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      isRegister: false,
      FormComponent: LoginForm,
    };
  },
  methods: {
    ChangeForm() {
      this.isRegister = !this.isRegister;
      if (this.FormComponent === LoginForm) {
        return (this.FormComponent = RegisterForm);
      }
      if (this.FormComponent === RegisterForm) {
        return (this.FormComponent = LoginForm);
      }
    },
  },
};
</script>

<style scoped>

</style>