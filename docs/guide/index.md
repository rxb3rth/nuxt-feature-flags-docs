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

3. Use in your components:

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

4. Use in server routes:

```ts
// server/api/dashboard.ts
export default defineEventHandler((event) => {
  const { isEnabled } = useServerFlags(event)

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