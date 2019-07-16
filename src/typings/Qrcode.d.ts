interface QrParameters {
  text: string;
  width: number;
  height: number;
}

declare class QRCode {
  constructor(element: HTMLElement | string | null, parameters: QrParameters);
}
