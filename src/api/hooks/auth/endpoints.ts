export const AUTH_ENDPOINTS = {
  LOGIN: {
    url: '/auth/login',
    method: 'post',
  } as const,
} as const;

export const USER_ENDPOINTS = {
  GET_CURRENT_USER: {
    url: '/users/me',
    method: 'get',
  } as const,
  UPDATE_DEVICE_INFO: {
    url: '/users/device-info',
    method: 'put',
  } as const,
} as const; 