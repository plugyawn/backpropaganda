---
title: "The Rate Distortion Dance of Sparse Autoencoders"
description: "A vignette on why sparse autoencoder quality moves through compression, reconstruction, and interpretability at once."
category: "VIGNETTE"
date: 2024-11-12
displayDate: "11.12.24"
visual: "rate"
---

Sparse autoencoders are easy to over-score on a single axis. Reconstruction loss, sparsity, feature monosemanticity, and downstream usefulness all move together, but not always in the direction we want.

The rate-distortion lens gives us a cleaner language for those tradeoffs. It asks what information we kept, what we threw away, and whether the surviving representation is actually easier to reason about.
