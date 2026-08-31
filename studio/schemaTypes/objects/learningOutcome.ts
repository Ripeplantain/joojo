import {SparklesIcon} from '@sanity/icons/Sparkles'
import {defineField, defineType} from 'sanity'

const ICON_OPTIONS = [
  {title: 'Layers', value: 'layers'},
  {title: 'Database', value: 'database'},
  {title: 'Gauge', value: 'gauge'},
  {title: 'Cloud', value: 'cloud'},
  {title: 'Shield', value: 'shield'},
  {title: 'Rocket', value: 'rocket'},
  {title: 'Code', value: 'code'},
  {title: 'Video', value: 'video'},
  {title: 'Book', value: 'book'},
  {title: 'Sparkle', value: 'sparkle'},
]

export const learningOutcome = defineType({
  name: 'learningOutcome',
  title: 'Learning Outcome',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {list: ICON_OPTIONS, layout: 'dropdown'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'icon'},
  },
})
