'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { useEffect, useMemo, useRef, useState } from 'react'
import { TipTapMenubarComponent } from './tip-tap-menubar.component'
import { Button } from './ui/button'
import { useDebounce } from '@/lib/useDebounce'
import { useMutation } from '@tanstack/react-query'
import { NoteType } from '@/lib/db/schema'
import { Loader2 } from 'lucide-react'
import Text from '@tiptap/extension-text'
import { useCompletion } from 'ai/react'
import { Separator } from './ui/separator'

type Props = {
  note: NoteType
}

export default function TipTapEditorComponent({ note }: Props) {
  const [editorContent, setEditorContent] = useState(note.editorState || `<h1>${note.name}</h1>`)
  const { complete, completion } = useCompletion({
    api: '/api/completion'
  })

  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/save-note', {
        method: 'POST',
        body: JSON.stringify({
          editorContent: editorContent,
          noteId: note.id
        })
      })
    }
  })

  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        'Shift-a': () => {
          console.log(" AI Completion")
          const prompt = this.editor.getText().split(' ').slice(-30).join(' ')
          complete(prompt)
          return true
        },
      }
    },
  })

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorContent,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML())
    }
  })

  const lastCompletion = useRef('')
  useEffect(() => {
    if (!completion || !editor) return
    const diff = completion.slice(lastCompletion.current.length)
    lastCompletion.current = completion
    editor.commands.insertContent(diff)
  }, [completion, editor])

  const debounceEditorContent = useDebounce(editorContent, 2000)
  useEffect(() => {
    if (debounceEditorContent === '') return
    saveNote.mutate(undefined, {
      onSuccess: () => {
        console.log('Note saved')
      },
      onError: () => {
        console.log('Note save failed')
      }
    })
  }, [debounceEditorContent])

  return (
    <section className='flex flex-col'>
      <article className='flex gap-2 items-center'>
        {editor && <TipTapMenubarComponent editor={editor} />}
        <Button size="sm" disabled={saveNote.isLoading}>
          {saveNote.isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </article>
      <article className='prose prose-md dark:prose-invert w-full mt-4'>
        <EditorContent editor={editor} />
      </article>
      <Separator />
      <span className='text-sm mt-4'>
        Tip: Press {"  "}
        <kbd className='px-2 py-1.5 text-xs font-bold dark:text-muted-foreground bg-black text-white dark:bg-gray-100 dark:border dark:border-gray-200 rounded-lg'>Shift + A</kbd>
        {"  "} to use AI completion
      </span>
    </section>
  )

}