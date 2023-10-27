import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'videoCTA',
    title: 'Video CTA',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'subTitle',
            title: 'Sub Title',
            type: 'string',
        }),
        defineField({
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
        }),
    ],
})
