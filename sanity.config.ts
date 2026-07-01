import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { siteSettings } from './src/sanity/schemaTypes/siteSettings'
import { homePage } from './src/sanity/schemaTypes/homePage'
import { category } from './src/sanity/schemaTypes/category'
import { product } from './src/sanity/schemaTypes/product'

const customStructure = (S: any) =>
  S.list()
    .title('إدارة المتجر')
    .items([
      S.listItem()
        .title('⚙️ إعدادات الموقع (Global Settings)')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('🏠 الصفحة الرئيسية (Home Page)')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),
      S.divider(),
      S.listItem()
        .title('🛍️ الأقسام (Categories)')
        .schemaType('category')
        .child(S.documentTypeList('category').title('الأقسام')),
      S.listItem()
        .title('📦 المنتجات (Products)')
        .schemaType('product')
        .child(S.documentTypeList('product').title('المنتجات')),
    ])

export default defineConfig({
  name: 'default',
  title: 'Agha Store',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9sx6xvt7',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool({ structure: customStructure })],
  schema: {
    types: [siteSettings, homePage, category, product],
  },
})
