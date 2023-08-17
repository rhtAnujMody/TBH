/**
 * @format
 */

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import {AppRegistry, LogBox, PermissionsAndroid} from 'react-native';
import {name as appName} from './app.json';
import AppNavigation from './src/navigation/AppNavigation';
import setUpReactron from './src/services/reactron/reactron';
import { PERMISSIONS } from 'react-native-permissions';

setUpReactron({name: 'Decimal'});
LogBox.ignoreAllLogs();
PERMISSIONS.ANDROID.CAMERA;
PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION;
AppRegistry.registerComponent(appName, () =>gestureHandlerRootHOC(AppNavigation));
