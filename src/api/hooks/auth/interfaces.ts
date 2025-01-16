export interface LoginRequest {
  token: string;
}

export interface User {
  _id: string;
  firebaseUid: string;
  appUserId: string;
  phoneNumber: string;
  platform?: string;
  pushToken?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: User;
}

export interface UpdateDeviceInfoRequest {
  platform: string;
  pushToken: string;
}

export interface UpdateDeviceInfoResponse {
  user: User;
} 