export interface UserModal {
  id: number;
  name: string;
  email: string;
  dob: string;
  beneficiary_list: BeneficiaryList[];
}

export interface BeneficiaryList {
  id: number;
  name: string;
}
