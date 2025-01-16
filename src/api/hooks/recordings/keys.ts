export const RECORDINGS_KEYS = {
  all: ['recordings'] as const,
  lists: () => [...RECORDINGS_KEYS.all, 'list'] as const,
  detail: (id: string) => [...RECORDINGS_KEYS.all, 'detail', id] as const,
} as const; 