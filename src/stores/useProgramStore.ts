import {useLocalObservable} from 'mobx-react-lite';
import Utility from '../utils/Utility';
import {runInAction} from 'mobx';
import {Image} from 'react-native-image-crop-picker';
import {ProgramModal} from '../models/ProgramModal';
import AppStrings from '../utils/AppStrings';
import useApiService from '../network/useAPIService';
import authStore from './authStore';
import {useNavigation} from '@react-navigation/native';

const useProgramStore = () => {
  const {request} = useApiService();
  const navigation = useNavigation();
  const partnerNameLocation = () => {
    return authStore.userData.partner_list.map(item => {
      return {
        name:
          item.name +
          ',' +
          '\n' +
          item.location +
          ',' +
          item.block +
          ',' +
          item.district +
          ',' +
          item.state,
        id: item.id,
      };
    });
  };
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
    liaDNameStaff: '',
    liaDDesigStaff: '',
    liaPNameStaff: '',
    liaPDesigStaff: '',
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
    illness: '',
    numberedActivitySheet: '',
    activitySheetCompleted: '',
    activitySheetCompletedID: '',
    poshanCalenderCompleted: '',
    poshanCalenderCompletedID: '',
    foodSupplyDate: '',
    noOfMealsCF: '',
    noOfMealsReceive: '',
    storedFoodSafely: '',
    storedFoodSafelyID: '',
    breakfastServedDaily: '',
    breakfastServedDailyID: '',
    whenBreakfast: '',
    whenBreakfastID: '',
    addObservations: '',
    companyName: '',
    volunteerName: '',
    volunteerReason: '',
    learnAndObserve: '',
    otherFeedback: '',
    volunteerHour: '',
    volunteerMinute: '',
    isLoading: false,
    enableSubmit: false,
    openPhotoBottomSheet: false,
    calenderID: '',
    showCalender: false,
    selectedImages: [] as Image[],
    partnerTypeOptions: [
      {name: 'TBR', id: 'T'},
      {name: 'Bright Start', id: 'B'},
      {name: 'Anaemia Mukt Bharat', id: 'A'},
    ],
    existingPartnerOptions: partnerNameLocation(),
    locationOptions: [
      {name: 'Hyderabad', id: '1'},
      {name: 'Bengaluru', id: '2'},
      {name: 'Mumbai', id: '3'},
    ],
    selectionOptions: [
      {name: 'Yes', id: true},
      {name: 'No', id: false},
    ],
    hourOptions: Array.from({length: 24}, (_, index) => ({
      name: index.toString(),
      id: index.toString(),
    })),
    minuteOptions: Array.from({length: 60}, (_, index) => ({
      name: index.toString().padStart(2, '0'),
      id: index.toString(),
    })),
    breakfastOptions: [
      {name: 'Morning', id: 'M'},
      {name: 'Afternoon', id: 'A'},
      {name: 'Evening', id: 'E'},
    ],

    toogleCalender() {
      proStore.showCalender = !proStore.showCalender;
    },
    setCalenderID(value: string) {
      proStore.calenderID = value;
    },
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
    setLiaDNameStaff(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlphaSpecial(value)) {
        return;
      }
      proStore.liaDNameStaff = value;
      proStore.validateSubmit();
    },
    setLiaDDesigStaff(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlphaSpecial(value)) {
        return;
      }
      proStore.liaDDesigStaff = value;
      proStore.validateSubmit();
    },
    setLiaPNameStaff(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlphaSpecial(value)) {
        return;
      }
      proStore.liaPNameStaff = value;
      proStore.validateSubmit();
    },
    setLiaPDesigStaff(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlphaSpecial(value)) {
        return;
      }
      proStore.liaPDesigStaff = value;
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
      if (!value.trim() && !Utility.validateNumeric(value)) {
        return;
      }
      proStore.numberOfChildrenDOV = value;
      proStore.validateSubmit();
    },
    setAvgAttendMonth(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumberSpecial(value)) {
        return;
      }
      proStore.averageAttendMonth = value;
      proStore.validateSubmit();
    },
    setNumNewChildEnroll(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumberSpecial(value)) {
        return;
      }
      proStore.numNewChildEnroll = value;
      proStore.validateSubmit();
    },
    setNumChildDropped(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumberSpecial(value)) {
        return;
      }
      proStore.numChildDropped = value;
      proStore.validateSubmit();
    },
    setNumChildSick(value: string) {
      proStore.numChildSick = value;
      proStore.validateSubmit();
    },
    setIllness(value: string) {
      proStore.illness = value;
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
      if (!(value.trim() === '') && !Utility.validateNumberSpecial(value)) {
        return;
      }
      proStore.noOfMealsCF = value;
      proStore.validateSubmit();
    },
    setNoOfMealsReceive(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumberSpecial(value)) {
        return;
      }
      proStore.noOfMealsReceive = value;
      proStore.validateSubmit();
    },
    setAddObservations(value: string) {
      proStore.addObservations = value;
      proStore.validateSubmit();
    },
    setCompanyName(value: string) {
      proStore.companyName = value;
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
    setSelectedImages(selectedImages: Image[]) {
      proStore.selectedImages = selectedImages;
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
          proStore.bottomSheetHeader = 'Name and Location of Existing Partner';
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
        case 'Name and Location of Existing Partner':
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
          proStore.activitySheetCompletedID = id;
          proStore.validateSubmit();
          break;
        case 'Are the teachers/social workers completing the Poshan Calendar properly?':
          proStore.poshanCalenderCompleted = value;
          proStore.poshanCalenderCompletedID = id;
          proStore.validateSubmit();
          break;
        case 'Has the partner stored the food safely?':
          proStore.storedFoodSafely = value;
          proStore.storedFoodSafelyID = id;
          proStore.validateSubmit();
          break;
        case 'Is the breakfast being served daily?':
          proStore.breakfastServedDaily = value;
          proStore.breakfastServedDailyID = id;
          proStore.validateSubmit();
          break;
        case 'When is breakfast usually served? (observed by Decimal staff)':
          proStore.whenBreakfast = value;
          proStore.whenBreakfastID = id;
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
      if (proStore.partnerType === '') {
        return;
      }
      if (proStore.existingPartner === '') {
        return;
      }
      if (proStore.dov === '') {
        return;
      }
      if (!Utility.validateAlphaNumericSpecial(proStore.vvTeamSize)) {
        return;
      }
      if (!Utility.validateAlphaSpecial(proStore.liaDNameStaff)) {
        return;
      }
      if (!Utility.validateAlphaSpecial(proStore.liaDDesigStaff)) {
        return;
      }
      if (!Utility.validateAlphaSpecial(proStore.liaPNameStaff)) {
        return;
      }
      if (!Utility.validateAlphaSpecial(proStore.liaPDesigStaff)) {
        return;
      }
      if (!Utility.validateNumeric(proStore.numberOfChildrenDOV)) {
        return;
      }
      if (!Utility.validateNumberSpecial(proStore.averageAttendMonth)) {
        return;
      }
      if (!Utility.validateNumberSpecial(proStore.numNewChildEnroll)) {
        return;
      }
      if (!Utility.validateNumberSpecial(proStore.numChildDropped)) {
        return;
      }
      if (!Utility.validateNumberSpecial(proStore.numChildSick)) {
        return;
      }
      if (!Utility.validateAlphaNumericSpecial(proStore.illness)) {
        return;
      }
      if (
        !Utility.validateAlphaNumericSpecial(proStore.numberedActivitySheet)
      ) {
        return;
      }
      if (proStore.activitySheetCompleted === '') {
        return;
      }
      if (proStore.poshanCalenderCompleted === '') {
        return;
      }
      if (proStore.foodSupplyDate === '') {
        return;
      }
      if (!Utility.validateNumberSpecial(proStore.noOfMealsCF)) {
        return;
      }
      if (!Utility.validateNumberSpecial(proStore.noOfMealsReceive)) {
        return;
      }
      if (proStore.storedFoodSafely === '') {
        return;
      }
      if (proStore.breakfastServedDaily === '') {
        return;
      }
      if (proStore.whenBreakfast === '') {
        return;
      }
      if (!Utility.validateAlphaNumericSpecial(proStore.addObservations)) {
        return;
      }
      if (!Utility.validateAlphaNumericSpecial(proStore.teacherFeedback)) {
        return;
      }
      if (!Utility.validateAlphaNumericSpecial(proStore.parentFeedback)) {
        return;
      }
      if (proStore.childFeedback === '') {
        return;
      }
      if (!Utility.validateAlphaNumericSpecial(proStore.volunteerName)) {
        return;
      }
      if (!Utility.validateAlphaNumericSpecial(proStore.companyName)) {
        return;
      }
      if (proStore.volunteerHour === '') {
        return;
      }
      if (proStore.volunteerMinute === '') {
        return;
      }
      if (!Utility.validateAlphaNumericSpecial(proStore.volunteerReason)) {
        return;
      }
      if (!Utility.validateAlphaNumericSpecial(proStore.learnAndObserve)) {
        return;
      }
      if (!Utility.validateAlphaNumericSpecial(proStore.otherFeedback)) {
        return;
      }
      if (proStore.hour === '') {
        return;
      }
      if (proStore.minute === '') {
        return;
      }
      proStore.enableSubmit = true;
    },
    async sendData() {
      runInAction(() => {
        proStore.isLoading = true;
      });
      try {
        const formData = new FormData(); //existingPartnerID
        formData.append('type', proStore.partnerTypeID);
        formData.append('partner', proStore.existingPartnerID);
        formData.append('date', proStore.dov);
        formData.append('visiting_team_size', proStore.vvTeamSize);
        formData.append(
          'liaison',
          JSON.stringify({
            decimal: {
              name: proStore.liaDNameStaff,
              designation: proStore.liaDDesigStaff,
            },
            partner: {
              name: proStore.liaPNameStaff,
              designation: proStore.liaPDesigStaff,
            },
          }),
        );

        formData.append('children_participated', proStore.numberOfChildrenDOV);
        formData.append('avg_attendance', proStore.averageAttendMonth);
        formData.append('enrollers_count', proStore.numNewChildEnroll);
        formData.append('dropouts_count', proStore.numChildDropped);
        formData.append('sick_count', proStore.numChildSick);
        formData.append('illness', proStore.illness);
        formData.append('activity_sheet_no', proStore.numberedActivitySheet);
        formData.append(
          'is_activity_completed',
          proStore.activitySheetCompletedID,
        );
        formData.append(
          'is_poshan_calendar_maintained',
          proStore.activitySheetCompletedID,
        );
        formData.append('food_received_timestamp', proStore.foodSupplyDate);
        formData.append('meals_carry_forward', proStore.noOfMealsCF);
        formData.append('meals_received', proStore.noOfMealsReceive);
        formData.append('is_food_safely_stored', proStore.storedFoodSafelyID);
        formData.append(
          'is_breakfast_served_daily',
          proStore.breakfastServedDailyID,
        );
        formData.append('breakfast_served_at', proStore.whenBreakfastID);
        formData.append('additional_info', proStore.addObservations);

        formData.append(
          'teacher_or_social_worker_feedback',
          proStore.teacherFeedback,
        );
        formData.append('parents_feedback', proStore.parentFeedback);
        formData.append('children_feedback', proStore.childFeedback);

        formData.append(
          'volunteer_details',
          JSON.stringify({
            name: proStore.volunteerName,
            partner: proStore.companyName,
            session_duration:
              parseInt(proStore.volunteerHour) * 60 +
              parseInt(proStore.volunteerMinute),
            objective: proStore.volunteerReason,
            learnings: proStore.learnAndObserve,
            feedback: proStore.otherFeedback,
          }),
        );

        formData.append(
          'visit_duration',
          parseInt(proStore.hour) * 60 + parseInt(proStore.minute),
        );
        for (let i = 0; i < Math.min(proStore.selectedImages.length, 5); i++) {
          formData.append(`image_${i + 1}`, {
            uri: proStore.selectedImages[i].path,
            type: proStore.selectedImages[i].mime,
            name: proStore.selectedImages[i].path.split('/').pop(),
          });
        }

        const responseJson = await request<ProgramModal>(
          'post',
          AppStrings.programMonitor,
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
        navigation.goBack();
      } catch (err) {
        Utility.showToast('Something went wrong');
      } finally {
        runInAction(() => {
          proStore.isLoading = false;
        });
      }
    },
  }));
  return proStore;
};

export default useProgramStore;
