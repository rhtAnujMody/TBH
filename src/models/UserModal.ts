export interface UserData {
  id: number;
  name: string;
  email: string;
  dob: string;
  beneficiary_list: BeneficiaryList[];
  partner_list: PartnerList[];
  health_camp_beneficiary: HealthCampBeneficiary[];
  education_details: EducationDetails[];
  doctor_observation: DoctorObservation;
  role: string;
}

export type DoctorObservationInner = {
  id: number;
  observation: string;
  isSelected: boolean;
};
export interface DoctorObservation {
  [key: string]: DoctorObservationInner[];
}

export interface EducationDetails {
  id: number;
  name: string;
}

export interface BeneficiaryList {
  id: number;
  name: string;
}

export interface HealthCampBeneficiary {
  id: number;
  name: string;
}

export interface PartnerList {
  id: number;
  name: string;
  location: string;
  block: string;
  district: string;
  state: string;
}
