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
      {name: AppStrings.male, id: AppStrings.maleID},
      {name: AppStrings.female, id: AppStrings.femaleID},
      {name: AppStrings.others, id: AppStrings.othersID},
    ],
    doneByOptions: [
      {name: AppStrings.decimalFoundation, id: AppStrings.D},
      {name: AppStrings.government, id: AppStrings.G},
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
      if (healthStore.partner === AppStrings.new) {
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
        if (healthStore.vitaminA === AppStrings.HEALTH_CAMP_SCREEN.done) {
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
        if (healthStore.deworming === AppStrings.HEALTH_CAMP_SCREEN.done) {
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
        if (healthStore.ifa === AppStrings.HEALTH_CAMP_SCREEN.done) {
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
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.partner:
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.partnerHeader;
          healthStore.bottomSheetArray = healthStore.partnerOptions;
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.partnerName:
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.partnerNameHeader;
          healthStore.bottomSheetArray = healthStore.partnerNameList;
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.partnerType:
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.partnerTypeHeader;
          healthStore.bottomSheetArray = healthStore.partnerTypeOptions;
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.vitaminA:
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.vitaminA;
          healthStore.bottomSheetArray = healthStore.vitaminAOptions;
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.doneBy:
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.doneByWhom;
          healthStore.bottomSheetArray = healthStore.doneByOptions;
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.doneByWorm:
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.doneByWormHeader;
          healthStore.bottomSheetArray = healthStore.doneByOptions;
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.doneByIFA:
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.doneByIFAHeader;
          healthStore.bottomSheetArray = healthStore.doneByOptions;
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.deworming:
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.deworming;
          healthStore.bottomSheetArray = healthStore.vitaminAOptions;
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.targetBeneficiary:
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.targetBeneficiary;
          healthStore.bottomSheetArray = healthStore.targetBenefitOptions;
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.educationalDetails:
          healthStore.bottomSheetHeader =
            AppStrings.HEALTH_CAMP_SCREEN.educationalDetails;
          healthStore.bottomSheetArray = healthStore.educationalDetailsOptions;
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.ifa:
          healthStore.bottomSheetHeader = AppStrings.HEALTH_CAMP_SCREEN.ifa;
          healthStore.bottomSheetArray = healthStore.vitaminAOptions;
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.gender:
          healthStore.bottomSheetHeader = AppStrings.HEALTH_CAMP_SCREEN.gender;
          healthStore.bottomSheetArray = healthStore.genderOptions;
          break;
      }
    },

    setValue(from: string, value: string, id: string) {
      healthStore.openBottomSheet = !healthStore.openBottomSheet;
      switch (from) {
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.partnerHeader:
          healthStore.partner = value;
          healthStore.validateSubmit();
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.partnerNameHeader:
          const res = value.split(',');
          healthStore.existPartnerName = res[0];
          healthStore.existLocation = res[1];
          healthStore.existBlock = res[2];
          healthStore.existDistrict = res[3];
          healthStore.existState = res[4];
          healthStore.partnerID = id;
          healthStore.validateSubmit();
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.partnerTypeHeader:
          healthStore.partnerType = value;
          healthStore.partnerTypeID = id;
          healthStore.validateSubmit();
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.vitaminA:
          healthStore.vitaminA = value;
          healthStore.validateSubmit();
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.doneByWhom:
          healthStore.doneBy = value;
          healthStore.doneByID = id;
          healthStore.validateSubmit();
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.doneByWormHeader:
          healthStore.doneByWorm = value;
          healthStore.doneByWormID = id;
          healthStore.validateSubmit();
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.doneByIFAHeader:
          healthStore.doneByIFA = value;
          healthStore.doneByIFAID = id;
          healthStore.validateSubmit();
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.ifa:
          healthStore.ifa = value;
          healthStore.validateSubmit();
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.deworming:
          healthStore.deworming = value;
          healthStore.validateSubmit();
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.targetBeneficiary:
          healthStore.targetBeneficiary = value;
          healthStore.beneficiaryID = id;
          healthStore.validateSubmit();
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.educationalDetails:
          healthStore.educationalDetails = value;
          healthStore.educationalDetailsID = id;
          healthStore.validateSubmit();
          break;
        case AppStrings.HEALTH_CAMP_SCREEN.gender:
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
        if (this.partner === AppStrings.new) {
          formData.append(
            AppStrings.HEALTH_CAMP_SCREEN.partner_details,
            JSON.stringify({
              name: healthStore.newPartnerName,
              location: healthStore.newLocation,
              block: healthStore.newBlock,
              district: healthStore.newDistrict,
              state: healthStore.newState,
            }),
          );
          formData.append(AppStrings.partner, '');
          formData.append(AppStrings.type, healthStore.partnerTypeID);
        } else {
          formData.append(AppStrings.partner, healthStore.partnerID);
        }
        formData.append(
          AppStrings.HEALTH_CAMP_SCREEN.health_camp_date,
          healthStore.dohc,
        );
        formData.append(
          AppStrings.HEALTH_CAMP_SCREEN.serial_no,
          healthStore.numberHC,
        );
        formData.append(
          AppStrings.HEALTH_CAMP_SCREEN.child_info,
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
          AppStrings.HEALTH_CAMP_SCREEN.child_details,
          JSON.stringify({
            age: healthStore.age,
            height: healthStore.height,
            weight: healthStore.weight,
            muac: healthStore.muac,
            education: healthStore.educationalDetailsID,
          }),
        );
        if (this.vitaminA === AppStrings.HEALTH_CAMP_SCREEN.done) {
          formData.append(
            AppStrings.HEALTH_CAMP_SCREEN.vitamin_A_details,
            JSON.stringify({
              done_by: healthStore.doneByID,
              duration: healthStore.durationOfCourse,
              location: healthStore.locationOfDose,
              dose_date: healthStore.dateOfDoseVitamin,
            }),
          );
          formData.append(AppStrings.HEALTH_CAMP_SCREEN.vitamin_A, true);
        } else {
          formData.append(AppStrings.HEALTH_CAMP_SCREEN.vitamin_A, false);
        }

        if (this.deworming === AppStrings.HEALTH_CAMP_SCREEN.done) {
          formData.append(
            AppStrings.HEALTH_CAMP_SCREEN.deworming_details,
            JSON.stringify({
              done_by: healthStore.doneByWormID,
              duration: healthStore.durationOfCourseWorm,
              location: healthStore.locationOfDoseWorm,
              dose_date: healthStore.dateOfDoseDeworm,
            }),
          );
          formData.append(
            AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.deworming,
            true,
          );
        } else {
          formData.append(
            AppStrings.HEALTH_CAMP_SCREEN.bottomSheet.deworming,
            false,
          );
        }

        if (this.ifa === AppStrings.HEALTH_CAMP_SCREEN.done) {
          formData.append(
            AppStrings.HEALTH_CAMP_SCREEN.ifa_details,
            JSON.stringify({
              done_by: healthStore.doneByIFAID,
              duration: healthStore.durationOfCourseIFA,
              location: healthStore.locationOfDoseIFA,
              dose_date: healthStore.dateOfDoseIFA,
            }),
          );
          formData.append(AppStrings.HEALTH_CAMP_SCREEN.ifa_small, true);
        } else {
          formData.append(AppStrings.HEALTH_CAMP_SCREEN.ifa_small, false);
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
        Utility.showToast(AppStrings.somethingWentWrong);
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
