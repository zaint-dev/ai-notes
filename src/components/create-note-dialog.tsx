'use client'
import { Loader2, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function CreateNoteDIalog() {
  const [name, setName] = useState('')
  const router = useRouter()

  const createNotebook = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/notebooks', {
        method: 'POST',
        body: JSON.stringify({ name })
      })
      const data = await response.json()
      return data
    }
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name === '') return
    const notebook = await createNotebook.mutate(undefined, {
      onSuccess: ({ noteId }) => {
        console.log("created new note", noteId)
        router.push(`/notebook/${noteId}`)
      },
      onError: () => {
        console.log('Notebook creation failed')
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger>
        <article className="border-dashed flex border-2 border-teal-600 h-full rounded-lg items-center justify-center
         sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4">
          <PlusIcon className="text-teal-600" size={48} strokeWidth={3} />
          <h2 className="font-semibold text-teal-600 sm:mt-2">New Note Book</h2>
        </article>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Note
          </DialogTitle>
          <DialogDescription>
            Here you can create a new note with automatic image generator.
          </DialogDescription>
        </DialogHeader>
        <form className="flex-col gap-y-4" onSubmit={handleSubmit}>
          <Input placeholder="Name..." value={name} onChange={(event) => setName(event.target.value)} />
          <article className="flex gap-x-2 justify-end mt-4">
            <Button type="submit" disabled={createNotebook.isLoading}>
              {createNotebook.isLoading &&  <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
            <Button variant="outline">Cancel</Button>
          </article>
        </form>


      </DialogContent>
    </Dialog>
  )
}