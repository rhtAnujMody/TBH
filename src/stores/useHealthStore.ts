import {useLocalObservable} from 'mobx-react-lite';
import Utility from '../utils/Utility';
import {runInAction} from 'mobx';
import {Image} from 'react-native-image-crop-picker';
import AppStrings from '../utils/AppStrings';
import useApiService from '../network/useAPIService';
import {HealthModal} from '../models';
import authStore from './authStore';
import {useNavigation} from '@react-navigation/native';
import {useAsyncStorage} from '../custom_hooks';

const useHealthStore = () => {
  const {request} = useApiService();
  const navigation = useNavigation();
  const {setData, getData} = useAsyncStorage();

  const keys = [
    'partner',
    'partnerID',
    'newPartnerName',
    'newLocation',
    'newBlock',
    'newDistrict',
    'newState',
    'existPartnerName',
    'existLocation',
    'existBlock',
    'existDistrict',
    'existState',
    'partnerType',
    'partnerTypeID',
    'dohc',
    'numberHC',
  ];

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

    async getItem() {
      keys.map(item => {
        getData(item, '').then(res => healthStore.setValues(item, res ?? ''));
      });
    },

    setValues(key: string, value: string) {
      switch (key) {
        case 'partner':
          healthStore.partner = value;
          break;
        case 'partnerID':
          healthStore.partnerID = value;
          break;
        case 'newPartnerName':
          healthStore.setNewPartnerName(value);
          break;
        case 'newLocation':
          healthStore.setNewLocation(value);
          break;
        case 'newBlock':
          healthStore.setNewBlock(value);
          break;
        case 'newDistrict':
          healthStore.setNewDistrict(value);
          break;
        case 'newState':
          healthStore.setNewState(value);
          break;
        case 'existPartnerName':
          healthStore.existPartnerName = value;
          break;
        case 'existLocation':
          healthStore.existLocation = value;
          break;
        case 'existBlock':
          healthStore.existBlock = value;
          break;
        case 'existDistrict':
          healthStore.existDistrict = value;
          break;
        case 'existState':
          healthStore.existState = value;
          break;
        case 'partnerType':
          healthStore.partnerType = value;
          break;
        case 'partnerTypeID':
          healthStore.partnerTypeID = value;
          break;
        case 'dohc':
          healthStore.setDOHC(value);
          break;
        case 'numberHC':
          healthStore.setNumberHC(value);
          break;
      }
    },

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
      healthStore.dohc = value;
      healthStore.validateSubmit();
    },
    setNumberHC(value: string) {
      healthStore.numberHC = value;
      healthStore.validateSubmit();
    },
    setChildName(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlpha(value)) {
        return;
      }
      healthStore.childName = value;
      healthStore.validateSubmit();
    },
    setContact(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumeric(value)) {
        return;
      }
      healthStore.contact = value;
      healthStore.validateSubmit();
    },
    setDOB(value: string) {
      healthStore.dob = value;
      healthStore.validateSubmit();
    },
    setAge(value: number) {
      healthStore.age = value.toString();
    },
    setHeight(value: string) {
      if (!(value.trim() === '') && !Utility.validateFloat(value)) {
        return;
      }
      healthStore.height = value;
      healthStore.validateSubmit();
    },
    setWeight(value: string) {
      if (!(value.trim() === '') && !Utility.validateFloat(value)) {
        return;
      }
      healthStore.weight = value;
      healthStore.validateSubmit();
    },
    setMUAC(value: string) {
      if (!(value.trim() === '') && !Utility.validateFloat(value)) {
        return;
      }
      healthStore.muac = value;
      healthStore.validateSubmit();
    },
    setNewPartnerName(value: string) {
      healthStore.newPartnerName = value;
      healthStore.validateSubmit();
    },
    setNewLocation(value: string) {
      healthStore.newLocation = value;
      healthStore.validateSubmit();
    },
    setNewBlock(value: string) {
      healthStore.newBlock = value;
      healthStore.validateSubmit();
    },
    setNewDistrict(value: string) {
      healthStore.newDistrict = value;
      healthStore.validateSubmit();
    },
    setNewState(value: string) {
      healthStore.newState = value;
      healthStore.validateSubmit();
    },
    setDurationOfCourse(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumeric(value)) {
        return;
      }
      healthStore.durationOfCourse = value;
      healthStore.validateSubmit();
    },
    setDurationOfCourseWorm(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumeric(value)) {
        return;
      }
      healthStore.durationOfCourseWorm = value;
      healthStore.validateSubmit();
    },
    setLocationOfDose(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlphaSpecial(value)) {
        return;
      }
      healthStore.locationOfDose = value;
      healthStore.validateSubmit();
    },
    setLocationOfDoseWorm(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlphaSpecial(value)) {
        return;
      }
      healthStore.locationOfDoseWorm = value;
      healthStore.validateSubmit();
    },
    setLocationOfDoseIFA(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlphaSpecial(value)) {
        return;
      }
      healthStore.locationOfDoseIFA = value;
      healthStore.validateSubmit();
    },
    setDateOfDoseVitamin(value: string) {
      healthStore.dateOfDoseVitamin = value;
      healthStore.validateSubmit();
    },
    setDateOfDoseDeworm(value: string) {
      healthStore.dateOfDoseDeworm = value;
      healthStore.validateSubmit();
    },
    setDateOfDoseIFA(value: string) {
      healthStore.dateOfDoseIFA = value;
      healthStore.validateSubmit();
    },
    setDurationOfCourseIFA(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumeric(value)) {
        return;
      }
      healthStore.durationOfCourseIFA = value;
      healthStore.validateSubmit();
    },
    setSelectedImages(selectedImage: Image[]) {
      healthStore.selectedImages = selectedImage;
    },

    togglePhotoBottomSheet() {
      healthStore.openPhotoBottomSheet = !healthStore.openPhotoBottomSheet;
    },

    validateSubmit() {
      healthStore.enableSubmit = false;

      if (healthStore.partner === '') {
        return;
      }
      if (healthStore.partner === 'New') {
        if (
          !Utility.validateAlphaNumericSpecial(healthStore.newPartnerName) ||
          !Utility.validateAlphaNumericSpecial(healthStore.newLocation) ||
          !Utility.validateAlphaNumericSpecial(healthStore.newBlock) ||
          !Utility.validateAlphaNumericSpecial(healthStore.newDistrict) ||
          !Utility.validateAlphaNumericSpecial(healthStore.newState)
        ) {
          return;
        }
      } else {
        if (healthStore.existPartnerName === '') {
          return;
        }
      }
      if (healthStore.partnerType === '') {
        return;
      }

      if (healthStore.dohc === '') {
        return;
      }
      if (!Utility.validateAlphaNumericSpecial(healthStore.numberHC)) {
        return;
      }
      if (!Utility.validateAlpha(healthStore.childName)) {
        return;
      }
      if (!Utility.validatePhoneNumber(healthStore.contact)) {
        return;
      }
      if (healthStore.dob === '') {
        return;
      }
      if (healthStore.gender === '') {
        return;
      }
      if (!Utility.validateFloat(healthStore.height)) {
        return;
      }
      if (!Utility.validateFloat(healthStore.weight)) {
        return;
      }
      if (!Utility.validateFloat(healthStore.muac)) {
        return;
      }
      if (healthStore.targetBeneficiary === '') {
        return;
      }
      if (healthStore.educationalDetails === '') {
        return;
      }

      if (healthStore.vitaminA === '') {
        return;
      } else {
        if (healthStore.vitaminA === 'Done') {
          if (healthStore.doneBy === '') {
            return;
          } else {
            if (healthStore.dateOfDoseVitamin === '') {
              return;
            }
            if (!Utility.validateNumeric(healthStore.durationOfCourse)) {
              return;
            }
            if (
              !Utility.validateAlphaNumericSpecial(healthStore.locationOfDose)
            ) {
              return;
            }
          }
        }
      }

      if (healthStore.deworming === '') {
        return;
      } else {
        if (healthStore.deworming === 'Done') {
          if (healthStore.doneByWorm === '') {
            return;
          } else {
            if (healthStore.dateOfDoseDeworm === '') {
              return;
            }
            if (!Utility.validateNumeric(healthStore.durationOfCourseWorm)) {
              return;
            }
            if (
              !Utility.validateAlphaNumericSpecial(
                healthStore.locationOfDoseWorm,
              )
            ) {
              return;
            }
          }
        } else {
        }
      }

      if (healthStore.ifa === '') {
        return;
      } else {
        if (healthStore.ifa === 'Done') {
          if (healthStore.doneByIFA === '') {
            return;
          } else {
            if (healthStore.dateOfDoseIFA === '') {
              return;
            }
            if (!Utility.validateNumeric(healthStore.durationOfCourseIFA)) {
              return;
            }
            if (
              !Utility.validateAlphaNumericSpecial(
                healthStore.locationOfDoseIFA,
              )
            ) {
              return;
            }
          }
        } else {
        }
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
          healthStore.validateSubmit();
          break;
        case 'Partner Type':
          healthStore.partnerType = value;
          healthStore.partnerTypeID = id;
          healthStore.validateSubmit();
          break;
        case 'Vitamin A':
          healthStore.vitaminA = value;
          healthStore.validateSubmit();
          break;
        case 'Done By Whom':
          healthStore.doneBy = value;
          healthStore.doneByID = id;
          healthStore.validateSubmit();
          break;
        case 'Done By Whom ':
          healthStore.doneByWorm = value;
          healthStore.doneByWormID = id;
          healthStore.validateSubmit();
          break;
        case 'Done By Whom  ':
          healthStore.doneByIFA = value;
          healthStore.doneByIFAID = id;
          healthStore.validateSubmit();
          break;
        case 'IFA':
          healthStore.ifa = value;
          healthStore.validateSubmit();
          break;
        case 'Deworming':
          healthStore.deworming = value;
          healthStore.validateSubmit();
          break;
        case 'Target Beneficiary':
          healthStore.targetBeneficiary = value;
          healthStore.beneficiaryID = id;
          healthStore.validateSubmit();
          break;
        case 'Educational Details':
          healthStore.educationalDetails = value;
          healthStore.educationalDetailsID = id;
          healthStore.validateSubmit();
          break;
        case 'Gender':
          healthStore.gender = value;
          healthStore.genderID = id;
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

        setData('partner', healthStore.partner.toString());
        setData('partnerID', healthStore.partnerID.toString());
        setData('existPartnerName', healthStore.existPartnerName.toString());
        setData('existLocation', healthStore.existLocation.toString());
        setData('existBlock', healthStore.existBlock.toString());
        setData('existDistrict', healthStore.existDistrict.toString());
        setData('existState', healthStore.existState.toString());

        setData('partnerType', healthStore.partnerType.toString());
        setData('partnerTypeID', healthStore.partnerTypeID.toString());
        setData('dohc', healthStore.dohc.toString());
        setData('numberHC', healthStore.numberHC.toString());
        setData('newPartnerName', healthStore.newPartnerName.toString());
        setData('newLocation', healthStore.newLocation.toString());
        setData('newBlock', healthStore.newBlock.toString());
        setData('newDistrict', healthStore.newDistrict.toString());
        setData('newState', healthStore.newState.toString());

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
            'vitamin_A_details',
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

        console.log(formData, 'form data');
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
