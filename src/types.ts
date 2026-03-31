export interface Slide {
  id: string;
  title: string;
  content: string[];
  pageNumber?: string;
}

export interface StudyContent {
  subject: string;
  topics: Slide[];
}
