export enum WordLevel {
  Uncategorized = 'uncategorized',
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export enum PartOfSpeech {
  Noun = 'noun',
  Pronoun = 'pronoun',
  Adjective = 'adjective',
  Verb = 'verb',
  Adverb = 'adverb',
  Preposition = 'preposition',
  Article = 'article',
  Determiner = 'determiner',
  Conjunction = 'conjunction',
  Interjection = 'interjection',
}

export enum WordStudyStatus {
  Learn = "learn",
  Know = "know",
}

export interface ITranscription {
  uk: string | null;
  us: string | null;
}

export interface IMeaning {
  pos: PartOfSpeech;
  level: WordLevel;
  synonyms: string[];
  antonyms: string[];
  definition: string;
  translations: string[];
  usageExamples: string[];
}

export interface IWord {
  id: string;
  word: string;
  transcription: ITranscription;
  studyStatus: WordStudyStatus | null;
  meanings: IMeaning[];
}

export interface ICommonWord extends IWord {
  userWord: IUserWord;
}

export interface IUserWord extends IWord {
  createdAt: Date;
}

export interface IUserWordPayload extends Omit<IWord, 'id'> {
  normalizedWord: string;
}

export type WordsMode = 'commonWords' | 'userWords';

export enum Role {
  Admin = 'admin',
  User = 'user',
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}