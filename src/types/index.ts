export interface IExperience {
  id: string;
  title: string;
  industry: string;
  companyName: string;
  yearsOfExperience: string;
}

export interface IApplyForm {
  fullName: string;
  fatherName: string;
  cnic: number;
  phoneNumber: number;
  city: string;
  email: string;
  gender: "male" | "female";
  dateOfBirth: any;
  highestQualification:
    | "Matric / O Levels"
    | "Intermediate / A Levels"
    | "Undergraduate (Bachelor's)"
    | "Graduate (Master's)"
    | "Post-Graduate (PhD)";
  experiences?: IExperience[];
}

export type TFields =
  | "fullName"
  | "fatherName"
  | "cnic"
  | "phoneNumber"
  | "city"
  | "email"
  | "dateOfBirth"
  | "gender"
  | "highestQualification"
  | "experiences"
  | "title"
  | "yearsOfExperience"
  | "industry"
  | "companyName";

export interface IAdmitCard {
  fullName: string;
  fatherName: string;
  cnic: string;
  dateOfRegistration: any;
  studentId: string;
}
export interface IAdmitCardRequirements {
  email: string;
}
