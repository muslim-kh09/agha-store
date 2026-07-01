import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'إعدادات الموقع (Global Settings)',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'شعار الموقع (Logo)',
      type: 'image',
    }),
    defineField({
      name: 'primaryColor',
      title: 'اللون الأساسي (Primary Hex Code)',
      type: 'string',
      description: 'مثال: #C5A059',
      initialValue: '#C5A059'
    }),
    defineField({
      name: 'backgroundColor',
      title: 'لون الخلفية (Background Hex Code)',
      type: 'string',
      description: 'مثال: #121212',
      initialValue: '#121212'
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'رقم الواتساب',
      type: 'string',
      initialValue: '201067842694'
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
