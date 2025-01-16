import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '@api';
import { RECORDINGS_ENDPOINTS } from './endpoints';
import { RECORDINGS_KEYS } from './keys';
import type { Recording } from './interfaces';

export const useUploadRecording = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { uri: string; name: string }) => {
      const formData = new FormData();
      formData.append('file', {
        uri: data.uri,
        name: data.name,
        type: 'audio/m4a',
      } as any);

      return request<Recording>({
        ...RECORDINGS_ENDPOINTS.UPLOAD,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECORDINGS_KEYS.lists() });
    },
  });
};

export const useRecordingAudio = (id: string) => {
  return useQuery({
    queryKey: [...RECORDINGS_KEYS.detail(id), 'audio'],
    queryFn: () =>
      request<{ url: string }>({
        ...RECORDINGS_ENDPOINTS.GET,
        url: RECORDINGS_ENDPOINTS.GET.url(id),
      }),
  });
}; 