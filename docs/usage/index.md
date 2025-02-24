# Basic Usage

## Client-Side Usage

Use the `useClientFlags` composable in your components:

```vue
<script setup>
const { isEnabled, flags } = useClientFlags()

// Check if a flag is enabled
const showNewFeature = isEnabled('newFeature')

// Access all flags
console.log(flags)
</script>

<template>
  <div>
    <NewFeature v-if="showNewFeature" />
  </div>
</template>
```

## Server-Side Usage

Use the `useServerFlags` composable in your server routes:

```ts
export default defineEventHandler(async (event) => {
  const { isEnabled } = await useServerFlags(event)

  // Check if a flag is enabled
  if (!isEnabled('newFeature')) {
    throw createError({
      statusCode: 404,
      message: 'Feature not available'
    })
  }

  return {
    // Your response data
  }
})
```

## Context-Based Usage

Create dynamic flags based on request context:

```ts
// feature-flags.config.ts
import type { H3EventContext } from 'h3'

export default function featureFlagsConfig(context?: H3EventContext) {
  return {
    // User role-based flag
    isAdmin: context?.user?.role === 'admin',
    
    // Environment-based flag
    devTools: process.env.NODE_ENV === 'development',
    
    // User status-based flag
    betaFeature: context?.user?.isBetaTester ?? false,
    
    // Device-based flag
    mobileFeature: context?.device?.isMobile ?? false,
    
    // Static flags
    newDashboard: true,
    promoBanner: false,
  }
}
```

## Type Safety

The module provides full TypeScript support:

```ts
// Your flags will be type-checked
const { isEnabled } = useClientFlags()
isEnabled('nonExistentFlag') // TypeScript error
```