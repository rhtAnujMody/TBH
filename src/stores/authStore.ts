import AsyncStorage from '@react-native-async-storage/async-storage';
import {makeAutoObservable} from 'mobx';
import {
  BeneficiaryList,
  CaptureModal,
  HealthCampBeneficiary,
  HealthModal,
  PartnerList,
  ProgramModal,
  UserData,
} from '../models';
import Utility from '../utils/Utility';
import Realm from 'realm';
import {
  NutritionEducationSchema,
  ImagesSchema,
  ProgramMonitorSchema,
  HealthCampSchema,
} from '../realm';
import useApiService from '../network/useAPIService';
import AppStrings from '../utils/AppStrings';
import {useAsyncStorage} from '../custom_hooks';

const {request} = useApiService();
const {setData} = useAsyncStorage();

const authStore = {
  isLoggedIn: false,
  showSplash: true,
  userData: {} as UserData,
  realm: {} as Realm,
  sentRecords: 0,
  totalRecords: 0,
  showLoader: false,

  setShowLoader(value: boolean) {
    this.showLoader = value;
  },

  setIsLogin(value: boolean, cb?: () => void) {
    this.isLoggedIn = value;
    if (cb) {
      cb();
    }
  },
  setUserData(data: UserData) {
    Utility.logData(data);
    authStore.userData = data;
  },

  setNewPartnerList(value: PartnerList[]) {
    if (authStore.userData) {
      authStore.userData.partner_list = value;
      setData(AppStrings.userData, authStore.userData);
    }
  },

  toggleSplash(value: boolean) {
    authStore.showSplash = value;
  },

  logout() {
    AsyncStorage.clear();
    authStore.isLoggedIn = false;
  },

  async readFromRealm() {
    try {
      authStore.totalRecords =
        authStore.realm.objects('NutritionEductaion').length +
        authStore.realm.objects('ProgramMonitor').length +
        authStore.realm.objects('HealthCamp').length;
      return authStore.totalRecords;
    } catch (e) {
      console.log(e, 'read from realm exception');
    }
  },

  async sendRealmToServer() {
    await this.sendDataToServer();
  },

  async sendDataToServer() {
    try {
      const nutritionData = authStore.realm.objects('NutritionEductaion');
      const programData = authStore.realm.objects('ProgramMonitor');
      const healthData = authStore.realm.objects('HealthCamp');

      await this.sendHealthData(healthData);
      await this.sendNutritionData(nutritionData);
      await this.sendProgramData(programData);

      if (authStore.sentRecords === authStore.totalRecords) {
        Utility.showToast('All Records sent to Server Successfully');
      }
    } catch (e) {
      console.log('Error in send Data To server function');
    }
  },

  async sendNutritionData(nutritionData) {
    for (const item of nutritionData) {
      await this.sendNutritionEducationToServer(item);
    }
  },

  async sendHealthData(healthData) {
    for (const item of healthData) {
      await this.sendHealthMonitorDataToServer(item);
    }
  },

  async sendProgramData(programData) {
    for (const item of programData) {
      await this.sendProgramMonitorDataToServer(item);
    }
  },

  async initializeRealm() {
    try {
      const realm = await Realm.open({
        path: 'myrealm',
        schema: [
          ProgramMonitorSchema,
          NutritionEducationSchema,
          ImagesSchema,
          HealthCampSchema,
        ],
      });
      authStore.realm = realm;
    } catch (e) {
      console.log('exception in  initialize realm', e);
    }
  },

  async sendNutritionEducationToServer(data: any) {
    try {
      const formData = new FormData();
      formData.append('agent_id', data.agent_id);
      if (data.isNew) {
        formData.append(
          'partner_details',
          JSON.stringify({
            name: data.name,
            location: data.location,
            block: data.block,
            district: data.district,
            state: data.state,
          }),
        );
        formData.append('partner', '');
      } else {
        formData.append('partner', data.partnerID);
      }

      formData.append('age_group', data.ageID);
      formData.append('duration', data.duration);
      formData.append('topics', data.topicsCovered);
      formData.append('participants_count', data.totalNoOfParticipants);
      formData.append('method_used', data.methodUsed);
      formData.append('conducted_by', data.sessionConductedBy);
      formData.append('feedback', data.feedbackFromParticipants);
      formData.append('beneficiary', data.beneficiarieID);
      formData.append('visit_date', data.dov);

      for (let i = 0; i < Math.min(data.images.length, 5); i++) {
        formData.append(`image_${i + 1}`, {
          uri: data.images[i].uri,
          type: data.images[i].type,
          name: data.images[i].name,
        });
      }

      const responseJson = await request<CaptureModal>(
        'post',
        AppStrings.captureDetails,
        formData,
        {
          'Content-Type': 'multipart/form-data;',
        },
      );

      if (responseJson.success) {
        this.sentRecords = this.sentRecords + 1;
        this.realm.write(() => {
          this.realm.delete(data);
        });
        console.log('Item deleted successfully!');
      } else {
        Utility.showToast('Error in sending Nutrition Education Data');
      }
    } catch (e) {
      console.log(e, 'error in sending sendNutritionEducationToServer');
    }
  },
  async sendProgramMonitorDataToServer(data: any) {
    try {
      const checkInternet = await Utility.checkInterNet();
      const formData = new FormData(); //existingPartnerID
      formData.append('agent_id', data.agent_id);
      formData.append('type', data.type);
      formData.append('partner', data.partner);
      formData.append('date', data.date);
      formData.append('visiting_team_size', data.visiting_team_size);

      formData.append(
        'liaison',
        JSON.stringify({
          decimal: {
            name: data.liaDNameStaff,
            designation: data.liaDDesigStaff,
          },
          partner: {
            name: data.liaPNameStaff,
            designation: data.liaPDesigStaff,
          },
        }),
      );
      formData.append('children_participated', data.children_participated);
      formData.append('avg_attendance', data.avg_attendance);
      formData.append('enrollers_count', data.enrollers_count);
      formData.append('dropouts_count', data.dropouts_count);
      formData.append('sick_count', data.sick_count);
      formData.append('illness', data.illness);
      formData.append('activity_sheet_no', data.activity_sheet_no);
      formData.append('is_activity_completed', data.is_activity_completed);
      formData.append(
        'is_poshan_calendar_maintained',
        data.is_poshan_calendar_maintained,
      );

      formData.append('food_received_timestamp', data.food_received_timestamp);
      formData.append('meals_carry_forward', data.meals_carry_forward);
      formData.append('meals_received', data.meals_received);
      formData.append('is_food_safely_stored', data.is_food_safely_stored);
      formData.append(
        'is_breakfast_served_daily',
        data.is_breakfast_served_daily,
      );
      formData.append('breakfast_served_at', data.breakfast_served_at);
      formData.append('additional_info', data.additional_info);

      formData.append(
        'teacher_or_social_worker_feedback',
        data.teacher_or_social_worker_feedback,
      );
      formData.append('parents_feedback', data.parents_feedback);
      formData.append('children_feedback', data.children_feedback);

      formData.append(
        'volunteer_details',
        JSON.stringify({
          name: data.volunteerName,
          partner: data.companyName,
          session_duration: data.session_duration,
          objective: data.volunteerReason,
          learnings: data.learnAndObserve,
          feedback: data.otherFeedback,
        }),
      );

      formData.append('visit_duration', data.visit_duration);

      for (let i = 0; i < Math.min(data.images.length, 5); i++) {
        formData.append(`image_${i + 1}`, {
          uri: data.images[i].uri,
          type: data.images[i].type,
          name: data.images[i].name,
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
          this.sentRecords = this.sentRecords + 1;
          this.realm.write(() => {
            this.realm.delete(data);
          });
          console.log('Item deleted successfully!');
        } else {
          Utility.showToast('Error in sending Program Monitor Data');
        }
      }
    } catch (e) {
      console.log(e, 'error in sending sendProgramMonitorDataToServer');
    }
  },
  async sendHealthMonitorDataToServer(data: any) {
    try {
      const formData = new FormData();
      const checkInternet = await Utility.checkInterNet();
      formData.append('agent_id', data.agent_id);
      if (data.isNew) {
        formData.append(
          'partner_details',
          JSON.stringify({
            name: data.name,
            location: data.location,
            block: data.block,
            district: data.district,
            state: data.state,
          }),
        );
        formData.append('partner', '');
        formData.append('type', data.type);
      } else {
        formData.append('partner', data.partnerID);
      }
      formData.append('health_camp_date', data.health_camp_date);
      formData.append('serial_no', data.serial_no);

      if (data.age_editable) {
        formData.append(
          'child_info',
          JSON.stringify({
            name: data.childName,
            contact: data.contact,
            gender: data.gender,
            beneficiary_id: data.beneficiaryID,
            image: data.images.length > 0 ? data.images[0].uri : null,
          }),
        );
      } else {
        formData.append(
          'child_info',
          JSON.stringify({
            name: data.childName,
            dob: data.dob,
            contact: data.contact,
            gender: data.gender,
            beneficiary_id: data.beneficiaryID,
            image: data.images.length > 0 ? data.images[0].uri : null,
          }),
        );
      }

      formData.append(
        'child_details',
        JSON.stringify({
          age: data.age,
          height: data.height,
          weight: data.weight,
          muac: data.muac,
          education: data.education,
        }),
      );

      if (data.vitamin_A === 'Done') {
        formData.append(
          'vitamin_A_details',
          JSON.stringify({
            done_by: data.vitamin_A_done_by,
            duration: data.vitamin_A_duration,
            location: data.vitamin_A_location,
            dose_date: data.vitamin_A_dose_date,
          }),
        );
        formData.append('vitamin_A', true);
      } else {
        formData.append('vitamin_A', false);
      }

      if (data.deworming === 'Done') {
        formData.append(
          'deworming_details',
          JSON.stringify({
            done_by: data.deworming_done_by,
            duration: data.deworming_duration,
            location: data.deworming_location,
            dose_date: data.deworming_dose_date,
          }),
        );
        formData.append('deworming', true);
      } else {
        formData.append('deworming', false);
      }

      if (data.ifa === 'Done') {
        formData.append(
          'ifa_details',
          JSON.stringify({
            done_by: data.ifa_done_by,
            duration: data.ifa_duration,
            location: data.ifa_location,
            dose_date: data.ifa_dose_date,
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
          this.sentRecords = this.sentRecords + 1;
          this.realm.write(() => {
            this.realm.delete(data);
          });
          console.log('Item deleted successfully!');
        } else {
          Utility.showToast('Error in sending Health Camp Data');
        }
      }
    } catch (e) {
      console.log(e, 'error in sending sendHealthMonitorDataToServer');
    }
  },
};

export default makeAutoObservable(authStore);
