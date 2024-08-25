export type CompanyDataTableType = {
  id: number
  companyName: string
  firstNames: string
  lastName: string
  email: string
  phone: string
  status: companyStatus
  createdAt: string
  administrator: { name: string } | null
  businessSector: { name: string }
}

export type Company = {
  id: number;
  companyName: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  firstNames: string;
  lastName: string;
  email: string;
  phone: string;
  yearOfCreation: number;
  municipality: string;
  city: string;
  businessSector: { name: string };
  rccmFilePath: string;
  paymentProofFilePath: string;
};

export enum companyStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  INCOMPLETE = 'INCOMPLETE',
}
