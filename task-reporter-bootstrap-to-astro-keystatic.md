# Задание: Reporter Bootstrap → Astro + Keystatic (local storage)

## Контекст

Есть тема **Reporter Bootstrap** (статический HTML/Bootstrap экспорт, автор Themefisher):
https://statichunt.com/themes/html-reporter-bootstrap

Тема распакована в директорию `theme-source/` в корне проекта. Нужно:
1. Перевести её на Astro v7.1.6 (последняя стабильная версия).
2. Настроить content collections для постов блога.
3. Добавить Keystatic v0.6.4 как визуальную админ-панель для редактирования контента, режим хранения — **local** (пишет прямо в файлы на диске, без GitHub API).
4. Добавить кастомную кнопку "Commit & Push" рядом с админкой Keystatic (см. раздел 4) — так как `local` storage не коммитит сам.

**Node.js версия:** v26.5.0 (используй актуальный синтаксис ESM, `node:` префиксы для встроенных модулей).
**Версии пакетов:** ставить последние стабильные (`astro@latest`, `@keystatic/core@latest`, `@keystatic/astro@latest`) — не фиксировать конкретные номера версий.

---

## Часть 1. Настройка Astro-проекта

1. Создать новый Astro-проект в корне:
   ```bash
   npm create astro@latest . -- --template minimal --no-install
   ```
2. Установить зависимости:
   ```bash
   npm install
   ```
3. Убедиться, что `astro.config.mjs` настроен под GitHub Pages деплой (site + base, если репозиторий не user-page).

## Часть 2. Перенос темы Reporter Bootstrap

1. Из `theme-source/` скопировать в `public/`:
   - CSS (`bootstrap.min.css`, `style.css` и любые кастомные стили темы)
   - JS (`bootstrap.bundle.min.js` и кастомные скрипты темы, если они не требуют серверного рендеринга)
   - шрифты, иконки, изображения, favicon

2. Разобрать HTML-шаблоны темы (`index.html`, страница поста, страница списка постов и т.д.) на:
   - `src/layouts/BaseLayout.astro` — общий `<head>`, подключение CSS/JS, `<body>` обёртка
   - `src/components/Header.astro`
   - `src/components/Footer.astro`
   - `src/components/PostCard.astro` — карточка поста в списке
   - `src/components/Sidebar.astro` (если есть в теме)
   - любые другие повторяющиеся блоки — выносить в отдельные компоненты с пропсами, а не дублировать HTML

3. Сохранить оригинальную вёрстку и CSS-классы Bootstrap как есть — не переписывать на Tailwind и не менять дизайн, только конвертировать структуру в компоненты Astro.

4. Если тема использует Bootstrap JS-виджеты (dropdown, modal, carousel, offcanvas) — подключить `bootstrap.bundle.min.js` глобально через layout, либо через npm-пакет `bootstrap` с импортом в `<script>` секции конкретного компонента.

## Часть 3. Content Collections для блога

1. Создать `src/content/config.ts` со схемой коллекции `posts` (Zod):
   - `title: string`
   - `description: string`
   - `pubDate: date`
   - `updatedDate: date, optional`
   - `heroImage: string, optional`
   - `tags: array of string, optional`
   - `draft: boolean, default false`

2. Создать `src/content/posts/` с 1–2 тестовыми markdown-постами для проверки рендера.

3. Страницы:
   - `src/pages/notes/index.astro` — список постов, использует `PostCard.astro`
   - `src/pages/notes/[...slug].astro` — страница одного поста, рендерит markdown через `<Content />` в вёрстке темы (карточка/типографика поста из Reporter Bootstrap)

4. Если в теме есть отдельная сущность "проекты" (портфолио/работы) — сделать по аналогии вторую коллекцию `projects` с полями под существующую структуру темы.

## Часть 4. Keystatic (local storage)

1. Установить пакеты:
   ```bash
   npm install --save-dev @keystatic/core @keystatic/astro
   ```

2. Подключить интеграцию в `astro.config.mjs`:
   ```js
   import { defineConfig } from "astro/config";
   import keystatic from "@keystatic/astro";

   export default defineConfig({
     integrations: [keystatic()],
     output: "static", // Keystatic-роуты работают поверх, дев-режим их обслуживает отдельно
   });
   ```

