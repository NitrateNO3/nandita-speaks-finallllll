import React from 'react'

const statuses = [
  ['', 'All enquiries'],
  ['new', 'New'],
  ['contacted', 'Contacted'],
  ['in-discussion', 'In discussion'],
  ['confirmed', 'Confirmed'],
  ['closed', 'Closed'],
]

/** Shown above the enquiries list in the admin. Downloads a CSV through the authenticated endpoint. */
export function ExportEnquiries() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', margin: '0 0 16px' }}>
      <strong style={{ marginRight: 8 }}>Export CSV:</strong>
      {statuses.map(([v, label]) => (
        <a
          key={v || 'all'}
          className="btn btn--style-secondary btn--size-small"
          style={{ margin: 0 }}
          href={`/api/enquiries/export-csv${v ? `?status=${v}` : ''}`}
        >
          {label}
        </a>
      ))}
    </div>
  )
}
