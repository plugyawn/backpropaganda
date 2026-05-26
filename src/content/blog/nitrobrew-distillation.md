---
title: "Nitrobrew: Fast, Lossless Distillation for Free"
description: "A distillation sketch that caches the right teacher state instead of paying for the same logits repeatedly."
category: "TECHNICAL RELEASE"
date: 2026-04-28
displayDate: "04.28.26"
visual: "brew"
---

On-policy distillation often pays for teacher computation in the most expensive possible form: full logits at every step, even when the hidden state already contains the reusable signal.

Nitrobrew is a systems pattern for preserving that signal in a smaller interchange format. The interesting question is not whether compression is possible, but where the loss boundary actually sits.

The markdown version of this post is intentionally short so it can be replaced by a full release note without touching templates.
