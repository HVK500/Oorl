<template lang="pug">
  .columns
    .column.clear-padding-bottom
      b-button(
        size="is-small"
        type="is-info"
        @click="onQrCode"
      ) QR Code
    .column.clear-padding-bottom
      b-button(
        size="is-small"
        type="is-info"
        @click="onOpen"
      ) Open
    .column.is-2
      b-checkbox.is-pulled-left(
        size="is-small"
        type="is-info"
        @input="onCheckToggle"
      ) New Tab
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { changeTabUrl, getUrlFromTabProps, TabProps } from '../api/extension-api';
import { MetricPath, TimingMetricPath } from '../api/metric-paths';
import { endTimeMetric, logMetric } from '../api/metrics-api';
import { StateProps } from '../store/types/root-state';
import QrDisplay from './Qr-Display.vue';

@Component
export default class ExtensionControls extends Vue {
  @Getter(StateProps.TAB) readonly tabProps!: TabProps;

  private newTab = false;

  private created(): void {
    document.addEventListener('keyup', (event: KeyboardEvent): void => {
      if (event.keyCode !== 13) return;
      logMetric(MetricPath.ENTER_PRESSED_LAUNCH);
      this.openUrl();
    });
  }

  private onCheckToggle(): void {
    logMetric(MetricPath.NEW_TAB_TOGGLED);
    this.newTab = !this.newTab;
  }

  private onQrCode(): void {
    const id = 'qrcode';
    document.body.style.height = '560px';

    this.$modal.open({
      content: `<div class="columns column is-centered is-vcentered clear-margin-bottom clear-margin-right"><div id="${id}"></div>`,
      onCancel: () => { document.body.style.height = ''; },
      scroll: 'clip',
      width: 770
    });

    setTimeout(() => {
      (document.getElementById(id) as HTMLDivElement).classList.add(id);
      // tslint:disable-next-line:no-unused-expression
      new QRCode(id, {
        height: 480,
        text: getUrlFromTabProps(this.tabProps),
        width: 480
      });
    }, 100);
  }

  private onOpen() {
    logMetric(MetricPath.OPEN_CLICKED_LAUNCH);
    this.openUrl();
  }

  private openUrl(): void {
    endTimeMetric(TimingMetricPath.FIRST_URL_CHANGE);
    changeTabUrl(this.tabProps, this.newTab);
  }
}
</script>

<style lang="sass" scoped>
button
  width: 100%

label.b-checkbox
  margin-top: 6px

.columns
  margin-top: -1.4rem

.column:not(:last-child)
  padding-right: 0
</style>
