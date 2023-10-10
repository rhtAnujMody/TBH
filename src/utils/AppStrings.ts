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

  calculateFields: (name: string, dob: string, contact: string): string => {
    return `v1/accounts/view-calculated-fields/?name=${name}&dob=${dob}&contact=${contact}`;
  },
  generateFields: '/v1/accounts/view-calculated-fields/',
  doctorObservation: '/v1/accounts/doctor-observation/',

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

  SCREENS: {
    calculate: 'Calculate',
  },

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
  healthCampLabel: 'Health Camp',
  nutritionEducationLabel: 'Nutrition Education',
  programMonitoringLabel: 'Program Monitoring',
  generateReportLabel: 'Generate Report',

  newExistingPartner: 'IS THIS A NEW / EXISTING PARTNER',
  newExistingPartnerPlaceHolder: 'Is this a New / Existing Partner',
  new: 'New',
  newID: 'new',
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

  existing: 'Existing',
  existingID: 'existing',

  decimalFoundation: 'Decimal Foundation',
  government: 'Government',

  D: 'D',
  G: 'G',

  tbr: 'TBR',
  brightStart: 'Bright Start',
  anaemiaMuktBharat: 'Anaemia Mukt Bharat',

  submit: 'Submit',
  uploadPhoto: 'Upload Photo',
  takePhoto: 'Take a Photo',
  uploadLibrary: 'Upload from Library',

  partnerType: 'PARTNER TYPE',
  partnerTypePlaceHolder: 'Partner Type',

  male: 'Male',
  female: 'Female',
  others: 'Others',

  partner: 'partner',
  type: 'type',

  maleID: 'M',
  femaleID: 'F',
  othersID: 'O',

  HEALTH_CAMP_SCREEN: {
    healthCampTitle: 'Enter details related to the Health Camp event',
    partnerDetails: 'Partner Details',
    healthCampDetails: 'Health Camp Details',
    healthCampDate: 'Date of Health Camp',
    healthCampNumber: 'Number of Health Camp',
    childDetails: "Child's Details",
    childsName: "Child's Name",
    childsPhoto: "Child's Photo",
    contactNumber: 'Contact Number',
    dob: 'Date of Birth',
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

    partner_details: 'partner_details',
    health_camp_date: 'health_camp_date',
    serial_no: 'serial_no',
    child_info: 'child_info',
    child_details: 'child_details',
    vitamin_A_details: 'vitamin_A_details',
    deworming_details: 'deworming_details',
    ifa_details: 'ifa_details',
    ifa_small: 'ifa',
    vitamin_A: 'vitamin_A',

    bottomSheet: {
      partner: 'partner',
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

  doctorsObservation: "Doctor's Observation Entry",
  calculatedValues: 'Calculated Field Values',
  childName: 'NAME OF THE CHILD',
  childNamePlaceHolder: 'Name of the child',
  contact: 'CONTACT NUMBER',
  selectChild: 'Select Child',
  hourPlaceHolder: 'Hour',
  minutePlaceHolder: 'Minute',

  uploadPhotoCaps: 'UPLOAD PHOTO',

  NUTRITION_EDUCATION_SCREEN: {
    nutritionTitle: 'Enter details related to the Nutrition Education event',
    dateOfVisit: 'DATE OF VISIT',
    dateOfVisitPlaceHolder: 'Date Of Visit',
    programDetails: 'Program Details',
    totalParticipants: 'TOTAL NUMBER OF PARTICIPANTS',
    totalParticipantsPlaceHolder: 'Total number of participants',
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
  },
};
