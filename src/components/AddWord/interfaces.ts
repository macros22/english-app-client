export interface IUsageExample {
	sentence: string;
	translation: string;
}

export interface IFormValues {
	word: string;
	transcription: string;
	translation: string;
	studyStatus: string;
	usageExamples: IUsageExample[];
}

