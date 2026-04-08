import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import SectionIntro from '@/components/SectionIntro'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog | Konverter',
  description:
    'Guides and articles about SVG workflows, frontend assets, browser-based utilities, and practical developer tooling.',
  alternates: {
    canonical: 'https://www.konverter-online.com/blog',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const featuredPost = posts.find((post) => post.featured) ?? posts[0]
  const remainingPosts = posts.filter((post) => post.id !== featuredPost?.id)

  return (
    <div className="space-y-16 md:space-y-20">
      <section className="section-frame section-grid-background">
        <SectionIntro
          eyebrow="Blog"
          title="Posts about SVG, icons, favicons, tokens, and the small frontend jobs that always turn into a tab pile"
          description="If you are in the middle of one of those jobs, start with the post that matches it."
          align="center"
        />
      </section>

      {featuredPost ? (
        <section>
          <Card className="border-border/70">
            <CardHeader className="gap-5">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="rounded-full border border-border/70 bg-white/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
                  Featured article
                </span>
                <span>{featuredPost.category}</span>
              </div>
              <CardTitle className="font-display text-4xl tracking-tight text-foreground">
                {featuredPost.title}
              </CardTitle>
              <p className="max-w-3xl text-base leading-7 text-muted-foreground">{featuredPost.excerpt}</p>
              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(featuredPost.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {featuredPost.readTime}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href={`/blog/${featuredPost.id}`}>
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      ) : null}

      <section className="space-y-8">
        <SectionIntro
          eyebrow="Latest posts"
          title="Recent posts"
          description="Pick one and get moving."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {remainingPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="rounded-[28px] border border-border/70 bg-white/78 p-6 shadow-sm hover:border-[var(--brand-accent)]/40"
            >
              <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span>{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl tracking-tight text-foreground">{post.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
              <p className="mt-4 text-sm font-medium text-foreground">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
