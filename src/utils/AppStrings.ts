export default {
  //endpoints
  login: 'v1/accounts/login/',
  signUp: 'v1/accounts/register/',
  captureDetails: 'v1/accounts/nutrition-education/',

  requestOTP: 'v1/accounts/forgot-password/',
  verifyOTP: '/v1/accounts/verify-otp/',

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
