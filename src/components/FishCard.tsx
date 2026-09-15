import {
  MERCURY_LABEL,
  TIER_META,
  effectiveTier,
  type FishItem,
} from '../data/fish'
import { TierBadge } from './TierBadge'

type Props = {
  fish: FishItem
  pregnancyMode: boolean
  expanded: boolean
  onToggle: () => void
}

export function FishCard({ fish, pregnancyMode, expanded, onToggle }: Props) {
  const displayTier = effectiveTier(fish.tier, pregnancyMode)
  const meta = TIER_META[displayTier]
  const advice = pregnancyMode ? fish.pregnancyAdviceZh : fish.adultAdviceZh

  return (
    <article
      className={`rounded-2xl border bg-white/90 shadow-sm transition hover:shadow-md ${meta.border}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full flex-col gap-2 p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 rounded-2xl"
        aria-expanded={expanded}
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{fish.nameZh}</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              {fish.nameJa ? `${fish.nameJa} · ` : ''}
              {fish.nameEn}
            </p>
          </div>
          <TierBadge tier={displayTier} />
        </div>
        <p className="text-sm text-slate-600 line-clamp-2">{fish.notesZh}</p>
        <p className="text-xs font-medium text-slate-500">{MERCURY_LABEL[fish.mercuryLevel]}</p>
        <span className="text-xs text-sky-700">{expanded ? '收合詳情 ▲' : '展開詳情 ▼'}</span>
      </button>

      {expanded && (
        <div className={`border-t px-4 pb-4 pt-3 space-y-3 ${meta.bg} rounded-b-2xl`}>
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">評級說明</h3>
            <p className="mt-1 text-sm text-slate-700">{fish.notesZh}</p>
          </section>
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">一般成人</h3>
            <p className="mt-1 text-sm text-slate-700">{fish.adultAdviceZh}</p>
          </section>
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-rose-700/80">孕婦／哺乳</h3>
            <p className="mt-1 text-sm text-slate-700">{fish.pregnancyAdviceZh}</p>
          </section>
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-800/80">嬰幼兒</h3>
            <p className="mt-1 text-sm text-slate-700">{fish.infantAdviceZh}</p>
          </section>
          {pregnancyMode && displayTier !== fish.tier && (
            <p className="rounded-xl bg-white/70 px-3 py-2 text-xs text-rose-800">
              孕婦／嬰幼兒模式下，原「{TIER_META[fish.tier].label}」以更嚴格的「{meta.label}」呈現。
              目前重點建議：{advice}
            </p>
          )}
          {fish.aliases.length > 0 && (
            <p className="text-xs text-slate-500">
              別名：{fish.aliases.slice(0, 8).join('、')}
              {fish.aliases.length > 8 ? '…' : ''}
            </p>
          )}
        </div>
      )}
    </article>
  )
}
