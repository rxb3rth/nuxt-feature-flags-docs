# Module Configuration

## Options

The module accepts the following options:

```ts
interface FeatureFlagsConfig {
  flags?: FlagDefinition // Feature flags object
}

type FlagDefinition = Record<string, boolean>
```

### flags

Define your feature flags:

```ts
export default defineNuxtConfig({
  featureFlags: {
    flags: {
      // Simple boolean flags
      promoBanner: true,
      betaFeature: false,
      newDashboard: false
    }
  }
})
```

## Flag Types

```ts
interface Flag<T = boolean> {
  value: T
  explanation?: {
    reason: 'STATIC' | 'TARGETING_MATCH' | 'DEFAULT'
    rule?: string
  }
}
```

The explanation object provides information about why a flag is enabled or disabled:

- `STATIC`: Flag value is statically defined
- `TARGETING_MATCH`: Flag value is determined by targeting rules
- `DEFAULT`: Flag falls back to default value