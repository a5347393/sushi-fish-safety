type Props = {
  value: string
  onChange: (v: string) => void
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <label className="block">
      <span className="sr-only">搜尋魚種</span>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="搜尋中文／日文／英文，例如：鮪、サーモン、shrimp…"
          className="w-full rounded-2xl border border-sky-100 bg-white/90 py-3.5 pl-10 pr-4 text-base text-slate-800 shadow-sm outline-none ring-sky-300 placeholder:text-slate-400 focus:ring-2"
          autoComplete="off"
          enterKeyHint="search"
        />
      </div>
    </label>
  )
}
