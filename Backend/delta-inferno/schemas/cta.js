import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'ctaSection',
    title: 'CTA Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
              hotspot: true,
            },
          }),
        defineField({
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
        }),
    ],
})
