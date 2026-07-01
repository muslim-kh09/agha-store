import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'المنتجات',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'اسم المنتج',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'وصف المنتج',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'السعر',
      type: 'number',
    }),
    defineField({
      name: 'category',
      title: 'القسم',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'sizes',
      title: 'المقاسات المتوفرة',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'S', value: 'S' },
          { title: 'M', value: 'M' },
          { title: 'L', value: 'L' },
          { title: 'XL', value: 'XL' },
          { title: 'XXL', value: 'XXL' },
        ]
      }
    }),
    defineField({
      name: 'images',
      title: 'صور المنتج',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
})
