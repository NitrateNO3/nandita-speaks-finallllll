import Link from 'next/link'
import React from 'react'
import type { PostCard } from '@/lib/cms'
import { formatDate } from '@/lib/site'
import { Photo } from './ui'

export function PostCards({ posts }: { posts: PostCard[] }) {
  return (
    <div className="cards">
      {posts.map((p) => (
        <Link className="card" href={`/blog/${p.slug}/`} key={p.id}>
          <Photo media={p.featuredImage} slot="Post image" ratio="4 / 3" sizes="(max-width: 767px) 100vw, 30vw" />
          <div className="meta">
            {p.category ? <span>{p.category.title}</span> : null}
            <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
          </div>
          <h3>{p.title}</h3>
          <p>{p.excerpt}</p>
        </Link>
      ))}
    </div>
  )
}
