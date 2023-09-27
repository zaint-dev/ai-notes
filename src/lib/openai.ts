import { Configuration, OpenAIApi } from 'openai-edge'

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)


export async function generateImagePrompt(name: string) {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: "system",
          content: "You are a creative and helpfull AI assistance capable of generating interesting description for my notes. Your output will be fed into the DALL-E API to generate thumbnail. The description should be minimalistic."
        },
        {
          role: "user",
          content: `Please generate a thumbnail description for my notebook title ${name}`
        }
      ]
    })
    const data = await response.json()
    const image_description = data.choices[0].message.content
    return image_description as string
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function generateImage(prompt: string) {
  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '256x256',
    })
    const data = await response.json()
    const imageUrl = data.data[0].url
    console.log(imageUrl)
    return imageUrl as string
  } catch (error) {
    console.log(error)
    throw error
  }
}