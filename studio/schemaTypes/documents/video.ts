import {PlayIcon} from '@sanity/icons/Play'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'id',
      title: 'Provider video ID',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'provider',
      title: 'Provider',
      type: 'string',
      options: {
        list: [
          {title: 'YouTube', value: 'youtube'},
          {title: 'Vimeo', value: 'vimeo'},
          {title: 'Bunny', value: 'bunny'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Source title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'channel',
      title: 'Channel',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
      validation: (rule) => rule.required().positive().integer(),
    }),
    defineField({
      name: 'query',
      title: 'Discovery query',
      type: 'string',
    }),
    defineField({
      name: 'chapters',
      title: 'Chapters',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'videoChapter',
          title: 'Chapter',
          fields: [
            defineField({
              name: 'startSeconds',
              title: 'Start seconds',
              type: 'number',
              validation: (rule) => rule.required().min(0).integer(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'label', startSeconds: 'startSeconds'},
            prepare({title, startSeconds}) {
              return {title, subtitle: `${startSeconds ?? 0}s`}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'chunks',
      title: 'Transcript chunks',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'videoChunk',
          title: 'Transcript chunk',
          fields: [
            defineField({
              name: 'startSeconds',
              title: 'Start seconds',
              type: 'number',
              validation: (rule) => rule.required().min(0).integer(),
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'text', startSeconds: 'startSeconds'},
            prepare({title, startSeconds}) {
              return {title, subtitle: `${startSeconds ?? 0}s`}
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'provider'},
  },
})
