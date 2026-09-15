import { TIER_META, type SafetyTier } from '../data/fish'

type Props = {
  tier: SafetyTier
  size?: 'sm' | 'md'
}

export function TierBadge({ tier, size = 'md' }: Props) {
  const meta = TIER_META[tier]
  const pad = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'
  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${pad} ${meta.bg} ${meta.color} ${meta.border}`}
    >
      {meta.label}
    </span>
  )
}
