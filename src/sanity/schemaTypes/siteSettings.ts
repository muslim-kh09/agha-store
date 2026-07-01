import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Store Logo',
      type: 'image',
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Color (Hex)',
      type: 'string',
      description: 'e.g. #C5A059',
      initialValue: '#C5A059'
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color (Hex)',
      type: 'string',
      description: 'e.g. #121212',
      initialValue: '#121212'
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      initialValue: '201067842694'
    }),
    defineField({
      name: 'instagramLink',
      title: 'Instagram Link',
      type: 'url',
    }),
    defineField({
      name: 'facebookLink',
      title: 'Facebook Link',
      type: 'url',
    }),
  ],
})
