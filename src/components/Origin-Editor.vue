<template lang="pug">
  b-field.custom-bottom-margin
    b-field(
      :label="title"
      custom-class="is-small"
      label-position="on-border"
    )
      b-input(
        expanded="true"
        size="is-small"
        custom-class="is-info clear-border-right border-left-radius-only"
        placeholder="Source URL"
        :value="href"
        @input="onUpdateHref"
      )
      .control
        b-field
          b-button(
            size="is-small"
            custom-class="clear-border-left"
            tabindex="-1"
            type="is-info"
            @click="onToggleHash"
          )
            strong &#35;
          b-input(
            v-show="showHash"
            size="is-small"
            custom-class="is-info clear-border-left"
            placeholder="Hash"
            :value="hash"
            @input="onUpdateHash"
          )

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import { MetricPath } from '../api/metric-paths';
import { logMetric } from '../api/metrics-api';
import { StateProps } from '../store/types/root-state';

@Component
export default class OriginEditor extends Vue {
  @Getter(StateProps.TITLE) readonly title!: string;
  @Getter(StateProps.URL_HASH) hash!: string;
  @Getter(StateProps.URL_ORIGIN_PATH) href!: string;
  @Mutation(StateProps.URL_ORIGIN_PATH) mutateHref!: (value: string) => void;
  @Mutation(StateProps.URL_HASH) mutateHash!: (value: string) => void;

  private showHash = false;

  private onToggleHash(): void {
    logMetric(MetricPath.HASH_FIELD_TOGGLED);
    this.showHash = !this.showHash;
  }

  private onUpdateHref(value: string): void {
    this.mutateHref(value);
  }

  private onUpdateHash(value: string): void {
    this.mutateHash(value);
  }
}
</script>

<style lang="sass" scoped>
.custom-bottom-margin
  margin-bottom: .5rem !important
</style>
