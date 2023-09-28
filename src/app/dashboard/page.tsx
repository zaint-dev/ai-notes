import CreateNoteDialog from "@/components/create-note-dialog";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { UserButton } from "@clerk/nextjs";
import { ChevronLeft } from 'lucide-react';
import Link from "next/link";

export default async function Dashboard() {
  const notebooks = await db.select().from($notes)

  return (
    <main className="min-h-screen container mx-auto">
      <section className="flex gap-x-4 items-center justify-center mt-16">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ChevronLeft strokeWidth={4} />
          </Button>
        </Link>
        <p className="text-3xl font-bold">My Notes</p>
        <UserButton />
        <ModeToggle />
      </section>
      <Separator className="mt-8 mb-8" />

      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-8">
        <CreateNoteDialog />
        {
          notebooks.map((notebook) => (
            <Card key={notebook.id}>
              <img src={notebook.imageUrl} alt="" className="object-fill w-full aspect-auto"/>
              <CardContent>
                <p>{notebook.name}</p>
              </CardContent>
            </Card>
          ))
        }
      </section>
    </main>
  )
}