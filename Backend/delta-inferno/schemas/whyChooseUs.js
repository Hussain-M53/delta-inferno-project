import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'whyChooseUs',
    title: 'Why Choose Us',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'image',
            options: {
              hotspot: true,
            },
          }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
        }),
    ],
})
