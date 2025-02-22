# Basic Usage

## Client-Side Usage

Use the `useClientFlags` composable in your components:

```vue
<script setup>
const { isEnabled, get, flags } = useClientFlags()

// Check if a flag is enabled
const showNewFeature = isEnabled('newFeature')

// Get flag with explanation
const experimentalFlag = get('experimentalFeature')
console.log(experimentalFlag.explanation)

// Access all flags
console.log(flags)
</script>
```

## Server-Side Usage

Use the `useServerFlags` composable in your server routes:

```ts
export default defineEventHandler((event) => {
  const { isEnabled, get } = useServerFlags(event)

  // Check if a flag is enabled
  if (!isEnabled('newFeature')) {
    throw createError({
      statusCode: 404,
      message: 'Feature not available'
    })
  }

  // Get flag with explanation
  const flag = get('experimentalFeature')
  console.log(flag.explanation)

  return {
    // Your response data
  }
})