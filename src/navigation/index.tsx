import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { Home, Favorites, Note, Subscription, Feedback, TermsAndPrivacy, LoginScreen, VerifyScreen } from '@screens'
import { Header } from '@components'
import type { RootStackParamList } from '@types'
import { useAuthGuard } from '@hooks'

const Stack = createNativeStackNavigator<RootStackParamList>()

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size='large' />
  </View>
)

export const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuthGuard()

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaProvider>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ route, navigation }) => ({
            header: () => (
              <Header
                navigation={navigation}
                isHomeScreen={route.name === 'Home'}
                currentScreen={route.name as keyof RootStackParamList}
              />
            ),
            contentStyle: { backgroundColor: '#fff' }
          })}
        >
          {!isAuthenticated ? (
            // Auth screens
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name='Login' component={LoginScreen} />
              <Stack.Screen name='Verify' component={VerifyScreen} />
            </Stack.Group>
          ) : (
            // Protected screens
            <Stack.Group>
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen name='Favorites' component={Favorites} />
              <Stack.Screen name='Note' component={Note} />
              <Stack.Screen name='Subscription' component={Subscription} />
              <Stack.Screen name='Feedback' component={Feedback} />
              <Stack.Screen name='TermsAndPrivacy' component={TermsAndPrivacy} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
