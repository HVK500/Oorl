<template lang="pug">
  .columns
    .column(ref="parameter-input-container")
      parameter-input(
        v-on:update="onUpdate"
        v-on:remove="onRemove"
        v-for="[id, {name, value, last}] in paramMap.entries()"
        :ref="id"
        :key="id"
        :id="id"
        :last="last"
        :name="name"
        :value="value"
      )
</template>

<script lang="ts">
import { Component, Emit, Ref, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import { createGuid } from '../api/extension-api';
import { FutureMetricPath, MetricPath } from '../api/metric-paths';
import { logMetric } from '../api/metrics-api';
import { ParameterMap, ParameterProps, ParameterState, StateProps } from '../store/types/root-state';
import ParameterInput from './Parameter-Input.vue';

@Component({
  components: {
    'parameter-input': ParameterInput
  }
})
export default class ParameterEditor extends Vue {
  @Getter(StateProps.URL_PARAMS) readonly paramMap!: ParameterMap;
  @Ref('parameter-input-container') readonly containerRef!: HTMLDivElement;

  private onUpdate(data: ParameterState): void {
    this.paramMap.set(data.id, data.prop);

    if (data.prop.last && data.prop.name) {
      this.addField();
    }
  }

  private onRemove(id: string): void {
    logMetric(MetricPath.PARAMETER_FIELD_REMOVED);
    this.paramMap.delete(id);
    this.setLastTo(true);
  }

  private addField(): void {
    const id = createGuid();
    const bool = true;
    const empty = '';

    this.setLastTo(false);
    this.paramMap.set(id, {
      ignore: bool,
      last: bool,
      name: empty,
      value: empty
    });

    logMetric(MetricPath.PARAMETER_FIELD_ADDED);
    this.containerRef.appendChild(
      this.createInputComponent(id)
        .$mount().$el
    );

    window.scrollTo(0, window.innerHeight);
  }

  private createInputComponent(id: string): ParameterInput {
    const result = new ParameterInput({
      propsData: {
        id: id,
        last: true,
        name: '',
        value: ''
      }
    }).$on('update', this.onUpdate)
      .$on('remove', this.onRemove);

    this.$refs[id] = [result];

    return result;
  }

  private getComponentById(id: string): ParameterInput {
    return (this.$refs[id] as ParameterInput[])[0];
  }

  private setLastTo(value: boolean): void {
    const [ currentlastId, currentLastData ] = Array.from(
      this.paramMap.entries()
    )[this.paramMap.size - 1];

    currentLastData.last = value;
    this.paramMap.set(currentlastId, currentLastData);
    this.getComponentById(currentlastId).last = value;
  }
}
</script>
