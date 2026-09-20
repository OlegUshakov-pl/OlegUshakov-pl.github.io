---
title: Ollama-chat
description: Ollama Chat is a conversational AI
pubDate: 2026-09-20
heroImage: /images/project/chat.png
tags:
  - Ollama
draft: false
---
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
