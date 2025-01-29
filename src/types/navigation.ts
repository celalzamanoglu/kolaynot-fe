import { Note } from './index'

// Serializable version of Note for navigation
export type SerializableNote = Omit<Note, 'updatedAt'> & {
  updatedAt: string
}

export type RootStackParamList = {
  Login: undefined
  Verify: undefined
  Home: undefined
  Favorites: undefined
  Note: {
    note: SerializableNote
  }
  Subscription: undefined
  SubscriptionTest: undefined
  Feedback: undefined
  TermsAndPrivacy: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 