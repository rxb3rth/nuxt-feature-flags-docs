# Basic Usage

## Client-Side Usage

Use the `useFeatureFlags` composable in your components:

```vue
<script setup>
const { isEnabled, flags } = useFeatureFlags()

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

Use the `getFeatureFlags` helper in your server routes:

```ts
export default defineEventHandler(async (event) => {
  const { isEnabled, flags } = getFeatureFlags(event)

  // Check if a flag is enabled
  if (!isEnabled('newFeature')) {
    throw createError({
      statusCode: 404,
      message: 'Feature not available'
    })
  }

  // Access all flags
  console.log(flags)

  return {
    // Your response data
  }
})
```

## Context-Based Usage

Create dynamic flags based on request context:

```ts
// feature-flags.config.ts
import { defineFeatureFlags } from '#feature-flags/handler'

export default defineFeatureFlags((context) => {
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
})
```

## Type Safety

The module provides full TypeScript support:

```ts
// Your flags will be type-checked
const { isEnabled } = useFeatureFlags()
isEnabled('nonExistentFlag') // TypeScript error

// Define your flag types
interface FeatureFlags {
  newDashboard: boolean
  experimentalFeature: boolean
  betaFeature: boolean
}

// Type-safe flag access
const { flags } = useFeatureFlags<FeatureFlags>()
flags.newDashboard // TypeScript knows this is boolean
```

## Best Practices

### 1. Feature Flag Naming

Use clear, descriptive names that indicate the feature's purpose:

```ts
// Good
{
  newUserDashboard: true,
  betaSearchAlgorithm: false,
  improvedCheckout: true
}

// Avoid
{
  feature1: true,
  newStuff: false,
  test: true
}
```

### 2. Organizing Flags

Group related flags together and add comments for clarity:

```ts
import { defineFeatureFlags } from '#feature-flags/handler'

export default defineFeatureFlags((context) => {
  return {
    // User Experience Features
    newDashboard: true,
    improvedSearch: false,
    
    // Premium Features
    advancedAnalytics: context?.user?.isPremium ?? false,
    customReports: context?.user?.isPremium ?? false,
    
    // Beta Program
    betaFeatures: context?.user?.isBetaTester ?? false,
    experimentalUI: process.env.NODE_ENV === 'development',
  }
})
```

### 3. Conditional Rendering

Use feature flags for conditional rendering in components:

```vue
<template>
  <div>
    <!-- Simple flag check -->
    <NewFeature v-if="isEnabled('newFeature')" />
    
    <!-- Combined with other conditions -->
    <BetaFeature 
      v-if="isEnabled('betaFeature') && userCanAccess" 
      :user="user"
    />
    
    <!-- Toggle between versions -->
    <NewDashboard v-if="isEnabled('newDashboard')" />
    <LegacyDashboard v-else />
  </div>
</template>
```

### 4. Server-Side Protection

Always protect sensitive features on both client and server:

```ts
// server/api/premium-feature.ts
export default defineEventHandler(async (event) => {
  const { isEnabled } = getFeatureFlags(event)

  // Protect premium features
  if (!isEnabled('premiumFeature')) {
    throw createError({
      statusCode: 403,
      message: 'Premium feature not available'
    })
  }

  return {
    // Premium feature data
  }
})
```