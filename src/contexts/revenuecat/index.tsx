import React, { createContext, useContext, useEffect } from 'react'
import Purchases from 'react-native-purchases'
import { Platform } from 'react-native'
import { useAuth } from '../auth'
import { useCurrentUser } from '@api'

interface RevenueCatContextType {
  isInitialized: boolean
}

const RevenueCatContext = createContext<RevenueCatContextType | undefined>(undefined)

// Use different API keys for iOS and Android
const REVENUECAT_API_KEY = Platform.select({
  ios: 'appl_rbXnLvmVNLHCVHgXsQvGlofpxTU',
  android: 'goog_ESWiUhdacFXbOaGyIaErvBLLtiV',
  default: 'appl_rbXnLvmVNLHCVHgXsQvGlofpxTU'
})

export const RevenueCatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: firebaseUser } = useAuth()
  const { data: backendUser } = useCurrentUser()
  const [isInitialized, setIsInitialized] = React.useState(false)

  useEffect(() => {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG)
    console.log('RevenueCat Provider State:', {
      platform: Platform.OS,
      firebaseUid: firebaseUser?.uid,
      backendUser: backendUser
        ? {
            appUserId: backendUser.appUserId,
            firebaseUid: backendUser.firebaseUid
          }
        : null,
      isInitialized
    })

    if (backendUser?.appUserId) {
      try {
        console.log('Configuring RevenueCat with:', {
          apiKey: REVENUECAT_API_KEY,
          appUserId: backendUser.appUserId
        })

        // Initialize with the backend-provided appUserId
        Purchases.configure({
          apiKey: REVENUECAT_API_KEY,
          appUserID: backendUser.appUserId
        })

        console.log('RevenueCat configured successfully')
        setIsInitialized(true)
      } catch (error) {
        console.error('Error configuring RevenueCat:', error)
      }
    }
  }, [backendUser?.appUserId, firebaseUser?.uid])

  const value = {
    isInitialized
  }

  return <RevenueCatContext.Provider value={value}>{children}</RevenueCatContext.Provider>
}

export const useRevenueCat = () => {
  const context = useContext(RevenueCatContext)
  if (context === undefined) {
    throw new Error('useRevenueCat must be used within a RevenueCatProvider')
  }
  return context
}
