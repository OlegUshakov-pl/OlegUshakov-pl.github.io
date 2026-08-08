import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, '..');

function getFiles(dir, ext) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...getFiles(fullPath, ext));
    } else if (item.name.endsWith(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  return parse(match[1]);
}

const searchIndex = [];

const postsDir = path.join(base, 'src/content/posts');
if (fs.existsSync(postsDir)) {
  const postFiles = getFiles(postsDir, '.md');

  for (const file of postFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const frontmatter = parseFrontmatter(content);

    if (frontmatter && frontmatter.draft !== true) {
      const slug = path.basename(file, '.md');
      searchIndex.push({
        title: frontmatter.title || slug,
        description: frontmatter.description || '',
        url: `/blogs/${slug}`,
        type: 'Blog'
      });
    }
  }
}

const projectsDir = path.join(base, 'src/content/projects');
if (fs.existsSync(projectsDir)) {
  const projectFiles = getFiles(projectsDir, '.md');

  for (const file of projectFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const frontmatter = parseFrontmatter(content);

    if (frontmatter && frontmatter.draft !== true) {
      const slug = path.basename(file, '.md');
      searchIndex.push({
        title: frontmatter.title || slug,
        description: frontmatter.description || '',
        url: `/projects/${slug}`,
        type: 'Project'
      });
    }
  }
}

const outputPath = path.join(base, 'public/search-index.json');
fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));

console.log(`Search index generated with ${searchIndex.length} items`);
