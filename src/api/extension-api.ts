import { ParameterMap } from '../store/types/root-state';
import { MetricPath } from './metric-paths';
import { logMetric } from './metrics-api';

export interface TabProps {
  title: string;
  url: {
    hash: string,
    originPath: string,
    params: ParameterMap
  };
}

const formatTitle = (title: string): string => {
  if (title.length >= 48) {
    return `${title.substr(0, 45)}. . .`;
  }

  return title;
};

export const getUrlFromTabProps = (tabProps: TabProps): string => {
  const params = new URLSearchParams();
  tabProps.url.params.forEach(({ ignore, name, value }) => {
    if (ignore || !name) return;
    params.append(name.trim(), value.trim());
  });

  const paramString = params.toString() !== '' ? `?${params.toString()}` : '';
  const hashString = tabProps.url.hash !== '' ? `#${tabProps.url.hash}` : '';

  return tabProps.url.originPath + paramString + hashString;
};

export const createGuid = (): string => {
  const id = (): string => {
    return Math.floor((Math.random() + 1) * 0x10000)
      .toString(16)
      .substring(1);
  };

  return `${id()}${id()}-${id()}-${id()}-${id()}-${id()}${id()}`;
};

export const getCurrentTabProperties = async (): Promise<TabProps> => {
  return new Promise((resolve) => {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      const url = new URL(tabs[0].url || '');
      const params: ParameterMap = new Map();

      url.searchParams.forEach((value, name) => {
        params.set(createGuid(), {
          ignore: false,
          name: name,
          value: decodeURIComponent(value)
        });
      });

      logMetric(MetricPath.NUMBER_OF_PARAMETERS, params.size, params.size > 0);

      params.set(createGuid(), {
        ignore: true,
        last: true,
        name: '',
        value: ''
      });

      const originPathValue = url.origin + url.pathname.replace(/\/$/, '');
      const hashValue = `${url.hash}`.replace('#', '');

      logMetric(
        tabs[0].incognito ?
        MetricPath.BROWSER_TYPE_INCOGNITO :
        MetricPath.BROWSER_TYPE_NORMAL
      );
      logMetric(MetricPath.URL_TOTAL_LENGTH, (tabs[0].url || '').length, !!tabs[0].url);
      logMetric(MetricPath.URL_ORIGINPATH_LENGTH, originPathValue.length);
      logMetric(MetricPath.URL_HAS_HASH, 1, !!hashValue);
      logMetric(MetricPath.URL_HASH_LENGTH, hashValue.length + 1, !!hashValue);

      resolve({
        title: formatTitle(tabs[0].title || ''),
        url: {
          hash: hashValue,
          originPath: originPathValue,
          params: params
        }
      });
    });
  });
};

export const changeTabUrl = (tabProps: TabProps, newTab = false): void => {
  const properties = {
    url: getUrlFromTabProps(tabProps)
  };

  if (newTab) {
    logMetric(MetricPath.NEW_TAB_LAUNCH);
    chrome.tabs.create(properties);
    return;
  }

  logMetric(MetricPath.UPDATE_TAB_LAUNCH);
  chrome.tabs.update(properties);
};
