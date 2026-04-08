import { Metadata } from 'next'
import { Cookie, Database, Eye, Lock, Shield, Users } from 'lucide-react'
import SectionIntro from '@/components/SectionIntro'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Privacy Policy | Konverter',
  description:
    'How Konverter handles browser-side processing, analytics, local storage, and third-party services such as Google Analytics and AdSense.',
  alternates: {
    canonical: 'https://www.konverter-online.com/privacy',
  },
}

const sections = [
  {
    title: 'What is processed locally',
    icon: Eye,
    description:
      'Many Konverter tools are designed to work directly in the browser. SVG conversion, formatting, encoding, local previews, and similar utility work are generally handled client-side rather than uploaded as part of an account flow.',
  },
  {
    title: 'Analytics and ads',
    icon: Database,
    description:
      'The site includes Google Analytics and Google AdSense scripts. Those services may collect usage and ad-related information according to their own policies and browser settings.',
  },
  {
    title: 'Local storage',
    icon: Cookie,
    description:
      'Some tools use local browser storage for convenience. For example, time-tracking sessions and error logs can be saved locally on your device so the page remains usable across reloads.',
  },
  {
    title: 'Security',
    icon: Lock,
    description:
      'Konverter is served over HTTPS. Keeping more routine utility work in the browser reduces the need for server-side file handling in many flows, though you should still avoid treating any public website as a place for highly sensitive secrets.',
  },
  {
    title: 'Your control',
    icon: Users,
    description:
      'Because much of the workflow is browser-based, clearing local storage, cookies, or site data in your browser removes locally saved state. You can also use normal browser controls to limit cookies and tracking scripts.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="space-y-16 md:space-y-20">
      <section className="section-frame section-grid-background">
        <div className="max-w-4xl space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="h-10 w-10 text-[var(--brand-accent)]" />
            <SectionIntro
              eyebrow="Privacy"
              title="Konverter keeps the privacy story straightforward."
              description="This page reflects how the site is built today: browser-based processing where possible, no required accounts, plus third-party scripts for analytics and ads."
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </section>

      <section className="grid gap-4">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Card key={section.title} className="border-border/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Icon className="h-5 w-5 text-[var(--brand-accent)]" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-muted-foreground">{section.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </section>

      <section className="section-frame">
        <SectionIntro
          eyebrow="Contact"
          title="Questions about privacy or data handling?"
          description="If you need to ask about how the site behaves, the best route is direct contact."
        />
        <div className="mt-6 space-y-2 text-sm leading-7 text-muted-foreground">
          <p>
            Developer: <span className="font-medium text-foreground">Daniel Zaharia</span>
          </p>
          <p>
            Website:{' '}
            <a href="https://www.konverter-online.com" className="font-medium text-foreground underline decoration-[var(--brand-accent)]/60 underline-offset-4">
              konverter-online.com
            </a>
          </p>
          <p>
            LinkedIn:{' '}
            <a
              href="https://www.linkedin.com/in/rolax"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline decoration-[var(--brand-accent)]/60 underline-offset-4"
            >
              linkedin.com/in/rolax
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
