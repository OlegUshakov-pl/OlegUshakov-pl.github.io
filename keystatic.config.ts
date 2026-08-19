import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    tags: collection({
      label: 'Tags',
      path: 'src/content/tags/*',
      format: { contentField: 'content' },
      schema: {
        name: fields.text({ label: 'Name' }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),
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
    links: collection({
      label: 'Links',
      slugField: 'title',
      path: 'src/content/links/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Name' } }),
        url: fields.text({ label: 'URL' }),
        description: fields.text({ label: 'Description' }),
        icon: fields.text({ label: 'Icon', description: 'Font Awesome class, e.g. fa-solid fa-calculator' }),
        tags: fields.relationship({ label: 'Tags', collection: 'tags', many: true }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),
  },
});
