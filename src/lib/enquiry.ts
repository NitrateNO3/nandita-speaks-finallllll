import { z } from 'zod'

/** Shared by the form (client) and the API route (server). */
export const enquirySchema = z.object({
  name: z.string().trim().min(1, 'Enter your name.').max(120, 'Keep your name under 120 characters.'),
  organisation: z.string().trim().max(160).optional().default(''),
  email: z.string().trim().max(200).email('Enter an email address, like name@example.com.'),
  timing: z.string().trim().max(160).optional().default(''),
  location: z.string().trim().max(160).optional().default(''),
  audience: z.string().trim().max(200).optional().default(''),
  message: z.string().trim().min(1, 'Add a short note about what you need.').max(2000, 'Keep the note under 2,000 characters.'),
  submissionId: z.string().uuid(),
  website: z.string().max(0).optional().default(''), // honeypot: must stay empty
  startedAt: z.number().optional(), // when the form was first touched (ms since epoch)
  turnstileToken: z.string().optional().default(''),
})

export type EnquiryInput = z.infer<typeof enquirySchema>
export type FieldErrors = Partial<Record<'name' | 'email' | 'message' | 'organisation' | 'timing' | 'location' | 'audience', string>>
