import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { siteSettings } from './src/sanity/schemaTypes/siteSettings'
import { homePage } from './src/sanity/schemaTypes/homePage'
import { category } from './src/sanity/schemaTypes/category'
import { product } from './src/sanity/schemaTypes/product'

const customStructure = (S: any) =>
  S.list()
    .title('Store Management')
    .items([
      S.listItem()
        .title('⚙️ Global Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('🏠 Home Page Control')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),
      S.divider(),
      S.listItem()
        .title('🛍️ Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('📦 Products')
        .schemaType('product')
        .child(S.documentTypeList('product').title('Products')),
    ])

export default defineConfig({
  name: 'default',
  title: 'Agha Store CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9sx6xvt7',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool({ structure: customStructure })],
  schema: {
    types: [siteSettings, homePage, category, product],
  },
})
