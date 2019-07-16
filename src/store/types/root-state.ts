import { TabProps } from '../../api/extension-api';

export enum StateProps {
  TAB = 'tab',
  TITLE = 'title',
  URL_HASH = 'urlHash',
  URL_ORIGIN_PATH = 'urlOriginPath',
  URL_PARAMS = 'urlParams'
}

export interface RootState {
  tab: TabProps;
}

export interface ParameterState {
  id: string;
  prop: ParameterProps;
}

export type ParameterMap = Map<string, ParameterProps>;

export interface ParameterProps {
  ignore: boolean;
  last?: boolean;
  name: string;
  value: string;
}
