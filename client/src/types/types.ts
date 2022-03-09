
export enum wordStatusType {
    LEARN = 'learn',
    KNOW = 'know',
    UNKNOWN = 'unknown',
  }
  
  export type WordType = {
    id: number;
    eng: string;
    transcription: string;
    rus: string[];
    status: wordStatusType;
    timeStamp: Date;
  }
  
