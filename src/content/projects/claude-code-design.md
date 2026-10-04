---
title: Claude Code Design
description: Ollama Fork of wieslawsoltes/ClaudeCodeDesign
pubDate: 2026-10-04
heroImage: /images/project/ClaudeCode.png
tags:
  - Ollama
draft: false
---
## **Claude Code Design — Ollama Fork of [wieslawsoltes/ClaudeCodeDesign](https://github.com/wieslawsoltes/ClaudeCodeDesign)**

**A space to think. A place to build.**

This is a fork of [Claude Code Design](https://github.com/wieslawsoltes/ClaudeCodeDesign) adapted for use with **Ollama** — run local models through the same workspace interface without an Anthropic API key.

Built with plain HTML, CSS, JavaScript modules, and a real WebGPU particle renderer. No frontend framework, CDN, or runtime package dependency.

**This is not the official Claude Code product. It is not affiliated with or endorsed by Anthropic.**

## **What's changed in this fork**

- **Ollama support** — connect to a local Ollama instance via the built-in proxy (`/api/ollama/models`, `/api/ollama/chat`)
- **No API key required** — select "Local Ollama" in the connect dialog and start chatting
- **CORS proxy** — `scripts/serve.mjs` proxies Ollama requests, eliminating browser CORS issues
- **NDJSON streaming** — handles Ollama's streaming format alongside Anthropic SSE
- **Thinking mode toggle** — the **Think** button in the composer turns Ollama reasoning on/off per request (`think: true|false`); the reasoning trace streams into a collapsible block above the answer

### [ClaudeCodeDesign](https://github.com/OlegUshakov-pl/ClaudeCodeDesign)
