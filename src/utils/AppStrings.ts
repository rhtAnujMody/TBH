export default {
  //endpoints
  login: 'v1/accounts/login/',
  signUp: 'v1/accounts/register/',
  captureDetails: 'v1/accounts/nutrition-education/',
  programMonitor: 'v1/accounts/program-monitoring/',
  healthCamp: 'v1/accounts/health-camp/',
  forgetPassword: (phoneNumber: string) =>
    `v1/accounts/forgot-password/?unique_id=${phoneNumber}`,
  requestOTP: 'v1/accounts/forgot-password/',
  verifyOTP: '/v1/accounts/verify-otp/',
  generateReports: '/v1/accounts/report/',

  calculateFields: (
    name: string,
    dob: string,
    contact: string,
    agent_id: number,
  ): string => {
    return `v1/accounts/view-calculated-fields/?name=${name}&dob=${dob}&contact=${contact}&agent_id=${agent_id}`;
  },
  generateFields: '/v1/accounts/view-calculated-fields/',
  doctorObservation: '/v1/accounts/doctor-observation/',

  manageUsers: (agent_id: number): string =>
    `/v1/accounts/admin-actions/?agent_id=${agent_id}`,

  deleteUsers: '/v1/accounts/admin-actions/',

  fromCalculate: 'calculated_fields',
  fromDoctor: 'doctors_observation',

  //AsyncStore Keys
  isLogin: 'is_login',
  userData: 'user_data',

  //error
  invalidNumber: 'Phone Number is invalid',
  invalidEmail: 'Please enter valid Email-ID',
  allFieldsMandatory: 'All fields are mandatory',
  invalidPassword: 'Password should be minimum 6 characters long',
  somethingWentWrong: 'Something Went Wrong',

  loginEmailPlaceholder: 'Email Id',
  loginPasswordPlaceholder: 'Password',
  loginForgotPassword: 'Forgot Password',
  loginSignUp: 'Sign Up',
  loginAccountLabel: "Don't have an account yet?",
  loginTitle: 'Provide your Login Credentials to Sign In to the Application',

  signUpTitle:
    'New to Decimal Foundation! Please Provide Details to Register Yourself',
  signUpRegister: 'Register',
  signUpNamePlaceholder: 'Name',
  signUpPhoneNoPlaceholder: 'Phone Number',
  signUpDOBPlaceholder: 'Date Of Birth',
  alreadyHaveAccount: 'Already have account?',
  signIn: 'Sign In',
  logout: 'Logout',

  welcome: 'Welcome',
  reset: 'Reset',
  loginSuccess: 'Login Success',
  success: 'Success',
  signUpSuccess: 'SignUp Success',

  resetPassword: 'Reset Password',
  enterNewPassword: 'Please Enter Your New Password',
  newPassword: 'New Password',
  confirmPassword: 'Confirm Password',
  enterOTP: 'Enter OTP',
  sendOTP: 'Send OTP',
  forgotPassword: 'Forgot Password?',
  resetPasswordEmail:
    'Please Enter Your Email ID/ Phone Number to Reset Password',
  emailPhone: 'Email / Phone Number',
  welcomeDecimal: 'Welcome to \nDecimal Foundation',
  codeSent: 'A 4 digit code has been sent to\n',

  HOME_CARDS: {
    dataCapture: 'Proceed For Data Capture',
    calculatedFieldValues: 'View Calculated Field Values',
    observationEntry: "Doctor's Observation Entry",
  },
  GENERATE_REPORT_CARDS: {
    malnutrition: 'Malnutrition Report',
    wasting: 'Wasting Report',
    stunting: 'Stunting Report',
    custom: 'Custom Report',
    doctorsObservation: "Doctor's Observation Report",
    nutritionEducation: 'Nutrition Education Report',
    monitoring: 'Monitoring Report',
  },

  childName: 'Name of the Child',
  dob: 'Date of Birth',
  contact: 'Contact Number',

  healthCampLabel: 'Health Camp',
  nutritionEducationLabel: 'Nutrition Education',
  programMonitoringLabel: 'Program Monitoring',
  generateReportLabel: 'Generate Report',
  manageUsersLabel: 'Manage Users',

  doctorsObservation: "Doctor's Observation Entry",
  calculatedValues: 'Calculated Field Values',
  customReports: 'Custom Reports',

  male: 'Male',
  female: 'Female',
  others: 'Others',
  othersCaps: 'OTHERS',

  referredHospital: 'Referred to Hospital/ Medical Care',

  submit: 'Submit',
  uploadPhoto: 'Upload Photo',
  takePhoto: 'Take a Photo',
  uploadLibrary: 'Upload from Library',
  uploadPhotoCaps: 'UPLOAD PHOTO',

  yes: 'Yes',
  no: 'No',
  yesCaps: 'YES',
  noCaps: 'NO',
  na: 'NA',
  new: 'New',
  newID: 'new',
  existing: 'Existing',
  existingID: 'existing',

  newExistingPartner: 'IS THIS A NEW / EXISTING PARTNER',
  newExistingPartnerPlaceHolder: 'Is this a New / Existing Partner',

  partnerName: 'NAME OF THE PARTNER',
  partnerNamePlaceHolder: 'Name of the partner',
  location: 'LOCATION',
  locationPlaceHolder: 'Location',
  block: 'BLOCK',
  blockPlaceHolder: 'Block',
  district: 'DISTRICT',
  districtPlaceHolder: 'District',
  state: 'STATE',
  statePlaceHolder: 'State',

  decimalFoundation: 'Decimal Foundation',
  government: 'Government',

  tbr: 'TBR',
  brightStart: 'Bright Start',
  anaemiaMuktBharat: 'Anaemia Mukt Bharat',

  partnerType: 'PARTNER TYPE',
  partnerTypePlaceHolder: 'Partner Type',

  excelDownloaded: 'Excel File downloaded',
  selectPartnerLocation: 'Select Partner Name, Location',

  startDate: 'Start Date',
  endDate: 'End Date',
  partnerNameLocation: 'Partner Name, Location',
  minDate: '2014-01-01',

  listOfUsers: 'List of Users',
  noData: 'No Data to show',

  partner: 'partner',
  type: 'type',
  partnerDetails: 'Partner Details',

  selectChild: 'Select Child',
  hourPlaceHolder: 'Hour',
  minutePlaceHolder: 'Minute',

  partnerInfo: 'Partner Info',
  pleaseSelect: 'Please Select',
  pleaseEnterDetails: 'Please Enter the details',

  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
  selectHour: 'Select hour',
  selectMinute: 'Select minute',
  selectHourCol: 'Select hour:',
  selectMinuteCol: 'Select minute:',

  actionSuggested: 'Action Suggested',

  NUTRITION_EDUCATION_SCREEN: {
    nutritionTitle: 'Enter details related to the Nutrition Education event',
    dateOfVisit: 'DATE OF VISIT',
    dateOfVisitPlaceHolder: 'Date Of Visit',
    programDetails: 'Program Details',
    totalParticipants: 'TOTAL NUMBER OF PARTICIPANTS',
    totalParticipantsPlaceHolder: 'Total number of participants',
    beneficiaries: 'beneficiaries',
    targetBeneficiaries: 'TARGET BENEFICIARIES',
    targetBeneficiariesPlaceHolder: 'Target beneficiaries',
    age: 'AGE',
    agePlaceHolder: 'Age',
    programDuration: 'PROGRAM DURATION',
    methodUsed: 'METHOD USED',
    methodUsedPlaceHolder: 'Method used',
    topicsCovered: 'TOPICS COVERED',
    topicsCoveredPlaceHolder: 'Topics covered',
    sessionConducted: 'SESSION CONDUCTED BY',
    sessionConductedPlaceHolder: 'Session conducted by',
    feedbackParticipants: 'FEEDBACK FROM PARTICIPANTS',
    feedbackParticipantsPlaceHolder: 'Feedback from participants',
    bottomSheet: {
      selectAge: 'Select Age',
      newExisting: 'Is this a new/existing partner',
      partnerName: 'Name of the Partner',
    },
  },

  PROGRAM_MONITORING_SCREEN: {
    programTitle: 'Enter details related to the Program Monitoring event',
    nameLocExistPartner: 'NAME AND LOCATION OF EXISTING PARTNER',
    nameLocExistPartnerPlaceHolder: 'Name and Location of Existing Partner',
    dateOfVisitMonitor: 'Date Of Visit for Monitoring',
    visitingTeamSize: 'Visiting team size (staff/volunteers)',
    nameDecimalStaffLiaison: 'Name of Decimal Staff liaison for visit',
    desigDecimalStaffLiaison: 'Designation of Decimal Staff  liaison for visit',
    namePartnerStaffLiaison: "Name of Partner's Staff liaison for visit",
    desigPartnerStaffLiaison:
      "Designation of Partner's Staff liaison for visit",
    programCompliance: 'Program Compliance',
    numChildPresent: 'Number of children present on the day of visit',
    avgAttendance: 'Avg. class/school attendance  for the month',
    numNewChildEnroll: 'Number of new children enrolled into the program',
    numChildDroppedOut:
      'Number of children who have dropped out of the program',
    numChildSick: 'Number of children who are sick around the day of visit.',
    whatIllness: 'What is the illness?',
    numActivitySheetReceived:
      'Which numbered activity sheet was received this month?',
    activitySheetCompleted:
      'Have the children completed the activity sheet for this month?',
    poshanCalendarCompleted:
      'Are the teachers/social workers completing the Poshan Calendar properly?',
    foodSupplyDate: "Date when the month's food supply was received",
    mealsCarryForward:
      'Number of meals carried forward from the previous month',
    numMealsReceived: 'Number of meals received this month',
    storedFoodSafely: 'Has the partner stored the food safely?',
    breakfastServed: 'Is the breakfast being served daily?',
    whenBreakfastServed:
      'When is breakfast usually served? (observed by Decimal staff)',
    additionalPoints: 'Additional observations or points discussed',
    beneficiaryFollowUp: 'Beneficiary Follow Up',
    feedbackTeacher:
      'Feedback from a teacher/social worker about highlighted children, program issues, positive feedback',
    feedbackParents: 'Feedback from parents (if available)',
    feedbackChildren:
      'Feedback from the children (food tastes, thoughts, activity sheets etc)',
    volunteersInfo: 'Volunteers Info',
    companyName: 'Company name',
    nameOfVolunteers: 'Name of volunteer(s)',
    volunteerSessionDuration: 'Duration of the volunteer session',
    volunteerReason:
      'Reason/objective for the volunteering session with Decimal',
    majorLearnings: 'Any major learning(s)  and/or observations ',
    otherFeedback: 'Any other feedback',
    durationOfVisit: 'Duration of Visit for',
    monitoringPhotos: 'Photos for Monitoring',
  },
  receivedVitaminA: 'Received Vitamin A Dose?',
  receivedDeworming: 'Received De-worming Dose?',
  receivedIFA: 'Received IFA Dose?',
  ageMonths: 'Age in Months',
  bmi: 'BMI',
  weightDevelopment: 'Weight Development',
  heightDevelopment: 'Height development / Stunting',
  overallDevelopment: 'Overall Development / Malnutrition Grades',
  weightGain: 'Weight Gain',

  HEALTH_CAMP_SCREEN: {
    healthCampTitle: 'Enter details related to the Health Camp event',
    healthCampDetails: 'Health Camp Details',
    healthCampDate: 'Date of Health Camp',
    healthCampNumber: 'Number of Health Camp',
    childDetails: "Child's Details",
    childsName: "Child's Name",
    childsPhoto: "Child's Photo",
    age: 'Age (IN MONTHS)',
    gender: 'Gender',
    height: 'Height',
    heightPlaceHolder: 'Height(CM)',
    weight: 'Weight',
    weightPlaceHolder: 'Weight(KG)',
    muac: 'MUAC',
    muacPlaceHolder: 'MUAC(CM)',
    vitaminA: 'Vitamin A',
    done: 'Done',
    notDone: 'Not Done',
    doneByWhom: 'Done By Whom',
    dateOfDose: 'Date of the Dose',
    durationOfCourse: 'Duration of Course?',
    locationOfDose: 'Location of Dose Taken',
    deworming: 'Deworming',
    ifa: 'IFA',
    targetBeneficiary: 'Target Beneficiary',
    educationalDetails: 'Educational Details',

    bottomSheet: {
      partnerHeader: 'Is this a new/existing partner',
      partnerName: 'partnerName',
      partnerNameHeader: 'Name of the Partner',
      partnerType: 'partnerType',
      partnerTypeHeader: 'Partner Type',
      vitaminA: 'vitaminA',
      doneBy: 'doneBy',
      doneByWorm: 'doneByWorm',
      doneByWormHeader: 'Done By Whom ',
      doneByIFA: 'doneByIFA',
      doneByIFAHeader: 'Done By Whom  ',
      deworming: 'deworming',
      targetBeneficiary: 'targetBeneficiary',
      educationalDetails: 'educationalDetails',
      gender: 'gender',
    },
  },
};
