---
title: "Regression is All You Need"
description: "A compact derivation of attention through the lens of nonparametric regression."
category: "VIGNETTE"
date: 2025-08-28
displayDate: "08.28.25"
visual: "curve"
---

Attention can be read as retrieval, routing, soft indexing, or a differentiable database query. The regression view is useful because it makes the bias-variance trade explicit.

Keys define neighborhoods, values define local targets, and the softmax temperature controls how much evidence each neighborhood is allowed to borrow from its neighbors.
