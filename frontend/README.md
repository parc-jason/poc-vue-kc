# frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
npm run lint:fix
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Set Environment Variables
We need to set some environment variables (can be in .env or actual environment variables) that will be used to generated a keycloak config json file.  This file will be added to the distribution and served up by the application.  On start of the app, we will get the file and use it to configure our authentication hooks.

```
export VUE_APP_KC_URL=<auth url to keycloak>
export VUE_APP_KC_REALM=<keycloak realm>
export VUE_APP_KC_SCOPE=openid vue-kc 
export VUE_APP_KC_CLIENT_ID=vue-kc-poc-local
```

