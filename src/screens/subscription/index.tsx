import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const Subscription = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Abonelik</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    color: '#333'
  }
})
