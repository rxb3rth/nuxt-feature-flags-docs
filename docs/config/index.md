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
import { defineFeatureFlags } from '#feature-flags/handler'

export default defineFeatureFlags(() => ({
  isAdmin: false,
  newDashboard: true,
  experimentalFeature: true,
  promoBanner: false,
  betaFeature: false,
}))
```

### 3. Context-Aware Configuration

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
  }
})
```

## Usage Examples

### Client-Side Usage

```ts
const { isEnabled } = useFeatureFlags()

// Check if a flag is enabled
if (isEnabled('newFeature')) {
  // Feature is enabled
}
```

### Server-Side Usage

```ts
const { isEnabled } = getFeatureFlags(event)

// Check if a flag is enabled
if (isEnabled('newFeature')) {
  // Feature is enabled
}
```

## Best Practices

1. **Use Descriptive Names**: Choose clear, descriptive names for your feature flags that indicate their purpose.

2. **Document Your Flags**: Add comments to explain what each flag controls and any special conditions.

3. **Clean Up Old Flags**: Remove feature flags that are no longer needed after features are fully rolled out.

4. **Group Related Flags**: Organize related flags together in your configuration.

5. **Default Values**: Always provide sensible default values for your flags.

Example of well-organized flags:

```ts
import { defineFeatureFlags } from '#feature-flags/handler'

export default defineFeatureFlags((context) => {
  return {
    // User features
    isAdmin: context?.user?.role === 'admin',
    isPremium: context?.user?.subscription === 'premium',
    
    // UI features
    newDashboard: true,
    betaInterface: false,
    
    // Experimental features
    experimentalApi: process.env.NODE_ENV === 'development',
    betaFeatures: context?.user?.isBetaTester ?? false,
  }
})
```