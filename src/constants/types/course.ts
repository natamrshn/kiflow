
interface BaseSlide {
    id: number | string;
    type: 'content' | 'video' | 'quiz' | 'ai' | 'completion' | 'text' | 'dashboard';
    title?: string;
  }
  
  export interface TextSlide extends BaseSlide {
    type: 'text';
    title: string;
    content: string;
  }

export interface VideoSlide extends BaseSlide {
    type: 'video';
    video: {
      uri?: string | null;
      mux?: string | null;
    };
  }
  
  export interface ContentSlide extends BaseSlide {
    type: 'content';
    title: string;
    mainPoint: string;
    tips: string[];
    example: string;
  }
  
  export interface QuizSlide extends BaseSlide {
    type: 'quiz';
    title: string;
    quiz: {
      question: string;
      options: string[];
      correctAnswer: number;
    };
  }
  
  export interface AiSlide extends BaseSlide {
    type: 'ai';
    title: string;
    prompt: string;
  }
  
  export interface CompletionSlide extends BaseSlide {
    type: 'completion';
    title: string;
    subtitle: string;
    backgroundColor: string;
    completion: {
      message: string;
      stats: {
        label: string;
        value: string;
      }[];
    };
  }
  
  export interface DashboardSlide extends BaseSlide {
    type: 'dashboard';
    title: string;
    prompt: string;
  }


export type Slide =
  | VideoSlide
  | ContentSlide
  | QuizSlide
  | AiSlide
  | CompletionSlide
  | DashboardSlide
  | TextSlide;

export interface Course {
  id: string;
  title: string;
  description?: string;
  instructor: string;
  image: string;
  is_public: boolean;
  code: string;
  contact_email: string;
}

export interface CourseSelectionProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  selectedCourseId?: string;
  onRefresh?: () => Promise<void>;
}