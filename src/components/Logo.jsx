import { logos } from '../logos'

// Renders a platform or tool logo if we have one for that name; otherwise nothing.
export default function Logo({ name, className = 'size-4' }) {
  const d = logos[name]
  if (!d) return null
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 fill-current ${className}`} role="img" aria-label={`${name} logo`}>
      <path d={d} />
    </svg>
  )
}
