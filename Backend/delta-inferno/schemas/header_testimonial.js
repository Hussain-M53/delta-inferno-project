import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'headerTestimonial',
    title: 'Header Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
    ],
})
