import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { View, Text, TouchableOpacity, Animated, ActivityIndicator } from 'react-native'

import { Audio } from 'expo-av'
import { MaterialIcons } from '@expo/vector-icons'
import BottomSheet from '@gorhom/bottom-sheet'
import Toast from 'react-native-toast-message'

import { NoteList, EmptyNotes } from '@components'
import { useNotes, useUpdateNoteFavorite, useUploadRecording } from '@api'
import { groupNotesBySection } from '@utils'

import { styles } from './styles'

export const Home = () => {
  const { data: notes, isLoading } = useNotes()
  const { mutate: updateFavorite } = useUpdateNoteFavorite()
  const { mutate: uploadRecording, isPending: isUploading } = useUploadRecording()
  const [recording, setRecording] = useState<Audio.Recording | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timer, setTimer] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const waveAnimation = useRef(new Animated.Value(0)).current

  const sections = useMemo(() => groupNotesBySection(notes || []), [notes])

  // Animation for audio wave
  useEffect(() => {
    if (isRecording && !isPaused) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
          }),
          Animated.timing(waveAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
          })
        ])
      ).start()
    } else {
      waveAnimation.setValue(0)
    }
  }, [isRecording, isPaused])

  // Timer management
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRecording, isPaused])

  useEffect(() => {
    return recording
      ? () => {
          recording.stopAndUnloadAsync()
        }
      : undefined
  }, [recording])

  const handleToggleFavorite = useCallback(
    (noteId: string) => {
      const note = notes?.find(note => note._id === noteId)
      if (note) {
        updateFavorite({
          id: noteId,
          data: { isFavorite: !note.isFavorite }
        })
      }
    },
    [notes, updateFavorite]
  )

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      })

      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
      setRecording(recording)
      setIsRecording(true)
      setIsPaused(false)
      setTimer(0)
      bottomSheetRef.current?.expand()
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to start recording',
        text2: err instanceof Error ? err.message : 'Unknown error occurred'
      })
    }
  }

  async function stopRecording() {
    if (!recording) return

    try {
      await recording.stopAndUnloadAsync()
      const uri = recording.getURI()
      if (!uri) throw new Error('Failed to get recording URI')

      setRecording(null)
      setIsRecording(false)
      setIsPaused(false)
      setTimer(0)
      bottomSheetRef.current?.close()

      // Upload the recording
      await uploadRecording({
        uri,
        name: `recording-${Date.now()}.m4a`
      })

      Toast.show({
        type: 'success',
        text1: 'Recording uploaded',
        text2: 'Your note will be ready soon'
      })
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to process recording',
        text2: err instanceof Error ? err.message : 'Unknown error occurred'
      })
    }
  }

  async function pauseRecording() {
    if (!recording) return

    try {
      await recording.pauseAsync()
      setIsPaused(true)
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to pause recording',
        text2: err instanceof Error ? err.message : 'Unknown error occurred'
      })
    }
  }

  async function resumeRecording() {
    if (!recording) return

    try {
      await recording.startAsync()
      setIsPaused(false)
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to resume recording',
        text2: err instanceof Error ? err.message : 'Unknown error occurred'
      })
    }
  }

  const snapPoints = useMemo(() => ['35%'], [])

  const renderBottomSheetContent = useCallback(() => {
    const waveScale = waveAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1]
    })

    return (
      <View style={styles.bottomSheetContent}>
        <Text style={styles.sheetTitle}>Recording in Progress</Text>
        <Text style={styles.timer}>{formatTime(timer)}</Text>
        <Animated.View style={[styles.waveContainer, { transform: [{ scaleY: waveScale }] }]}>
          <MaterialIcons name='graphic-eq' size={50} color='#333' />
        </Animated.View>
        <View style={styles.controlButtons}>
          {isPaused ? (
            <View style={{ gap: 30, flexDirection: 'row' }}>
              <TouchableOpacity style={[styles.roundButton, styles.cancelButton]} onPress={stopRecording}>
                <MaterialIcons name='close' size={32} color='#fff' />
              </TouchableOpacity>
              <TouchableOpacity style={styles.roundButton} onPress={resumeRecording}>
                <MaterialIcons name='play-arrow' size={32} color='#fff' />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.roundButton, styles.doneButton]} onPress={stopRecording}>
                <MaterialIcons name='check' size={32} color='#fff' />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.roundButton} onPress={pauseRecording}>
              <MaterialIcons name='pause' size={32} color='#fff' />
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }, [timer, isPaused, waveAnimation])

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size='large' />
          </View>
        ) : !notes?.length ? (
          <EmptyNotes />
        ) : (
          <NoteList sections={sections} onToggleFavorite={handleToggleFavorite} />
        )}
      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.recordButton} onPress={startRecording} disabled={isRecording || isUploading}>
          {isUploading ? <ActivityIndicator color='#fff' /> : <MaterialIcons name='mic' size={32} color='#fff' />}
        </TouchableOpacity>
      </View>
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} index={-1} style={styles.bottomSheet}>
        {renderBottomSheetContent()}
      </BottomSheet>
    </View>
  )
}
