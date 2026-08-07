import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Blogs',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description' }),
        pubDate: fields.date({ label: 'Publish date' }),
        updatedDate: fields.date({ label: 'Updated date' }),
        heroImage: fields.text({ label: 'Hero image', description: 'Path to image, e.g. /images/post/post-1.jpg' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: (props) => props.value }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description' }),
        pubDate: fields.date({ label: 'Publish date' }),
        heroImage: fields.text({ label: 'Hero image', description: 'Path to image, e.g. /images/post/post-1.jpg' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: (props) => props.value }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),
  },
});
