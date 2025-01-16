export interface Note {
  _id: string;
  userId: string;
  title: string;
  transcription: string;
  summary: string;
  recordingId: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotesSection {
  title: string;
  data: Note[];
} 