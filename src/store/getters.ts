import { GetterTree } from 'vuex';
import { TabProps } from '../api/extension-api';
import { ParameterMap, RootState } from './types/root-state';

export const getters: GetterTree<RootState, RootState> = {
  tab: (state: RootState): TabProps => {
    return state.tab;
  },
  title: (state: RootState): string => {
    return state.tab.title;
  },
  urlHash: (state: RootState): string => {
    return state.tab.url.hash;
  },
  urlOriginPath: (state: RootState): string => {
    return state.tab.url.originPath;
  },
  urlParams: (state: RootState): ParameterMap => {
    return state.tab.url.params;
  }
};
