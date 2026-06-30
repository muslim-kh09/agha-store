// Sanity schema – product.ts
// ─────────────────────────────────────────────────────────────
//  Drop this file into your Sanity Studio /schemas folder.
//  It defines the full Product document type with all required
//  fields so the client can manage products without code.
// ─────────────────────────────────────────────────────────────

import { defineType, defineField } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product Title",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL-safe ID)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().min(20),
    }),
    defineField({
      name: "price",
      title: "Price (SAR)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "sizes",
      title: "Available Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "XS", value: "XS" },
          { title: "S", value: "S" },
          { title: "M", value: "M" },
          { title: "L", value: "L" },
          { title: "XL", value: "XL" },
          { title: "XXL", value: "XXL" },
          { title: "28", value: "28" },
          { title: "30", value: "30" },
          { title: "32", value: "32" },
          { title: "34", value: "34" },
          { title: "36", value: "36" },
          { title: "38", value: "38" },
          { title: "40", value: "40" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Shirts", value: "shirts" },
          { title: "Trousers", value: "trousers" },
          { title: "Outerwear", value: "outerwear" },
          { title: "Accessories", value: "accessories" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      description: "Mark as featured to appear on the homepage spotlight section.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "images.0",
      subtitle: "price",
    },
    prepare({ title, media, subtitle }) {
      return {
        title,
        media,
        subtitle: `SAR ${subtitle?.toLocaleString() ?? "—"}`,
      };
    },
  },
});
