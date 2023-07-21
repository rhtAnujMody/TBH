import {Reactotron} from './reactotronClient';

declare global {
  interface Console {
    /**
     * Reactotron client for logging, displaying, measuring performance,
     * and more. See https://github.com/infinitered/reactotron for more!
     */
    tron: typeof Reactotron | void;
  }
}

interface ReactotronConfig {
  /** The name of the app. */
  name?: string;
  /** The host to connect to: default 'localhost'. */
  host?: string;
  /** Should we use async storage */
  useAsyncStorage?: boolean;
  /** Should we clear Reactotron when load? */
  clearOnLoad?: boolean;
  /** log the initial data that we put into the state on startup? */
  logInitialState?: boolean;
  /** log snapshot changes. */
  logSnapshots?: boolean;
  networking?: {};
}

export const DEFAULT_REACTOTRON_CONFIG: ReactotronConfig = {
  clearOnLoad: false,
  host: 'localhost',
  useAsyncStorage: true,
  logInitialState: true,
  logSnapshots: false,
  networking: {
    ignoreUrls: 'symbolicate',
  },
};

let _reactotronIsSetUp = false;

const setUpReactron = (
  config: ReactotronConfig = DEFAULT_REACTOTRON_CONFIG,
) => {
  if (__DEV__) {
    if (_reactotronIsSetUp) {
      return;
    }

    Reactotron.configure(config).useReactNative().connect();
    Reactotron.clear();

    _reactotronIsSetUp = true;

    // Reactotron.onCustomCommand({
    //   title: 'Reset Root Store',
    //   description: 'Resets the MST store',
    //   command: 'resetStore',
    //   handler: () => {
    //     Reactotron.log('resetting store');
    //   },
    // });

    if (__DEV__) {
      console.tron = Reactotron;
    } else {
      console.tron = console.log();
    }
  }
};

export default setUpReactron;
