import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'popUp',
    title: 'Pop Up',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'discount',
            title: 'Flat Discount',
            type: 'number',
        }),
        defineField({
            name: 'textColor',
            title: 'Text Color',
            type: 'string',
        }),
        defineField({
            name: 'bgColor',
            title: 'Bg Color',
            type: 'string',
        }),
    ],
})
