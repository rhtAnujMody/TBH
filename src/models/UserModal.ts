export interface UserData {
  id: number;
  name: string;
  email: string;
  dob: string;
  beneficiary_list: BeneficiaryList[];
  partner_list: PartnerList[];
}

export interface BeneficiaryList {
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
