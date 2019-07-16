import { ActionContext, ActionTree } from 'vuex';
import { getCurrentTabProperties } from '../api/extension-api';
import { RootState, StateProps } from './types/root-state';

export const actions: ActionTree<RootState, RootState> = {
  tab: async ({ commit }: ActionContext<RootState, RootState>): Promise<void> => {
    commit(StateProps.TAB, await getCurrentTabProperties());
  }
};
