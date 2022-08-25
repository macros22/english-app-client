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
  transcription?: string;
  translations?: string[];
  definitions?: string[];
  usageExamples?: IUsageExample[];
  studyStatus: WordStudyStatus;
}


export interface ICommonWord {
  commonWord: IWord;
  userStudyStatus: WordStudyStatus;
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