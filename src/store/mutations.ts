import { MutationTree } from 'vuex';
import { TabProps } from '../api/extension-api';
import { ParameterMap, RootState } from './types/root-state';

export const mutations: MutationTree<RootState> = {
  tab: (state: RootState, value: TabProps) => {
    state.tab = value;
  },
  urlHash: (state: RootState, value: string): void => {
    state.tab.url.hash = value;
  },
  urlOriginPath: (state: RootState, value: string): void => {
    state.tab.url.originPath = value;
  },
  urlParams: (state: RootState, value: ParameterMap): void => {
    state.tab.url.params = value;
  }
};
