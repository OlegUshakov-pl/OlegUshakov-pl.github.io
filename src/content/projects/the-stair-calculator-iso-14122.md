---
title: The stair calculator ISO 14122
description: the-stair-calculator-ISO-14122
pubDate: 2026-07-12
heroImage: /images/project/stair.png
tags:
  - Project
draft: false
---
# **Industrial Stair Calculator**

[The stair calculator ISO 14122](https://github.com/OlegUshakov-pl/the-stair-calculator-ISO-14122)

A Streamlit-based tool for calculating and verifying industrial stairs and stepladders per **ISO 14122-3:2016**.

## **Features**

- Geometry calculation from step count (N), tread (g) and overlap (r)
- Bottom platform (B), bottom offset (Pdown) and top offset (Pup) support
- Automatic type detection: **Stairs** (20°–45°) or **Stepladders** (45°–75°)
- ISO 14122-3 compliance checks:
  - Inclination angle
  - Blondel formula (600 ≤ g + 2h ≤ 660)
  - Minimum tread depth (g)
  - Maximum riser height (h)
- Side-view SVG visualization with dimensions (H, L, angle, B, Pdown, Pup)
- Real-time feedback — compliant steps in blue, violations in red

Demo is [**here**](https://the-stair-calculator-iso-14122-3.streamlit.app/)
