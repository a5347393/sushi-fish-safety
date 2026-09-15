import { ALL_TIERS, TIER_META, type SafetyTier } from '../data/fish'

type Props = {
  selected: Set<SafetyTier>
  onToggle: (tier: SafetyTier) => void
  pregnancyMode: boolean
  onPregnancyMode: (v: boolean) => void
}

export function FilterChips({ selected, onToggle, pregnancyMode, onPregnancyMode }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2" role="group" aria-label="安全等級篩選">
        {ALL_TIERS.map((tier) => {
          const meta = TIER_META[tier]
          const active = selected.has(tier)
          return (
            <button
              key={tier}
              type="button"
              onClick={() => onToggle(tier)}
              aria-pressed={active}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
                active
                  ? `${meta.bg} ${meta.color} ${meta.border} ring-2 ${meta.ring}`
                  : 'border-slate-200 bg-white/70 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {meta.label}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={pregnancyMode}
        onClick={() => onPregnancyMode(!pregnancyMode)}
        className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 sm:w-auto ${
          pregnancyMode
            ? 'border-rose-300 bg-rose-50 text-rose-900'
            : 'border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-50'
        }`}
      >
        <span>
          <span className="block text-sm font-semibold">孕婦／嬰幼兒模式</span>
          <span className="mt-0.5 block text-xs opacity-80">
            啟用後以更嚴格標準顯示建議（適量→少吃、少吃→避開）
          </span>
        </span>
        <span
          className={`relative h-7 w-12 shrink-0 rounded-full transition ${
            pregnancyMode ? 'bg-rose-500' : 'bg-slate-300'
          }`}
          aria-hidden
        >
          <span
            className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition ${
              pregnancyMode ? 'translate-x-5' : ''
            }`}
          />
        </span>
      </button>
    </div>
  )
}
