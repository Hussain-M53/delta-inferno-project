import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'headerWhyChooseUs',
    title: 'header Why Choose Us',
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
    ],
})
