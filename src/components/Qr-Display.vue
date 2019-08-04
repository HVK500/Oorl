<template lang="pug">
  .columns.column.is-centered.is-vcentered.column.clear-margin-bottom.clear-margin-right
    #qrcode
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { getUrlFromTabProps, TabProps } from '../api/extension-api';
import { getShortUrl } from '../api/url-shortener-api';
import { StateProps } from '../store/types/root-state';

@Component
export default class QrDisplay extends Vue {
  static readonly SCROLL = 'clip';
  static readonly WIDTH = 770;

  @Prop({ required: true }) tabProps!: TabProps;

  private id = 'qrcode';

  private onShow(): void {
    QrDisplay.heightToggle();
    (document.getElementById(this.id) as HTMLDivElement).classList.add(this.id);
  }

  private mounted(): void {
    // tslint:disable-next-line:no-unused-expression
    new QRCode(this.id, {
      height: 480,
      text: getShortUrl(getUrlFromTabProps(this.tabProps)),
      width: 480
    });
    this.onShow();
  }

  static onCancel(): void {
    QrDisplay.heightToggle();
  }

  private static heightToggle(): void {
    document.body.classList.toggle('maxout-extension-height');
  }
}
</script>
