// Small looping illustrations for the "What I do here" cards. Pure SVG + CSS.

export function TechArt() {
  return (
    <svg viewBox="0 0 160 120" className="topic-art" aria-hidden>
      <rect x="22" y="18" width="116" height="72" rx="10" fill="#1B2340" stroke="#1E2A44" strokeWidth="3" />
      <rect x="10" y="90" width="140" height="12" rx="6" fill="#C9D6EA" stroke="#1E2A44" strokeWidth="3" />
      <rect className="type-line t1" x="34" y="32" width="56" height="6" rx="3" fill="#6FF3FF" />
      <rect className="type-line t2" x="44" y="46" width="70" height="6" rx="3" fill="#FFB547" />
      <rect className="type-line t3" x="44" y="60" width="44" height="6" rx="3" fill="#F5A3C7" />
      <rect className="type-line t4" x="34" y="74" width="30" height="6" rx="3" fill="#7BC86C" />
      <g className="pen-float">
        <path d="M118 30 L140 8 L148 16 L126 38 Z" fill="#FFB547" stroke="#1E2A44" strokeWidth="2.5" />
        <path d="M118 30 L114 42 L126 38 Z" fill="#1E2A44" />
      </g>
    </svg>
  )
}

export function NatureArt() {
  return (
    <svg viewBox="0 0 160 120" className="topic-art" aria-hidden>
      <circle className="sun-spin" cx="122" cy="30" r="16" fill="#FFC84A" stroke="#1E2A44" strokeWidth="2.5" />
      <path d="M0 92 Q40 80 80 92 T160 92 V120 H0 Z" fill="#4CC3C8" />
      <path className="sea-roll" d="M0 100 Q20 94 40 100 T80 100 T120 100 T160 100 T200 100 T240 100" stroke="#fff" strokeWidth="3" fill="none" />
      <path d="M0 108 Q50 96 100 110 L100 120 L0 120 Z" fill="#F7D794" />
      <g className="palm-sway">
        <path d="M46 108 Q50 70 56 44" stroke="#7A4A22" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M56 44 Q36 30 20 44 Q38 38 56 44 Q46 20 30 16 Q52 22 56 44 Q66 18 86 20 Q66 28 56 44 Q78 34 92 48 Q72 42 56 44" fill="#5E9C3A" stroke="#1E2A44" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function PetsArt() {
  return (
    <svg viewBox="0 0 160 120" className="topic-art" aria-hidden>
      <rect x="92" y="40" width="58" height="50" rx="10" fill="#BDEBFF" stroke="#1E2A44" strokeWidth="2.5" />
      <g className="fish-swim">
        <path d="M108 64 q10 -10 22 0 q-12 10 -22 0 Z" fill="#FF7A45" stroke="#1E2A44" strokeWidth="1.5" />
        <path d="M108 64 l-7 -6 l0 12 Z" fill="#FF7A45" stroke="#1E2A44" strokeWidth="1.5" />
        <circle cx="125" cy="62" r="1.5" fill="#1E2A44" />
      </g>
      <circle className="bubble-rise" cx="136" cy="78" r="2.5" fill="none" stroke="#fff" strokeWidth="1.5" />
      <g className="bunny-hop">
        <ellipse cx="34" cy="50" rx="6" ry="16" fill="#fff" stroke="#1E2A44" strokeWidth="2" />
        <ellipse cx="48" cy="50" rx="6" ry="16" fill="#fff" stroke="#1E2A44" strokeWidth="2" />
        <circle cx="41" cy="72" r="16" fill="#fff" stroke="#1E2A44" strokeWidth="2.5" />
        <ellipse cx="44" cy="96" rx="22" ry="14" fill="#fff" stroke="#1E2A44" strokeWidth="2.5" />
        <circle cx="35" cy="70" r="2.5" fill="#1E2A44" />
        <circle cx="47" cy="70" r="2.5" fill="#1E2A44" />
        <path d="M39 77 L43 77 L41 80 Z" fill="#FF7FA3" />
      </g>
      <path d="M0 110 H160" stroke="#7BC86C" strokeWidth="6" />
    </svg>
  )
}
