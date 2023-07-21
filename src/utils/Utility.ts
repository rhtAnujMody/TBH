import moment from 'moment';
import {Dimensions} from 'react-native';
import reactotron from 'reactotron-react-native';

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
}
export default Utility;
