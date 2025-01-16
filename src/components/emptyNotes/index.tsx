import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export const EmptyNotes: React.FC = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name='mic' size={80} color='#E5E5E5' />
      <Text style={styles.title}>Henüz Not Yok</Text>
      <Text style={styles.description}>Alttaki kayıt butonunu kullanarak ilk ses notunuzu oluşturabilirsiniz.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
    color: '#333'
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
    maxWidth: '80%'
  }
})
