import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'
import { Audio, AVPlaybackStatus } from 'expo-av'
import Slider from '@react-native-community/slider'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import Toast from 'react-native-toast-message'

import { RootStackParamList } from '@types'
import { useRecordingAudio } from '@api'

import { styles } from './styles'

type NoteScreenProps = NativeStackScreenProps<RootStackParamList, 'Note'>

export const Note = ({ route }: NoteScreenProps) => {
  const { note } = route.params
  const { data: audioData } = useRecordingAudio(note.recordingId)
  const [title, setTitle] = useState(note.title)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'transcript' | 'notes'>('transcript')
  const [isPlaying, setIsPlaying] = useState(false)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const soundRef = useRef<Audio.Sound | null>(null)

  // Cleanup sound on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync()
      }
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${day}.${month}.${year} ${hours}:${minutes}`
  }

  const handleTitleConfirm = () => {
    // TODO: Save title to backend
    setIsEditingTitle(false)
  }

  const handlePlayPause = async () => {
    try {
      if (!soundRef.current) {
        if (!audioData?.url) {
          throw new Error('Audio URL not available')
        }

        // Create sound object with signed URL
        const { sound } = await Audio.Sound.createAsync(
          { uri: audioData.url },
          { shouldPlay: true },
          onPlaybackStatusUpdate
        )
        soundRef.current = sound
        setIsPlaying(true)
      } else {
        if (isPlaying) {
          await soundRef.current.pauseAsync()
          setIsPlaying(false)
        } else {
          await soundRef.current.playAsync()
          setIsPlaying(true)
        }
      }
    } catch (error) {
      console.error('Error playing audio:', error)
      Toast.show({
        type: 'error',
        text1: 'Failed to play audio',
        text2: error instanceof Error ? error.message : 'Unknown error occurred'
      })
    }
  }

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return

    setPosition(status.positionMillis / 1000)
    setDuration(status.durationMillis ? status.durationMillis / 1000 : 0)

    if (status.didJustFinish) {
      setIsPlaying(false)
      setPosition(0)
    }
  }

  const handleSeek = async (value: number) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(value * 1000)
      setPosition(value)
    }
  }

  const handleSkip = async (seconds: number) => {
    if (soundRef.current) {
      const newPosition = Math.max(0, Math.min(position + seconds, duration))
      await soundRef.current.setPositionAsync(newPosition * 1000)
      setPosition(newPosition)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titleSection}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {isEditingTitle ? (
              <>
                <TextInput style={styles.titleInput} value={title} onChangeText={setTitle} autoFocus />
                <TouchableOpacity style={styles.confirmButton} onPress={handleTitleConfirm}>
                  <MaterialIcons name='check' size={24} color='#34C759' />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.title} numberOfLines={1}>
                  {title}
                </Text>
                <TouchableOpacity onPress={() => setIsEditingTitle(true)}>
                  <MaterialIcons name='edit' size={24} color='#666' />
                </TouchableOpacity>
              </>
            )}
          </View>
          <Text style={styles.dateText}>{formatDate(note.updatedAt)}</Text>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'transcript' && styles.selectedTab]}
          onPress={() => setSelectedTab('transcript')}
        >
          <Text style={[styles.tabText, selectedTab === 'transcript' && styles.selectedTabText]}>Transkript</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'notes' && styles.selectedTab]}
          onPress={() => setSelectedTab('notes')}
        >
          <Text style={[styles.tabText, selectedTab === 'notes' && styles.selectedTabText]}>Notlar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.content}>{selectedTab === 'transcript' ? note.transcription : note.summary}</Text>
        </ScrollView>
      </View>

      <View style={styles.playerContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onValueChange={handleSeek}
          minimumTrackTintColor='#F88909'
          maximumTrackTintColor='#ddd'
          thumbTintColor='#F88909'
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={() => handleSkip(-15)}>
            <MaterialIcons name='replay-5' size={32} color='#333' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
            <MaterialIcons name={isPlaying ? 'pause' : 'play-arrow'} size={40} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={() => handleSkip(15)}>
            <MaterialIcons name='forward-5' size={32} color='#333' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
