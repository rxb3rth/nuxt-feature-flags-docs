# Getting Started

## Installation

Add Nuxt Feature Flags to your project using the Nuxt CLI:

```bash
npx nuxi module add nuxt-feature-flags
```

Or manually install it using your package manager:

```bash
# Using npm
npm install nuxt-feature-flags

# Using yarn
yarn add nuxt-feature-flags

# Using pnpm
pnpm add nuxt-feature-flags
```

## Basic Setup

1. Add the module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-feature-flags']
})
```

2. Configure your flags:

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

3. Use in your components:

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

4. Use in server routes:

```ts
// server/api/dashboard.ts
export default defineEventHandler((event) => {
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