---
title: Ollama-chat
description: Ollama Chat is a conversational AI
pubDate: 2026-11-02
heroImage: /images/project/chat.png
tags:
  - Ollama
draft: false
---
**Ollama Chat** is a conversational AI chat client that uses [Ollama](https://ollama.com/) to interact with local large language models (LLMs) entirely offline. Private, fast, no cloud.

## **What's new in this fork**

- **Completely redesigned theme** — light / dark (`prefers-color-scheme` + `data-theme`), new sidebar / composer / messages layout, mobile-responsive. See `src/ollama_chat/static/app.css` and `src/ollama_chat/static/app.js`.
- **Thinking mode toggle** — paw button in composer. Sends `{"think": true|false}` via `startConversation` / `replyConversation` → `ChatManager(think=...)` → `ollama_chat(..., think=...)` (`src/ollama_chat/ollama.py:43`, `src/ollama_chat/chat.py:23`). Persisted in `localStorage` (`ollama-chat-thinking`). Visual state `icon-btn thinking-active` (`src/ollama_chat/static/app.css:777`).
- **Web search (tool calling)** — globe button left of the thinking paw. Sends `{"search": true|false}`, the back-end hands Ollama two tools (`web_search`, `fetch_page`) and runs the `tool_calls` loop (max 5 rounds per answer) → `ChatManager(search=...)` → `ollama_chat(..., tools=...)` (`src/ollama_chat/web_tools.py`, `src/ollama_chat/chat.py`). Persisted in `localStorage` (`ollama-chat-websearch`), off by default. Active class `icon-btn websearch-active`; used tools are shown as a collapsible block in the chat.
- **File attachments** — upload button in composer, **up to 10 files per message** (selected files accumulate, each chip has a remove button, `3 / 10` counter). Supported: `txt`, `md`, `docx`, `png`, `jpg`, `jpeg`. Text is appended to user message, `docx` parsed with `python-docx`, images sent as base64 `images` (`src/ollama_chat/chat.py:67`, `src/ollama_chat/static/app.js:149`). Attached file names are stored on the exchange (`ConversationFileRef`) and shown as chips above each user message, sending with empty text allowed.
- **Markdown viewer (.md preview in chat)** — button next to theme toggle in sidebar toolbar. Opens system file picker (`accept=".md,.markdown"`), reads file with `FileReader` and renders it **inside the chat area** via `marked` + `DOMPurify` (`src/ollama_chat/static/app.js:505`, `src/ollama_chat/static/app.css:987`). Header shows filename + `Close preview` button, `Esc` also closes. No upload to server, works offline.
- **Reliable rename** — `Rename` in chat menu now updates both sidebar and open header instantly and awaits `POST /setConversationTitle` before navigation (`src/ollama_chat/static/app.js:885`, `src/ollama_chat/static/ollamaChatConversation.bare:312`).
- **One-click Windows launch — `start.bat` / `install.bat`** — `install.bat` clones to clean folder + creates `.venv`, `start.bat` creates `.venv` if missing and forwards all args to `ollama-chat` (e.g. `start.bat -p 8080`).
- **Workspace & long-term memory** — a directory on disk (`~/ollama-chat-workspace` by default) holding `USER.md` (about the user) and `MEMORY.md` (durable notes). The memory is injected into the system prompt for every model turn (`src/ollama_chat/memory.py`), managed from the chat with `/memory`, `/remember`, `/forget`. Set on the **Settings** page (`#/settings`) or via the `OLLAMA_CHAT_WORKSPACE` env var.
- **Settings and Tasks pages** — the home page is chat-only now: workspace and Gmail (IMAP/SMTP) settings moved to **Settings** (`#/settings`), the task manager moved to **Tasks** (`#/tasks`). The sidebar shows the workspace name and `Settings` / `Tasks` links. The server binds to `127.0.0.1` only.
- **Gmail / email settings in the app** — IMAP/SMTP host+port, login and an app password are edited on the Settings page and written to `<workspace>/.env` (same format as `.env.example`). The password is write-only: it is never stored in `ollama-chat.json`, never committed to git and never sent back to the browser (only a `hasPassword` flag is returned). **Test connection** logs in to both servers without sending anything.
- **Profile page (`#/profile`)** — a form (name, profession, country, city, time zone, languages, interests, equipment, reply style, …) that fills `memory/USER.md`; the form can be switched to a raw **Text** mode to edit `USER.md` as markdown. `USER.md` is added to the system prompt of every message (character limit: config key `profileLimit`, default `1500`), and the current date and time (time zone from `USER.md`'s `Timezone` line, or local) are injected with it. API: `GET /getProfile`, `POST /setProfile`.

## **Quick start**

Requirements: [Ollama](https://ollama.com/download) running + Python 3.11+ and Git on `PATH`.

### **Option A — via `install.bat` (Windows, recommended)**

1. Create empty folder, copy `install.bat` into it (or [download](https://github.com/OlegUshakov-pl/ollama-chat/raw/main/install.bat)).

1. Double-click `install.bat`.

   Clones to `.\ollama-chat`, creates `.venv`, `pip install -e .`.

1. ```
   cd ollama-chat
   start.bat
   ```

   Opens [http://127.0.0.1:8080/](http://127.0.0.1:8080/) , config is `ollama-chat.json` in home directory.

### [**Ollama-chat**](https://github.com/OlegUshakov-pl/ollama-chat)
