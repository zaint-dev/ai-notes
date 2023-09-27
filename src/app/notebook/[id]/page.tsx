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
      <article className="flex justify-between items-center shadow-lg rounded-lg">
        <article className="flex gap-x-4 items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ChevronLeft strokeWidth={4} />
            </Button>
          </Link>
          <p className="text-xl flex gap-x-2">
            <span className="font-bold">{user.username}</span> / <p className="text-muted-foreground">{note.name}</p>
          </p>
        </article>
        <Button variant="outline">
          <Trash2 />
        </Button>
      </article>
      <img src={note.imageUrl} alt="" className="w-48 h-48" />
    </section>
  )
}