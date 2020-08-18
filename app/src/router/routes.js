import store from './../store'

let auth = store.state.auth.credentials;

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'login', path: '/', component: () => import('pages/Index.vue') }
    ],
    async beforeEnter(to, from, next){
      try {
        let permission = auth.authenticated;
        if (permission) return next({ name: 'homepage'});
        next();
      }catch (e){
        console.log(e);
      }
    }
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: () => import('layouts/AuthorizedLayout.vue'),
    beforeEnter(to, from, next){
      try {
        let permission = auth.authenticated;
        if (!permission) return next({ name: 'login', query: { redirectFrom: to.fullPath }})
        else next();
     
      }catch (e){
        console.log(e);
      }
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
