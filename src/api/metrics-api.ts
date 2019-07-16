import { BaseMetricPath, MetricPath, TimingMetricPath } from './metric-paths';

const timeMetricMap = new Map<string, number>();
// const futureMetricMap = new Map<string, FutureMetric>();

// const metricClient = new Metrics.Client('http://fpmatlair1/metrics/', 'oorl_extension', 2);
const metricClient = {
  LogCount: (path: string, value: number) => {
    console.log(`${new Date().toUTCString()} - oorl_extension.${path} - ${value}`);
  }
};

// class FutureMetric {
//   value: number;
//   path: string;
//   private accumulator: (i: number) => number;

//   constructor(path: string, startValue: number, accumulator = (i: number) => i+1) {
//     this.path = path;
//     this.value = startValue;
//     this.accumulator = accumulator;
//   }

//   count(): void {
//     this.value = this.accumulator(this.value);
//   }
// }

export const logMetric = (path: MetricPath | TimingMetricPath, value = 1, shouldLog = true): void => {
  if (!shouldLog) return;
  metricClient.LogCount(path, value);
};

export const startTimeMetric = (path: TimingMetricPath): void => {
  timeMetricMap.set(path, performance.now());
};

export const endTimeMetric = (path: TimingMetricPath): void => {
  const startTime = timeMetricMap.get(path);
  if (!startTime) return;
  logMetric(
    `${BaseMetricPath.TIMING}.${path}` as TimingMetricPath,
    Math.floor(performance.now() - startTime)
  );
  timeMetricMap.delete(path);
};

// export const createFutureMetric = (path: FutureMetricPath, startValue = 0, accumulator?: (i: number) => number): FutureMetric => {
//   const mappableFunc = new FutureMetric(path, startValue, accumulator);
//   futureMetricMap.set(path, mappableFunc);
//   return mappableFunc;
// };

// export const completeFutureMetric = (paths: FutureMetricPath[]): void => {
//   paths.forEach((path) => {
//     const futureMetric = futureMetricMap.get(path);
//     if (!futureMetric || futureMetric.value === 0) return;
//     logMetric(path, futureMetric.value);
//     futureMetric.value = 0;
//   });
// };
