# Nuxt Feature Flags 🚩

A powerful, type-safe feature flag module for Nuxt 3 that enables both static and dynamic feature flag evaluation with server-side support. Perfect for A/B testing, gradual rollouts, and feature management.

> [!WARNING]
> This project is just getting started, so things are gonna change a lot. Updates will roll out often, and we're totally open to feedback—hit us up with your thoughts!

## Features

- 🎯 **Context-aware evaluation**: Evaluate flags based on request context (user roles, geo-location, device type, etc.)
- 🛠 **TypeScript Ready**: Full TypeScript support with type-safe flag definitions and autocomplete
- 🧩 **Nuxt 3 Integration**: Seamless integration with auto-imports and runtime config
- 🎯 **Static & Dynamic Flags**: Support for both simple boolean flags and dynamic evaluation
- 🔒 **Type Safety**: Catch errors early with full type inference and validation

## Quick Setup

1. Add the module to your Nuxt project:

```bash
# Using npx
npx nuxi module add nuxt-feature-flags

# Using npm
npm install nuxt-feature-flags

# Using yarn
yarn add nuxt-feature-flags

# Using pnpm
pnpm add nuxt-feature-flags
```

2. Configure in `nuxt.config.ts`:

```ts
// Basic usage with plain configuration
export default defineNuxtConfig({
  modules: ['nuxt-feature-flags'],
  featureFlags: {
    flags: {
      newDashboard: false,
      experimentalFeature: true
    }
  }
})

// Advanced usage with context-based flag rules
// feature-flags.config.ts
import { defineFeatureFlags } from '#feature-flags/handler'

export default defineFeatureFlags((context) => {
  return {
    isAdmin: context?.user?.role === 'admin',
    newDashboard: true,
    experimentalFeature: process.env.NODE_ENV === 'development',
    betaFeature: context?.user?.isBetaTester ?? false,
  }
})
```

3. Use in your Vue components:

```vue
<script setup>
const { isEnabled } = useFeatureFlags()
</script>

<template>
  <div>
    <NewDashboard v-if="isEnabled('newDashboard')" />
  </div>
</template>
```

4. Use in your server routes:

```ts
// server/api/dashboard.ts
export default defineEventHandler(async (event) => {
  const { isEnabled } = getFeatureFlags(event)

  if (!isEnabled('newDashboard')) {
    throw createError({
      statusCode: 404,
      message: 'Dashboard not available'
    })
  }

  return {
    stats: {
      users: 100,
      revenue: 50000
    }
  }
})
```