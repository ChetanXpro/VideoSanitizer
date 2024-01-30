import { OpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'

export const findCurseWordsTimestamp = async ({ srt_content }: { srt_content: string }) => {
	try {
		console.log('Finding curse words...')

		const model = new OpenAI({
			openAIApiKey: process.env.OPENAI_API,
			temperature: 0.7,
			modelName: 'gpt-3.5-turbo-0301',
		})

		const findCurseWordsPrompt = ` 
         You are a video moderator. you will receive a .srt file content of a video. and you have to check if there are any curse words in the video. if there are any curse words then you have return exact timestamp of the curse word. so that i can add a beep sound in those timestamp.
         .srt file content is determined by three hashtags:
            ###
            {srt_content}
            ###
        
        !!!! Please note that you have to return timestamp of the curse word. not the curse word itself. !!!!
        !!!! Important: You have to return result in a parsable json format. !!!!

        Example: an object with curse_words array. each element of curse_words array will have a object with key "start" and "end" with timestamp of the censor word.
            
         
        `

		const prompt = PromptTemplate.fromTemplate(findCurseWordsPrompt)

		const formattedPrompt = await prompt.format({
			srt_content,
		})

		// console.log('Prompt: ', formattedPrompt)

		const res = (await model.invoke(formattedPrompt)) as any

		console.log('Curse words found at: ', JSON.parse(res).curse_words)

		return JSON.parse(res).curse_words
	} catch (error) {
		console.log('Error in LLm call: ', error)
	}
}
