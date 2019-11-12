import Vuetify from 'vuetify';
import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import Header from '@/components/Header';

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);

describe('Header.vue', () => {
  let store;
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();

    store = new Vuex.Store({
    });

    // need to add in our keycloak service
    Object.defineProperty(localVue.prototype, '$keycloak', {
      get () {
        return {
          authenticated: false,
          logoutFn: () => {},
          loginFn: () => {}
        };
      }
    });

    wrapper = mount(Header, {
      localVue,
      vuetify,
      store
    });
  });

  it('has the gov link', () => {
    expect(wrapper.html()).toContain('https://www2.gov.bc.ca');
  });
});
