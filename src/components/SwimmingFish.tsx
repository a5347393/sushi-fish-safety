type Props = {
  className?: string
  variant?: 'hero' | 'empty'
}

function FishSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 36" className={className} aria-hidden>
      <ellipse cx="38" cy="18" rx="28" ry="12" fill="currentColor" opacity="0.85" />
      <path d="M10 18 L0 6 L0 30 Z" fill="currentColor" opacity="0.7" />
      <path d="M48 8 Q52 18 48 28" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle cx="55" cy="15" r="2.2" fill="#0f172a" />
      <circle cx="55.6" cy="14.4" r="0.7" fill="#fff" />
    </svg>
  )
}

export function SwimmingFish({ className = '', variant = 'hero' }: Props) {
  if (variant === 'empty') {
    return (
      <div className={`relative mx-auto h-28 w-full max-w-xs ${className}`} aria-hidden>
        <FishSvg className="absolute left-4 top-8 h-10 w-20 text-cyan-400/70 animate-swim" />
        <FishSvg className="absolute right-6 top-14 h-7 w-14 text-sky-300/80 animate-swim-rev" />
        <span className="absolute bottom-4 left-1/3 h-2 w-2 rounded-full bg-sky-300/50 animate-bubble" />
        <span
          className="absolute bottom-2 left-1/2 h-1.5 w-1.5 rounded-full bg-cyan-200/60 animate-bubble"
          style={{ animationDelay: '1.2s' }}
        />
      </div>
    )
  }

  return (
    <div className={`pointer-events-none relative h-16 w-full overflow-hidden ${className}`} aria-hidden>
      <FishSvg className="absolute left-[8%] top-2 h-8 w-16 text-cyan-500/40 animate-swim" />
      <FishSvg className="absolute left-[55%] top-6 h-6 w-12 text-sky-400/35 animate-swim-rev" />
      <FishSvg className="absolute left-[30%] top-1 h-5 w-10 text-teal-400/30 animate-bob" />
    </div>
  )
}
