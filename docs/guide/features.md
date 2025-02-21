# Features

## Context-Aware Evaluation

Nuxt Feature Flags allows you to evaluate flags based on various contexts:

- User data
- Environment variables
- Cookies
- Custom contexts

## Server-Side Support

Flags can be evaluated on the server side, enabling:

- Consistent behavior across server and client
- Better performance
- SEO optimization

## TypeScript Support

Full TypeScript support with:

- Type-safe flag definitions
- Autocomplete support
- Type inference

## Explanation System

Get detailed explanations for flag states:

```ts
const { get } = useFeatureFlags()
const flag = get('experimentalFeature')

console.log(flag.explanation) // Why the flag is enabled/disabled
```

## Nuxt 3 Integration

Seamless integration with Nuxt 3:

- Composables for easy access
- Runtime config support
- Auto-imports