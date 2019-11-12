import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import KeycloakService from './common/keycloakService';

Vue.config.productionTip = false;

// point the keycloak service at our configuration file, generated and hosted on our site.
const KC_CONFIG_URL = `${location.origin}${process.env.BASE_URL}keycloak-config.json`;

Vue.use(KeycloakService, {
  init: {
    onLoad: 'check-sso'
  },
  config: KC_CONFIG_URL,
  // eslint-disable-next-line no-unused-vars
  onReady: (keycloak) => {
    new Vue({
      vuetify,
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});


