---
title: Shaft & Key Calculator (ISO 6885)
description: The calculator solves two classic mechanical engineering tasks
pubDate: 2026-08-24
heroImage: /images/project/shaft.png
tags:
  - Project
draft: false
---
## **Purpose**

The calculator solves two classic mechanical engineering tasks:

1. **Solid shaft diameter calculation** from the torsional strength condition.
1. **Parallel key selection** (section `b × h`, groove depths `t1`/`t2`, length `l`) from bearing (crushing) and shear conditions with a subsequent `l ≤ 1.5·d` check.

Input is just **torque `T` [N·m]** and **material**. Allowable stresses are filled in automatically but can be overridden manually.

## **Features**

- Shaft diameter calculation using the mechanics of materials formula
- Rounding of the diameter up to the nearest value of the **Ra40** standard series (GOST 6636)
- Automatic key section selection per **ISO 6885** (shaft-diameter-dependent table)
- Required key length calculation by two criteria:
  - **bearing / crushing** (working height `k = h - t1`)
  - **shear** (width `b`)
- Selection of the larger of the two values and rounding to the standard length series (per **ISO 3**)
- Validation of `l ≤ 1.5·d` with a recommendation (two keys / splined connection) on failure
- Interactive **specified length check** — slider 10–300 mm with live calculation:
  - actual stresses `σ` and `τ` vs allowable
  - status `OK ✓ / FAILED ✗`
  - progress bars and utilization percentage for each criterion
- Material selection with auto-filled allowable stresses + manual override checkbox

[GitHub](https://github.com/OlegUshakov-pl/Shaft-Key-Calculator-ISO-6885)
