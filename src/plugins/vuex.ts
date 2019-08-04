import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { actions } from '../store/actions';
import { getters } from '../store/getters';
import { mutations } from '../store/mutations';
import { state } from '../store/state';
import { RootState } from '../store/types/root-state';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  actions: actions,
  getters: getters,
  mutations: mutations,
  state: state
};

export default new Vuex.Store<RootState>(store);
