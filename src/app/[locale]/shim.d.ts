declare module "svg-text-to-path/entries/browser-fontkit" {
  interface Options {
    fonts: Record<string, { source: string }>;
  }
  class Session {
    constructor(svg: string, options?: Options);
    replaceAll(): Promise<void>;
    getSvgString(): string;
  }

  export default Session;
}
