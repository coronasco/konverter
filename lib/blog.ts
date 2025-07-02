import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  id: string
  title: string
  date: string
  excerpt: string
  content: string
  category: string
  readTime: string
  tags: string[]
  featured?: boolean
}

export function getAllPosts(): BlogPost[] {
  // Verifică dacă directorul există
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      return {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        excerpt: matterResult.data.excerpt,
        category: matterResult.data.category,
        readTime: matterResult.data.readTime,
        tags: matterResult.data.tags || [],
        featured: matterResult.data.featured || false,
        content: matterResult.content,
      }
    })

  // Sortează posturile după dată (cele mai noi primele)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostById(id: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      excerpt: matterResult.data.excerpt,
      category: matterResult.data.category,
      readTime: matterResult.data.readTime,
      tags: matterResult.data.tags || [],
      featured: matterResult.data.featured || false,
      content: matterResult.content,
    }
  } catch {
    return null
  }
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(post => post.category === category)
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter(post => post.featured)
} 