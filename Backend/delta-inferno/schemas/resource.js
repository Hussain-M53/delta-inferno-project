// in schemas/documents.js

export default {
    name: 'resource',
    title: 'Resource',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'file',
            title: 'File',
            type: 'file',
            options: {
                accept: '.pdf,.doc,.docx,.txt',
            },
        },
    ],
};
