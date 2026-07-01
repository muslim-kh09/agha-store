import { defineType, defineField } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'الصفحة الرئيسية (Home Page)',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'العنوان الرئيسي (Hero Title)',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'النص الفرعي (Hero Subtitle)',
      type: 'text',
    }),
    defineField({
      name: 'ctaText',
      title: 'نص الزر (CTA Text)',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'صورة الخلفية (Hero Image)',
      type: 'image',
      options: { hotspot: true }
    }),
  ],
})
