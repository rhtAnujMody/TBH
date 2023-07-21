/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppNavigation from './src/navigation/AppNavigation';
import setUpReactron from './src/services/reactron/reactron';

setUpReactron({name: 'Decimal'});
AppRegistry.registerComponent(appName, () => AppNavigation);
