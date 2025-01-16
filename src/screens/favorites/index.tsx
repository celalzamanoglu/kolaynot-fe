import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import { EmptyFavorites, NoteList } from '@components'
import { useFavoriteNotes, useUpdateNoteFavorite } from '@api'
import { groupNotesBySection } from '@utils'

import { styles } from './styles'

export const Favorites = () => {
  const { data: notes, isLoading } = useFavoriteNotes()
  const { mutate: updateFavorite } = useUpdateNoteFavorite()

  // Group notes by date only, since we're already on the favorites screen
  const sections = groupNotesBySection(notes ?? [])

  const handleToggleFavorite = (noteId: string) => {
    updateFavorite({ id: noteId, data: { isFavorite: false } })
  }

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {!notes?.length ? <EmptyFavorites /> : <NoteList sections={sections} onToggleFavorite={handleToggleFavorite} />}
      </View>
    </View>
  )
}
