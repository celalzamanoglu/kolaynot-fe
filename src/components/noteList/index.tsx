import React, { useCallback } from 'react'
import { View, Text, TouchableOpacity, SectionList } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Note, NotesSection, RootStackParamList } from '@types'

import { styles } from './styles'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

interface NoteListProps {
  sections: NotesSection[]
  onToggleFavorite?: (noteId: string) => void
}

export const NoteList: React.FC<NoteListProps> = ({ sections, onToggleFavorite }) => {
  const navigation = useNavigation<NavigationProp>()

  const formatNoteTime = (dateString: string) => {
    const date = new Date(dateString)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const handleNotePress = useCallback(
    (note: Note) => {
      navigation.navigate('Note', { note })
    },
    [navigation]
  )

  const renderItem = useCallback(
    ({ item }: { item: Note }) => (
      <TouchableOpacity onPress={() => handleNotePress(item)}>
        <View style={styles.noteItem}>
          <View style={styles.noteItemContent}>
            <View style={styles.noteTextContainer}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.noteContent} numberOfLines={2}>
                {item.transcription}
              </Text>
              <Text style={styles.noteTime}>{formatNoteTime(item.updatedAt)}</Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton} onPress={() => onToggleFavorite?.(item._id)}>
              <MaterialIcons name={item.isFavorite ? 'favorite' : 'favorite-border'} size={24} color='#F88909' />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [handleNotePress, onToggleFavorite]
  )

  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={({ section: { title } }) => <Text style={styles.sectionHeader}>{title}</Text>}
      stickySectionHeadersEnabled
      keyExtractor={item => item._id}
    />
  )
}
