import { defineType, defineField } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'الأقسام',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'اسم القسم',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'الرابط المختصر (Slug)',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'image',
      title: 'صورة القسم',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
