import { useEffect, useState } from 'react';
import { useAuth } from '@contexts';
import { useCurrentUser } from '@api';

export const useAuthGuard = () => {
  const { user: firebaseUser, isInitializing } = useAuth();
  const { data: backendUser, isLoading: isBackendLoading, isError } = useCurrentUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log('Auth Guard State:', {
      firebaseUser: firebaseUser?.uid,
      backendUser: backendUser?.firebaseUid,
      isError,
      isLoading: isBackendLoading,
    });

    // User is authenticated if:
    // 1. Firebase user exists
    // 2. Backend user exists (no error in fetching)
    // 3. Backend user data matches Firebase user
    const isValid = 
      !!firebaseUser && 
      !isError && 
      !!backendUser && 
      backendUser.firebaseUid === firebaseUser.uid;

    setIsAuthenticated(isValid);
  }, [firebaseUser, backendUser, isError, isBackendLoading]);

  return {
    isAuthenticated,
    isLoading: isInitializing === undefined || isBackendLoading,
    firebaseUser,
    backendUser,
  };
}; 