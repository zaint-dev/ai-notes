'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { useState } from 'react'
import { TipTapMenubarComponent } from './tip-tap-menubar.component'
import { Button } from './ui/button'
export default function TipTapEditorComponent() {
  const [editorContent, setEditorContent] = useState('')

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorContent,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML())
    }
  })

  return (
    <section className='flex flex-col'>
      <article className='flex gap-2 items-center'>
        {editor && <TipTapMenubarComponent editor={editor} />}
        <Button size="sm">
          Save
        </Button>
      </article>
      <article className='prose md:prose-lg lg:prose-xl dark:prose-invert w-full'>
        <EditorContent editor={editor} />
      </article>
    </section>
  )

}