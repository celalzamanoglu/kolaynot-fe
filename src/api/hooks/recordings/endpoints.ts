export const RECORDINGS_ENDPOINTS = {
  UPLOAD: {
    url: '/recordings/upload',
    method: 'POST',
  },
  GET: {
    url: (id: string) => `/recordings/${id}`,
    method: 'GET',
  },
  DELETE: {
    url: (id: string) => `/recordings/${id}`,
    method: 'DELETE',
  },
} as const; 