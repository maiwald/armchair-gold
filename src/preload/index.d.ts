export {};

declare global {
  interface Window {
    api: {
      ping: () => void;
      versions: {
        electron: string;
        chrome: string;
        node: string;
      };
    };
  }
}
