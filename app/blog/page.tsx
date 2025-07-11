import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, Code, Palette, Zap, Tag } from 'lucide-react'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog | Konverter - SVG to CSS/JSX Converter',
  description: 'Learn about SVG optimization, CSS techniques, React components, and web development best practices. Tips and tutorials for developers.',
  keywords: ['svg blog', 'css tutorials', 'react components', 'web development', 'svg optimization', 'frontend tips'],
}

const categoryIcons = {
  'Optimization': Zap,
  'CSS': Palette,
  'React': Code,
  'Comparison': Tag,
  'Technical': Code,
  'Accessibility': Palette
}

const categoryColors = {
  'Optimization': 'text-orange-600',
  'CSS': 'text-blue-600',
  'React': 'text-purple-600',
  'Comparison': 'text-green-600',
  'Technical': 'text-red-600',
  'Accessibility': 'text-indigo-600'
}

export default function BlogPage() {
  const posts = getAllPosts()
  const featuredPost = posts.find(post => post.featured)
  const regularPosts = posts.filter(post => !post.featured)

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-white dark:bg-gray-900">
        <div className="container mx-auto py-12 px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Konverter Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Insights, tutorials, and best practices for SVG optimization, CSS techniques, and modern web development.
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-12">
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-orange-600" />
                    <span className="text-sm font-medium text-orange-600">Featured</span>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl">
                    {featuredPost.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <Button asChild className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0">
                    <Link href={`/blog/${featuredPost.id}`}>
                      Read Full Article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => {
              const Icon = categoryIcons[post.category as keyof typeof categoryIcons] || Code
              const color = categoryColors[post.category as keyof typeof categoryColors] || 'text-gray-600'
              
              return (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`h-4 w-4 ${color}`} />
                      <span className="text-xs font-medium text-muted-foreground">{post.category}</span>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">
                      <Link href={`/blog/${post.id}`} className="hover:text-blue-600 transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/blog/${post.id}`}>
                        Read More
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className='flex items-center justify-center mt-12 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg'>
            <p>Thank you for visiting this website. If you have any questions, please <a href="https://www.linkedin.com/in/rolax" className="text-blue-600 hover:text-blue-800">contact me</a>. </p>
          </div> 
        </div>
      </main>

      <Footer />
    </div>
  )
} 