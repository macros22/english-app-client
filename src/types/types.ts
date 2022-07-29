export enum WordStudyStatus {
  LEARN = "learn",
  KNOW = "know",
  UNKNOWN = "unknown",
}
export interface IUsageExample {
  sentence: string;
  translation: string;
}

export interface IWord {
  id: string;
  word: string;
  transcription: string;
  translations: string[];
  definitions: string[];
  usageExamples: IUsageExample[];
  studyStatus: WordStudyStatus;
}

export interface IUserWord extends IWord {
  createdAt: Date;
}

export interface IUserWordPayload extends Omit<IWord, 'id'> {
}
