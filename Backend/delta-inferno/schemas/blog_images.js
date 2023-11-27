import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blog_images',
  title: 'Blog Images',
  type: 'document',
  fields: [
    defineField({
      name: 'top_image',
      title: 'Top Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
        name: 'panel_image',
        title: 'Panel Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      }),
    
  ],
})
