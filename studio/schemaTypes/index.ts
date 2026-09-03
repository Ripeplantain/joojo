import {category} from './documents/category'
import {course} from './documents/course'
import {instructor} from './documents/instructor'
import {lesson} from './documents/lesson'
import {video} from './documents/video'
import {courseModule} from './objects/module'
import {learningOutcome} from './objects/learningOutcome'
import {resource} from './objects/resource'

export const schemaTypes = [
  // documents
  course,
  lesson,
  video,
  instructor,
  category,
  // objects
  courseModule,
  learningOutcome,
  resource,
]
