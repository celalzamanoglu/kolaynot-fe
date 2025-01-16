import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { styles } from './styles'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../types/navigation'
import { useAuth } from '../../contexts/auth'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const { signInWithPhoneNumber, isLoading, authError } = useAuth()
  console.log('login screen rendered')

  useEffect(() => {
    if (authError) {
      Alert.alert(authError.title, authError.message)
    }
  }, [authError])

  const handleSignIn = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Hata', 'Lütfen telefon numaranızı girin.')
      return
    }

    await signInWithPhoneNumber(phoneNumber, false, () => {
      navigation.navigate('Verify')
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>KolayNot</Text>
        <Text style={styles.subtitle}>Toplantılarınızı kaydedin, özetleyin ve organize edin</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Telefon numarası'
            keyboardType='phone-pad'
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            editable={!isLoading}
            autoComplete='tel'
            textContentType='telephoneNumber'
          />

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>{isLoading ? 'Gönderiliyor...' : 'Giriş Yap'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
