/**
 * Seeds the blog categories proposed in the Website Brief. Safe to run more than once.
 * Usage: npm run seed
 * It never creates posts, testimonials or any other content: those come from the client.
 */
import config from '@payload-config'
import { getPayload } from 'payload'
import { BLOG } from '../content/defaults'
import { slugify } from '../collections/slug'

const payload = await getPayload({ config })
for (const [i, title] of BLOG.categories.entries()) {
  const slug = slugify(title)
  const found = await payload.find({ collection: 'categories', where: { slug: { equals: slug } }, limit: 1 })
  if (found.docs.length) {
    payload.logger.info(`Category exists: ${title}`)
    continue
  }
  await payload.create({ collection: 'categories', data: { title, slug, order: i } })
  payload.logger.info(`Created category: ${title}`)
}
process.exit(0)
