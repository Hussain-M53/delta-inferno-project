import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'orderDemo',
    title: 'Order Demo',
    type: 'document',
    fields: [
        defineField({
            name: 'titleStep1',
            title: 'Title Step1',
            type: 'string',
        }),
        defineField({
            name: 'descriptionStep1',
            title: 'Description Step1',
            type: 'string',
        }),
        defineField({
            name: 'mainImageStep1',
            title: 'Main image Step1',
            type: 'image',
            options: {
              hotspot: true,
            },
          }),
          defineField({
            name: 'titleStep2',
            title: 'Title Step2',
            type: 'string',
        }),
        defineField({
            name: 'descriptionStep2',
            title: 'Description Step2',
            type: 'string',
        }),
        defineField({
            name: 'mainImageStep2',
            title: 'Main image Step2',
            type: 'image',
            options: {
              hotspot: true,
            },
          }),
          defineField({
            name: 'titleStep3',
            title: 'Title Step3',
            type: 'string',
        }),
        defineField({
            name: 'descriptionStep3',
            title: 'Description Step3',
            type: 'string',
        }),
        defineField({
            name: 'mainImageStep3',
            title: 'Main image Step3',
            type: 'image',
            options: {
              hotspot: true,
            },
          }),
       
    ],
})
