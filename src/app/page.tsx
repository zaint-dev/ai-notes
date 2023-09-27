import TypeWriter from '@/components/type-writer.component'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='w-full min-h-screen from-rose-100 to-teal-100'>
      <section className='flex flex-col h-screen grid-cols-1 justify-center items-center'>
        <h1 className='font-semibold text-7xl text-center'>AI <span className='text-teal-600 font-bold'>note taking</span> assistant.</h1>
        <div className="mt-4">
          <h2 className='font-semibold text-3xl text-center text-slate-700'>
            <TypeWriter />
          </h2>
        </div>
        <Link href='/dashboard'>
          <Button className='mt-8'>
            Get started
            <ArrowRight className='ml-2 w-5 h-5' strokeWidth={3} />
          </Button>
        </Link>
      </section>
    </main>
  )
}
