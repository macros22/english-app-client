
export enum WordStudyStatus {
    LEARN = 'learn',
    KNOW = 'know',
    UNKNOWN = 'unknown',
  }

  export interface UsageExample {
    eng: string;
    rus: string;
  }
  
  export interface Word {
    id: number;
    eng: string;
    transcription: string;
    rus: string[];
    usageExamples: UsageExample[];
    studyStatus: WordStudyStatus;
  }

  export interface UserWord extends Word {
    createdAt: Date;
  }
  
