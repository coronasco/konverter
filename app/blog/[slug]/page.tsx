import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from 'lucide-react'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getPostById, getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { remark } from 'remark'
import html from 'remark-html'
import ShareButton from '@/components/ShareButton'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
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

  // Convert markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(post.content)
  const contentHtml = processedContent.toString()

  const relatedPosts = getAllPosts()
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 2)

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-white dark:bg-gray-900">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Back to Blog */}
            <div className="mb-8">
              <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
                <Link href="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>
            </div>

            {/* Article Header */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">{post.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            {/* Article Content */}
            <article 
              className="prose prose-lg max-w-none mb-12 prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:text-gray-800 dark:prose-pre:text-gray-200 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-li:text-gray-700 dark:prose-li:text-gray-300"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mb-12">
                <h3 className="text-lg font-semibold mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="mb-12">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Share this article
                  </h3>
                  <ShareButton 
                    title={post.title}
                    text={post.excerpt}
                    url={`https://www.konverter-online.com/blog/${post.id}`}
                    buttonText="Share Article"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.id}>
                      <CardContent className="p-6">
                        <h4 className="font-semibold mb-2">
                          <Link href={`/blog/${relatedPost.id}`} className="hover:text-blue-600">
                            {relatedPost.title}
                          </Link>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{new Date(relatedPost.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 