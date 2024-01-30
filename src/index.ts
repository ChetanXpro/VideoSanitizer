import dotenv from 'dotenv'
import { findCurseWordsTimestamp } from './services/ai.service'
import { createTranscription } from './services/transcription.service'

dotenv.config()
import fs from 'fs'
import { addBeepToVideo } from './services/editing.service'

interface IArgs {
	videoPath: string
	outputVideoPath: string
	beepAudioPath: string
	srtFilePath: string
}

interface ICurseWord {
	curse_word: string
	timestamp: string
}

const run = async ({ videoPath, outputVideoPath, beepAudioPath, srtFilePath }: IArgs) => {
	// Create transcription and save it to a srt file
	const createTranscriptionResult = await createTranscription(videoPath)

	const content = fs.readFileSync(srtFilePath, 'utf8')

	// Find curse words in the transcription with the help of AI
	const curseWordList: any = await findCurseWordsTimestamp({
		srt_content: content,
	})

	// Add beep to the video
	await addBeepToVideo({
		curseWordList,
		beepAudioPath: beepAudioPath,
		editedVideoSavePath: outputVideoPath,
		videoPath: videoPath,
	})
}

run({
	videoPath: '/Users/chetan/Developer/code/video-scanner/video/sample.mp4',
	beepAudioPath: '/Users/chetan/Developer/code/video-scanner/assets/bleep-censorship-sound.mp3',
	outputVideoPath: '/Users/chetan/Developer/code/video-scanner/video/censored-sample.mp4',
	srtFilePath: '/Users/chetan/Developer/code/video-scanner/video/sample.wav.srt',
})
