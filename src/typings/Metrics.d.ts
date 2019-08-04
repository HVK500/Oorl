declare namespace Metrics {
  class Client {
    constructor(endpoint: string, name: string, pumpInterval: number);
    LogCount(path: string, value: number): void
  }
}
