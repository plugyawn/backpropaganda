---
title: "Activault: Fast Activation Storage"
description: "A storage layout for activation captures that keeps high-volume interpretability work searchable and cheap."
category: "TECHNICAL RELEASE"
date: 2025-03-17
displayDate: "03.17.25"
visual: "vault"
---

Activation storage is often treated as a logging problem, but the retrieval pattern is closer to a scientific database. Researchers want slices by layer, token, feature, prompt family, and training checkpoint.

Activault is a design note for making those slices cheap without forcing every experiment into the same analysis format.
