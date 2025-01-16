import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '@api';
import { NOTES_ENDPOINTS } from './endpoints';
import { NOTES_KEYS } from './keys';
import type { Note, UpdateFavoriteRequest, UpdateFavoriteResponse } from './interfaces';

export const useNotes = () => {
  return useQuery({
    queryKey: NOTES_KEYS.lists(),
    queryFn: () =>
      request<Note[]>({
        ...NOTES_ENDPOINTS.GET_ALL,
      }),
  });
};

export const useFavoriteNotes = () => {
  return useQuery({
    queryKey: NOTES_KEYS.favorites(),
    queryFn: () =>
      request<Note[]>({
        ...NOTES_ENDPOINTS.GET_FAVORITES,
      }),
  });
};

export const useNote = (id: string) => {
  return useQuery({
    queryKey: NOTES_KEYS.detail(id),
    queryFn: () =>
      request<Note>({
        ...NOTES_ENDPOINTS.GET_BY_ID,
        url: NOTES_ENDPOINTS.GET_BY_ID.url(id),
      }),
  });
};

export const useUpdateNoteFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFavoriteRequest }) =>
      request<UpdateFavoriteResponse>({
        ...NOTES_ENDPOINTS.UPDATE_FAVORITE,
        url: NOTES_ENDPOINTS.UPDATE_FAVORITE.url(id),
        data,
      }),
    onSuccess: () => {
      // Invalidate notes list and favorites queries
      queryClient.invalidateQueries({ queryKey: NOTES_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: NOTES_KEYS.favorites() });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      request({
        ...NOTES_ENDPOINTS.DELETE,
        url: NOTES_ENDPOINTS.DELETE.url(id),
      }),
    onSuccess: () => {
      // Invalidate notes list query
      queryClient.invalidateQueries({ queryKey: NOTES_KEYS.lists() });
    },
  });
}; 