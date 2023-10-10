import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'terms_Condition',
    title: 'Terms & Condition',
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
