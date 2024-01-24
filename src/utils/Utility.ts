import moment from 'moment';
import {Dimensions} from 'react-native';
import Toast from 'react-native-simple-toast';
import {UserData} from '../models/UserModal';
import {AppSVGs} from '../assets';
import {BottomSheetChildCard} from '../components/common/AppBottomCell';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

class Utility {
  static deviceHeight = deviceHeight;
  static deviceWidth = deviceWidth;

  static formatDate = (date: Date, format: string = 'YYYY-MM-DD') => {
    return moment(date).format(format);
  };

  static validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  static calculateAgeInMonths = (birthdate: string) => {
    const currentDate = new Date();
    const birthDate = new Date(birthdate);

    // Calculate the difference in months
    const months =
      (currentDate.getFullYear() - birthDate.getFullYear()) * 12 +
      (currentDate.getMonth() - birthDate.getMonth());

    return months;
  };

  static validatePhoneNumber = (num: string) => {
    return String(num)
      .toLowerCase()
      .match(/^\d{10}$/);
  };

  static validateAlpha = (name: string) => {
    return (
      String(name)
        .toLowerCase()
        .match(/^[a-zA-Z\s]+$/) && String(name).trim() !== ''
    );
  };

  static validateAlphaNumericSpecial = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[\s\S]+$/);
  };

  static validateAlphaSpecial = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[a-zA-Z !@#$%^&*()\-_=+[{\]}|;:'",<.>/?]+$/);
  };

  static validateNumberSpecial = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[0-9,.\s!@#$%^&*()\-_=+[{\]}|;:'",<.>/?]+$/);
  };

  static validateNumeric = (num: string) => {
    return String(num)
      .toLowerCase()
      .match(/^[0-9]+$/g);
  };

  static validateFloat = (num: string) => {
    return String(num)
      .toLowerCase()
      .match(/^\d+(\.\d{0,1})?$/);
  };

  static getUpper = (str: string) => {
    if (str !== '') {
      const words = str.split(' ');
      const capitalizedWords = words.map(
        word => word.charAt(0).toUpperCase() + word.slice(1),
      );
      return capitalizedWords.join(' ');
    } else {
      return '';
    }
  };

  static partnerNameLocation = (userData: UserData) => {
    return userData.partner_list.map(item => {
      return {
        name:
          item.name +
          ',' +
          '\n' +
          item.location +
          ',' +
          item.block +
          ',' +
          item.district +
          ',' +
          item.state,
        id: item.id,
      };
    });
  };

  static customReportsCards = [
    {
      title: 'Historical Data Report',
      icon: AppSVGs.report,
    },
    {
      title: 'Recovered From Malnutrition Report',
      icon: AppSVGs.report,
    },
    {
      title: 'Received Vitamin A Report',
      icon: AppSVGs.report,
    },
    {
      title: 'Received Deworming Report',
      icon: AppSVGs.report,
    },
    {
      title: 'Received IFA Report',
      icon: AppSVGs.report,
    },
    {
      title: 'Meals Received for Program Monitoring Report',
      icon: AppSVGs.report,
    },
  ];

  static showToast = (msg: string, duration: number = 3) => {
    Toast.show(msg, duration);
  };

  static logData = (msg: any) => {
    if (__DEV__) {
      console.tron.log(msg);
    }
  };

  static checkDigits = (text: string) => {
    var pattern = /^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]*$/g;
    return pattern.test(text);
  };

  static searchChild = (
    partnerList: BottomSheetChildCard[],
    searchName: string,
  ) => {
    const filteredData = partnerList.filter(item => {
      return (
        item.dob.toLowerCase().includes(searchName.toLowerCase()) ||
        item.gender.toLowerCase().includes(searchName.toLowerCase()) ||
        item.name.toLowerCase().includes(searchName.toLowerCase())
      );
    });

    return filteredData;
  };
}
export default Utility;
