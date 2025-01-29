import React from 'react'
import { StyleSheet } from 'react-native'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClientProvider } from '@tanstack/react-query'

import { RootNavigator } from '@navigation'
import { AuthProvider } from '@contexts'
import { RevenueCatProvider } from '@contexts'
import { queryClient } from '@api'

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RevenueCatProvider>
            <SafeAreaProvider>
              <RootNavigator />
            </SafeAreaProvider>
          </RevenueCatProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
