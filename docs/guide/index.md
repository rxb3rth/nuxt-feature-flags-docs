# Getting Started

## Installation

You can add Nuxt Feature Flags to your project using the Nuxt CLI:

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

2. Create a context file to define how flags should be evaluated:

```ts
// ~/feature-flags.context.ts
export default function featureFlagsContext(event: any) {
  return {
    // Your context properties
    environment: process.env.NODE_ENV,
    // Add more context as needed
  }
}
```

3. Configure your flags in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-feature-flags'],
  featureFlags: {
    contextPath: '~/feature-flags.context',
    flags: {
      newFeature: true,
      betaFeature: (ctx) => ctx.environment === 'development'
    }
  }
})
```