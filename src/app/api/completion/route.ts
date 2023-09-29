import { NextRequest } from "next/server";
import { OpenAIApi, Configuration } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'


const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: "system",
        content: `Eres una IA dentro de un editor de texto de notion, tu objetivo es ayudar a los usuarios a autocompletar sus notas.
        Las caracteristicas de la AI incluyen que es exporto en el tema y muy util, es siempre amigable y completa las frases de manera detallada.`
      }, 
      {
        role: "user",
        content: `Estoy escribiendo una nota en un editor de texto como notion.
        Me puedes ayudar a completar la nota continuando desde aqui: ##${prompt}## manten el tono del texto
        consistente y no te salgas del tema.`
      }
    ],
    stream: true
  });
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}