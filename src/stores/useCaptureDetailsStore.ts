import {runInAction} from 'mobx';
import {useLocalObservable} from 'mobx-react-lite';
import {Image} from 'react-native-image-crop-picker';
import {AppSVGs} from '../assets';
import {CaptureModal} from '../models';
import useApiService from '../network/useAPIService';
import AppStrings from '../utils/AppStrings';
import Utility from '../utils/Utility';
import authStore from './authStore';
import {useNavigation} from '@react-navigation/native';

const useCaptureDetailsStore = () => {
  const {request} = useApiService();
  const navigation = useNavigation();
  const cdStore = useLocalObservable(() => ({
    dov: '',
    openDOVPicker: false,
    openPartner: false,
    isLoading: false,
    bottomSheetArray: [] as any[],
    bottomSheetHeader: '',
    openBottomSheet: false,
    openPhotoBottomSheet: false,
    partner: '',
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

    partnerID: '', //backend not accepting 0
    beneficiarieID: '',
    showCalender: false,
    age: '',
    ageID: '',
    targetBeneficiaries: '',
    totalNoOfParticipants: '',
    methodUsed: '',
    topicsCovered: '',
    hour: '',
    minute: '',
    index: 2,
    sessionConductedBy: '',
    feedbackFromParticipants: '',
    selectedImages: [] as Image[],
    beneficiarisOptions: authStore.userData.beneficiary_list ?? [],
    partnerOptions: [
      {name: 'New', id: 'new'},
      {name: 'Existing', id: 'existing'},
    ],
    partnerNameList: Utility.partnerNameLocation(authStore.userData),
    showSearchBar: false,

    photoOptions: [
      {name: 'Take a Photo', id: 'camera'},
      {name: 'Upload from Library', id: 'gallery'},
    ],
    hourOptions: Array.from({length: 24}, (_, index) => ({
      name: index.toString(),
      id: index.toString(),
    })),
    minuteOptions: Array.from({length: 60}, (_, index) => ({
      name: index.toString().padStart(2, '0'),
      id: index.toString(),
    })),
    ageOptions: [
      {name: '0 - 2.5 years', id: '1'},
      {name: '2.5 - 5 years', id: '2'},
      {name: '5-13 years', id: '3'},
      {name: '13- 18 years', id: '4'},
      {name: '18- 25 years', id: '5'},
      {name: '25- 40 years', id: '6'},
      {name: '40 years and above', id: '7'},
    ],
    options: [
      {
        label: 'Male',
        value: 'male',
        iconUri: AppSVGs.male,
      },
      {
        label: 'Female',
        value: 'female',
        iconUri: AppSVGs.female,
      },
      {
        label: 'Other',
        value: 'other',
        iconUri: AppSVGs.female,
      },
    ],

    errorMessages: {
      dov: '',
      partner: '',
      newPartnerName: '',
      newLocation: '',
      newBlock: '',
      newDistrict: '',
      newState: '',
      partnerID: '',
      totalNoOfParticipants: '',
      beneficiarieID: '',
      ageID: '',
      hour: '',
      minute: '',
      methodUsed: '',
      topicsCovered: '',
      sessionConductedBy: '',
      feedbackFromParticipants: '',
      selectedImages: '',
    },

    toggleBottomSheet(from?: string) {
      cdStore.openBottomSheet = !cdStore.openBottomSheet;
      switch (from) {
        case 'age':
          cdStore.bottomSheetHeader =
            AppStrings.NUTRITION_EDUCATION_SCREEN.bottomSheet.selectAge;
          cdStore.bottomSheetArray = cdStore.ageOptions;
          break;
        case 'partner':
          cdStore.bottomSheetHeader =
            AppStrings.NUTRITION_EDUCATION_SCREEN.bottomSheet.newExisting;
          cdStore.bottomSheetArray = cdStore.partnerOptions;
          break;
        case 'partnerName':
          cdStore.bottomSheetHeader =
            AppStrings.NUTRITION_EDUCATION_SCREEN.bottomSheet.partnerName;
          cdStore.bottomSheetArray = cdStore.partnerNameList;
          cdStore.setShowSearchBar(true);
          break;
        case 'beneficiaries':
          cdStore.bottomSheetHeader =
            AppStrings.NUTRITION_EDUCATION_SCREEN.targetBeneficiariesPlaceHolder;
          cdStore.bottomSheetArray = cdStore.beneficiarisOptions;
          cdStore.setShowSearchBar(true);
          break;
        case 'hour':
          cdStore.bottomSheetHeader = AppStrings.selectHour;
          cdStore.bottomSheetArray = cdStore.hourOptions;
          break;
        case 'minute':
          cdStore.bottomSheetHeader = AppStrings.selectMinute;
          cdStore.bottomSheetArray = cdStore.minuteOptions;
      }
    },

    togglePhotoBottomSheet() {
      cdStore.openPhotoBottomSheet = !cdStore.openPhotoBottomSheet;
    },

    toggleDOVPicker() {
      cdStore.openDOVPicker = !cdStore.openDOVPicker;
    },

    setDOV(value: string) {
      cdStore.dov = value;
      cdStore.errorMessages.dov = '';
    },

    setIndex(value: number) {
      cdStore.index = value;
    },

    toogleCalender() {
      cdStore.showCalender = !cdStore.showCalender;
    },

    setValue(from: string, value: string, id: string) {
      cdStore.openBottomSheet = !cdStore.openBottomSheet;
      cdStore.setShowSearchBar(false);
      switch (from) {
        case AppStrings.NUTRITION_EDUCATION_SCREEN.bottomSheet.selectAge:
          cdStore.age = value;
          cdStore.ageID = id;
          cdStore.errorMessages.ageID = '';
          break;
        case AppStrings.NUTRITION_EDUCATION_SCREEN.bottomSheet.newExisting:
          cdStore.partner = value;
          cdStore.errorMessages.partner = '';
          break;
        case AppStrings.NUTRITION_EDUCATION_SCREEN.bottomSheet.partnerName:
          const res = value.split(',');
          cdStore.existPartnerName = res[0];
          cdStore.existLocation = res[1];
          cdStore.existBlock = res[2];
          cdStore.existDistrict = res[3];
          cdStore.existState = res[4];
          cdStore.partnerID = id;
          cdStore.errorMessages.partnerID = '';
          break;

        case AppStrings.NUTRITION_EDUCATION_SCREEN
          .targetBeneficiariesPlaceHolder:
          cdStore.targetBeneficiaries = value;
          cdStore.beneficiarieID = id;
          cdStore.errorMessages.beneficiarieID = '';
          break;
        case AppStrings.selectHour:
          cdStore.hour = value;
          cdStore.errorMessages.hour = '';
          break;
        case AppStrings.selectMinute:
          cdStore.minute = value;
          cdStore.errorMessages.minute = '';
      }
    },

    setTotalNoOfParticipants(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumeric(value)) {
        return;
      }
      cdStore.totalNoOfParticipants = value;
      cdStore.errorMessages.totalNoOfParticipants = '';
    },

    setNewPartnerName(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlpha(value)) {
        return;
      }
      cdStore.newPartnerName = value;
      cdStore.errorMessages.newPartnerName = '';
    },
    setNewLocation(value: string) {
      cdStore.newLocation = value;
      cdStore.errorMessages.newLocation = '';
    },
    setNewBlock(value: string) {
      cdStore.newBlock = value;
      cdStore.errorMessages.newBlock = '';
    },
    setNewDistrict(value: string) {
      cdStore.newDistrict = value;
      cdStore.errorMessages.newDistrict = '';
    },
    setNewState(value: string) {
      cdStore.newState = value;
      cdStore.errorMessages.newState = '';
    },

    setMethodUsed(value: string) {
      cdStore.methodUsed = value;
      cdStore.errorMessages.methodUsed = '';
    },

    setTopicsCovered(value: string) {
      cdStore.topicsCovered = value;
      cdStore.errorMessages.topicsCovered = '';
    },

    setSessionCoveredBy(value: string) {
      cdStore.sessionConductedBy = value;
      cdStore.errorMessages.sessionConductedBy = '';
    },

    setFeedbackFromParticipants(value: string) {
      cdStore.feedbackFromParticipants = value;
      cdStore.errorMessages.feedbackFromParticipants = '';
    },

    setSelectedImages(selectedImage: Image[]) {
      cdStore.selectedImages = selectedImage;
    },

    setShowSearchBar(value: boolean) {
      cdStore.showSearchBar = value;
    },

    validateSubmit() {
      let isValid = true;
      if (cdStore.dov === '') {
        cdStore.errorMessages.dov = 'This Field is Required';
        isValid = false;
      }

      if (cdStore.partner === '') {
        cdStore.errorMessages.partner = 'This Field is Required';
        isValid = false;
      } else {
        if (cdStore.partner === 'New') {
          if (cdStore.newPartnerName === '') {
            cdStore.errorMessages.newPartnerName = 'This Field is Required';
            isValid = false;
          }
          if (cdStore.newLocation === '') {
            cdStore.errorMessages.newLocation = 'This Field is Required';
            isValid = false;
          }
          if (cdStore.newBlock === '') {
            cdStore.errorMessages.newBlock = 'This Field is Required';
            isValid = false;
          }
          if (cdStore.newDistrict === '') {
            cdStore.errorMessages.newDistrict = 'This Field is Required';
            isValid = false;
          }
          if (cdStore.newState === '') {
            cdStore.errorMessages.newState = 'This Field is Required';
            isValid = false;
          }
        } else {
          if (cdStore.existPartnerName === '') {
            cdStore.errorMessages.partnerID = 'This Field is Required';
            isValid = false;
          }
        }
      }

      if (cdStore.totalNoOfParticipants === '') {
        cdStore.errorMessages.totalNoOfParticipants = 'This Field is Required';
        isValid = false;
      }
      if (cdStore.targetBeneficiaries === '') {
        cdStore.errorMessages.beneficiarieID = 'This Field is Required';
        isValid = false;
      }
      if (cdStore.age === '') {
        cdStore.errorMessages.ageID = 'This Field is Required';
        isValid = false;
      }
      if (cdStore.hour === '') {
        cdStore.errorMessages.hour = 'This Field is Required';
        isValid = false;
      }
      if (cdStore.minute === '') {
        cdStore.errorMessages.minute = 'This Field is Required';
        isValid = false;
      }
      if (cdStore.methodUsed === '') {
        cdStore.errorMessages.methodUsed = 'This Field is Required';
        isValid = false;
      }
      if (cdStore.topicsCovered === '') {
        cdStore.errorMessages.topicsCovered = 'This Field is Required';
        isValid = false;
      }
      if (cdStore.sessionConductedBy === '') {
        cdStore.errorMessages.sessionConductedBy = 'This Field is Required';
        isValid = false;
      }
      if (cdStore.feedbackFromParticipants === '') {
        cdStore.errorMessages.feedbackFromParticipants =
          'This Field is Required';
          isValid = false;
      }
      //  if(selectedImages.length==0){
      //   return;
      //  }
      //cdStore.selectedImages.length == 0

      return isValid;
    },

    async writeToRealm() {
      try {
        authStore.realm.write(() => {
          const savedRecord = authStore.realm.create('NutritionEductaion', {
            _id: Date.now(),
            agent_id: authStore.userData.id,
            dov: cdStore.dov,
            isNew: cdStore.partner === 'New',
            name: cdStore.newPartnerName,
            location: cdStore.newLocation,
            block: cdStore.newBlock,
            district: cdStore.newDistrict,
            state: cdStore.newState,
            partnerID:
              typeof cdStore.partnerID === 'string' ? 0 : cdStore.partnerID,
            totalNoOfParticipants: cdStore.totalNoOfParticipants,
            beneficiarieID: cdStore.beneficiarieID,
            ageID: cdStore.ageID,
            duration: parseInt(cdStore.hour) * 60 + parseInt(cdStore.minute),
            methodUsed: cdStore.methodUsed,
            topicsCovered: cdStore.topicsCovered,
            sessionConductedBy: cdStore.sessionConductedBy,
            feedbackFromParticipants: cdStore.feedbackFromParticipants,
          });

          for (let i = 0; i < Math.min(cdStore.selectedImages.length, 5); i++) {
            savedRecord.images.push(
              authStore.realm.create('ImagesSchema', {
                _id: Date.now() + 1,
                uri: cdStore.selectedImages[i].path,
                type: cdStore.selectedImages[i].mime,
                name: cdStore.selectedImages[i].path.split('/').pop(),
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

    async saveData() {
      runInAction(() => {
        cdStore.isLoading = true;
      });
      try {
        if (cdStore.validateSubmit()) {
          const checkInternet = await Utility.checkInterNet();
          const formData = new FormData();

          formData.append('agent_id', authStore.userData.id);
          if (cdStore.partner === 'New') {
            formData.append(
              'partner_details',
              JSON.stringify({
                name: cdStore.newPartnerName,
                location: cdStore.newLocation,
                block: cdStore.newBlock,
                district: cdStore.newDistrict,
                state: cdStore.newState,
              }),
            );
            formData.append('partner', '');
          } else {
            formData.append('partner', cdStore.partnerID);
          }

          formData.append('age_group', cdStore.ageID);
          formData.append(
            'duration',
            parseInt(cdStore.hour) * 60 + parseInt(cdStore.minute),
          );
          formData.append('topics', cdStore.topicsCovered);
          formData.append('participants_count', cdStore.totalNoOfParticipants);
          formData.append('method_used', cdStore.methodUsed);
          formData.append('conducted_by', cdStore.sessionConductedBy);
          formData.append('feedback', cdStore.feedbackFromParticipants);
          formData.append('beneficiary', cdStore.beneficiarieID);
          formData.append('visit_date', cdStore.dov);

          for (let i = 0; i < Math.min(cdStore.selectedImages.length, 5); i++) {
            formData.append(`image_${i + 1}`, {
              uri: cdStore.selectedImages[i].path,
              type: cdStore.selectedImages[i].mime,
              name: cdStore.selectedImages[i].path.split('/').pop(),
            });
          }
          if (checkInternet) {
            const responseJson = await request<CaptureModal>(
              'post',
              AppStrings.captureDetails,
              formData,
              {
                'Content-Type': 'multipart/form-data;',
              },
            );

            if (responseJson.success) {
              Utility.showToast(responseJson.msg);
              authStore.setNewPartnerList(responseJson.partner_list);
            } else {
              Utility.showToast(responseJson.msg);
            }
          } else {
            cdStore.writeToRealm();
          }
          navigation.goBack();
        }
      } catch (err) {
        Utility.showToast(AppStrings.somethingWentWrong);
      } finally {
        runInAction(() => {
          cdStore.isLoading = false;
        });
      }
    },
  }));

  return cdStore;
};

export default useCaptureDetailsStore;
