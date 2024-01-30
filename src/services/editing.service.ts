import ffmpeg from 'fluent-ffmpeg'

interface ICurseWord {
	start: string
	end: string
}
interface Interval {
	start: number
	end: number
}

export const addBeepToVideo = async ({
	curseWordList,
	videoPath,
	editedVideoSavePath,
	beepAudioPath,
}: {
	curseWordList: ICurseWord[]
	videoPath: string
	editedVideoSavePath: string
	beepAudioPath: string
}) => {
	console.log('Censoring video...')

	const filters: string[] = []
	let padding = 0.1

	let lastEnd = 0

	function timestampToSeconds(timestamp: string): number {
		const [hours, minutes, secondsWithMillis] = timestamp.split(':')
		const [seconds, milliseconds] = secondsWithMillis.split(',')

		const totalSeconds =
			parseInt(hours, 10) * 3600 +
			parseInt(minutes, 10) * 60 +
			parseInt(seconds, 10) +
			parseFloat(`0.${milliseconds}`)

		return totalSeconds
	}

	return new Promise((resolve, reject) => {
		curseWordList.forEach((interval: ICurseWord, index: number) => {
			const start = timestampToSeconds(interval.start) - padding
			const end = timestampToSeconds(interval.end) + padding

			// Audio before beep
			filters.push(`[0:a]atrim=${lastEnd}:${start},asetpts=PTS-STARTPTS[a${index}pre]`)
			// Beep
			filters.push(`[1:a]atrim=0:${end - start},asetpts=PTS-STARTPTS,volume=0.2[a${index}beep]`)

			lastEnd = end
		})

		// Audio after last beep
		filters.push(`[0:a]atrim=${lastEnd},asetpts=PTS-STARTPTS[afinal]`)

		// Construct the streams together
		const audioStreams = curseWordList.map((_: unknown, index: number) => `[a${index}pre][a${index}beep]`).join('')
		filters.push(`${audioStreams}[afinal]concat=n=${2 * curseWordList.length + 1}:v=0:a=1[outa]`)

		ffmpeg(videoPath)
			.input(beepAudioPath)
			.complexFilter([...filters, '[0:v]copy[outv]'], ['[outv]', '[outa]'])
			.on('end', () => {
				console.log('Censorship done! , check the output video file here', editedVideoSavePath)
				resolve('done')
			})
			.on('error', err => {
				console.error('Error:', err)
				reject(err)
			})
			.toFormat('mp4')
			.save(editedVideoSavePath)
	})
}
