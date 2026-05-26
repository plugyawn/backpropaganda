---
title: "Complexity and Transformers"
description: "Can a shallow transformer compute functions that look unreachable to simple constant-depth circuits?"
category: "VIGNETTE"
date: 2025-09-15
displayDate: "09.15.25"
visual: "lattice"
---

A transformer is not just a circuit template. It is a circuit template with data-dependent routing, shared weights, and a training process that chooses which shortcuts become real.

The cleanest way to study that difference is to start with toy languages where each operation has a known complexity profile. Then we can ask whether attention learned the operation or only learned a dataset-specific alias.
