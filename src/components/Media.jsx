import { Parallax } from './UI.jsx'

/* Elegant marked placeholder for photography not yet supplied.
   Swap <PhotoSlot> for a real <img> when assets arrive. */
export function PhotoSlot({ label = 'Portrait', ratio = '3/4', tone = 'stone', className = '', parallax = false, children }) {
  const tones = {
    stone: 'from-stone to-ivory-dim',
    copper: 'from-copper/70 to-copper-deep',
    ink: 'from-ink-soft to-ink',
  }
  const inner = (
    <div
      className={`group relative w-full overflow-hidden rounded-[2px] bg-gradient-to-br ${tones[tone]} ${className}`}
      style={{ aspectRatio: ratio }}
      data-cursor="hover"
    >
      {/* subtle feather watermark */}
      <img
        src="/brand/mark-ivory.png"
        alt=""
        className={`absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.14] transition-transform duration-[1.2s] group-hover:scale-110 ${tone === 'stone' ? 'invert' : ''}`}
      />
      <div className="absolute inset-0 flex items-end p-5">
        <span className={`eyebrow ${tone === 'stone' ? 'text-ink/45' : 'text-ivory/70'}`}>{label}</span>
      </div>
      {children}
    </div>
  )
  return parallax ? <Parallax offset={50}>{inner}</Parallax> : inner
}
