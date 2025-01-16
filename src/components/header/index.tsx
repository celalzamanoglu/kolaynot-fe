import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Pressable, Modal, Share } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { styles } from './styles'
import type { RootStackParamList } from '@types'
import { useAuth } from '@contexts'

interface HeaderProps {
  navigation: NativeStackNavigationProp<RootStackParamList>
  isHomeScreen?: boolean
  currentScreen?: keyof RootStackParamList
}

interface MenuItem {
  icon: keyof typeof MaterialIcons.glyphMap
  label: string
  onPress: () => void
}

export const Header: React.FC<HeaderProps> = ({ navigation, isHomeScreen = true, currentScreen }) => {
  const insets = useSafeAreaInsets()
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const { signOut } = useAuth()

  const handleShare = async () => {
    try {
      await Share.share({
        message: "KolayNot'tan bu ses notunu dinleyin!"
      })
    } catch (error) {
      console.error('Paylaşım hatası:', error)
    }
  }

  const menuItems: MenuItem[] = [
    {
      icon: 'workspace-premium',
      label: 'Abonelik',
      onPress: () => {
        setIsMenuVisible(false)
        navigation.navigate('Subscription')
      }
    },
    {
      icon: 'feedback',
      label: 'Geri Bildirim',
      onPress: () => {
        setIsMenuVisible(false)
        navigation.navigate('Feedback')
      }
    },
    {
      icon: 'description',
      label: 'Şartlar ve Gizlilik',
      onPress: () => {
        setIsMenuVisible(false)
        navigation.navigate('TermsAndPrivacy')
      }
    },
    {
      icon: 'logout',
      label: 'Çıkış Yap',
      onPress: () => {
        setIsMenuVisible(false)
        signOut()
      }
    }
  ]

  const renderRightButton = () => {
    switch (currentScreen) {
      case 'Note':
        return (
          <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
            <MaterialIcons name='share' size={24} color='#F88909' />
          </TouchableOpacity>
        )
      case 'Home':
        return (
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Favorites')}>
            <MaterialIcons name='favorite' size={24} color='#F88909' />
          </TouchableOpacity>
        )
      default:
        return null
    }
  }

  return (
    <>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.leftSection}>
          {!isHomeScreen ? (
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <MaterialIcons name='arrow-back-ios' size={24} color='#333' />
              <Text style={styles.backText}>Geri</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.title}>KolayNot</Text>
          )}
        </View>
        <View style={styles.rightButtons}>
          {renderRightButton()}
          <TouchableOpacity style={styles.iconButton} onPress={() => setIsMenuVisible(true)}>
            <MaterialIcons name='more-horiz' size={24} color='#F88909' />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={isMenuVisible} transparent animationType='fade' onRequestClose={() => setIsMenuVisible(false)}>
        <Pressable style={{ flex: 1 }} onPress={() => setIsMenuVisible(false)}>
          <View style={[styles.dropdownContainer, { marginTop: insets.top }]}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
                <Text style={styles.menuItemText}>{item.label}</Text>
                <MaterialIcons name={item.icon} size={20} color='#F88909' />
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  )
}
