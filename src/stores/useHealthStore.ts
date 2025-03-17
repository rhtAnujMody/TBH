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
      {name: AppStrings.new, id: AppStrings.newID},
      {name: AppStrings.existing, id: AppStrings.existingID},
    ],
    partnerNameList: Utility.partnerNameLocation(authStore.userData),
    partnerTypeOptions: [
      {
        name: AppStrings.tbr,
        id: 1,
      },
      {
        name: AppStrings.brightStart,
        id: 2,
      },
      {
        name: AppStrings.anaemiaMuktBharat,
        id: 3,
      },
    ],
    vitaminAOptions: [
      {name: AppStrings.HEALTH_CAMP_SCREEN.done, id: 1},
      {name: AppStrings.HEALTH_CAMP_SCREEN.notDone, id: 2},
    ],
    genderOptions: [
      {name: AppStrings.male, id: 'M'},
      {name: AppStrings.female, id: 'F'},
      {name: AppStrings.others, id: 'O'},
    ],
    doneByOptions: [
      {name: AppStrings.decimalFoundation, id: 'D'},
      {name: AppStrings.government, id: 'G'},
    ],
    targetBenefitOptions: authStore.userData.health_camp_beneficiary,
    educationalDetailsOptions: authStore.userData.education_details,
    showSearchBar: false,
    ageIsEditable: true,

    errorMessages: {
      partner: '',
      newPartnerName: '',
      newLocation: '',
      newBlock: '',
      newDistrict: '',
      newState: '',
      existPartnerName: '',
      partnerType: '',
      dohc: '',
      numberHC: '',
      childName: '',
      contact: '',
      dob: '',
      age: '',
      gender: '',
      height: '',
      weight: '',
      muac: '',
      vitaminA: '',
      doneBy: '',
      dateOfDoseVitamin: '',
      durationOfCourse: '',
      locationOfDose: '',
      deworming: '',
      doneByWorm: '',
      dateOfDoseDeworm: '',
      durationOfCourseWorm: '',
      locationOfDoseWorm: '',
      ifa: '',
      doneByIFA: '',
      dateOfDoseIFA: '',
      durationOfCourseIFA: '',
      locationOfDoseIFA: '',
      targetBeneficiary: '',
      educationalDetails: '',
    },

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
    },
    setDOHC(value: string) {
      healthStore.dohc = value;
      healthStore.errorMessages.dohc = '';
    },
    setNumberHC(value: string) {
      healthStore.numberHC = value;
      healthStore.errorMessages.numberHC = '';
    },
    setChildName(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlpha(value)) {
        return;
      }
      healthStore.childName = value;
      healthStore.errorMessages.childName = '';
    },
    setContact(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumeric(value)) {
        return;
      }
      healthStore.contact = value;
      healthStore.errorMessages.contact = '';
    },
    setDOB(value: string) {
      healthStore.dob = value;
      healthStore.errorMessages.dob = '';
    },
    setAge(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumeric(value)) {
        return;
      }
      healthStore.age = value;
      healthStore.errorMessages.age = '';
    },
    setHeight(value: string) {
      if (!(value.trim() === '') && !Utility.validateFloat(value)) {
        return;
      }
      healthStore.height = value;
      healthStore.errorMessages.height = '';
    },
    setWeight(value: string) {
      if (!(value.trim() === '') && !Utility.validateFloat(value)) {
        return;
      }
      healthStore.weight = value;
      healthStore.errorMessages.weight = '';
    },
    setMUAC(value: string) {
      if (!(value.trim() === '') && !Utility.validateFloat(value)) {
        return;
      }
      healthStore.muac = value;
      healthStore.errorMessages.muac = '';
    },
    setNewPartnerName(value: string) {
      healthStore.newPartnerName = value;
      healthStore.errorMessages.newPartnerName = '';
    },
    setNewLocation(value: string) {
      healthStore.newLocation = value;
      healthStore.errorMessages.newLocation = '';
    },
    setNewBlock(value: string) {
      healthStore.newBlock = value;
      healthStore.errorMessages.newBlock = '';
    },
    setNewDistrict(value: string) {
      healthStore.newDistrict = value;
      healthStore.errorMessages.newDistrict = '';
    },
    setNewState(value: string) {
      healthStore.newState = value;
      healthStore.errorMessages.newState = '';
    },
    setDurationOfCourse(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumeric(value)) {
        return;
      }
      healthStore.durationOfCourse = value;
      healthStore.errorMessages.durationOfCourse = '';
    },
    setDurationOfCourseWorm(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumeric(value)) {
        return;
      }
      healthStore.durationOfCourseWorm = value;
      healthStore.errorMessages.durationOfCourseWorm = '';
    },
    setLocationOfDose(value: string) {
      if (
        !(value.trim() === '') &&
        !Utility.validateAlphaNumericSpecial(value)
      ) {
        return;
      }
      healthStore.locationOfDose = value;
      healthStore.errorMessages.locationOfDose = '';
    },
    setLocationOfDoseWorm(value: string) {
      if (
        !(value.trim() === '') &&
        !Utility.validateAlphaNumericSpecial(value)
      ) {
        return;
      }
      healthStore.locationOfDoseWorm = value;
      healthStore.errorMessages.locationOfDoseWorm = '';
    },
    setLocationOfDoseIFA(value: string) {
      if (
        !(value.trim() === '') &&
        !Utility.validateAlphaNumericSpecial(value)
      ) {
        return;
      }
      healthStore.locationOfDoseIFA = value;
      healthStore.errorMessages.locationOfDoseIFA = '';
    },
    setDateOfDoseVitamin(value: string) {
      healthStore.dateOfDoseVitamin = value;
      healthStore.errorMessages.dateOfDoseVitamin = '';
    },
    setDateOfDoseDeworm(value: string) {
      healthStore.dateOfDoseDeworm = value;
      healthStore.errorMessages.dateOfDoseDeworm = '';
    },
    setDateOfDoseIFA(value: string) {
      healthStore.dateOfDoseIFA = value;
      healthStore.errorMessages.dateOfDoseIFA = '';
    },
    setDurationOfCourseIFA(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumeric(value)) {
        return;
      }
      healthStore.durationOfCourseIFA = value;
      healthStore.errorMessages.durationOfCourseIFA = '';
    },
    setSelectedImages(selectedImage: Image[]) {
      healthStore.selectedImages = selectedImage;
    },

    setShowSearchBar(value: boolean) {
      healthStore.showSearchBar = value;
    },

    togglePhotoBottomSheet() {
      healthStore.openPhotoBottomSheet = !healthStore.openPhotoBottomSheet;
    },

    disableAgeEdit() {
      healthStore.ageIsEditable = false;
    },

    validateSubmit() {
      let isValid = true;
      if (healthStore.partner === '') {
        healthStore.errorMessages.partner = 'This Field is Required';
        isValid = false;
      }
      if (healthStore.partner === AppStrings.new) {
        if (healthStore.newPartnerName === '') {
          healthStore.errorMessages.newPartnerName = 'This Field is Required';
          isValid = false;
        }
        if (healthStore.newLocation === '') {
          healthStore.errorMessages.newLocation = 'This Field is Required';
          isValid = false;
        }
        if (healthStore.newBlock === '') {
          healthStore.errorMessages.newBlock = 'This Field is Required';
          isValid = false;
        }
        if (healthStore.newDistrict === '') {
          healthStore.errorMessages.newDistrict = 'This Field is Required';
          isValid = false;
        }
        if (healthStore.newState === '') {
          healthStore.errorMessages.newState = 'This Field is Required';
          isValid = false;
        }
      } else {
        if (healthStore.existPartnerName === '') {
          healthStore.errorMessages.existPartnerName = 'This Field is Required';
          isValid = false;
        }
      }
      if (healthStore.partnerType === '') {
        healthStore.errorMessages.partnerType = 'This Field is Required';
        isValid = false;
      }

      if (healthStore.dohc === '') {
        healthStore.errorMessages.dohc = 'This Field is Required';
        isValid = false;
      }
      if (healthStore.numberHC === '') {
        healthStore.errorMessages.numberHC = 'This Field is Required';
        isValid = false;
      }
      if (healthStore.childName === '') {
        healthStore.errorMessages.childName = 'This Field is Required';
        isValid = false;
      }
      if (healthStore.contact === '') {
        healthStore.errorMessages.contact = 'This Field is Required';
        isValid = false;
      }
      if (!Utility.validatePhoneNumber(healthStore.contact)) {
        healthStore.errorMessages.contact = 'Please Enter a Valid Phone Number';
        isValid = false;
      }
      if (healthStore.age === '') {
        healthStore.errorMessages.age = 'This Field is Required';
        isValid = false;
      }
      if (healthStore.gender === '') {
        healthStore.errorMessages.gender = 'This Field is Required';
        isValid = false;
      }
      if (healthStore.height === '') {
        healthStore.errorMessages.height = 'This Field is Required';
        isValid = false;
      }
      if (healthStore.weight === '') {
        healthStore.errorMessages.weight = 'This Field is Required';
        isValid = false;
      }
      if (healthStore.muac === '') {
        healthStore.errorMessages.muac = 'This Field is Required';
        isValid = false;
      }

      if (healthStore.vitaminA === '') {
        healthStore.errorMessages.vitaminA = 'This Field is Required';
        isValid = false;
      } else {
        if (healthStore.vitaminA === AppStrings.HEALTH_CAMP_SCREEN.done) {
          if (healthStore.doneBy === '') {
            healthStore.errorMessages.doneBy = 'This Field is Required';
            isValid = false;
          } else {
            if (healthStore.dateOfDoseVitamin === '') {
              healthStore.errorMessages.dateOfDoseVitamin =
                'This Field is Required';
              isValid = false;
            }
            if (healthStore.durationOfCourse === '') {
              healthStore.errorMessages.durationOfCourse =
                'This Field is Required';
              isValid = false;
            }
            if (healthStore.locationOfDose === '') {
              healthStore.errorMessages.locationOfDose =
                'This Field is Required';
              isValid = false;
            }
          }
        }
      }

      if (healthStore.deworming === '') {
        healthStore.errorMessages.deworming = 'This Field is Required';
        isValid = false;
      } else {
        if (healthStore.deworming === AppStrings.HEALTH_CAMP_SCREEN.done) {
          if (healthStore.doneByWorm === '') {
            healthStore.errorMessages.doneByWorm = 'This Field is Required';
            isValid = false;
          } else {
            if (healthStore.dateOfDoseDeworm === '') {
              healthStore.errorMessages.dateOfDoseDeworm =
                'This Field is Required';
              isValid = false;
            }
            if (healthStore.durationOfCourseWorm === '') {
              healthStore.errorMessages.durationOfCourseWorm =
                'This Field is Required';
              isValid = false;
            }
            if (healthStore.locationOfDoseWorm === '') {
              healthStore.errorMessages.locationOfDoseWorm =
                'This Field is Required';
              isValid = false;
            }
          }
        } else {
        }
      }

      if (healthStore.ifa === '') {
        healthStore.errorMessages.ifa = 'This Field is Required';
        isValid = false;
      } else {
        if (healthStore.ifa === AppStrings.HEALTH_CAMP_SCREEN.done) {
          if (healthStore.doneByIFA === '') {
            healthStore.errorMessages.doneByIFA = 'This Field is Required';
            isValid = false;
          } else {
            if (healthStore.dateOfDoseIFA === '') {
              healthStore.errorMessages.dateOfDoseIFA =
                'This Field is Required';
              isValid = false;
            }
            if (healthStore.durationOfCourseIFA === '') {
              healthStore.errorMessages.durationOfCourseIFA =
                'This Field is Required';
              isValid = false;
            }
            if (healthStore.locationOfDoseIFA === '') {
              healthStore.errorMessages.locationOfDoseIFA =
                'This Field is Required';
              isValid = false;
            }
          }
        } else {
        }
      }

      if (healthStore.targetBeneficiary === '') {
        healthStore.errorMessages.targetBeneficiary = 'This Field is Required';
        isValid = false;
      }
      if (healthStore.educationalDetails === '') {
        healthStore.errorMessages.educationalDetails = 'This Field is Required';
        isValid = false;
      }

      return isValid;
    },

    toggleBottomSheet(from?: string) {
      healthStore.openBottomSheet = !healthStore.openBottomSheet;
      switch (from) {
        case 'partner':
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.partnerHeader;
          healthStore.bottomSheetArray = healthStore.partnerOptions;
          break;
        case 'partnerName':
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.partnerNameHeader;
          healthStore.bottomSheetArray = healthStore.partnerNameList;
          healthStore.setShowSearchBar(true);
          break;
        case 'partnerType':
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.partnerTypeHeader;
          healthStore.bottomSheetArray = healthStore.partnerTypeOptions;
          break;
        case 'vitaminA':
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.vitaminA;
          healthStore.bottomSheetArray = healthStore.vitaminAOptions;
          break;
        case 'doneBy':
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.doneByWhom;
          healthStore.bottomSheetArray = healthStore.doneByOptions;
          break;
        case 'doneByWorm':
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.doneByWormHeader;
          healthStore.bottomSheetArray = healthStore.doneByOptions;
          break;
        case 'doneByIFA':
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.doneByIFAHeader;
          healthStore.bottomSheetArray = healthStore.doneByOptions;
          break;
        case 'deworming':
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.deworming;
          healthStore.bottomSheetArray = healthStore.vitaminAOptions;
          break;
        case 'targetBeneficiary':
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.targetBeneficiary;
          healthStore.bottomSheetArray = healthStore.targetBenefitOptions;
          break;
        case 'educationalDetails':
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.educationalDetails;
          healthStore.bottomSheetArray = healthStore.educationalDetailsOptions;
          break;
        case 'IFA':
          healthStore.bottomSheetHeader = AppStrings.HEALTH_CAMP_SCREEN.ifa;
          healthStore.bottomSheetArray = healthStore.vitaminAOptions;
          break;
        case 'gender':
          healthStore.bottomSheetHeader = AppStrings.HEALTH_CAMP_SCREEN.gender;
          healthStore.bottomSheetArray = healthStore.genderOptions;
          break;
      }
    },

    setValue(from: string, value: string, id: string) {
      healthStore.openBottomSheet = !healthStore.openBottomSheet;
      healthStore.setShowSearchBar(false);
      switch (from) {
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.partnerHeader:
          healthStore.partner = value;
          healthStore.errorMessages.partner = '';

          break;
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.partnerNameHeader:
          const res = value.split(',');
          healthStore.existPartnerName = res[0];
          healthStore.existLocation = res[1];
          healthStore.existBlock = res[2];
          healthStore.existDistrict = res[3];
          healthStore.existState = res[4];
          healthStore.partnerID = id;
          healthStore.errorMessages.existPartnerName = '';

          break;
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.partnerTypeHeader:
          healthStore.partnerType = value;
          healthStore.partnerTypeID = id;
          healthStore.errorMessages.partnerType = '';

          break;
        case AppStrings.HEALTH_CAMP_SCREEN.vitaminA:
          healthStore.vitaminA = value;
          healthStore.errorMessages.vitaminA = '';

          break;
        case AppStrings.HEALTH_CAMP_SCREEN.doneByWhom:
          healthStore.doneBy = value;
          healthStore.doneByID = id;
          healthStore.errorMessages.doneBy = '';

          break;
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.doneByWormHeader:
          healthStore.doneByWorm = value;
          healthStore.doneByWormID = id;
          healthStore.errorMessages.doneByWorm = '';

          break;
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.doneByIFAHeader:
          healthStore.doneByIFA = value;
          healthStore.doneByIFAID = id;
          healthStore.errorMessages.doneByIFA = '';

          break;
        case AppStrings.HEALTH_CAMP_SCREEN.ifa:
          healthStore.ifa = value;
          healthStore.errorMessages.ifa = '';

          break;
        case AppStrings.HEALTH_CAMP_SCREEN.deworming:
          healthStore.deworming = value;
          healthStore.errorMessages.deworming = '';

          break;
        case AppStrings.HEALTH_CAMP_SCREEN.targetBeneficiary:
          healthStore.targetBeneficiary = value;
          healthStore.beneficiaryID = id;
          healthStore.errorMessages.targetBeneficiary = '';

          break;
        case AppStrings.HEALTH_CAMP_SCREEN.educationalDetails:
          healthStore.educationalDetails = value;
          healthStore.educationalDetailsID = id;
          healthStore.errorMessages.educationalDetails = '';

          break;
        case AppStrings.HEALTH_CAMP_SCREEN.gender:
          healthStore.gender = value;
          healthStore.genderID = id;
          healthStore.errorMessages.gender = '';

          break;
      }
    },
    async writeToRealm() {
      try {
        authStore.realm.write(() => {
          const savedRecord = authStore.realm.create('HealthCamp', {
            _id: Date.now(),
            agent_id: authStore.userData.id,
            isNew: healthStore.partner === 'New',
            name: healthStore.newPartnerName,
            location: healthStore.newLocation,
            block: healthStore.newBlock,
            district: healthStore.newDistrict,
            state: healthStore.newState,
            partnerID:
              healthStore.partnerID === ''
                ? 0
                : parseInt(healthStore.partnerID),
            type: parseInt(healthStore.partnerTypeID),
            health_camp_date: healthStore.dohc,
            serial_no: healthStore.numberHC,
            childName: healthStore.childName,
            contact: healthStore.contact,
            gender: healthStore.genderID,
            beneficiaryID: healthStore.beneficiaryID,
            age_editable: healthStore.ageIsEditable,
            dob: healthStore.dob,
            age: healthStore.age,
            height: healthStore.height,
            weight: healthStore.weight,
            muac: healthStore.muac,
            education: healthStore.educationalDetailsID,
            vitamin_A: this.vitaminA === 'Done',
            vitamin_A_done_by: healthStore.doneByID,
            vitamin_A_duration: healthStore.durationOfCourse,
            vitamin_A_location: healthStore.locationOfDose,
            vitamin_A_dose_date: healthStore.dateOfDoseVitamin,
            deworming: this.deworming === 'Done',
            deworming_done_by: healthStore.doneByWormID,
            deworming_duration: healthStore.durationOfCourseWorm,
            deworming_location: healthStore.locationOfDoseWorm,
            deworming_dose_date: healthStore.dateOfDoseDeworm,
            ifa: this.ifa === 'Done',
            ifa_done_by: healthStore.doneByIFAID,
            ifa_duration: healthStore.durationOfCourseIFA,
            ifa_location: healthStore.locationOfDoseIFA,
            ifa_dose_date: healthStore.dateOfDoseIFA,
          });

          for (
            let i = 0;
            i < Math.min(healthStore.selectedImages.length, 5);
            i++
          ) {
            savedRecord.images.push(
              authStore.realm.create('ImagesSchema', {
                _id: Date.now() + i,
                uri: healthStore.selectedImages[i].path,
                type: healthStore.selectedImages[i].mime,
                name: healthStore.selectedImages[i].path.split('/').pop(),
              }),
            );
          }
          Utility.showToast('Record Saved Successfully to Local Database');
        });
      } catch (e) {
        Utility.showToast(AppStrings.somethingWentWrong);
        console.log('error saving data', e);
      }
    },

    async getPartnerList() {
      try {
        const response: any = await request(
          'get',
          AppStrings.managePartner(authStore.userData.id),
        );
        if (response.success) {
          runInAction(() => {
           authStore.setNewPartnerList(response.data);
          });
        }
      } catch (err) {
        Utility.showToast(AppStrings.somethingWentWrong);
      } 
    },

    async handleSubmit() {
      runInAction(() => {
        healthStore.isLoading = true;
      });
      try {
        if (healthStore.validateSubmit()) {
          const formData = new FormData();
          const checkInternet = await Utility.checkInterNet();
          formData.append('agent_id', authStore.userData.id);
          if (this.partner === 'New') {
            formData.append(
              'partner_details',
              JSON.stringify({
                name: healthStore.newPartnerName,
                location: healthStore.newLocation,
                block: healthStore.newBlock,
                district: healthStore.newDistrict,
                state: healthStore.newState,
                type:healthStore.partnerTypeID,
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

          if (this.ageIsEditable === true) {
            formData.append(
              'child_info',
              JSON.stringify({
                name: healthStore.childName,
                contact: healthStore.contact,
                gender: healthStore.genderID,
                beneficiary_id: healthStore.beneficiaryID,
                // image:
                //   healthStore.selectedImages.length > 0
                //     ? healthStore.selectedImages[0].path
                //     : null,
              }),
            );
          } else {
            formData.append(
              'child_info',
              JSON.stringify({
                name: healthStore.childName,
                dob: healthStore.dob,
                contact: healthStore.contact,
                gender: healthStore.genderID,
                beneficiary_id: healthStore.beneficiaryID,
                // image:   healthStore.selectedImages.length > 0 ?

                // {
                //   uri:   healthStore.selectedImages[0].path,
                //   type:   healthStore.selectedImages[0].mime,
                //   name:   healthStore.selectedImages[0].path.split('/').pop(),
                // }

                //     : null,
              }),
            );
          }
          formData.append(
            'image',
            healthStore.selectedImages.length > 0
              ? {
                  uri: healthStore.selectedImages[0].path,
                  type: healthStore.selectedImages[0].mime,
                  name: healthStore.selectedImages[0].path.split('/').pop(),
                }
              : null,
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

          if (checkInternet) {
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
            } else {
              Utility.showToast(responseJson.msg);
            }
          } else {
            healthStore.writeToRealm();
          }
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
