---
title: "Sieve: Sparse Features for Code Generation"
description: "A code-generation case study where sparse feature interventions are compared against simple baselines."
category: "TECHNICAL RELEASE"
date: 2024-12-15
displayDate: "12.15.24"
visual: "sieve"
---

Sparse features are only useful if they survive contact with downstream tasks. Sieve frames interventions as a controlled editing problem: choose a feature set, apply a minimal change, and compare against non-feature baselines.

The result we care about is not a single win. It is a repeatable protocol for deciding when a feature is causal enough to use.
