# Features

## Context-Aware Evaluation

Flags can be evaluated based on various contextual factors:

- User roles and permissions
- Geographic location
- Device type and capabilities
- Environment (development, production)
- Custom business rules

Example of context-based evaluation:

```ts
// feature-flags.config.ts
import { defineFeatureFlags } from '#feature-flags/handler'

export default defineFeatureFlags((context) => {
  return {
    isAdmin: context?.user?.role === 'admin',
    betaFeature: context?.user?.isBetaTester,
    mobileFeature: context?.device?.isMobile,
    devTools: process.env.NODE_ENV === 'development'
  }
})
```

## Server-Side Support

Flags can be evaluated on the server side, enabling:

- Consistent behavior across server and client
- Better performance
- SEO optimization
- Protected API routes

```ts
const { isEnabled } = getFeatureFlags(event)

if (!isEnabled('newFeature')) {
  throw createError({
    statusCode: 404,
    message: 'Feature not available'
  })
}
```

## TypeScript Support

Full TypeScript support with:

- Type-safe flag definitions
- Autocomplete support
- Type inference

## Static and Dynamic Evaluation

Support for both static and dynamic flag evaluation:

- Static flags for simple on/off features
- Dynamic evaluation based on context
- Type-safe flag definitions

## Nuxt 3 Integration

Seamless integration with Nuxt 3:

- Client and server composables
- Runtime config support
- Auto-imports