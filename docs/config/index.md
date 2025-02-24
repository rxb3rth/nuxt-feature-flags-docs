# Module Configuration

## Options

The module accepts the following options:

```ts
interface FeatureFlagsConfig {
  flags?: FlagDefinition // Inline feature flags object
  config?: string // Path to configuration file
}

type FlagDefinition = Record<string, boolean>
```

## Configuration Methods

### 1. Inline Configuration

Define your feature flags directly in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  featureFlags: {
    flags: {
      promoBanner: true,
      betaFeature: false,
      newDashboard: false
    }
  }
})
```

### 2. Configuration File

Use a separate configuration file for more complex scenarios:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  featureFlags: {
    config: './feature-flags.config.ts',
  }
})

// feature-flags.config.ts
export default {
  isAdmin: false,
  newDashboard: true,
  experimentalFeature: true,
  promoBanner: false,
  betaFeature: false,
}
```

### 3. Context-Aware Configuration

Create dynamic flags based on request context:

```ts
// feature-flags.config.ts
import type { H3EventContext } from 'h3'

export default function featureFlagsConfig(context?: H3EventContext) {
  return {
    isAdmin: context?.user?.role === 'admin',
    newDashboard: true,
    experimentalFeature: process.env.NODE_ENV === 'development',
    promoBanner: false,
    betaFeature: context?.user?.isBetaTester ?? false,
  }
}
```