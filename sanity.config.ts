import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { siteSettings } from './src/sanity/schemaTypes/siteSettings'
import { category } from './src/sanity/schemaTypes/category'
import { product } from './src/sanity/schemaTypes/product'

export default defineConfig({
  name: 'default',
  title: 'Agha Store',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9sx6xvt7',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: [siteSettings, category, product],
  },
})
