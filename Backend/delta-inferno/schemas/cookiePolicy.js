import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'cookiePage',
    title: 'Cookie Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        }),
    ],
})
