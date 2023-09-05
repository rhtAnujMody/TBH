export default {
  //endpoints
  login: 'v1/accounts/login/',
  signUp: 'v1/accounts/register/',
  captureDetails: 'v1/accounts/nutrition-education/',
  programMonitor: 'v1/accounts/program-monitoring/',
  healthCamp: 'v1/accounts/health-camp/',

  calculateFields: (name: string, dob: string, contact: string): string => {
    return `v1/accounts/view-calculated-fields/?name=${name}&dob=${dob}&contact=${contact}`;
  },
  generateFields: '/v1/accounts/view-calculated-fields/',

  //AsyncStore Keys
  isLogin: 'is_login',
  userData: 'user_data',

  //error
  invalidNumber: 'Phone Number is invalid',
  invalidEmail: 'Please enter valid Email-ID',
  allFieldsMandatory: 'All fields are mandatory',
  invalidPassword: 'Password should be minimum 6 characters long',
  somethingWentWrong: 'Something Went Wrong',
};
