import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'

import { LLMChain } from 'langchain/chains'

export const findCurseWordsTimestamp = async ({ srt_content }: { srt_content: string }) => {
	try {
		console.log('Creating Script...')

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
         
        `

		const prompt = PromptTemplate.fromTemplate(findCurseWordsPrompt)

		const formattedPrompt = await prompt.format({
			srt_content,
		})

		// console.log('Prompt: ', formattedPrompt)

		const res = await model.invoke(formattedPrompt)

		console.log('res: ', res)

		return

		const chain = new LLMChain({ llm: model, prompt })

		// if (!JSON.parse(res.text).script) throw new Error('Error in Script not generated')

		// // console.log('Script: ', JSON.parse(res.text))

		// return JSON.parse(res.text).script
	} catch (error) {
		console.log('Error in createShortScript: ', error)
	}
}
// export const summarizeShortScript = async ({ script }: { script: string }) => {
// 	try {
// 		console.log('Script...')

// 		const model = new OpenAI({
// 			openAIApiKey: process.env.OPENAI_API,
// 			temperature: 0.1,
// 			modelName: 'gpt-4',
// 		})

// 		const prompt = PromptTemplate.fromTemplate(summary)

// 		// console.log('Prompt: ', prompt)

// 		const chain = new LLMChain({ llm: model, prompt })

// 		const res = await chain.call({ script })

// 		if (!JSON.parse(res.text).script) throw new Error('Error in Script not generated')

// 		// console.log('Script: ', JSON.parse(res.text))

// 		return JSON.parse(res.text).script
// 	} catch (error) {
// 		console.log('Error in createShortScript: ', error)
// 	}
// }
