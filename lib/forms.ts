// Placeholder submit handlers. The newsletter will post to Brevo (Sendinblue)
// and the contact form to the CMS in a later milestone (see PLAN.md).
export type NewsletterInput = { name: string; email: string }
export type ContactInput = { name: string; email: string; subject?: string; message: string }

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function subscribeToNewsletter(input: NewsletterInput) {
  await wait(700)
  return { ok: true as const, name: input.name }
}

export async function sendContactMessage(input: ContactInput) {
  await wait(800)
  return { ok: true as const, name: input.name }
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
