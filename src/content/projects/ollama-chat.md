---
title: Ollama-chat
description: Ollama Chat is a conversational AI
pubDate: 2026-10-12
heroImage: /images/project/chat.png
tags:
  - Ollama
draft: false
---
## **What's new in this fork**

- **Completely redesigned theme** — light / dark (`prefers-color-scheme` + `data-theme`), new sidebar / composer / messages layout, mobile-responsive. See `src/ollama_chat/static/app.css` and `src/ollama_chat/static/app.js`.
- **Thinking mode toggle** — paw button in composer. Sends `{"think": true|false}` via `startConversation` / `replyConversation` → `ChatManager(think=...)` → `ollama_chat(..., think=...)` (`src/ollama_chat/ollama.py:43`, `src/ollama_chat/chat.py:23`). Persisted in `localStorage` (`ollama-chat-thinking`). Visual state `icon-btn thinking-active` (`src/ollama_chat/static/app.css:777`).
- **Web search (tool calling)** — globe button left of the thinking paw. Sends `{"search": true|false}`, the back-end hands Ollama two tools (`web_search`, `fetch_page`) and runs the `tool_calls` loop (max 5 rounds per answer) → `ChatManager(search=...)` → `ollama_chat(..., tools=...)` (`src/ollama_chat/web_tools.py`, `src/ollama_chat/chat.py`). Persisted in `localStorage` (`ollama-chat-websearch`), off by default. Active class `icon-btn websearch-active`; used tools are shown as a collapsible block in the chat.
- **File attachments** — upload button in composer, **up to 10 files per message** (selected files accumulate, each chip has a remove button, `3 / 10` counter). Supported: `txt`, `md`, `docx`, `png`, `jpg`, `jpeg`. Text is appended to user message, `docx` parsed with `python-docx`, images sent as base64 `images` (`src/ollama_chat/chat.py:67`, `src/ollama_chat/static/app.js:149`). Attached file names are stored on the exchange (`ConversationFileRef`) and shown as chips above each user message, sending with empty text allowed.
- **Markdown viewer (.md preview in chat)** — button next to theme toggle in sidebar toolbar. Opens system file picker (`accept=".md,.markdown"`), reads file with `FileReader` and renders it **inside the chat area** via `marked` + `DOMPurify` (`src/ollama_chat/static/app.js:505`, `src/ollama_chat/static/app.css:987`). Header shows filename + `Close preview` button, `Esc` also closes. No upload to server, works offline.
- **Reliable rename** — `Rename` in chat menu now updates both sidebar and open header instantly and awaits `POST /setConversationTitle` before navigation (`src/ollama_chat/static/app.js:885`, `src/ollama_chat/static/ollamaChatConversation.bare:312`).
- **One-click Windows launch — `start.bat` / `install.bat`** — `install.bat` clones to clean folder + creates `.venv`, `start.bat` creates `.venv` if missing and forwards all args to `ollama-chat` (e.g. `start.bat -p 8080`).

**Ollama Chat** is a conversational AI chat client that uses [Ollama](https://ollama.com/) to interact with local large language models (LLMs) entirely offline. Ideal for AI enthusiasts, developers, or anyone wanting private, offline LLM chats.

> **Fork:** [OlegUshakov-pl/ollama-chat](https://github.com/OlegUshakov-pl/ollama-chat) — fork of [craigahobbs/ollama-chat](https://github.com/craigahobbs/ollama-chat) with a redesigned theme, thinking-mode toggle, and file attachments.

## **Quick start**

Requirements: [Ollama](https://ollama.com/download) running + Python 3.11+ and Git on `PATH`.

### **Option A — via `install.bat` (clean folder, recommended for Windows)**

The easiest way for new users — just copy `install.bat` into an empty folder and run it:

1. Create an empty folder and copy `install.bat` from this repository into it (or [download it](https://github.com/OlegUshakov-pl/ollama-chat/raw/main/install.bat)).

1. Double-click `install.bat` (or run `install.bat` from a console).

   `install.bat:1` will clone `https://github.com/OlegUshakov-pl/ollama-chat.git` into `.\ollama-chat` (if not already present), create `.venv`, upgrade `pip`, and run `pip install -e .` (includes `python-docx` for `.docx` support).

1. Go to the cloned folder and start the server:

   ```
   cd ollama-chat
   start.bat
   ```

   The app opens at [http://127.0.0.1:8080/](http://127.0.0.1:8080/) , config file is `ollama-chat.json` in the user's home directory.

### **Option B — via `start.bat` (if you already cloned)**

```
git clone https://github.com/OlegUshakov-pl/ollama-chat.git
cd ollama-chat
start.bat
```

What `start.bat` does (`start.bat:1`):

1. Creates `.venv` in the project root if missing (`python -m venv .venv`).
1. Activates the environment and removes stale `~*` directories from `site-packages`.
1. Installs dependencies and the package (`pip install -e .`) if `.venv\Scripts\ollama-chat.exe` is not yet present (skips on re-run, works offline).
1. Runs `ollama-chat %*` — all arguments are forwarded (e.g. `start.bat -p 8080 -h 127.0.0.1`).

You can also double-click `start.bat` in File Explorer.

> If `OLLAMA_HOST` is not `http://127.0.0.1:11434`, set the environment variable before launching — see `src/ollama_chat/ollama.py:19`.

### [**Ollama-chat**](https://github.com/OlegUshakov-pl/ollama-chat)
