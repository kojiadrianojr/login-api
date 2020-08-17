<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  prefetch({store, redirect}){
   if (!store.state.credentials.authenticated){
     redirect({ path: '/'})
   } else {
     redirect({ path: '/homepage'})
   }
  },
  name: 'MainLayout',
  data () {
    return {

    }
  }
}
</script>
