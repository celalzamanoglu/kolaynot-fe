export const NOTES_ENDPOINTS = {
  GET_ALL: {
    url: '/notes',
    method: 'GET',
  },
  GET_FAVORITES: {
    url: '/notes/favorites',
    method: 'GET',
  },
  GET_BY_ID: {
    url: (id: string) => `/notes/${id}`,
    method: 'GET',
  },
  UPDATE_FAVORITE: {
    url: (id: string) => `/notes/${id}/favorite`,
    method: 'PUT',
  },
  DELETE: {
    url: (id: string) => `/notes/${id}`,
    method: 'DELETE',
  },
} as const; 