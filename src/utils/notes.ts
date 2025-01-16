import { Note, NotesSection } from '@types';

function getDateSection(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(today.getDate() - 7);
  const lastMonthStart = new Date(today);
  lastMonthStart.setMonth(today.getMonth() - 1);

  const noteDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (noteDate.getTime() === today.getTime()) {
    return 'Bugün';
  } else if (noteDate.getTime() === yesterday.getTime()) {
    return 'Dün';
  } else if (noteDate >= lastWeekStart && noteDate < yesterday) {
    return 'Geçen Hafta';
  } else if (noteDate >= lastMonthStart && noteDate < lastWeekStart) {
    return 'Geçen Ay';
  } else {
    return date.getFullYear().toString();
  }
}

function getSectionOrder(title: string): number {
  const orderMap: { [key: string]: number } = {
    'Bugün': 1,
    'Dün': 2,
    'Geçen Hafta': 3,
    'Geçen Ay': 4
  };
  
  return orderMap[title] || 5; // Years will have order 5
}

export function groupNotesBySection(notes: Note[]): NotesSection[] {
  if (!notes?.length) return [];

  // Group notes by section
  const notesBySection = notes.reduce<Record<string, Note[]>>((acc, note) => {
    const date = new Date(note.createdAt);
    const section = getDateSection(date);
    
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(note);
    return acc;
  }, {});

  // Sort notes within each section by date (newest first)
  Object.values(notesBySection).forEach(sectionNotes => {
    sectionNotes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  });

  // Convert to sections array and sort sections
  return Object.entries(notesBySection)
    .map(([title, data]) => ({ title, data }))
    .sort((a, b) => {
      const orderA = getSectionOrder(a.title);
      const orderB = getSectionOrder(b.title);
      
      if (orderA === orderB) {
        // If both are years, sort numerically in descending order
        return parseInt(b.title) - parseInt(a.title);
      }
      
      return orderA - orderB;
    });
} 