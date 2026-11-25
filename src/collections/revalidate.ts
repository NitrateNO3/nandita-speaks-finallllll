/** Refresh statically generated pages after content changes. Safe outside Next (CLI, seed). */
export async function revalidate(paths: string[]) {
  try {
    const { revalidatePath } = await import('next/cache')
    for (const p of paths) revalidatePath(p)
  } catch {
    // Not running inside Next.js (for example the seed script). Nothing to refresh.
  }
}
