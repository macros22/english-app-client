export enum WordLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
  UNCATEGORIZED = 'uncategorized',
}

export enum WordStudyStatus {
  LEARN = "learn",
  KNOW = "know",
}
export interface IUsageExample {
  sentence: string;
  translation: string;
}

export interface ITranscription {
  uk: string | null;
  us: string | null;
}

export interface IWord {
  id: string;
  word: string;
  level: WordLevel;
  synonyms: string[];
  antonyms: string[];
  transcription: ITranscription;
  translations: string[];
  definitions: string[];
  usageExamples: IUsageExample[];
  studyStatus: WordStudyStatus | null;
}

export interface ICommonWord extends IWord {
  userWord: IUserWord;
}

export interface IUserWord extends IWord {
  createdAt: Date;
}

export interface IUserWordPayload extends Omit<IWord, 'id'> {
}

export type WordsMode = 'commonWords' | 'userWords';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}