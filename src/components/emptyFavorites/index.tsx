import React from 'react'
import { View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { styles } from './styles'

export const EmptyFavorites = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name='favorite' size={80} color='#E5E5E5' />
      <Text style={styles.title}>Favori notunuz yok</Text>
      <Text style={styles.description}>
        Notlarınızı favorilere eklemek için anasayfadaki notlarınızın yanındaki kalp ikonuna dokunabilirsiniz.
      </Text>
    </View>
  )
}
