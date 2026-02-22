# Reference: Frontend Build Requirements

Package and styling notes from reference build assets.

## Recommended Packages

| Package | Purpose |
|---------|---------|
| framer-motion | Smooth page transitions, staggering lists, and visual flair |
| recharts | Visualizing maturity scores (radar/bar charts) |
| lucide-react | Iconography |
| clsx | Conditional class names |
| tailwind-merge | Merging Tailwind classes |

## Tailwind Font Config

```js
// tailwind.config
fontFamily: {
  display: ["var(--font-display)"],
  body: ["var(--font-body)"],
  mono: ["var(--font-mono)"],
}
```

## Font Stack (Reference)

- **Display**: Space Grotesk
- **Body**: Manrope
- **Mono**: JetBrains Mono
