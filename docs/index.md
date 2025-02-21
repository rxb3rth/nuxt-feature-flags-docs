# Nuxt Feature Flags 🚩

A feature flag module for Nuxt 3 with context-aware evaluation and server-side support, inspired by @happykit/flags.

## Features

- 🎯 &nbsp;Context-aware evaluation (user, environment, cookies)
- ⚡ &nbsp;Server-side evaluation
- 🛠 &nbsp;TypeScript ready
- 🔍 &nbsp;Explanation system for flag states
- 🧩 &nbsp;Nuxt 3 composables integration
- 🔧 &nbsp;Runtime configuration support

## Quick Setup

1. Add the module to your Nuxt project:

```bash
npx nuxi module add nuxt-feature-flags
```

2. Create a context file:

```ts
// ~/feature-flags.context.ts
import { parseCookies } from 'h3'
import { detectDevice } from '~/utils/device'

export default function featureFlagsContext(event: any) {
  return {
    user: event?.context.user,
    cookies: parseCookies(event),
    device: detectDevice(event),
    environment: process.env.NODE_ENV
  }
}
```

3. Configure in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-feature-flags'],
  featureFlags: {
    contextPath: '~/feature-flags.context',
    flags: {
      experimentalFeature: (context) => context.user?.isBetaTester
    },
    defaultContext: {
      environment: process.env.NODE_ENV
    }
  }
})
```

4. Use in components:

```vue
<script setup>
const { isEnabled, get } = useFeatureFlags()
</script>

<template>
  <div>
    <NewDashboard v-if="isEnabled('newDashboard')" />
    <div v-if="get('experimentalFeature')?.explanation">
      Flag reason: {{ get('experimentalFeature')?.explanation?.reason }}
    </div>
  </div>
</template>
```