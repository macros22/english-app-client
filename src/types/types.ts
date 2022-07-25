export enum WordStudyStatus {
  LEARN = "learn",
  KNOW = "know",
  UNKNOWN = "unknown",
}
export interface UsageExample {
  sentence: string;
  translation: string;
}

export interface Word {
  id: number;
  word: string;
  transcription: string;
  translation: string[];
  usageExamples: UsageExample[];
  studyStatus: WordStudyStatus;
}

export interface UserWord extends Word {
  createdAt: Date;
}
