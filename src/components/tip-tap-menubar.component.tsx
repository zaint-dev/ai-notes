import { Editor } from "@tiptap/react"
import { Bold, BoldIcon, Code, Codepen, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic, List, ListOrdered, Quote, Redo, Strikethrough, Undo } from "lucide-react"
import { Button } from "./ui/button"

type Props = {
  editor: Editor
}
export function TipTapMenubarComponent({ editor }: Props) {
  return (
    <section className="flex flex-wrap gap-1">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-gray-200 dark:bg-slate-800' : ''}
      >
        <Bold className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-gray-200 dark:bg-slate-800' : ''}
      >
        <Italic className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'bg-gray-200 dark:bg-slate-800' : ''}
      >
        <Strikethrough className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'bg-gray-200 dark:bg-slate-800' : ''}
      >
        <Code className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-slate-800' : ''}
      >
        <Heading1 className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-slate-800' : ''}
      >
        <Heading2 className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 dark:bg-slate-800' : ''}
      >
        <Heading3 className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'bg-gray-200 dark:bg-slate-800' : ''}
      >
        <Heading4 className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'bg-gray-200 dark:bg-slate-800' : ''}
      >
        <Heading5 className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'bg-gray-200 dark:bg-slate-800' : ''}
      >
        <Heading6 className="w-4 h-4" />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-slate-800' : ''}
      >
        <List className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-slate-800' : ''}
      >
        <ListOrdered className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'bg-gray-200 dark:bg-slate-800' : ''}
      >
        <Codepen className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        disabled={!editor.can().chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'bg-gray-200 dark:bg-slate-800' : ''}
      >
        <Quote className="w-4 h-4" />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo className="w-4 h-4" />
      </Button>
    </section>
  )
}