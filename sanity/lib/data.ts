import 'server-only'

import { sanityFetch } from './fetch'
import {
  CATEGORY_BY_SLUG_QUERY,
  COURSE_BY_SLUG_QUERY,
  COURSE_FOR_LESSON_QUERY,
  COURSES_QUERY,
  INSTRUCTOR_BY_SLUG_QUERY,
  LESSON_BY_SLUG_QUERY,
} from './queries'

export async function getCourses() {
  const courses = await sanityFetch({
    query: COURSES_QUERY,
    tags: ['course'],
  })
  return courses ?? []
}

export async function getCourseBySlug(slug: string) {
  const course = await sanityFetch({
    query: COURSE_BY_SLUG_QUERY,
    params: { slug },
    tags: [`course:${slug}`, 'lesson', 'instructor', 'category'],
  })
  return course ?? null
}

export async function getLessonBySlug(slug: string) {
  const lesson = await sanityFetch({
    query: LESSON_BY_SLUG_QUERY,
    params: { slug },
    tags: [`lesson:${slug}`],
  })
  return lesson ?? null
}

export async function getInstructorBySlug(slug: string) {
  const instructor = await sanityFetch({
    query: INSTRUCTOR_BY_SLUG_QUERY,
    params: { slug },
    tags: [`instructor:${slug}`],
  })
  return instructor ?? null
}

export async function getCategoryBySlug(slug: string) {
  const category = await sanityFetch({
    query: CATEGORY_BY_SLUG_QUERY,
    params: { slug },
    tags: [`category:${slug}`, 'course'],
  })
  return category ?? null
}

export async function getCourseForLesson(lessonId: string) {
  const course = await sanityFetch({
    query: COURSE_FOR_LESSON_QUERY,
    params: { lessonId },
    tags: ['course'],
  })
  return course ?? null
}
