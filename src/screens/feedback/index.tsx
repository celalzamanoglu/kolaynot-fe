import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { styles } from './styles'

type FeedbackCategory = 'bug' | 'feature' | 'improvement' | 'other'

interface CategoryOption {
  value: FeedbackCategory
  label: string
  icon: keyof typeof MaterialIcons.glyphMap
}

const categories: CategoryOption[] = [
  { value: 'bug', label: 'Hata Bildirimi', icon: 'bug-report' },
  { value: 'feature', label: 'Özellik İsteği', icon: 'lightbulb' },
  { value: 'improvement', label: 'İyileştirme Önerisi', icon: 'trending-up' },
  { value: 'other', label: 'Diğer', icon: 'more-horiz' }
]

export const Feedback = () => {
  const [category, setCategory] = useState<FeedbackCategory | null>(null)
  const [rating, setRating] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    if (!category) {
      Alert.alert('Uyarı', 'Lütfen bir kategori seçin.')
      return
    }
    if (!feedback.trim()) {
      Alert.alert('Uyarı', 'Lütfen geri bildiriminizi yazın.')
      return
    }

    // TODO: Send feedback to backend
    Alert.alert('Teşekkürler!', 'Geri bildiriminiz için teşekkür ederiz. En kısa sürede değerlendireceğiz.', [
      { text: 'Tamam', onPress: handleReset }
    ])
  }

  const handleReset = () => {
    setCategory(null)
    setRating(null)
    setFeedback('')
    setEmail('')
  }

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <MaterialIcons name={rating && star <= rating ? 'star' : 'star-border'} size={32} color='#F88909' />
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Geri Bildirim</Text>
          <Text style={styles.subtitle}>
            KolayNot'yu daha iyi hale getirmemize yardımcı olun. Görüşleriniz bizim için değerli!
          </Text>

          <Text style={styles.sectionTitle}>Kategori</Text>
          <View style={styles.categoriesContainer}>
            {categories.map(item => (
              <TouchableOpacity
                key={item.value}
                style={[styles.categoryButton, category === item.value && styles.categoryButtonSelected]}
                onPress={() => setCategory(item.value)}
              >
                <MaterialIcons name={item.icon} size={24} color={category === item.value ? '#fff' : '#666'} />
                <Text style={[styles.categoryButtonText, category === item.value && styles.categoryButtonTextSelected]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Memnuniyet Dereceniz</Text>
          {renderStars()}

          <Text style={styles.sectionTitle}>Geri Bildiriminiz</Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={6}
            placeholder='Lütfen geri bildiriminizi buraya yazın...'
            value={feedback}
            onChangeText={setFeedback}
            textAlignVertical='top'
          />

          <Text style={styles.sectionTitle}>İletişim (İsteğe Bağlı)</Text>
          <TextInput
            style={styles.emailInput}
            placeholder='E-posta adresiniz'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <Text style={styles.hint}>Size geri dönüş yapabilmemiz için e-posta adresinizi paylaşabilirsiniz.</Text>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Gönder</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
