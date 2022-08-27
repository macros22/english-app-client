export enum WordStudyStatus {
  LEARN = "learn",
  KNOW = "know",
}
export interface IUsageExample {
  sentence: string;
  translation: string;
}

export interface ITranscription {
  uk: string;
  us: string;
}

export interface IWord {
  id: string;
  word: string;
  transcription?: ITranscription;
  translations?: string[];
  definitions?: string[];
  usageExamples?: IUsageExample[];
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