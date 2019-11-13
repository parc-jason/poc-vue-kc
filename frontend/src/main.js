import Vue from 'vue';
import App from './App.vue';
import {getRouter, getRoutes} from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import KeycloakService from './common/keycloakService';
import configService from './common/configService';

Vue.config.productionTip = false;

const CONFIG_URL = './runtime-config.json';

configService.load(CONFIG_URL)
  .then(config => {
    // add the config service to Vue as a plugin.
    // can be used in components like: this.$configService.get('title')
    Object.defineProperty(Vue.prototype, '$configService', {
      get () {
        return configService;
      }
    });
    return config;
  })
  .then(config => {
    // set up the roots to use the configured path root...
    const routes = getRoutes(config.pathRoot);
    return {config, routes };
  })
  .then(({config, routes}) => {
    // set the router to use configured routes ...
    const router = getRouter(routes);
    return {config, router};
  })
  .then(({config, router}) => {
    //
    // now load our keycloak service using our configured realm/client
    // and load up the application.
    Vue.use(KeycloakService, {
      init: {
        onLoad: 'check-sso'
      },
      config: {
        url: config.kcUrl,
        realm: config.kcRealm,
        clientId: config.kcClientId,
        scope: config.kcScope
      },
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
  });
