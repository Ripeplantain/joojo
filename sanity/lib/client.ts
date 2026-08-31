import 'server-only'

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

const token = process.env.SANITY_API_READ_TOKEN
if (!token) {
  throw new Error('Missing environment variable: SANITY_API_READ_TOKEN')
}

// Server-only: the dataset is private, so every read goes through this token.
// `import 'server-only'` makes it a build error to pull this into a client bundle.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
