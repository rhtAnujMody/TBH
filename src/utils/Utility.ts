import moment from 'moment';
import {Dimensions} from 'react-native';
import Toast from 'react-native-simple-toast';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

class Utility {
  static deviceHeight = deviceHeight;
  static deviceWidth = deviceWidth;

  static formatDate = (date: Date, format: string = 'DD/MM/YYYY') => {
    return moment(date).format(format);
  };

  static validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  static showToast = (msg: string, duration: number = 2) => {
    Toast.show(msg, duration);
  };

  static logData = (msg: any) => {
    console.tron.log(msg);
  };
}
export default Utility;
