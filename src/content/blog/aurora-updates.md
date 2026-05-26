---
title: "Aurora: Leverage-Aware Updates for Rectangular Matrices"
description: "A steepest-descent view of rectangular updates where row leverage and orthogonality are treated as first-class constraints."
category: "TECHNICAL RELEASE"
date: 2026-05-08
displayDate: "05.08.26"
visual: "aurora"
---

Many optimizer stories are easiest to tell for square matrices, but the models we train are full of rectangular projections. Aurora is a note about treating those shapes directly.

The core idea is to measure update quality under two simultaneous pressures: rows should not concentrate all the movement, and the update should preserve useful geometry where the layer is already well conditioned.

This draft keeps the math compact and pairs each claim with the diagnostic we would run before trusting it in a large training job.
