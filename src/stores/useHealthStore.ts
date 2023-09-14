import {useLocalObservable} from 'mobx-react-lite';
import Utility from '../utils/Utility';
import {runInAction} from 'mobx';
import {Image} from 'react-native-image-crop-picker';
import AppStrings from '../utils/AppStrings';
import useApiService from '../network/useAPIService';
import {HealthModal} from '../models/HealthModal';
import authStore from './authStore';
import {useNavigation} from '@react-navigation/native';

const useHealthStore = () => {
  const {request} = useApiService();
  const navigation = useNavigation();
  const healthStore = useLocalObservable(() => ({
    index: 1,
    openBottomSheet: false,
    bottomSheetHeader: '',
    bottomSheetArray: [] as any[],
    isLoading: false,
    enableSubmit: false,
    openPhotoBottomSheet: false,
    calenderID: '',
    showCalender: false,
    partner: '',
    partnerID: '',
    newPartnerName: '',
    newLocation: '',
    newBlock: '',
    newDistrict: '',
    newState: '',
    existPartnerName: '',
    existLocation: '',
    existBlock: '',
    existDistrict: '',
    existState: '',
    partnerType: '',
    partnerTypeID: '',
    centerName: '',
    dohc: '',
    numberHC: '',
    childName: '',
    dob: '',
    contact: '',
    gender: '',
    genderID: '',
    targetBeneficiary: '',
    beneficiaryID: '',
    age: '',
    height: '',
    weight: '',
    muac: '',
    educationalDetails: '',
    educationalDetailsID: '',
    vitaminA: '',
    doneBy: '',
    doneByID: '',
    dateOfDoseVitamin: '',
    durationOfCourse: '',
    locationOfDose: '',
    deworming: '',
    doneByWorm: '',
    doneByWormID: '',
    dateOfDoseDeworm: '',
    durationOfCourseWorm: '',
    locationOfDoseWorm: '',
    ifa: '',
    doneByIFA: '',
    doneByIFAID: '',
    dateOfDoseIFA: '',
    durationOfCourseIFA: '',
    locationOfDoseIFA: '',

    partnerError: '',
    newPNameError: '',
    newPLocError: '',
    newPBlockError: '',
    newPDistError: '',
    newPStateError: '',

    existPartError: '',

    partTypeError: '',
    dohcError: '',
    nhcError: '',
    childNameError: '',
    contactError: '',
    dobError: '',
    genderError: '',
    heightError: '',
    weightError: '',
    muacError: '',

    vitAError: '',
    vitADBWError: '',
    vitADODError: '',
    vitADOCError: '',
    vitALocError: '',

    ifaError: '',
    ifaDBWError: '',
    ifaDODError: '',
    ifaDOCError: '',
    ifaLocError: '',

    dewormError: '',
    dewormDBWError: '',
    dewormDODError: '',
    dewormDOCError: '',
    dewormLocError: '',

    targetError: '',
    educatError: '',

    selectedImages: [] as Image[],
    partnerOptions: [
      {name: 'New', id: 'new'},
      {name: 'Existing', id: 'existing'},
    ],
    partnerNameList: Utility.partnerNameLocation(authStore.userData),
    partnerTypeOptions: [
      {
        name: 'TBR',
        id: 1,
      },
      {
        name: 'Bright Start',
        id: 2,
      },
      {
        name: 'Anaemia Mukt Bharat',
        id: 3,
      },
    ],
    vitaminAOptions: [
      {name: 'Done', id: 1},
      {name: 'Not Done', id: 2},
    ],
    genderOptions: [
      {name: 'Male', id: 'M'},
      {name: 'Female', id: 'F'},
      {name: 'Others', id: 'O'},
    ],
    doneByOptions: [
      {name: 'Decimal Foundation', id: 'D'},
      {name: 'Government', id: 'G'},
    ],
    targetBenefitOptions: authStore.userData.health_camp_beneficiary,
    educationalDetailsOptions: authStore.userData.education_details,

    toogleCalender() {
      healthStore.showCalender = !healthStore.showCalender;
    },

    setCalenderID(value: string) {
      healthStore.calenderID = value;
    },

    setIndex(value: number) {
      healthStore.index = value;
    },

    setCenterName(value: string) {
      healthStore.centerName = value;
      healthStore.validateSubmit();
    },
    setDOHC(value: string) {
      healthStore.dohcError = '';
      healthStore.dohc = value;
      healthStore.validateSubmit();
    },
    setNumberHC(value: string) {
      healthStore.nhcError = '';
      healthStore.numberHC = value;
      healthStore.validateSubmit();
    },
    setChildName(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlpha(value)) {
        return;
      }
      healthStore.childNameError = '';
      healthStore.childName = value;
      healthStore.validateSubmit();
    },
    setContact(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumeric(value)) {
        return;
      }
      healthStore.contactError = '';
      healthStore.contact = value;
      healthStore.validateSubmit();
    },
    setDOB(value: string) {
      healthStore.dob = value;
      healthStore.dobError = '';
      healthStore.validateSubmit();
    },
    setAge(value: number) {
      healthStore.age = value.toString();
    },
    setHeight(value: string) {
      if (!(value.trim() === '') && !Utility.validateFloat(value)) {
        return;
      }
      healthStore.heightError = '';
      healthStore.height = value;
      healthStore.validateSubmit();
    },
    setWeight(value: string) {
      if (!(value.trim() === '') && !Utility.validateFloat(value)) {
        return;
      }
      healthStore.weightError = '';
      healthStore.weight = value;
      healthStore.validateSubmit();
    },
    setMUAC(value: string) {
      if (!(value.trim() === '') && !Utility.validateFloat(value)) {
        return;
      }
      healthStore.muacError = '';
      healthStore.muac = value;
      healthStore.validateSubmit();
    },
    setNewPartnerName(value: string) {
      healthStore.newPNameError = '';
      healthStore.newPartnerName = value;
      healthStore.validateSubmit();
    },
    setNewLocation(value: string) {
      healthStore.newPLocError = '';
      healthStore.newLocation = value;
      healthStore.validateSubmit();
    },
    setNewBlock(value: string) {
      healthStore.newPBlockError = '';
      healthStore.newBlock = value;
      healthStore.validateSubmit();
    },
    setNewDistrict(value: string) {
      healthStore.newPDistError = '';
      healthStore.newDistrict = value;
      healthStore.validateSubmit();
    },
    setNewState(value: string) {
      healthStore.newPStateError = '';
      healthStore.newState = value;
      healthStore.validateSubmit();
    },
    setDateOfDoseVitamin(value: string) {
      healthStore.vitADODError = '';
      healthStore.dateOfDoseVitamin = value;
      healthStore.validateSubmit();
    },
    setDurationOfCourse(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumeric(value)) {
        return;
      }
      healthStore.vitADOCError = '';
      healthStore.durationOfCourse = value;
      healthStore.validateSubmit();
    },
    setLocationOfDose(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlphaSpecial(value)) {
        return;
      }
      healthStore.vitALocError = '';
      healthStore.locationOfDose = value;
      healthStore.validateSubmit();
    },
    setDateOfDoseDeworm(value: string) {
      healthStore.dewormDODError = '';
      healthStore.dateOfDoseDeworm = value;
      healthStore.validateSubmit();
    },
    setDurationOfCourseWorm(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumeric(value)) {
        return;
      }
      healthStore.dewormDOCError = '';
      healthStore.durationOfCourseWorm = value;
      healthStore.validateSubmit();
    },
    setLocationOfDoseWorm(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlphaSpecial(value)) {
        return;
      }
      healthStore.dewormLocError = '';
      healthStore.locationOfDoseWorm = value;
      healthStore.validateSubmit();
    },
    setDateOfDoseIFA(value: string) {
      healthStore.ifaDODError = '';
      healthStore.dateOfDoseIFA = value;
      healthStore.validateSubmit();
    },
    setDurationOfCourseIFA(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumeric(value)) {
        return;
      }
      healthStore.ifaDOCError = '';
      healthStore.durationOfCourseIFA = value;
      healthStore.validateSubmit();
    },
    setLocationOfDoseIFA(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlphaSpecial(value)) {
        return;
      }
      healthStore.ifaLocError = '';
      healthStore.locationOfDoseIFA = value;
      healthStore.validateSubmit();
    },
    setSelectedImages(selectedImage: Image[]) {
      healthStore.selectedImages = selectedImage;
    },

    togglePhotoBottomSheet() {
      healthStore.openPhotoBottomSheet = !healthStore.openPhotoBottomSheet;
    },

    validateErrors(field: string) {
      switch (field) {
        case 'partner':
          if (healthStore.partner === '') {
            healthStore.partnerError = AppStrings.requiredField;
          }
          break;
      }
    },

    validateSubmit() {
      healthStore.enableSubmit = false;
      if (healthStore.partner === '') {
        healthStore.partnerError = AppStrings.requiredField;
        return;
      }
      if (healthStore.partner === 'New') {
        if (!Utility.validateAlphaNumericSpecial(healthStore.newPartnerName)) {
          healthStore.newPNameError = AppStrings.requiredField;
          return;
        }
        if (!Utility.validateAlphaNumericSpecial(healthStore.newLocation)) {
          healthStore.newPLocError = AppStrings.requiredField;
          return;
        }
        if (!Utility.validateAlphaNumericSpecial(healthStore.newBlock)) {
          healthStore.newPBlockError = AppStrings.requiredField;
          return;
        }
        if (!Utility.validateAlphaNumericSpecial(healthStore.newDistrict)) {
          healthStore.newPDistError = AppStrings.requiredField;
          return;
        }
        if (!Utility.validateAlphaNumericSpecial(healthStore.newState)) {
          healthStore.newPStateError = AppStrings.requiredField;
          return;
        }
      } else {
        if (healthStore.existPartnerName === '') {
          healthStore.existPartError = AppStrings.requiredField;
          return;
        }
      }
      if (healthStore.partnerType === '') {
        healthStore.partTypeError = AppStrings.requiredField;
        return;
      }
      if (healthStore.dohc === '') {
        healthStore.dohcError = AppStrings.requiredField;
        return;
      }
      if (!Utility.validateAlphaNumericSpecial(healthStore.numberHC)) {
        healthStore.nhcError = AppStrings.requiredField;
        return;
      }
      if (!Utility.validateAlpha(healthStore.childName)) {
        healthStore.childNameError = AppStrings.requiredField;
        return;
      }
      if (!Utility.validatePhoneNumber(healthStore.contact)) {
        healthStore.contactError = AppStrings.requiredField;
        return;
      }
      if (healthStore.dob === '') {
        healthStore.dobError = AppStrings.requiredField;
        return;
      }
      if (healthStore.gender === '') {
        healthStore.genderError = AppStrings.requiredField;
        return;
      }
      if (!Utility.validateFloat(healthStore.height)) {
        healthStore.heightError = AppStrings.requiredField;
        return;
      }
      if (!Utility.validateFloat(healthStore.weight)) {
        healthStore.weightError = AppStrings.requiredField;
        return;
      }
      if (!Utility.validateFloat(healthStore.muac)) {
        healthStore.muacError = AppStrings.requiredField;
        return;
      }

      if (healthStore.vitaminA === '') {
        healthStore.vitAError = AppStrings.requiredField;
        return;
      } else {
        if (healthStore.vitaminA === 'Done') {
          if (healthStore.doneBy === '') {
            healthStore.vitADBWError = AppStrings.requiredField;
            return;
          } else {
            if (healthStore.dateOfDoseVitamin === '') {
              healthStore.vitADODError = AppStrings.requiredField;
              return;
            }
            if (!Utility.validateNumeric(healthStore.durationOfCourse)) {
              healthStore.vitADOCError = AppStrings.requiredField;
              return;
            }
            if (
              !Utility.validateAlphaNumericSpecial(healthStore.locationOfDose)
            ) {
              healthStore.vitALocError = AppStrings.requiredField;
              return;
            }
          }
        }
      }

      if (healthStore.deworming === '') {
        healthStore.dewormError = AppStrings.requiredField;
        return;
      } else {
        if (healthStore.deworming === 'Done') {
          if (healthStore.doneByWorm === '') {
            healthStore.dewormDBWError = AppStrings.requiredField;
            return;
          } else {
            if (healthStore.dateOfDoseDeworm === '') {
              healthStore.dewormDODError = AppStrings.requiredField;
              return;
            }
            if (!Utility.validateNumeric(healthStore.durationOfCourseWorm)) {
              healthStore.dewormDOCError = AppStrings.requiredField;
              return;
            }
            if (
              !Utility.validateAlphaNumericSpecial(
                healthStore.locationOfDoseWorm,
              )
            ) {
              healthStore.dewormLocError = AppStrings.requiredField;
              return;
            }
          }
        } else {
        }
      }

      if (healthStore.ifa === '') {
        healthStore.ifaError = AppStrings.requiredField;
        return;
      } else {
        if (healthStore.ifa === 'Done') {
          if (healthStore.doneByIFA === '') {
            healthStore.ifaDBWError = AppStrings.requiredField;
            return;
          } else {
            if (healthStore.dateOfDoseIFA === '') {
              healthStore.ifaDODError = AppStrings.requiredField;
              return;
            }
            if (!Utility.validateNumeric(healthStore.durationOfCourseIFA)) {
              healthStore.ifaDOCError = AppStrings.requiredField;
              return;
            }
            if (
              !Utility.validateAlphaNumericSpecial(
                healthStore.locationOfDoseIFA,
              )
            ) {
              healthStore.ifaLocError = AppStrings.requiredField;
              return;
            }
          }
        } else {
        }
      }

      if (healthStore.targetBeneficiary === '') {
        healthStore.targetError = AppStrings.requiredField;
        return;
      }
      if (healthStore.educationalDetails === '') {
        healthStore.educatError = AppStrings.requiredField;
        return;
      }

      healthStore.enableSubmit = true;
    },

    toggleBottomSheet(from?: string) {
      healthStore.openBottomSheet = !healthStore.openBottomSheet;
      switch (from) {
        case 'partner':
          healthStore.bottomSheetHeader = 'Is this a new/existing partner';
          healthStore.bottomSheetArray = healthStore.partnerOptions;
          break;
        case 'partnerName':
          healthStore.bottomSheetHeader = 'Name of the Partner';
          healthStore.bottomSheetArray = healthStore.partnerNameList;
          break;
        case 'partnerType':
          healthStore.bottomSheetHeader = 'Partner Type';
          healthStore.bottomSheetArray = healthStore.partnerTypeOptions;
          break;
        case 'vitaminA':
          healthStore.bottomSheetHeader = 'Vitamin A';
          healthStore.bottomSheetArray = healthStore.vitaminAOptions;
          break;
        case 'doneBy':
          healthStore.bottomSheetHeader = 'Done By Whom';
          healthStore.bottomSheetArray = healthStore.doneByOptions;
          break;
        case 'doneByWorm':
          healthStore.bottomSheetHeader = 'Done By Whom ';
          healthStore.bottomSheetArray = healthStore.doneByOptions;
          break;
        case 'doneByIFA':
          healthStore.bottomSheetHeader = 'Done By Whom  ';
          healthStore.bottomSheetArray = healthStore.doneByOptions;
          break;
        case 'deworming':
          healthStore.bottomSheetHeader = 'Deworming';
          healthStore.bottomSheetArray = healthStore.vitaminAOptions;
          break;
        case 'targetBeneficiary':
          healthStore.bottomSheetHeader = 'Target Beneficiary';
          healthStore.bottomSheetArray = healthStore.targetBenefitOptions;
          break;
        case 'educationalDetails':
          healthStore.bottomSheetHeader = 'Educational Details';
          healthStore.bottomSheetArray = healthStore.educationalDetailsOptions;
          break;
        case 'IFA':
          healthStore.bottomSheetHeader = 'IFA';
          healthStore.bottomSheetArray = healthStore.vitaminAOptions;
          break;
        case 'gender':
          healthStore.bottomSheetHeader = 'Gender';
          healthStore.bottomSheetArray = healthStore.genderOptions;
          break;
      }
    },

    setValue(from: string, value: string, id: string) {
      healthStore.openBottomSheet = !healthStore.openBottomSheet;
      switch (from) {
        case 'Is this a new/existing partner':
          healthStore.partner = value;
          healthStore.partnerError = '';
          healthStore.validateSubmit();
          break;
        case 'Name of the Partner':
          const res = value.split(',');
          healthStore.existPartnerName = res[0];
          healthStore.existLocation = res[1];
          healthStore.existBlock = res[2];
          healthStore.existDistrict = res[3];
          healthStore.existState = res[4];
          healthStore.partnerID = id;
          healthStore.existPartError = '';
          healthStore.validateSubmit();
          break;
        case 'Partner Type':
          healthStore.partnerType = value;
          healthStore.partnerTypeID = id;
          healthStore.partTypeError = '';
          healthStore.validateSubmit();
          break;
        case 'Vitamin A':
          healthStore.vitaminA = value;
          healthStore.vitAError = '';
          healthStore.validateSubmit();
          break;
        case 'Done By Whom':
          healthStore.doneBy = value;
          healthStore.doneByID = id;
          healthStore.vitADBWError = '';
          healthStore.validateSubmit();
          break;
        case 'Done By Whom ':
          healthStore.doneByWorm = value;
          healthStore.doneByWormID = id;
          healthStore.dewormDBWError = '';
          healthStore.validateSubmit();
          break;
        case 'Done By Whom  ':
          healthStore.doneByIFA = value;
          healthStore.doneByIFAID = id;
          healthStore.ifaDBWError = '';
          healthStore.validateSubmit();
          break;
        case 'IFA':
          healthStore.ifa = value;
          healthStore.ifaError = '';
          healthStore.validateSubmit();
          break;
        case 'Deworming':
          healthStore.deworming = value;
          healthStore.dewormError = '';
          healthStore.validateSubmit();
          break;
        case 'Target Beneficiary':
          healthStore.targetBeneficiary = value;
          healthStore.beneficiaryID = id;
          healthStore.targetError = '';
          healthStore.validateSubmit();
          break;
        case 'Educational Details':
          healthStore.educationalDetails = value;
          healthStore.educationalDetailsID = id;
          healthStore.educatError = '';
          healthStore.validateSubmit();
          break;
        case 'Gender':
          healthStore.gender = value;
          healthStore.genderID = id;
          healthStore.genderError = '';
          healthStore.validateSubmit();
          break;
      }
    },
    async handleSubmit() {
      runInAction(() => {
        healthStore.isLoading = true;
      });
      try {
        const formData = new FormData();
        if (this.partner === 'New') {
          formData.append(
            'partner_details',
            JSON.stringify({
              name: healthStore.newPartnerName,
              location: healthStore.newLocation,
              block: healthStore.newBlock,
              district: healthStore.newDistrict,
              state: healthStore.newState,
            }),
          );
          formData.append('partner', '');
          formData.append('type', healthStore.partnerTypeID);
        } else {
          formData.append('partner', healthStore.partnerID);
        }
        formData.append('health_camp_date', healthStore.dohc);
        formData.append('serial_no', healthStore.numberHC);
        formData.append(
          'child_info',
          JSON.stringify({
            name: healthStore.childName,
            dob: healthStore.dob,
            contact: healthStore.contact,
            gender: healthStore.genderID,
            beneficiary_id: healthStore.beneficiaryID,
            image:
              healthStore.selectedImages.length > 0
                ? healthStore.selectedImages[0].path
                : null,
          }),
        );
        formData.append(
          'child_details',
          JSON.stringify({
            age: healthStore.age,
            height: healthStore.height,
            weight: healthStore.weight,
            muac: healthStore.muac,
            education: healthStore.educationalDetailsID,
          }),
        );
        if (this.vitaminA === 'Done') {
          formData.append(
            'vitamin_A',
            JSON.stringify({
              done_by: healthStore.doneByID,
              duration: healthStore.durationOfCourse,
              location: healthStore.locationOfDose,
              dose_date: healthStore.dateOfDoseVitamin,
            }),
          );
          formData.append('vitamin_A', true);
        } else {
          formData.append('vitamin_A', false);
        }

        if (this.deworming === 'Done') {
          formData.append(
            'deworming_details',
            JSON.stringify({
              done_by: healthStore.doneByWormID,
              duration: healthStore.durationOfCourseWorm,
              location: healthStore.locationOfDoseWorm,
              dose_date: healthStore.dateOfDoseDeworm,
            }),
          );
          formData.append('deworming', true);
        } else {
          formData.append('deworming', false);
        }

        if (this.ifa === 'Done') {
          formData.append(
            'ifa_details',
            JSON.stringify({
              done_by: healthStore.doneByIFAID,
              duration: healthStore.durationOfCourseIFA,
              location: healthStore.locationOfDoseIFA,
              dose_date: healthStore.dateOfDoseIFA,
            }),
          );
          formData.append('ifa', true);
        } else {
          formData.append('ifa', false);
        }
        const responseJson = await request<HealthModal>(
          'post',
          AppStrings.healthCamp,
          formData,
          {
            'Content-Type': 'multipart/form-data;',
          },
        );

        if (responseJson.success) {
          Utility.showToast(responseJson.msg);
          navigation.goBack();
        } else {
          Utility.showToast(responseJson.msg);
          navigation.goBack();
        }
      } catch (err) {
        console.log(err, 'message');
        Utility.showToast('Something went wrong');
      } finally {
        runInAction(() => {
          healthStore.isLoading = false;
        });
      }
    },
  }));

  return healthStore;
};

export default useHealthStore;
