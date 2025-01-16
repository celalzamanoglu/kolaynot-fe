import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { request } from '@api';
import { AUTH_ENDPOINTS, USER_ENDPOINTS } from './endpoints';
import { AUTH_KEYS } from './keys';
import type {
  LoginRequest,
  LoginResponse,
  UpdateDeviceInfoRequest,
  UpdateDeviceInfoResponse,
  User,
} from './interfaces';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) =>
      request<LoginResponse>({
        ...AUTH_ENDPOINTS.LOGIN,
        data,
      }),
    onSuccess: () => {
      // Invalidate current user query to force a refetch
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.currentUser() });
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: AUTH_KEYS.currentUser(),
    queryFn: () =>
      request<User>({
        ...USER_ENDPOINTS.GET_CURRENT_USER,
      }),
  });
};

export const useUpdateDeviceInfo = () => {
  return useMutation({
    mutationFn: (data: UpdateDeviceInfoRequest) =>
      request<UpdateDeviceInfoResponse>({
        ...USER_ENDPOINTS.UPDATE_DEVICE_INFO,
        data,
      }),
  });
}; 