import Buefy from 'buefy';
import Vue from 'vue';
import Extension from './Extension.vue';
import store from './plugins/store';

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Extension),
  store: store
}).$mount('#extension');
