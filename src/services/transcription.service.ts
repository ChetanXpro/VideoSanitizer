import path from 'path'
import { nodewhisper } from 'nodejs-whisper'

// Need to provide exact path to your audio file.
export const createTranscription = async (filePath: string) => {
	return await nodewhisper(filePath, {
		modelName: 'tiny.en', //Downloaded models name
		autoDownloadModelName: 'tiny.en', // (optional) autodownload a model if model is not present
		whisperOptions: {
			outputInText: false, // get output result in txt file
			outputInVtt: false, // get output result in vtt file
			outputInSrt: true, // get output result in srt file
			outputInCsv: false, // get output result in csv file
			translateToEnglish: false, //translate from source language to english
			wordTimestamps: true, // Word-level timestamps
			// amount of dialogue per timestamp pair
			splitOnWord: true, //split on word rather than on token
		},
	})
}
