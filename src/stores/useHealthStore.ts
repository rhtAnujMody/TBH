import {useLocalObservable} from 'mobx-react-lite';
import Utility from '../utils/Utility';
import {runInAction} from 'mobx';
import {Image} from 'react-native-image-crop-picker';
import AppStrings from '../utils/AppStrings';
import useApiService from '../network/useAPIService';
import {HealthModal} from '../models/HealthModal';

const useHealthStore = () => {
  const {request} = useApiService();
  const healthStore = useLocalObservable(() => ({
    index: 2,
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

    partnerOptions: [
      {name: 'New', id: 'new'},
      {name: 'Existing', id: 'existing'},
    ],
    partnerNameList: [
      {
        name: 'SASA,\nPune,Pune,Pune,Maharashtra',
        id: 1,
      },
      {
        name: 'Anmol Tare,\nPanvel,Panvel,Raigad,Maharashtra',
        id: 2,
      },
    ],
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
    targetBenefitOptions: [
      {name: 'Children living with HIV', id: 1},
      {name: 'Children living with Cancer', id: 2},
      {name: 'Children living with TB', id: 3},
      {name: 'Children- Other', id: 4},
      {name: 'Adult- HIV', id: 5},
      {name: 'Adult- TB', id: 6},
      {name: 'Adult- Cancer', id: 7},
      {name: 'Senior Citizen', id: 8},
      {name: 'Pregnant women', id: 9},
      {name: 'Lactating mothers', id: 10},
      {name: 'Adolescents and Others', id: 11},
    ],
    educationalDetailsOptions: [
      {name: 'Home care', id: 1},
      {name: 'Pre Primary / Balwadi', id: 2},
      {name: 'Anganwadi', id: 3},
      {name: 'Lower Primary', id: 4},
      {name: 'Upper Primary', id: 5},
      {name: 'High School', id: 6},
      {name: 'Higher Secondary', id: 7},
    ],

    calenderShow() {
      healthStore.showCalender = true;
    },

    calenderHide() {
      healthStore.showCalender = false;
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
      healthStore.childName = value;
      healthStore.validateSubmit();
    },
    setContact(value: string) {
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
      healthStore.height = value;
      healthStore.validateSubmit();
    },
    setWeight(value: string) {
      healthStore.weight = value;
      healthStore.validateSubmit();
    },
    setMUAC(value: string) {
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
      healthStore.durationOfCourse = value;
      healthStore.validateSubmit();
    },
    setDurationOfCourseWorm(value: string) {
      healthStore.durationOfCourseWorm = value;
      healthStore.validateSubmit();
    },
    setLocationOfDose(value: string) {
      healthStore.locationOfDose = value;
      healthStore.validateSubmit();
    },
    setLocationOfDoseWorm(value: string) {
      healthStore.locationOfDoseWorm = value;
      healthStore.validateSubmit();
    },
    setLocationOfDoseIFA(value: string) {
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
      healthStore.durationOfCourseIFA = value;
      healthStore.validateSubmit();
    },

    togglePhotoBottomSheet() {
      healthStore.openPhotoBottomSheet = !healthStore.openPhotoBottomSheet;
    },

    validateSubmit() {
      healthStore.enableSubmit = false;

      if (healthStore.partner == '') {
        return;
      } else {
        if (healthStore.partner == 'New') {
          if (
            healthStore.newPartnerName == '' ||
            healthStore.newLocation == '' ||
            healthStore.newBlock == '' ||
            healthStore.newDistrict == '' ||
            healthStore.newState == ''
          ) {
            return;
          }
        } else {
          if (healthStore.existPartnerName == '') {
            return;
          }
        }
      }
      if (healthStore.dohc == '') {
        return;
      }
      if (healthStore.numberHC == '') {
        return;
      }
      if (healthStore.childName == '') {
        return;
      }
      if (healthStore.contact == '') {
        return;
      }
      if (healthStore.dob == '') {
        return;
      }
      if (healthStore.gender == '') {
        return;
      }
      if (healthStore.height == '') {
        return;
      }
      if (healthStore.weight == '') {
        return;
      }
      if (healthStore.muac == '') {
        return;
      }
      if (healthStore.muac == '') {
        return;
      }
      if (healthStore.targetBeneficiary == '') {
        return;
      }
      if (healthStore.educationalDetails == '') {
        return;
      }

      if (healthStore.vitaminA == '') {
        return;
      } else {
        if (healthStore.vitaminA == 'Done') {
          if (healthStore.doneBy == '') {
            return;
          } else {
            if (healthStore.dateOfDoseVitamin == '') {
              return;
            }
            if (healthStore.durationOfCourse == '') {
              return;
            }
            if (healthStore.locationOfDose == '') {
              return;
            }
          }
        } else {
        }
      }

      if (healthStore.deworming == '') {
        return;
      } else {
        if (healthStore.deworming == 'Done') {
          if (healthStore.doneByWorm == '') {
            return;
          } else {
            if (healthStore.dateOfDoseDeworm == '') {
              return;
            }
            if (healthStore.durationOfCourseWorm == '') {
              return;
            }
            if (healthStore.locationOfDoseWorm == '') {
              return;
            }
          }
        } else {
        }
      }

      if (healthStore.ifa == '') {
        return;
      } else {
        if (healthStore.ifa == 'Done') {
          if (healthStore.doneByIFA == '') {
            return;
          } else {
            if (healthStore.dateOfDoseIFA == '') {
              return;
            }
            if (healthStore.durationOfCourseIFA == '') {
              return;
            }
            if (healthStore.locationOfDoseIFA == '') {
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
    async handleImageUpload(selectedImages: Image[]) {
      console.log(selectedImages, 'images');
      runInAction(() => {});
      healthStore.isLoading = true;
      try {
        const formData = new FormData();
        if (this.partner == 'New') {
          formData.append(
            'partner_details',
            JSON.stringify({
              name: healthStore.newPartnerName,
              location: healthStore.newLocation,
              block: healthStore.newBlock,
              district: healthStore.newDistrict,
              state: healthStore.newState,
              type: healthStore.partnerTypeID,
            }),
          );
          formData.append('partner', '');
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
            image: selectedImages[0].path,
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
        if (this.vitaminA == 'Done') {
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

        if (this.deworming == 'Done') {
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

        if (this.ifa == 'Done') {
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

        console.log(formData, 'formdata');

        const responseJson = await request<HealthModal>(
          'post',
          AppStrings.healthCamp,
          formData,
          {
            'Content-Type': 'multipart/form-data;',
          },
        );

        if (responseJson.success) {
          console.log(responseJson, 'response from server');
          Utility.showToast(responseJson.msg);
        } else {
          Utility.showToast(responseJson.msg);
        }
      } catch (err) {
        Utility.showToast('Something went wrong');
        console.log(err);
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
