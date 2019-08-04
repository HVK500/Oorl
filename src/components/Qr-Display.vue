<template lang="pug">
  .columns.is-centered.is-vcentered.column.clear-margin-bottom
    #qrcode
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { getUrlFromTabProps, TabProps } from '../api/extension-api';
import { getShortUrl } from '../api/url-shortener-api';
import { StateProps } from '../store/types/root-state';

export default class QrDisplay extends Vue {
  @Getter(StateProps.TAB) readonly tabProps!: TabProps;

  private mounted(): void {
    // tslint:disable-next-line:no-unused-expression
    new QRCode('qrcode', {
      height: 480,
      text: getShortUrl(getUrlFromTabProps(this.tabProps)),
      width: 480
    });
  }
}
</script>
