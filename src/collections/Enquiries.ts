import type { CollectionConfig } from 'payload'
import { isLoggedIn, nobody } from './access'

export const ENQUIRY_STATUSES = [
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'In discussion', value: 'in-discussion' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Closed', value: 'closed' },
]

const csvCell = (v: unknown) => {
  const s = v == null ? '' : String(v)
  // Neutralise spreadsheet formula injection and quote every cell.
  const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s
  return `"${safe.replace(/"/g, '""')}"`
}

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  labels: { singular: 'Enquiry', plural: 'Enquiries' },
  admin: {
    useAsTitle: 'name',
    group: 'Enquiries',
    defaultColumns: ['createdAt', 'name', 'organisation', 'timing', 'status'],
    listSearchableFields: ['name', 'email', 'organisation', 'message'],
    components: { beforeListTable: ['/components/admin/ExportEnquiries#ExportEnquiries'] },
    description: 'Speaking enquiries from the contact form. Every enquiry is saved here before any email is sent.',
  },
  // Enquiries are created only by the server-side enquiry endpoint (local API), never through the public REST API.
  access: { create: nobody, read: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  defaultSort: '-createdAt',
  timestamps: true,
  fields: [
    { name: 'status', type: 'select', required: true, defaultValue: 'new', options: ENQUIRY_STATUSES, admin: { position: 'sidebar' } },
    { name: 'name', type: 'text', required: true },
    { name: 'organisation', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'timing', type: 'text', label: 'Event date or approximate timing' },
    { name: 'location', type: 'text', label: 'Location, or online' },
    { name: 'audience', type: 'text', label: 'Audience and approximate size' },
    { name: 'message', type: 'textarea', required: true, label: 'Note' },
    { name: 'internalNotes', type: 'textarea', admin: { description: 'Private notes for the team. Never shown to the visitor.' } },
    {
      type: 'collapsible',
      label: 'Delivery and spam checks',
      admin: { initCollapsed: true },
      fields: [
        { name: 'submissionId', type: 'text', unique: true, index: true, admin: { readOnly: true } },
        {
          name: 'emailStatus',
          type: 'select',
          defaultValue: 'pending',
          options: ['pending', 'sent', 'failed', 'not-configured'].map((v) => ({ label: v, value: v })),
          admin: { readOnly: true },
        },
        { name: 'emailAttempts', type: 'number', defaultValue: 0, admin: { readOnly: true } },
        { name: 'emailError', type: 'text', admin: { readOnly: true } },
        { name: 'ipHash', type: 'text', index: true, admin: { readOnly: true, description: 'One-way hash used only for rate limiting.' } },
      ],
    },
  ],
  endpoints: [
    {
      path: '/export-csv',
      method: 'get',
      handler: async (req) => {
        if (!req.user) return Response.json({ error: 'Sign in to export enquiries.' }, { status: 401 })
        const status = typeof req.query?.status === 'string' ? req.query.status : undefined
        const { docs } = await req.payload.find({
          collection: 'enquiries',
          where: status ? { status: { equals: status } } : undefined,
          limit: 10000,
          sort: '-createdAt',
          depth: 0,
          req,
        })
        const cols = ['id', 'createdAt', 'status', 'name', 'organisation', 'email', 'timing', 'location', 'audience', 'message'] as const
        const lines = [cols.join(','), ...docs.map((d) => cols.map((c) => csvCell((d as unknown as Record<string, unknown>)[c])).join(','))]
        return new Response('﻿' + lines.join('\r\n'), {
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
            'Cache-Control': 'no-store',
          },
        })
      },
    },
  ],
}
