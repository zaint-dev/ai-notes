'use client'
import Typewriter from 'typewriter-effect'
import GraphemeSplitter from "grapheme-splitter";

type Props = {}

function stringSplitter(str: string): string {
  const splitter = new GraphemeSplitter();
  return splitter.splitGraphemes(str);
}


const TypeWriterComponet = (props: Props) => {
  
  return (
    <Typewriter
      options={{
        loop: true,
        stringSplitter: (text: string) => stringSplitter(text),
      }}
      onInit={(typewriter) => {
        typewriter.typeString("🚀 Supercharger Productivity.")
        .pauseFor(1000)
        .deleteAll()
        .typeString("🔥 Take Notes with Ease.")
        .pauseFor(1000)
        .deleteAll()
        .typeString("😎 AI-Powered Insights.")
        .pauseFor(1000)
        .deleteAll()
        .start()
      }}
    />
  )
}


export default TypeWriterComponet