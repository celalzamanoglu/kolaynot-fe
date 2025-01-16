import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { setAxiosAuthHeader, clearAxiosAuthHeader, useLogin } from '@api'

interface AuthError {
  title: string
  message: string
}

interface AuthContextType {
  user: FirebaseAuthTypes.User | null
  isInitializing: boolean | undefined
  isLoading: boolean
  authError: AuthError | null
  signInWithPhoneNumber: (phoneNumber: string, forceResend?: boolean, successCallback?: () => void) => Promise<void>
  confirmCode: (code: string) => Promise<void>
  signOut: () => Promise<void>
  getFirebaseIDToken: (forceRefresh?: boolean) => Promise<string | null>
  clearAuthStates: () => void
  userHasSignedUpBefore: boolean
  setFirebaseTokenAsAxiosAuthToken: (forceRefresh?: boolean) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const [isInitializing, setIsInitializing] = useState<boolean | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<AuthError | null>(null)
  const [userHasSignedUpBefore, setUserHasSignedUpBefore] = useState(false)
  const [smsConfirm, setSMSConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null)

  const { mutateAsync: login } = useLogin()

  const beforeRequest = useCallback(() => {
    setIsLoading(true)
    setAuthError(null)
  }, [])

  const successfulRequest = useCallback(() => {
    setIsLoading(false)
    setAuthError(null)
  }, [])

  const erroneousRequest = useCallback((error: AuthError) => {
    setIsLoading(false)
    setAuthError(error)
  }, [])

  const getFirebaseIDToken = useCallback(
    async (forceRefresh = false): Promise<string | null> => {
      try {
        if (!user) return null
        return await user.getIdToken(forceRefresh)
      } catch (error) {
        console.error('Error getting Firebase ID token:', error)
        return null
      }
    },
    [user]
  )

  const setFirebaseTokenAsAxiosAuthToken = useCallback(
    async (forceRefresh = false) => {
      const token = await getFirebaseIDToken(forceRefresh)
      if (token) {
        setAxiosAuthHeader(token)
      } else {
        clearAxiosAuthHeader()
      }
    },
    [getFirebaseIDToken]
  )

  const signInWithPhoneNumber = useCallback(
    async (phoneNumber: string, forceResend?: boolean, successCallback?: () => void) => {
      beforeRequest()
      try {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber, forceResend)
        setSMSConfirm(confirmation)
        successfulRequest()
        successCallback?.()
      } catch (error: any) {
        erroneousRequest({
          title: error?.title ?? 'Phone Sign In Error',
          message: error?.message ?? 'An error occurred during phone sign in'
        })
      }
    },
    [beforeRequest, successfulRequest, erroneousRequest]
  )

  const confirmCode = useCallback(
    async (code: string) => {
      if (!smsConfirm) {
        erroneousRequest({
          title: 'Verification Error',
          message: 'No verification session found'
        })
        return
      }

      beforeRequest()
      try {
        const credential = await smsConfirm.confirm(code)
        if (!credential) {
          throw new Error('No credential returned after confirmation')
        }

        // Get token and set it in axios
        const token = await credential.user.getIdToken()
        setAxiosAuthHeader(token)

        // Call login API
        try {
          await login({ token })
          successfulRequest()
        } catch (error) {
          console.error('Error logging in to backend:', error)
          erroneousRequest({
            title: 'Backend Login Error',
            message: 'Failed to login to backend after verification'
          })
        }
      } catch (error: any) {
        erroneousRequest({
          title: error?.title ?? 'Code Verification Error',
          message: error?.message ?? 'Invalid verification code'
        })
      }
    },
    [smsConfirm, beforeRequest, successfulRequest, erroneousRequest, login]
  )

  const signOut = useCallback(async () => {
    beforeRequest()
    try {
      await auth().signOut()
      clearAxiosAuthHeader()
      successfulRequest()
    } catch (error: any) {
      erroneousRequest({
        title: error?.title ?? 'Sign Out Error',
        message: error?.message ?? 'An error occurred during sign out'
      })
    }
  }, [beforeRequest, successfulRequest, erroneousRequest])

  const clearAuthStates = useCallback(() => {
    setAuthError(null)
    setIsLoading(false)
    setSMSConfirm(null)
  }, [])

  useEffect(() => {
    auth().settings.appVerificationDisabledForTesting = __DEV__

    const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
      if (isInitializing === undefined) setIsInitializing(true)
      if (user) {
        setUser(user)
        setUserHasSignedUpBefore(true)

        // Get token and set it in axios
        const token = await user.getIdToken()
        setAxiosAuthHeader(token)

        // Call login API
        try {
          await login({ token })
        } catch (error) {
          console.error('Error logging in to backend:', error)
        }

        if (isInitializing) setIsInitializing(false)
      } else {
        setUser(null)
        clearAxiosAuthHeader()
        if (isInitializing) setIsInitializing(undefined)
      }
    }

    const subscriber = auth().onUserChanged(onAuthStateChanged)
    return subscriber
  }, [])

  const value = {
    user,
    isInitializing,
    isLoading,
    authError,
    signInWithPhoneNumber,
    confirmCode,
    signOut,
    getFirebaseIDToken,
    clearAuthStates,
    userHasSignedUpBefore,
    setFirebaseTokenAsAxiosAuthToken
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