3. Создать `keystatic.config.ts` в корне проекта:
   ```ts
   import { config, fields, collection } from "@keystatic/core";

   export default config({
     storage: {
       kind: "local",
     },
     collections: {
       posts: collection({
         label: "Posts",
         slugField: "title",
         path: "src/content/posts/*",
         format: { contentField: "content" },
         schema: {
           title: fields.slug({ name: { label: "Title" } }),
           description: fields.text({ label: "Description" }),
           pubDate: fields.date({ label: "Publish date" }),
           updatedDate: fields.date({ label: "Updated date" }),
           heroImage: fields.image({ label: "Hero image", directory: "public/images/posts" }),
           tags: fields.array(fields.text({ label: "Tag" }), { label: "Tags", itemLabel: (props) => props.value }),
           draft: fields.checkbox({ label: "Draft", defaultValue: false }),
           content: fields.markdoc({ label: "Content" }),
         },
       }),
     },
   });
   ```
   Схема полей должна **зеркально повторять** Zod-схему из `src/content/config.ts` — при изменении одной обновлять вторую.

3. Если в теме есть коллекция `projects` — добавить аналогичную коллекцию в `keystatic.config.ts`.

4. Обновить `package.json`:
   ```json
   {
     "scripts": {
       "dev": "concurrently \"node scripts/git-commit-server.mjs\" \"astro dev\""
     }
   }
   ```
   Установить `concurrently`:
   ```bash
   npm install --save-dev concurrently
   ```
   Keystatic-админка при `local` storage доступна прямо на `/keystatic` в том же дев-сервере Astro — отдельный процесс для самого Keystatic не нужен (в отличие от Tina).

5. Проверить, что после `npm run dev` админка открывается на `http://localhost:4321/keystatic` и позволяет редактировать тестовые посты, сохранения сразу видны в файлах `src/content/posts/*.md`.

6. **Кнопка "Commit & Push"**:

   Так как Keystatic со `storage: { kind: "local" }` только пишет в файлы и не коммитит, нужна отдельная маленькая панель/кнопка рядом с рабочим процессом:

   a. Создать `scripts/git-commit-server.mjs` — локальный HTTP-сервер на `127.0.0.1:4001`, слушающий только localhost, с эндпоинтом `POST /commit`, который:
      - делает `git add -A`
      - проверяет `git diff --cached --name-only` — если пусто, возвращает `{ ok: true, changed: false }`
      - если есть изменения — коммитит с сообщением из тела запроса (`{ message: string }`) и делает `git push`
      - возвращает JSON-статус (`ok`, `changed`, `error`)

   b. Так как Keystatic (в отличие от Tina) не имеет системы toolbar-плагинов, кнопку нужно добавить одним из способов — на выбор AI-агента, с объяснением выбора:
      - **Вариант А (проще):** отдельная страница `src/pages/commit.astro` с формой (текстовое поле commit message + кнопка), которая делает `fetch` на `http://127.0.0.1:4001/commit`, доступна по адресу `/commit` рядом с `/keystatic`.
      - **Вариант Б:** небольшой floating-виджет (фиксированная кнопка в углу экрана), подключаемый глобально через layout, видимый только в дев-режиме (`import.meta.env.DEV`).

   c. Учесть, что этот функционал — чисто dev-инструмент, работает только при локальном запуске `npm run dev`, на проде (статика на GitHub Pages) не нужен и не должен ломать билд — оборачивать в проверку `import.meta.env.DEV` или не собирать страницу `/commit` в прод-билд.

## Часть 5. Проверка

По завершении должно работать:
- [ ] `npm run dev` поднимает Astro-сайт с темой Reporter Bootstrap, вёрстка и стили не сломаны
- [ ] `/notes` показывает список тестовых постов, `/notes/<slug>` открывает конкретный пост
- [ ] `/keystatic` открывает админку Keystatic, можно отредактировать пост, изменения сразу видны в markdown-файлах
- [ ] Кнопка/страница "Commit & Push" коммитит и пушит изменения в текущую ветку git
- [ ] `npm run build` собирает статику без ошибок, готовую к деплою на GitHub Pages, dev-инструменты (`/commit`, git-сервер) не попадают в прод-сборку

## Что НЕ делать

- Не менять дизайн/CSS темы Reporter Bootstrap — только конвертация структуры в Astro-компоненты.
- Не настраивать GitHub App / `storage: { kind: "github" }` — только `local`.
- Не переписывать существующий git-workflow (веб-хуки, GitHub Actions деплой) без предварительного согласования.
