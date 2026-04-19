export interface Machine {
  id: string;
  name: string;
  category: 'Pernas' | 'Peito' | 'Costas' | 'Ombros' | 'Braços' | 'Abdômen' | 'Cardio';
  description: string;
  muscles: string[];
  steps: string[];
  commonErrors: string[];
  tip: string;
  imageUrl: string;
  videoUrl?: string;
  isLearned?: boolean;
}

export interface User {
  name: string;
  email: string;
  progress: number;
  learnedCount: number;
}
