import Buefy from 'buefy';
import Vue from 'vue';
import Extension from './Extension.vue';
import vuex from './plugins/vuex';

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Extension),
  store: vuex
}).$mount('#extension');
