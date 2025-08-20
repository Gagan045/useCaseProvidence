
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  bio: string;
  availability: Record<string, string[]>;
}

export interface Appointment {
  id: string;
  doctor: Doctor;
  date: string;
  time: string;
  reason: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

export interface MedicalRecord {
  id: string;
  fileName: string;
  fileType: 'PDF' | 'Image' | 'Report';
  uploadDate: string;
  size: string;
}

export interface AITopicSuggestion {
    icon: React.ComponentType<{className?: string}>;
    title: string;
    prompt: string;
}
