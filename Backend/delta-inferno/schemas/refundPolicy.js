import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'refundPage',
    title: 'Refund Page',
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
