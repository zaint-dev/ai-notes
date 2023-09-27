import './globals.css'
import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"
import { dark } from '@clerk/themes';
import Providers from '@/components/provider'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Notes',
  description: 'AI Assistatnt for taking notes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <html lang="en">
        <Providers>
          <body className={raleway.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </Providers>
      </html>
    </ClerkProvider>
  )
}
