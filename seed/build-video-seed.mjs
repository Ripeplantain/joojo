import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const seedPath = path.join(__dirname, 'seed-sanity.json')
const videoPath = path.join(__dirname, 'video.json')
const outputPath = path.join(__dirname, 'video-sanity.ndjson')

function readNdjson(filePath) {
  return fs
    .readFileSync(filePath, 'utf8')
    .trim()
    .split(/\n+/)
    .filter(Boolean)
    .map((line) => JSON.parse(line))
}

function detectProvider(url) {
  const host = new URL(url).hostname.replace(/^www\./, '')

  if (host.includes('youtube.com') || host.includes('youtu.be')) return 'youtube'
  if (host.includes('vimeo.com')) return 'vimeo'
  if (host.includes('bunnycdn.com') || host.includes('b-cdn.net')) return 'bunny'

  throw new Error(`Unsupported video provider for URL: ${url}`)
}

function documentIdForUrl(url) {
  const cleaned = url
    .replace(/^https?:\/\//, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()

  return `video.${cleaned}`
}

const lessons = readNdjson(seedPath).filter((document) => document._type === 'lesson')
const lessonsBySlug = new Map(lessons.map((lesson) => [lesson.slug?.current, lesson]))
const videoEntries = Object.entries(JSON.parse(fs.readFileSync(videoPath, 'utf8')))

const documents = videoEntries.map(([lessonSlug, metadata]) => {
  const lesson = lessonsBySlug.get(lessonSlug)

  if (!lesson) {
    throw new Error(`No lesson found for video entry: ${lessonSlug}`)
  }

  return {
    _id: documentIdForUrl(lesson.videoUrl),
    _type: 'video',
    id: metadata.id,
    url: lesson.videoUrl,
    provider: detectProvider(lesson.videoUrl),
    title: metadata.title,
    channel: metadata.channel,
    duration: metadata.duration,
    query: metadata.query,
    chapters: [],
    chunks: [],
  }
})

const seenIds = new Set()
for (const document of documents) {
  if (seenIds.has(document._id)) {
    throw new Error(`Duplicate generated video document ID: ${document._id}`)
  }

  seenIds.add(document._id)
}

fs.writeFileSync(outputPath, `${documents.map((document) => JSON.stringify(document)).join('\n')}\n`)

console.log(`Wrote ${documents.length} video documents to ${path.relative(process.cwd(), outputPath)}`)
