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
      name: 'slug',
      title: 'الرابط المختصر (Slug)',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'category',
      title: 'القسم',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'price',
      title: 'السعر الأساسي',
      type: 'number',
    }),
    defineField({
      name: 'discountedPrice',
      title: 'السعر بعد الخصم (اختياري)',
      type: 'number',
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
    defineField({
      name: 'description',
      title: 'الوصف الشامل (Rich Text)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'featured',
      title: 'منتج مميز (يظهر في الصفحة الرئيسية؟)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
