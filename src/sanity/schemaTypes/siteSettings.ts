import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'إعدادات الموقع',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'العنوان الرئيسي (Hero)',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'النص الفرعي (Hero)',
      type: 'text',
    }),
    defineField({
      name: 'countdownDate',
      title: 'تاريخ انتهاء العداد (الافتتاح)',
      type: 'datetime',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'رقم الواتساب',
      type: 'string',
    }),
    defineField({
      name: 'instagramLink',
      title: 'رابط الانستجرام',
      type: 'url',
    }),
    defineField({
      name: 'facebookLink',
      title: 'رابط الفيسبوك',
      type: 'url',
    }),
  ],
})
