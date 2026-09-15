import { useMemo, useState } from 'react'
import {
  ALL_TIERS,
  effectiveTier,
  fishData,
  searchFish,
  type SafetyTier,
} from './data/fish'
import { Disclaimer } from './components/Disclaimer'
import { FilterChips } from './components/FilterChips'
import { FishCard } from './components/FishCard'
import { SearchBar } from './components/SearchBar'
import { SwimmingFish } from './components/SwimmingFish'

export default function App() {
  const [query, setQuery] = useState('')
  const [selectedTiers, setSelectedTiers] = useState<Set<SafetyTier>>(
    () => new Set(ALL_TIERS),
  )
  const [pregnancyMode, setPregnancyMode] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleTier = (tier: SafetyTier) => {
    setSelectedTiers((prev) => {
      const next = new Set(prev)
      if (next.has(tier)) {
        if (next.size === 1) return next
        next.delete(tier)
      } else {
        next.add(tier)
      }
      return next
    })
  }

  const filtered = useMemo(() => {
    return searchFish(query).filter((f) => {
      const tier = effectiveTier(f.tier, pregnancyMode)
      return selectedTiers.has(tier)
    })
  }, [query, selectedTiers, pregnancyMode])

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-4 pb-16 pt-6 sm:px-6">
      <header className="mb-6">
        <SwimmingFish variant="hero" />
        <p className="text-center text-xs font-medium tracking-widest text-sky-700/80">
          SUSHI MERCURY LOOKUP
        </p>
        <h1 className="mt-1 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          迴轉壽司魚類重金屬速查
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          邊轉邊查：依公開汞含量指引，快速判斷這盤該不該多夾一點。
        </p>
      </header>

      <div className="space-y-4">
        <SearchBar value={query} onChange={setQuery} />
        <FilterChips
          selected={selectedTiers}
          onToggle={toggleTier}
          pregnancyMode={pregnancyMode}
          onPregnancyMode={setPregnancyMode}
        />
      </div>

      <p className="mt-5 mb-3 text-sm text-slate-500" aria-live="polite">
        共 {fishData.length} 種常見品項 · 顯示 {filtered.length} 筆
        {pregnancyMode ? '（孕婦／嬰幼兒模式）' : ''}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-sky-200 bg-white/60 py-8 text-center">
          <SwimmingFish variant="empty" />
          <p className="mt-2 text-slate-600">找不到符合的魚種</p>
          <p className="mt-1 text-sm text-slate-400">試試「鮭」「マグロ」「squid」，或放寬篩選</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((fish) => (
            <li key={fish.id}>
              <FishCard
                fish={fish}
                pregnancyMode={pregnancyMode}
                expanded={expandedId === fish.id}
                onToggle={() =>
                  setExpandedId((id) => (id === fish.id ? null : fish.id))
                }
              />
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8">
        <Disclaimer />
      </div>

      <footer className="mt-6 text-center text-xs text-slate-400">
        靜態前端 · Vite + React + TypeScript + Tailwind · 資料可於 src/data/fish.ts 更新
      </footer>
    </div>
  )
}
