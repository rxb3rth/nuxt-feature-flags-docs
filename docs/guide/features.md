# Features

## Server-Side Support

Flags can be evaluated on the server side, enabling:

- Consistent behavior across server and client
- Better performance
- SEO optimization
- Protected API routes

## TypeScript Support

Full TypeScript support with:

- Type-safe flag definitions
- Autocomplete support
- Type inference

## Explanation System

Get detailed explanations for flag states:

```ts
const { get } = useClientFlags()
const flag = get('experimentalFeature')

console.log(flag.explanation) // Why the flag is enabled/disabled
```

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