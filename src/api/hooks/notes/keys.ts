export const NOTES_KEYS = {
  all: ['notes'] as const,
  lists: () => [...NOTES_KEYS.all, 'list'] as const,
  favorites: () => [...NOTES_KEYS.all, 'favorites'] as const,
  detail: (id: string) => [...NOTES_KEYS.all, 'detail', id] as const,
} as const; 