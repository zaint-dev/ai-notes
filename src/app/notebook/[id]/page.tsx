import { ModeToggle } from "@/components/mode-toggle"
import TipTapEditorComponent from "@/components/tip-tap-editor.component"
import { Button } from "@/components/ui/button"
import { clerk } from "@/lib/clerk-server"
import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { auth } from "@clerk/nextjs"
import { and, eq } from "drizzle-orm"
import { ChevronLeft, DeleteIcon, Trash2 } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

type Props = {
  params: {
    id: string
  }
}

export default async function NotebookDetailPage({ params: { id } }: Props) {
  const { userId } = await auth()
  const user = await clerk.users.getUser(userId!)
  const notes = await db.select().from($notes)
    .where(
      and(
        eq($notes.id, parseInt(id)),
        eq($notes.userId, userId!)
      )
    )

  if (notes.length !== 1)
    return redirect('/notebooks')
  const note = notes[0]
  return (
    <section className="flex flex-col container w-full min-h-screen mx-auto p-8">
      <article className="flex justify-between items-center shadow-lg rounded-lg p-2 dark:bg-slate-900 bg-stone-100">
        <article className="flex gap-x-4 items-center">
          <Link href="/dashboard">
            <Button variant="secondary" size="icon">
              <ChevronLeft strokeWidth={4} />
            </Button>
          </Link>
          <p className="text-xl flex gap-x-2">
            <span className="font-bold">{user.username}</span> / <p className="text-muted-foreground">{note.name}</p>
          </p>
        </article>
        <article className="flex items-center gap-x-2">
          <Button variant="ghost">
            <Trash2 />
          </Button>
          <ModeToggle />
        </article>
      </article>

      {/* Editor */}
      <article className="flex flex-col gap-y-4 mt-8 shadow-lg rounded-lg p-4 dark:bg-slate-900">
        <TipTapEditorComponent note={note}/>
      </article>

    </section>
  )
}