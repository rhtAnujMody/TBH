import {useLocalObservable} from 'mobx-react-lite';
import Utility from '../utils/Utility';
import {runInAction} from 'mobx';
import {Image} from 'react-native-image-crop-picker';
import {ProgramModal} from '../models';
import AppStrings from '../utils/AppStrings';
import useApiService from '../network/useAPIService';
import authStore from './authStore';
import {useNavigation} from '@react-navigation/native';

const useProgramStore = () => {
  const {request} = useApiService();
  const navigation = useNavigation();
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
    openPhotoBottomSheet: false,
    calenderID: '',
    showCalender: false,
    showSearchBar: false,
    selectedImages: [] as Image[],
    partnerTypeOptions: [
      {name: AppStrings.tbr, id: 'T'},
      {name: AppStrings.brightStart, id: 'B'},
      {name: AppStrings.anaemiaMuktBharat, id: 'A'},
    ],
    existingPartnerOptions: Utility.partnerNameLocation(authStore.userData),

    selectionOptions: [
      {name: AppStrings.yes, id: true},
      {name: AppStrings.no, id: false},
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
      {name: AppStrings.morning, id: 'M'},
      {name: AppStrings.afternoon, id: 'A'},
      {name: AppStrings.evening, id: 'E'},
    ],

    errorMessages: {
      partnerType: '',
      existingPartner: '',
      dov: '',
      vvTeamSize: '',
      liaDNameStaff: '',
      liaDDesigStaff: '',
      liaPNameStaff: '',
      liaPDesigStaff: '',
      numberOfChildrenDOV: '',
      averageAttendMonth: '',
      numNewChildEnroll: '',
      numChildDropped: '',
      numChildSick: '',
      illness: '',
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
      teacherFeedback: '',
      parentFeedback: '',
      childFeedback: '',
      companyName: '',
      volunteerName: '',
      volunteerHour: '',
      volunteerMinute: '',
      volunteerReason: '',
      learnAndObserve: '',
      otherFeedback: '',
      hour: '',
      minute: '',
      selectedImages: '',
    },

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
      proStore.errorMessages.dov = '';
    },
    setVVTeamSize(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumeric(value)) {
        return;
      }
      proStore.vvTeamSize = value;
      proStore.errorMessages.vvTeamSize = '';
    },
    setLiaDNameStaff(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlphaSpecial(value)) {
        return;
      }
      proStore.liaDNameStaff = value;
      proStore.errorMessages.liaDNameStaff = '';
    },
    setLiaDDesigStaff(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlphaSpecial(value)) {
        return;
      }
      proStore.liaDDesigStaff = value;
      proStore.errorMessages.liaDDesigStaff = '';
    },
    setLiaPNameStaff(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlphaSpecial(value)) {
        return;
      }
      proStore.liaPNameStaff = value;
      proStore.errorMessages.liaPNameStaff = '';
    },
    setLiaPDesigStaff(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlphaSpecial(value)) {
        return;
      }
      proStore.liaPDesigStaff = value;
      proStore.errorMessages.liaPDesigStaff = '';
    },
    setTeacherFeedback(value: string) {
      proStore.teacherFeedback = value;
      proStore.errorMessages.teacherFeedback = '';
    },
    setChildFeedback(value: string) {
      proStore.childFeedback = value;
      proStore.errorMessages.childFeedback = '';
    },
    setParentFeedback(value: string) {
      proStore.parentFeedback = value;
      proStore.errorMessages.parentFeedback = '';
    },
    setNumberOfChildrenDOV(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumeric(value)) {
        return;
      }
      proStore.numberOfChildrenDOV = value;
      proStore.errorMessages.numberOfChildrenDOV = '';
    },
    setAvgAttendMonth(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumberSpecial(value)) {
        return;
      }
      proStore.averageAttendMonth = value;
      proStore.errorMessages.averageAttendMonth = '';
    },
    setNumNewChildEnroll(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumberSpecial(value)) {
        return;
      }
      proStore.numNewChildEnroll = value;
      proStore.errorMessages.numNewChildEnroll = '';
    },
    setNumChildDropped(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumberSpecial(value)) {
        return;
      }
      proStore.numChildDropped = value;
      proStore.errorMessages.numChildDropped = '';
    },
    setNumChildSick(value: string) {
      proStore.numChildSick = value;
      proStore.errorMessages.numChildSick = '';
    },
    setIllness(value: string) {
      proStore.illness = value;
      proStore.errorMessages.illness = '';
    },
    setNumberedActivitySheet(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumeric(value)) {
        return;
      }
      proStore.numberedActivitySheet = value;
      proStore.errorMessages.numberedActivitySheet = '';
    },
    setFoodSupplyDate(value: string) {
      proStore.foodSupplyDate = value;
      proStore.errorMessages.foodSupplyDate = '';
    },
    setNoOfMealsCF(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumberSpecial(value)) {
        return;
      }
      proStore.noOfMealsCF = value;
      proStore.errorMessages.noOfMealsCF = '';
    },
    setNoOfMealsReceive(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumberSpecial(value)) {
        return;
      }
      proStore.noOfMealsReceive = value;
      proStore.errorMessages.noOfMealsReceive = '';
    },
    setAddObservations(value: string) {
      proStore.addObservations = value;
      proStore.errorMessages.addObservations = '';
    },
    setCompanyName(value: string) {
      proStore.companyName = value;
      proStore.errorMessages.companyName = '';
    },
    setVolunteerName(value: string) {
      proStore.volunteerName = value;
      proStore.errorMessages.volunteerName = '';
    },
    setVolunteerReason(value: string) {
      proStore.volunteerReason = value;
      proStore.errorMessages.volunteerReason = '';
    },
    setLearnAndObserve(value: string) {
      proStore.learnAndObserve = value;
      proStore.errorMessages.learnAndObserve = '';
    },
    setOtherFeedback(value: string) {
      proStore.otherFeedback = value;
      proStore.errorMessages.otherFeedback = '';
    },
    setSelectedImages(selectedImages: Image[]) {
      proStore.selectedImages = selectedImages;
    },

    togglePhotoBottomSheet() {
      proStore.openPhotoBottomSheet = !proStore.openPhotoBottomSheet;
    },

    setShowSearchBar(value: boolean) {
      proStore.showSearchBar = value;
    },

    toggleBottomSheet(from?: string) {
      proStore.openBottomSheet = !proStore.openBottomSheet;
      switch (from) {
        case 'partnerType':
          proStore.bottomSheetHeader = AppStrings.partnerTypePlaceHolder;
          proStore.bottomSheetArray = proStore.partnerTypeOptions;
          break;
        case 'existingPartner':
          proStore.bottomSheetHeader =
            AppStrings.PROGRAM_MONITORING_SCREEN.nameLocExistPartnerPlaceHolder;
          proStore.bottomSheetArray = proStore.existingPartnerOptions;
          proStore.setShowSearchBar(true);
          break;
        case 'hour':
          proStore.bottomSheetHeader = AppStrings.selectHour;
          proStore.bottomSheetArray = proStore.hourOptions;
          break;
        case 'minute':
          proStore.bottomSheetHeader = AppStrings.selectMinute;
          proStore.bottomSheetArray = proStore.minuteOptions;
          break;
        case 'activitySheet':
          proStore.bottomSheetHeader =
            AppStrings.PROGRAM_MONITORING_SCREEN.activitySheetCompleted;
          proStore.bottomSheetArray = proStore.selectionOptions;
          break;
        case 'poshanCalendar':
          proStore.bottomSheetHeader =
            AppStrings.PROGRAM_MONITORING_SCREEN.poshanCalendarCompleted;
          proStore.bottomSheetArray = proStore.selectionOptions;
          break;
        case 'storedFoodSafely':
          proStore.bottomSheetHeader =
            AppStrings.PROGRAM_MONITORING_SCREEN.storedFoodSafely;
          proStore.bottomSheetArray = proStore.selectionOptions;
          break;
        case 'breakfastServedDaily':
          proStore.bottomSheetHeader =
            AppStrings.PROGRAM_MONITORING_SCREEN.breakfastServed;
          proStore.bottomSheetArray = proStore.selectionOptions;
          break;
        case 'whenBreakfast':
          proStore.bottomSheetHeader =
            AppStrings.PROGRAM_MONITORING_SCREEN.whenBreakfastServed;
          proStore.bottomSheetArray = proStore.breakfastOptions;
          break;
        case 'volunteerHour':
          proStore.bottomSheetHeader = AppStrings.selectHourCol;
          proStore.bottomSheetArray = proStore.hourOptions;
          break;
        case 'volunteerMinute':
          proStore.bottomSheetHeader = AppStrings.selectMinuteCol;
          proStore.bottomSheetArray = proStore.minuteOptions;
          break;
      }
    },
    setValue(from: string, value: string, id: string) {
      proStore.setShowSearchBar(false);
      proStore.openBottomSheet = !proStore.openBottomSheet;
      switch (from) {
        case AppStrings.partnerTypePlaceHolder:
          proStore.partnerType = value;
          proStore.partnerTypeID = id;
          proStore.errorMessages.partnerType = '';
          break;
        case AppStrings.PROGRAM_MONITORING_SCREEN
          .nameLocExistPartnerPlaceHolder:
          const res = value.split(',');
          proStore.existingPartner = res[0];
          proStore.existLocation = res[1];
          proStore.existBlock = res[2];
          proStore.existDistrict = res[3];
          proStore.existState = res[4];
          proStore.existingPartnerID = id;
          proStore.errorMessages.existingPartner = '';
          break;
        case AppStrings.selectHour:
          proStore.hour = value;
          proStore.errorMessages.hour = '';

          break;
        case AppStrings.selectMinute:
          proStore.minute = value;
          proStore.errorMessages.minute = '';

          break;
        case AppStrings.PROGRAM_MONITORING_SCREEN.activitySheetCompleted:
          proStore.activitySheetCompleted = value;
          proStore.activitySheetCompletedID = id;
          proStore.errorMessages.activitySheetCompleted = '';

          break;
        case AppStrings.PROGRAM_MONITORING_SCREEN.poshanCalendarCompleted:
          proStore.poshanCalenderCompleted = value;
          proStore.poshanCalenderCompletedID = id;
          proStore.errorMessages.poshanCalenderCompleted = '';

          break;
        case AppStrings.PROGRAM_MONITORING_SCREEN.storedFoodSafely:
          proStore.storedFoodSafely = value;
          proStore.storedFoodSafelyID = id;
          proStore.errorMessages.storedFoodSafely = '';

          break;
        case AppStrings.PROGRAM_MONITORING_SCREEN.breakfastServed:
          proStore.breakfastServedDaily = value;
          proStore.breakfastServedDailyID = id;
          proStore.errorMessages.breakfastServedDaily = '';

          break;
        case AppStrings.PROGRAM_MONITORING_SCREEN.whenBreakfastServed:
          proStore.whenBreakfast = value;
          proStore.whenBreakfastID = id;
          proStore.errorMessages.whenBreakfast = '';

          break;
        case AppStrings.selectHourCol:
          proStore.volunteerHour = value;
          proStore.errorMessages.volunteerHour = '';

          break;
        case AppStrings.selectMinuteCol:
          proStore.volunteerMinute = value;
          proStore.errorMessages.volunteerMinute = '';

          break;
      }
    },
    validateSubmit() {
      let isValid = true;
      if (proStore.partnerType === '') {
        proStore.errorMessages.partnerType = 'This Field is Required';
        isValid = false;
      }
      if (proStore.existingPartner === '') {
        proStore.errorMessages.existingPartner = 'This Field is Required';
        isValid = false;
      }
      if (proStore.dov === '') {
        proStore.errorMessages.dov = 'This Field is Required';
        isValid = false;
      }
      if (proStore.vvTeamSize === '') {
        proStore.errorMessages.vvTeamSize = 'This Field is Required';
        isValid = false;
      }
      if (proStore.liaDNameStaff === '') {
        proStore.errorMessages.liaDNameStaff = 'This Field is Required';
        isValid = false;
      }
      if (proStore.liaDDesigStaff === '') {
        proStore.errorMessages.liaDDesigStaff = 'This Field is Required';
        isValid = false;
      }
      if (proStore.liaPNameStaff === '') {
        proStore.errorMessages.liaPNameStaff = 'This Field is Required';
        isValid = false;
      }
      if (proStore.liaPDesigStaff === '') {
        proStore.errorMessages.liaPDesigStaff = 'This Field is Required';
        isValid = false;
      }
      if (proStore.numberOfChildrenDOV === '') {
        proStore.errorMessages.numberOfChildrenDOV = 'This Field is Required';
        isValid = false;
      }
      if (proStore.averageAttendMonth === '') {
        proStore.errorMessages.averageAttendMonth = 'This Field is Required';
        isValid = false;
      }
      if (proStore.numNewChildEnroll === '') {
        proStore.errorMessages.numNewChildEnroll = 'This Field is Required';
        isValid = false;
      }
      if (proStore.numChildDropped === '') {
        proStore.errorMessages.numChildDropped = 'This Field is Required';
        isValid = false;
      }
      if (proStore.numChildSick === '') {
        proStore.errorMessages.numChildSick = 'This Field is Required';
        isValid = false;
      }
      if (proStore.illness === '') {
        proStore.errorMessages.illness = 'This Field is Required';
        isValid = false;
      }
      if (proStore.numberedActivitySheet === '') {
        proStore.errorMessages.numberedActivitySheet = 'This Field is Required';
        isValid = false;
      }
      if (proStore.activitySheetCompleted === '') {
        proStore.errorMessages.activitySheetCompleted =
          'This Field is Required';
        isValid = false;
      }
      if (proStore.poshanCalenderCompleted === '') {
        proStore.errorMessages.poshanCalenderCompleted =
          'This Field is Required';
        isValid = false;
      }
      if (proStore.foodSupplyDate === '') {
        proStore.errorMessages.foodSupplyDate = 'This Field is Required';
        isValid = false;
      }
      if (proStore.noOfMealsCF === '') {
        proStore.errorMessages.noOfMealsCF = 'This Field is Required';
        isValid = false;
      }
      if (proStore.noOfMealsReceive === '') {
        proStore.errorMessages.noOfMealsReceive = 'This Field is Required';
        isValid = false;
      }
      if (proStore.storedFoodSafely === '') {
        proStore.errorMessages.storedFoodSafely = 'This Field is Required';
        isValid = false;
      }
      if (proStore.breakfastServedDaily === '') {
        proStore.errorMessages.breakfastServedDaily = 'This Field is Required';
        isValid = false;
      }
      if (proStore.whenBreakfast === '') {
        proStore.errorMessages.whenBreakfast = 'This Field is Required';
        isValid = false;
      }
      if (proStore.addObservations === '') {
        proStore.errorMessages.addObservations = 'This Field is Required';
        isValid = false;
      }
      if (proStore.teacherFeedback === '') {
        proStore.errorMessages.teacherFeedback = 'This Field is Required';
        isValid = false;
      }
      if (proStore.parentFeedback === '') {
        proStore.errorMessages.parentFeedback = 'This Field is Required';
        isValid = false;
      }
      if (proStore.childFeedback === '') {
        proStore.errorMessages.childFeedback = 'This Field is Required';
        isValid = false;
      }

      if (proStore.companyName === '') {
        proStore.errorMessages.companyName = 'This Field is Required';
        isValid = false;
      }
      if (proStore.volunteerName === '') {
        proStore.errorMessages.volunteerName = 'This Field is Required';
        isValid = false;
      }
      if (proStore.volunteerHour === '') {
        proStore.errorMessages.volunteerHour = 'This Field is Required';
        isValid = false;
      }
      if (proStore.volunteerMinute === '') {
        proStore.errorMessages.volunteerMinute = 'This Field is Required';
        isValid = false;
      }
      if (proStore.volunteerReason === '') {
        proStore.errorMessages.volunteerReason = 'This Field is Required';
        isValid = false;
      }
      if (proStore.learnAndObserve === '') {
        proStore.errorMessages.learnAndObserve = 'This Field is Required';
        isValid = false;
      }
      if (proStore.otherFeedback === '') {
        proStore.errorMessages.otherFeedback = 'This Field is Required';
        isValid = false;
      }
      if (proStore.hour === '') {
        proStore.errorMessages.hour = 'This Field is Required';
        isValid = false;
      }
      if (proStore.minute === '') {
        proStore.errorMessages.minute = 'This Field is Required';
        isValid = false;
      }

      return isValid;
    },
    async writeToRealm() {
      try {
        authStore.realm.write(() => {
          const savedRecord = authStore.realm.create('ProgramMonitor', {
            _id: Date.now(),
            agent_id: authStore.userData.id,
            type: proStore.partnerTypeID,
            partner: proStore.existingPartnerID,
            date: proStore.dov,
            visiting_team_size: proStore.vvTeamSize,
            liaDNameStaff: proStore.liaDNameStaff,
            liaDDesigStaff: proStore.liaDDesigStaff,
            liaPNameStaff: proStore.liaPNameStaff,
            liaPDesigStaff: proStore.liaPDesigStaff,
            children_participated: proStore.numberOfChildrenDOV,
            avg_attendance: proStore.averageAttendMonth,
            enrollers_count: proStore.numNewChildEnroll,
            dropouts_count: proStore.numChildDropped,
            sick_count: proStore.numChildSick,
            illness: proStore.illness,
            activity_sheet_no: proStore.numberedActivitySheet,
            is_activity_completed: proStore.activitySheetCompletedID,
            is_poshan_calendar_maintained: proStore.activitySheetCompletedID,
            food_received_timestamp: proStore.foodSupplyDate,
            meals_carry_forward: proStore.noOfMealsCF,
            meals_received: proStore.noOfMealsReceive,
            is_food_safely_stored: proStore.storedFoodSafelyID,
            is_breakfast_served_daily: proStore.breakfastServedDailyID,
            breakfast_served_at: proStore.whenBreakfastID,
            additional_info: proStore.addObservations,
            teacher_or_social_worker_feedback: proStore.teacherFeedback,
            parents_feedback: proStore.parentFeedback,
            children_feedback: proStore.childFeedback,
            visit_duration:
              parseInt(proStore.hour) * 60 + parseInt(proStore.minute),
            volunteerName: proStore.volunteerName,
            companyName: proStore.companyName,
            session_duration:
              parseInt(proStore.volunteerHour) * 60 +
              parseInt(proStore.volunteerMinute), //check
            volunteerReason: proStore.volunteerReason,
            learnAndObserve: proStore.learnAndObserve,
            otherFeedback: proStore.otherFeedback,
          });

          for (
            let i = 0;
            i < Math.min(proStore.selectedImages.length, 5);
            i++
          ) {
            savedRecord.images.push(
              authStore.realm.create('ImagesSchema', {
                _id: Date.now() + i,
                uri: proStore.selectedImages[i].path,
                type: proStore.selectedImages[i].mime,
                name: proStore.selectedImages[i].path.split('/').pop(),
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

    
    async sendData() {
      runInAction(() => {
        proStore.isLoading = true;
      });
      try {
        if (proStore.validateSubmit()) {
          const checkInternet = await Utility.checkInterNet();
          const formData = new FormData(); //existingPartnerID
          formData.append('agent_id', authStore.userData.id);
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

          formData.append(
            'children_participated',
            proStore.numberOfChildrenDOV,
          );
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
          for (
            let i = 0;
            i < Math.min(proStore.selectedImages.length, 5);
            i++
          ) {
            formData.append(`image_${i + 1}`, {
              uri: proStore.selectedImages[i].path,
              type: proStore.selectedImages[i].mime,
              name: proStore.selectedImages[i].path.split('/').pop(),
            });
          }
          if (checkInternet) {
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
          } else {
            proStore.writeToRealm();
          }
          navigation.goBack();
        }
      } catch (err) {
        Utility.showToast(AppStrings.somethingWentWrong);
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
