<template>
  <q-layout view="lHh Lpr lFf">
    <h1>YOU ARE LOGGED IN!!!!</h1>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
  prefetch({store, redirect}){
    console.log(store)
  },
  name: "AuthLayout",

};
</script>