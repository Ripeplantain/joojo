import { defineQuery } from 'next-sanity'

export const COURSES_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    slug,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    "instructor": instructor->{ _id, name, slug, photo },
    "category": category->{ _id, title, slug },
    "moduleCount": count(modules),
    "lessonCount": count(modules[].lessons)
  }
`)

export const COURSE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "course" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    learningOutcomes,
    "instructor": instructor->{ _id, name, slug, photo, expertise, bio },
    "category": category->{ _id, title, slug },
    modules[]{
      _key,
      title,
      summary,
      lessons[]->{
        _id,
        title,
        slug,
        videoUrl,
        poster,
        duration,
        freePreview,
        studentCount
      }
    }
  }
`)

export const LESSON_BY_SLUG_QUERY = defineQuery(`
  *[_type == "lesson" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    videoUrl,
    poster,
    duration,
    freePreview,
    studentCount,
    notes,
    keyPoints,
    proTip,
    resources
  }
`)

export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "instructor" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    photo,
    expertise,
    bio
  }
`)

export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    "courses": *[_type == "course" && references(^._id) && defined(slug.current)]{
      _id,
      title,
      slug,
      summary,
      coverImage,
      level,
      price,
      popular,
      studentCount
    }
  }
`)

// A lesson doesn't store its parent course, so resolve it by reverse reference.
export const COURSE_FOR_LESSON_QUERY = defineQuery(`
  *[_type == "course" && references($lessonId)][0]{
    _id,
    title,
    slug,
    modules[]{
      _key,
      title,
      lessons[]->{ _id, title, slug }
    }
  }
`)
