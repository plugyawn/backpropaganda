---
title: "Gram-Space Manifold Muon"
description: "A geometric vignette on update rules that act through Gram structure rather than raw parameter displacement."
category: "VIGNETTE"
date: 2025-10-13
displayDate: "10.13.25"
visual: "mesh"
---

When an optimizer constrains a matrix to a manifold, the practical question is where the constraint lives. Raw weights are one answer; the Gram space of relations between directions is another.

This note walks through the intuition for Gram-space control, then sketches how to instrument it during training. The useful diagnostics are angular drift, rank movement, and recovery after a learning-rate change.
