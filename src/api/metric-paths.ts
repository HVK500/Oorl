export enum BaseMetricPath {
  TIMING = 'timing'
}

export enum MetricPath {
  NEW_TAB_LAUNCH = 'launch.newtab',
  UPDATE_TAB_LAUNCH = 'launch.updatetab',
  ENTER_PRESSED_LAUNCH = 'launch.enter_pressed',
  OPEN_CLICKED_LAUNCH = 'launch.open_clicked',
  EXTENSION_LOADED = 'loaded',
  BROWSER_TYPE_INCOGNITO = 'browser_type.incognito',
  BROWSER_TYPE_NORMAL = 'browser_type.normal',
  URL_TOTAL_LENGTH = 'url.total_length',
  URL_ORIGINPATH_LENGTH = 'url.originpath_length',
  NUMBER_OF_PARAMETERS = 'url.number_of_parameters',
  URL_HASH_LENGTH = 'url.hash_length',
  URL_HAS_HASH = 'url.has_hash',
  QRCODE_GENERATED = 'qrcode_generated',
  NEW_TAB_TOGGLED = 'newtab.toggled',
  HASH_FIELD_TOGGLED = 'hash_field.toggled',
  PARAMETER_FIELD_TOGGLED = 'parameter_field.toggled',
  PARAMETER_FIELD_ADDED = 'parameter_field.added',
  PARAMETER_FIELD_REMOVED = 'parameter_field.removed'
}

export enum FutureMetricPath {
}

export enum TimingMetricPath {
  FIRST_URL_CHANGE = 'first_url_change'
}
