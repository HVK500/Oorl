import { RootState } from './types/root-state';

export const state: RootState = {
  tab: {
    title: '',
    url: {
      hash: '',
      originPath: '',
      params: new Map()
    }
  }
};
