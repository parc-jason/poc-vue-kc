# poc-vue-kc
proof of concept - vue app with keycloak authentication


vue create frontend
> Default

vue add vuetify
> Default

npm install eslint-plugin-vuetify --save-dev

plugins: [
    'vuetify'
  ],
  rules: {
    'vuetify/no-deprecated-classes': 'error',
    'vuetify/grid-unknown-attributes': 'error',
	 'vuetify/no-legacy-grid': 'error'
  }

vue add @vue/cli-plugin-eslint

