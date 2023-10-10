import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
        }),
        defineField({
            name: 'subTitle1',
            title: 'subTitle1',
            type: 'string',
        }),
        defineField({
            name: 'subTitle2',
            title: 'subTitle2',
            type: 'string',
        }),
    ],
})
