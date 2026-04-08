import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import { remark } from 'remark'
import html from 'remark-html'
import SectionIntro from '@/components/SectionIntro'
import ShareButton from '@/components/ShareButton'
import ToolCard from '@/components/ToolCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllPosts, getPostById } from '@/lib/blog'
import { getFeaturedTools, getToolsByCategory, ToolDefinition } from '@/lib/tool-catalog'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

function getRelatedToolsForPost(category: string): ToolDefinition[] {
  switch (category) {
    case 'React':
      return [...getToolsByCategory('svg').slice(0, 2), getFeaturedTools().find((tool) => tool.id === 'svg-icon-pack-generator')].filter(Boolean) as ToolDefinition[]
    case 'CSS':
      return ['css-minifier', 'design-token-generator', 'color-generator']
        .map((id) => getFeaturedTools().find((tool) => tool.id === id) ?? getToolsByCategory('frontend').find((tool) => tool.id === id))
        .filter(Boolean) as ToolDefinition[]
    case 'Optimization':
      return ['svg-converter', 'css-minifier', 'json-formatter']
        .map((id) => [...getToolsByCategory('svg'), ...getToolsByCategory('frontend')].find((tool) => tool.id === id))
        .filter(Boolean) as ToolDefinition[]
    default:
      return getFeaturedTools(3)
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostById(slug)

  if (!post) {
    return {
      title: 'Post Not Found | Konverter Blog',
    }
  }

  return {
    title: `${post.title} | Konverter Blog`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Daniel Zahav'],
    },
    alternates: {
      canonical: `https://www.konverter-online.com/blog/${post.id}`,
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostById(slug)

  if (!post) {
    notFound()
  }

  const processedContent = await remark().use(html).process(post.content)
  const contentHtml = processedContent.toString()

  const relatedPosts = getAllPosts()
    .filter((candidate) => candidate.id !== post.id && candidate.category === post.category)
    .slice(0, 3)

  const relatedTools = getRelatedToolsForPost(post.category).slice(0, 3)

  return (
    <div className="space-y-16 md:space-y-20">
      <div>
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </Button>
        <section className="section-frame section-grid-background">
          <div className="max-w-4xl space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-accent)]">
              {post.category}
            </p>
            <h1 className="font-display text-4xl tracking-tight text-foreground md:text-6xl">
              {post.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </section>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <article className="section-frame">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>

        <aside className="space-y-6">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Share2 className="h-5 w-5 text-[var(--brand-accent)]" />
                Share this article
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ShareButton
                title={post.title}
                text={post.excerpt}
                url={`https://www.konverter-online.com/blog/${post.id}`}
                buttonText="Share article"
              />
            </CardContent>
          </Card>

          {post.tags.length > 0 ? (
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/70 bg-white/75 px-3 py-1 text-sm text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </aside>
      </div>

      <section className="space-y-8">
        <SectionIntro
          eyebrow="Relevant tools"
          title="Open a related workflow"
          description="A guide should connect back to a practical next step."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {relatedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {relatedPosts.length > 0 ? (
        <section className="space-y-8">
          <SectionIntro
            eyebrow="Related articles"
            title="Keep reading"
            description="More posts in the same area."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.id}`}
                className="rounded-[28px] border border-border/70 bg-white/78 p-6 shadow-sm hover:border-[var(--brand-accent)]/40"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{relatedPost.category}</p>
                <h2 className="mt-3 font-display text-2xl tracking-tight text-foreground">{relatedPost.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{relatedPost.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
