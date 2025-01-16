import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../types/navigation'
import { styles } from './styles'
import { useAuth } from '../../contexts/auth'

type Props = NativeStackScreenProps<RootStackParamList, 'Verify'>

export const VerifyScreen: React.FC<Props> = () => {
  const [code, setCode] = useState('')
  const { confirmCode, isLoading, authError } = useAuth()

  useEffect(() => {
    if (authError) {
      Alert.alert(authError.title, authError.message)
    }
  }, [authError])

  const handleVerify = async () => {
    if (!code.trim()) {
      Alert.alert('Hata', 'Lütfen doğrulama kodunu girin.')
      return
    }

    await confirmCode(code)
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Doğrulama</Text>
        <Text style={styles.subtitle}>Telefonunuza gönderilen 6 haneli kodu girin</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Doğrulama kodu'
            keyboardType='number-pad'
            value={code}
            onChangeText={setCode}
            editable={!isLoading}
            maxLength={6}
            autoComplete='sms-otp'
            textContentType='oneTimeCode'
          />

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleVerify}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>{isLoading ? 'Doğrulanıyor...' : 'Doğrula'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
