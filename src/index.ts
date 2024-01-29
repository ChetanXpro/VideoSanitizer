import dotenv from 'dotenv'
import { findCurseWordsTimestamp } from './services/ai.service'
import { createTranscription } from './services/transcription.service'
dotenv.config()

interface IArgs {
	absolutePathToVideo: string
}

const run = async ({ absolutePathToVideo }: IArgs) => {
	// TODO: Create .srt for given video
	const createTranscriptionResult = await createTranscription(absolutePathToVideo)
	console.log(createTranscriptionResult)

	const srt_content = findCurseWordsTimestamp({
		srt_content: 'Yoooo',
	})

	// TODO: Check in .srt if there are any bad words , and if exist then return them
	// TODO: Create a new .srt file with bad words replaced with beep sound
	// TODO: Add new .srt to video
}

run({
	absolutePathToVideo: '/Users/chetan/Developer/code/video-scanner/sample.mp4',
})
