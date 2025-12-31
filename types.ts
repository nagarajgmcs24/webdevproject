
export enum UserRole {
  CITIZEN = 'CITIZEN',
  COUNCILLOR = 'COUNCILLOR'
}

export enum ReportStatus {
  PENDING = 'PENDING',
  STARTED = 'STARTED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED'
}

export interface User {
  id: string;
  username: string;
  password?: string;
  role: UserRole;
  ward?: string;
  fullName: string;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  ward: string;
  status: ReportStatus;
  citizenId: string;
  citizenName: string;
  createdAt: string;
  imageUrl?: string;
}

export interface WardInfo {
  name: string;
  councillor: string;
  area: string;
}
