# Nuxt Feature Flags 🚩

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A powerful, type-safe feature flag module for Nuxt 3 that enables both static and dynamic flag evaluation with server-side support. Perfect for A/B testing, gradual rollouts, and feature management.

## Features

- 🎯 **Context-aware evaluation**: Evaluate flags based on request context (user roles, geo-location, device type, etc.)
- 🛠 **TypeScript Ready**: Full TypeScript support with type-safe flag definitions and autocomplete
- 🧩 **Nuxt 3 Integration**: Seamless integration with auto-imports and runtime config
- 🎯 **Static & Dynamic Flags**: Support for both simple boolean flags and dynamic evaluation
- 🔒 **Type Safety**: Catch errors early with full type inference and validation

## Quick Setup

1. Add the module to your Nuxt project:

```bash
npx nuxi module add nuxt-feature-flags
```

2. Configure in `nuxt.config.ts`:

Basic usage with plain configuration:
```ts
export default defineNuxtConfig({
  modules: ['nuxt-feature-flags'],
  featureFlags: {
    flags: {
      newDashboard: false,
      experimentalFeature: true
    }
  }
})
```

Basic usage with configuration file:
```ts
export default defineNuxtConfig({
  modules: ['nuxt-feature-flags'],
  featureFlags: {
    config: './feature-flags.config.ts',
  }
})
```

Advanced usage with context-based flag rules (Only for API route requests):
```ts
// feature-flags.config.ts
import type { H3EventContext } from 'h3'

// Context available only on server, context will be undefined at the client side
export default function featureFlagsConfig(context?: H3EventContext) {
  return {
    isAdmin: context?.user?.role === 'admin',
    newDashboard: true,
    experimentalFeature: process.env.NODE_ENV === 'development',
    promoBanner: false,
    betaFeature: false,
  }
}
```

3. Use in components:

```vue
<script setup>
const { isEnabled } = useClientFlags()
</script>

<template>
  <div>
    <NewDashboard v-if="isEnabled('newDashboard')" />
  </div>
</template>
```

4. Use in Server Routes:

```ts
// server/api/dashboard.ts
export default defineEventHandler((event) => {
  const { isEnabled } = await useServerFlags(event)

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

[npm-version-src]: https://img.shields.io/npm/v/nuxt-feature-flags/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-feature-flags
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-feature-flags.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-feature-flags
[license-src]: https://img.shields.io/npm/l/nuxt-feature-flags.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-feature-flags
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com