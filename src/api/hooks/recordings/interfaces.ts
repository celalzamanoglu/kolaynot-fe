export interface Recording {
  _id: string;
  userId: string;
  bucketPath: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
  noteId?: string;
  createdAt: string;
  updatedAt: string;
} 