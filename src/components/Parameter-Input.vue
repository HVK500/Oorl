<template lang="pug">
  .level(v-if="last || (name || value)")
    b-switch(
      v-model="checked"
      size="is-small"
      tabindex="-1"
      type="is-info"
      :disabled="last || (!name && !value) || (!last && !name)"
      @input="onSwitchChange"
    )
    b-input(
      size="is-small"
      custom-class="is-info clear-border-right border-left-radius-only"
      placeholder="Name"
      :disabled="!checked"
      :value="name"
      @input="onUpdateName"
    )
    b-input.level-item(
      size="is-small"
      custom-class="is-info clear-border-right clear-all-border-radius"
      placeholder="Value"
      :disabled="!name || !checked"
      :value="value"
      @input="onUpdateValue"
    )
    b-button(
      size="is-small"
      custom-class="clear-border-left border-right-radius-only"
      tabindex="-1"
      type="is-info"
      :disabled="(!name && !value) || !checked"
      @click="onClear"
    )
      strong &times;
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { MetricPath } from '../api/metric-paths';
import { logMetric } from '../api/metrics-api';
import { ParameterProps, ParameterState } from '../store/types/root-state';
import ParameterEditor from './Parameter-Editor.vue';

@Component
export default class ParameterInput extends Vue {
  @Prop({ required: true }) readonly id!: string;
  @Prop({ default: '' }) name!: string;
  @Prop({ default: '' }) value!: string;
  @Prop({ default: false }) last!: boolean;

  private checked = true;

  @Emit('update')
  private emitUpdate<T = string>(key?: string, value?: T): ParameterState {
    const result = {
      id: this.id,
      prop: {
        ignore: (!this.checked && !!this.name),
        last: this.last,
        name: this.name,
        value: this.value
      }
    };

    if (key && value != null) {
      (result.prop as any)[key] = value;
    }

    return result;
  }

  @Emit('remove')
  private emitRemove(): string {
    return this.id;
  }

  private onSwitchChange(value: boolean): void {
    this.emitUpdate();
    logMetric(MetricPath.PARAMETER_FIELD_TOGGLED);
  }

  private onUpdateName(value: string): void {
    this.name = value;
    this.emitUpdate('name', value);
  }

  private onUpdateValue(value: string): void {
    this.value = value;
    this.emitUpdate('value', value);
  }

  private onClear(): void {
    this.emitRemove();
    this.name = '';
    this.value = '';
  }
}
</script>
