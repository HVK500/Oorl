<template lang="pug">
  .columns.clear-margin-bottom(v-if="loaded")
    .column.clear-padding-bottom
      origin-editor
      parameter-editor
      extension-controls
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { getCurrentTabProperties } from './api/extension-api';
import { MetricPath, TimingMetricPath } from './api/metric-paths';
import { logMetric, startTimeMetric } from './api/metrics-api';
import ExtensionControls from './components/Extension-Controls.vue';
import OriginEditor from './components/Origin-Editor.vue';
import ParameterEditor from './components/Parameter-Editor.vue';
import { StateProps } from './store/types/root-state';

@Component({
  components: {
    'extension-controls': ExtensionControls,
    'origin-editor': OriginEditor,
    'parameter-editor': ParameterEditor
  }
})
export default class Extension extends Vue {
  @Action(StateProps.TAB) initializeTab!: () => Promise<void>;

  private loaded = false;

  private async created(): Promise<void> {
    await this.initializeTab();
    logMetric(MetricPath.EXTENSION_LOADED);
    startTimeMetric(TimingMetricPath.FIRST_URL_CHANGE);
    this.loaded = true;
  }
}
</script>

<style lang="sass">
@import './src/main.sass'
</style>
