import type { GlobalConfig } from 'payload'
import { isLoggedIn, anyone } from '../collections/access'
import { revalidate } from '../collections/revalidate'
import { ABOUT, BLOG, BOOK, CONTACT, HOME, SPEAKING } from '../content/defaults'
import { fieldsFromDefaults } from './fromDefaults'

const access = { read: anyone, update: isLoggedIn }
const refresh = (paths: string[]) => ({ afterChange: [async () => revalidate(paths)] })

const pageGlobal = (slug: string, label: string, defaults: Record<string, unknown>, paths: string[]): GlobalConfig => ({
  slug,
  label,
  admin: { group: 'Pages', description: 'Text is prefilled with the approved Page Copy. Empty optional fields keep that line or section hidden.' },
  access,
  hooks: refresh(paths),
  fields: fieldsFromDefaults(defaults),
})

export const HomePage = pageGlobal('home-page', 'Home', HOME, ['/'])
export const AboutPage = pageGlobal('about-page', 'About', ABOUT, ['/about/'])
export const SpeakingPage = pageGlobal('speaking-page', 'Speaking', SPEAKING, ['/speaking/'])
export const ContactPage = pageGlobal('contact-page', 'Contact', CONTACT, ['/contact/'])
export const BlogPage = pageGlobal('blog-page', 'Blog index', { seo: BLOG.seo, h1: BLOG.h1, intro: BLOG.intro }, ['/blog/'])

export const Book: GlobalConfig = {
  slug: 'book',
  label: 'Silent Screams (book)',
  admin: { group: 'Pages' },
  access,
  hooks: refresh(['/', '/silent-screams/', '/about/']),
  fields: [
    { name: 'cover', type: 'upload', relationTo: 'media', admin: { description: 'Supplied cover artwork only.' } },
    ...fieldsFromDefaults(BOOK),
    { name: 'synopsis', type: 'textarea', admin: { description: 'Approved synopsis. The section stays hidden while this is empty.' } },
    { name: 'purchaseUrl', type: 'text', label: 'Purchase link' },
    {
      name: 'purchaseConfirmed',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Tick only after the client has confirmed the link. The Buy the Book button stays hidden until then.' },
    },
  ],
}

export const Photos: GlobalConfig = {
  slug: 'photos',
  label: 'Photographs',
  admin: { group: 'Pages', description: 'Real photographs of Nandita only. A slot left empty is simply not shown on the site.' },
  access,
  hooks: refresh(['/', '/about/', '/speaking/', '/blog/']),
  fields: [
    { name: 'heroPortrait', type: 'upload', relationTo: 'media', label: 'Home hero portrait' },
    { name: 'homeWhy', type: 'upload', relationTo: 'media', label: 'Home: beside “Why I speak”' },
    { name: 'homeStory', type: 'upload', relationTo: 'media', label: 'Home: beside “I kept singing through chemotherapy”' },
    { name: 'aboutPortrait', type: 'upload', relationTo: 'media', label: 'About portrait' },
    { name: 'aboutStory', type: 'upload', relationTo: 'media', hasMany: true, maxRows: 3, label: 'About: photos in “My story” (up to 3)' },
    { name: 'bioPhoto', type: 'upload', relationTo: 'media', label: 'Speaking: bio photo' },
    { name: 'authorPhoto', type: 'upload', relationTo: 'media', label: 'Blog author box photo' },
  ],
}

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Contact and social',
  admin: { group: 'Settings' },
  access,
  hooks: refresh(['/', '/contact/', '/about/', '/speaking/']),
  fields: [
    { name: 'contactEmail', type: 'email', admin: { description: 'Shown on the site and in the footer once “Show email” is ticked.' } },
    { name: 'showEmail', type: 'checkbox', defaultValue: false },
    { name: 'phone', type: 'text' },
    { name: 'showPhone', type: 'checkbox', defaultValue: false, admin: { description: 'Only if Nandita wants her phone number shown.' } },
    { name: 'location', type: 'text' },
    { name: 'showLocation', type: 'checkbox', defaultValue: false },
    {
      name: 'socials',
      type: 'array',
      label: 'Verified social profiles',
      admin: { description: 'Also used for “sameAs” in the Person structured data.' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    { name: 'replyTime', type: 'text', admin: { description: 'For example “within two working days”. Shown after an enquiry only when filled in.' } },
    { name: 'notifyEmails', type: 'text', admin: { description: 'Where enquiry notifications go (comma-separated). Falls back to the ENQUIRY_NOTIFY_TO setting.' } },
    { name: 'shareImage', type: 'upload', relationTo: 'media', label: 'Default social share image (portrait with logo)' },
  ],
}

export const Legal: GlobalConfig = {
  slug: 'legal',
  label: 'Privacy Policy',
  admin: { group: 'Pages', description: 'The policy text supplied by the client. The page shows a short notice until this is filled in.' },
  access,
  hooks: refresh(['/privacy-policy/']),
  fields: [
    { name: 'privacyPolicy', type: 'richText' },
    { name: 'privacyUpdated', type: 'date', label: 'Last updated' },
  ],
}

export const globals = [HomePage, AboutPage, SpeakingPage, ContactPage, BlogPage, Book, Photos, Legal, SiteSettings]
