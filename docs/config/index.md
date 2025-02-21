# Module Configuration

## Options

The module accepts the following options:

```ts
interface ModuleOptions {
  flags?: Record<string, FlagDefinition>
  defaultContext?: Record<string, any>
  envKey?: string
  contextPath?: string
}
```

### flags

Define your feature flags:

```ts
export default defineNuxtConfig({
  featureFlags: {
    flags: {
      // Simple boolean flag
      simpleFlag: true,
      
      // Percentage rollout
      betaFeature: { percentage: 50 },
      
      // Context-based evaluation
      premiumFeature: (ctx) => ctx.user?.isPremium
    }
  }
})
```

### defaultContext

Set default context values:

```ts
export default defineNuxtConfig({
  featureFlags: {
    defaultContext: {
      environment: process.env.NODE_ENV,
      region: 'US'
    }
  }
})
```

### envKey

Configure the environment variable key for runtime flags:

```ts
export default defineNuxtConfig({
  featureFlags: {
    envKey: 'NUXT_PUBLIC_FEATURE_FLAGS'
  }
})
```

### contextPath

Specify the path to your context file:

```ts
export default defineNuxtConfig({
  featureFlags: {
    contextPath: '~/feature-flags.context'
  }
})
```