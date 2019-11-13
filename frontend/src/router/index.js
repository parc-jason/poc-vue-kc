import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

export const getRoutes = (pathRoot) => {
  if (!pathRoot){
    pathRoot = '';
  }
  const routes = [
    {
      path: pathRoot + '/',
      name: 'home',
      component: Home
    },
    {
      path: pathRoot + '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ];
  return routes;
};

export const getRouter = (routes) => {

  const router = new VueRouter({
    mode: 'history',
    routes: routes
  });

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (router.app.$keycloak.authenticated) {
        next();
      } else {
        const loginUrl = router.app.$keycloak.createLoginUrl({redirectUri: window.location});
        window.location.replace(loginUrl);
      }
    } else {
      next();
    }
  });

  return router;
};

export default {getRouter, getRoutes};
