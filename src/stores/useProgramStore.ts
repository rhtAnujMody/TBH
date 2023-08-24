import {useLocalObservable} from 'mobx-react-lite';
import Utility from '../utils/Utility';
import {runInAction} from 'mobx';

const useProgramStore = () => {
  const proStore = useLocalObservable(() => ({
    index: 2,
    openBottomSheet: false,
    bottomSheetHeader: '',
    bottomSheetArray: [] as any[],
    partnerType: '',
    partnerTypeID: '',
    existingPartner: '',
    existingPartnerID: '',
    existLocation: '',
    existBlock: '',
    existDistrict: '',
    existState: '',
    dov: '',
    vvTeamSize: '',
    liaDStaff: '',
    liaPStaff: '',
    hour: '',
    minute: '',
    teacherFeedback: '',
    childFeedback: '',
    parentFeedback: '',
    numberOfChildrenDOV: '',
    averageAttendMonth: '',
    numNewChildEnroll: '',
    numChildDropped: '',
    numChildSick: '',
    numberedActivitySheet: '',
    activitySheetCompleted: '',
    poshanCalenderCompleted: '',
    foodSupplyDate: '',
    noOfMealsCF: '',
    noOfMealsReceive: '',
    storedFoodSafely: '',
    breakfastServedDaily: '',
    whenBreakfast: '',
    addObservations: '',
    volunteerName: '',
    volunteerReason: '',
    learnAndObserve: '',
    otherFeedback: '',
    volunteerHour: '',
    volunteerMinute: '',
    isLoading: false,
    enableSubmit: false,
    openPhotoBottomSheet: false,
    partnerTypeOptions: [
      {name: 'TBR', id: '1'},
      {name: 'Bright Start', id: '2'},
      {name: 'Anaemia Mukt Bharat', id: '3'},
    ],
    existingPartnerOptions: [
      {
        name: 'Calvary Day Care Centre,\nGhatkopar,Mumbai Urban,Mumbai,Maharashtra',
        id: '1',
      },
      {
        name: 'Calvary Day Care Centre,\nGhatkopar,Mumbai Urban,Mumbai,Maharashtra',
        id: '2',
      },
      {
        name: 'Calvary Day Care Centre,\nGhatkopar,Mumbai Urban,Mumbai,Maharashtra',
        id: '3',
      },
    ],
    locationOptions: [
      {name: 'Hyderabad', id: '1'},
      {name: 'Bengaluru', id: '2'},
      {name: 'Mumbai', id: '3'},
    ],
    selectionOptions: [
      {name: 'Yes', id: '1'},
      {name: 'No', id: '2'},
    ],
    hourOptions: Array.from({length: 12}, (_, index) => ({
      name: (index + 1).toString(),
      id: (index + 1).toString(),
    })),
    minuteOptions: Array.from({length: 60}, (_, index) => ({
      name: index.toString().padStart(2, '0'),
      id: index.toString(),
    })),
    breakfastOptions: [
      {name: 'Morning', id: '1'},
      {name: 'Afternoon', id: '2'},
      {name: 'Evening', id: '3'},
    ],

    setIndex(value: number) {
      proStore.index = value;
    },
    setDOV(value: string) {
      proStore.dov = value;
      proStore.validateSubmit();
    },
    setVVTeamSize(value: string) {
      proStore.vvTeamSize = value;
      proStore.validateSubmit();
    },
    setLiaDStaff(value: string) {
      proStore.liaDStaff = value;
      proStore.validateSubmit();
    },
    setLiaPStaff(value: string) {
      proStore.liaPStaff = value;
      proStore.validateSubmit();
    },
    setTeacherFeedback(value: string) {
      proStore.teacherFeedback = value;
      proStore.validateSubmit();
    },
    setChildFeedback(value: string) {
      proStore.childFeedback = value;
      proStore.validateSubmit();
    },
    setParentFeedback(value: string) {
      proStore.parentFeedback = value;
      proStore.validateSubmit();
    },
    setNumberOfChildrenDOV(value: string) {
      proStore.numberOfChildrenDOV = value;
      proStore.validateSubmit();
    },
    setAvgAttendMonth(value: string) {
      proStore.averageAttendMonth = value;
      proStore.validateSubmit();
    },
    setNumNewChildEnroll(value: string) {
      proStore.numNewChildEnroll = value;
      proStore.validateSubmit();
    },
    setNumChildDropped(value: string) {
      proStore.numChildDropped = value;
      proStore.validateSubmit();
    },
    setNumChildSick(value: string) {
      proStore.numChildSick = value;
      proStore.validateSubmit();
    },
    setNumberedActivitySheet(value: string) {
      proStore.numberedActivitySheet = value;
      proStore.validateSubmit();
    },
    setFoodSupplyDate(value: string) {
      proStore.foodSupplyDate = value;
      proStore.validateSubmit();
    },
    setNoOfMealsCF(value: string) {
      proStore.noOfMealsCF = value;
      proStore.validateSubmit();
    },
    setNoOfMealsReceive(value: string) {
      proStore.noOfMealsReceive = value;
      proStore.validateSubmit();
    },
    setBreakfastServedDaily(value: string) {
      proStore.breakfastServedDaily = value;
      proStore.validateSubmit();
    },
    setAddObservations(value: string) {
      proStore.addObservations = value;
      proStore.validateSubmit();
    },
    setVolunteerName(value: string) {
      proStore.volunteerName = value;
      proStore.validateSubmit();
    },
    setVolunteerReason(value: string) {
      proStore.volunteerReason = value;
      proStore.validateSubmit();
    },
    setLearnAndObserve(value: string) {
      proStore.learnAndObserve = value;
      proStore.validateSubmit();
    },
    setOtherFeedback(value: string) {
      proStore.otherFeedback = value;
      proStore.validateSubmit();
    },

    togglePhotoBottomSheet() {
      proStore.openPhotoBottomSheet = !proStore.openPhotoBottomSheet;
    },

    toggleBottomSheet(from?: string) {
      proStore.openBottomSheet = !proStore.openBottomSheet;
      switch (from) {
        case 'partnerType':
          proStore.bottomSheetHeader = 'Partner Type';
          proStore.bottomSheetArray = proStore.partnerTypeOptions;
          break;
        case 'existingPartner':
          proStore.bottomSheetHeader = 'Name of Existing Partner';
          proStore.bottomSheetArray = proStore.existingPartnerOptions;
          break;
        case 'location':
          proStore.bottomSheetHeader = 'Location';
          proStore.bottomSheetArray = proStore.locationOptions;
          break;
        case 'hour':
          proStore.bottomSheetHeader = 'Select hour';
          proStore.bottomSheetArray = proStore.hourOptions;
          break;
        case 'minute':
          proStore.bottomSheetHeader = 'Select minute';
          proStore.bottomSheetArray = proStore.minuteOptions;
          break;
        case 'activitySheet':
          proStore.bottomSheetHeader =
            'Have the children completed the activity sheet for this month?';
          proStore.bottomSheetArray = proStore.selectionOptions;
          break;
        case 'poshanCalendar':
          proStore.bottomSheetHeader =
            'Are the teachers/social workers completing the Poshan Calendar properly?';
          proStore.bottomSheetArray = proStore.selectionOptions;
          break;
        case 'storedFoodSafely':
          proStore.bottomSheetHeader =
            'Has the partner stored the food safely?';
          proStore.bottomSheetArray = proStore.selectionOptions;
          break;
        case 'breakfastServedDaily':
          proStore.bottomSheetHeader = 'Is the breakfast being served daily?';
          proStore.bottomSheetArray = proStore.selectionOptions;
          break;
        case 'whenBreakfast':
          proStore.bottomSheetHeader =
            'When is breakfast usually served? (observed by Decimal staff)';
          proStore.bottomSheetArray = proStore.breakfastOptions;
          break;
        case 'volunteerHour':
          proStore.bottomSheetHeader = 'Select hour:';
          proStore.bottomSheetArray = proStore.hourOptions;
          break;
        case 'volunteerMinute':
          proStore.bottomSheetHeader = 'Select minute:';
          proStore.bottomSheetArray = proStore.minuteOptions;
          break;
      }
    },
    setValue(from: string, value: string, id: string) {
      proStore.openBottomSheet = !proStore.openBottomSheet;
      switch (from) {
        case 'Partner Type':
          proStore.partnerType = value;
          proStore.partnerTypeID = id;
          proStore.validateSubmit();
          break;
        case 'Name of Existing Partner':
          const res = value.split(',');
          proStore.existingPartner = res[0];
          proStore.existLocation = res[1];
          proStore.existBlock = res[2];
          proStore.existDistrict = res[3];
          proStore.existState = res[4];
          proStore.existingPartnerID = id;
          proStore.validateSubmit();
          break;
        case 'Select hour':
          proStore.hour = value;
          proStore.validateSubmit();
          break;
        case 'Select minute':
          proStore.minute = value;
          proStore.validateSubmit();
          break;
        case 'Have the children completed the activity sheet for this month?':
          proStore.activitySheetCompleted = value;
          proStore.validateSubmit();
          break;
        case 'Are the teachers/social workers completing the Poshan Calendar properly?':
          proStore.poshanCalenderCompleted = value;
          proStore.validateSubmit();
          break;
        case 'Has the partner stored the food safely?':
          proStore.storedFoodSafely = value;
          proStore.validateSubmit();
          break;
        case 'Is the breakfast being served daily?':
          proStore.breakfastServedDaily = value;
          proStore.validateSubmit();
          break;
        case 'When is breakfast usually served? (observed by Decimal staff)':
          proStore.whenBreakfast = value;
          proStore.validateSubmit();
          break;
        case 'Select hour:':
          proStore.volunteerHour = value;
          proStore.validateSubmit();
          break;
        case 'Select minute:':
          proStore.volunteerMinute = value;
          proStore.validateSubmit();
          break;
      }
    },
    validateSubmit() {
      proStore.enableSubmit = false;
      if (proStore.partnerType == '') {
        return;
      }
      if (proStore.existingPartner == '') {
        return;
      }
      if (proStore.dov == '') {
        return;
      }
      if (proStore.vvTeamSize == '') {
        return;
      }
      if (proStore.liaDStaff == '') {
        return;
      }
      if (proStore.liaPStaff == '') {
        return;
      }
      if (proStore.numberOfChildrenDOV == '') {
        return;
      }
      if (proStore.averageAttendMonth == '') {
        return;
      }
      if (proStore.numNewChildEnroll == '') {
        return;
      }
      if (proStore.numChildDropped == '') {
        return;
      }
      if (proStore.numChildSick == '') {
        return;
      }
      if (proStore.numberedActivitySheet == '') {
        return;
      }
      if (proStore.activitySheetCompleted == '') {
        return;
      }
      if (proStore.poshanCalenderCompleted == '') {
        return;
      }
      if (proStore.foodSupplyDate == '') {
        return;
      }
      if (proStore.noOfMealsCF == '') {
        return;
      }
      if (proStore.noOfMealsReceive == '') {
        return;
      }
      if (proStore.storedFoodSafely == '') {
        return;
      }
      if (proStore.breakfastServedDaily == '') {
        return;
      }
      if (proStore.whenBreakfast == '') {
        return;
      }
      if (proStore.addObservations == '') {
        return;
      }
      if (proStore.teacherFeedback == '') {
        return;
      }
      if (proStore.parentFeedback == '') {
        return;
      }
      if (proStore.childFeedback == '') {
        return;
      }
      if (proStore.volunteerName == '') {
        return;
      }
      if (proStore.volunteerHour == '') {
        return;
      }
      if (proStore.volunteerMinute == '') {
        return;
      }
      if (proStore.volunteerReason == '') {
        return;
      }
      if (proStore.learnAndObserve == '') {
        return;
      }
      if (proStore.otherFeedback == '') {
        return;
      }
      if (proStore.hour == '') {
        return;
      }
      if (proStore.minute == '') {
        return;
      }
      proStore.enableSubmit = true;
    },
    async sendData() {
      runInAction(() => {
        proStore.isLoading = true;
      });
      proStore.isLoading = true;
      setTimeout(() => {
        proStore.isLoading = !proStore.isLoading;
        Utility.showToast('Data Sent Successful  :)');
      }, 5000);
    },

    //console.log(cdStore.image_1, 'image');
  }));
  return proStore;
};

export default useProgramStore;
