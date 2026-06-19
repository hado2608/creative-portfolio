# Scroll Section Build Plan

## What's in the design
Two columns inside `.about-scroll`, no scrolling container — the page itself scrolls.

### Figma layout grid (from frame 1225:46299)
12 columns · 80px margin · 20px gutters · 1440px frame
- Left column (desc): col 1–6 → x=80, width=522
- Gap: 20px (one gutter)
- Right column (pinboard): col 7–12 → x=622, width=738

### Left — description (left: 80px, width: 522px) ✅ done
- `designer` — The Seasons Light Italic, 96px, tracking -2.88px, color #535659
- Body paragraphs, Neue Montreal 16px, line-height 1.3
- Blue emphasis color: #4580bb (bold) / #5087bf (bold + body)
- "What I care about?" section — italic label + 3 bullet points
- "Like my work so far?" — italic label + email link

### Right — pin-board (col 7–12, width: 738px)

Photos (relative to pinboard container, all position: absolute):
| Photo | Outer node | Size | Rotation | Position |
|-------|-----------|------|----------|----------|
| Sky / NYC | 1231:46567 (overflow-clip, rounded-8) | 250×333 | -2.26° | left:24, top:42 |
| Jazz | 1231:46569 (overflow-clip, rounded-8) | 200×267 | +4.6° | left:320, top:155 |
| Nail art | 1231:46573 (circle mask) | 218×291 | -8.23° | left:83, top:311 |
| Sunset | 1231:46581 | 147×196 | +0.99° | left:346, top:503 |

Sky image crop: `left: -32.83%, top: 0.18%, width: 177.78%` inside overflow:hidden container
Jazz/sunset: `object-fit: cover`
Nails: circle via border-radius: 50%, overflow: hidden

Music widget (pinboard left: 14, top: 633): see below

---

## Hover + annotation plan (NEXT)

Each photo card shows its annotation on hover:
| Photo | Annotation text | Note |
|-------|----------------|------|
| Sky | "the sky is full of inspirations" | with arrow SVG |
| Jazz | "i'm a jazz singer by night!" | with arrow SVG |
| Nails | "obsessed with doing my nail arts" | with arrow SVG |
| Sunset | "another sky pic cause why not!" | with arrow SVG |
| Music | "my fav album currently" | no arrow |

Implementation:
- Each `.about-photo` wraps both image + annotation div
- Annotation: `opacity: 0; transition: opacity 0.2s ease; pointer-events: none`
- `.about-photo:hover .about-annotation { opacity: 1 }`
- Annotation style: Geist Mono, 16px, color #617180, tracking -0.32px
- Arrow SVGs: download from Figma when implementing

Tilt on hover: existing `rotate(-3deg) scale(1.04)` on `.about-photo-hover`

---

## Music widget plan (NEXT)

Layout (from Figma):
- Container: `position: absolute; left: 14px; top: 633px`
- Background #f7f7f7, border 1px solid #d1dce8, rounded-8px, padding 8px
- Inner: flex-row, 80×80px album art + right column
- Right column: `flex-col justify-between height: full`
  - TOP: volume icon (animated bars) — top-right of widget
  - BOTTOM: "Portrait" (Neue Montreal Medium 12px) + "Samara Joy" (italic 12px)

Hover behavior:
- Play "You Stepped Out Of A Dream" by Samara Joy via `<audio>` element
- Need local audio file at `/public/audio/samara-joy-you-stepped-out.mp3` (user to provide or source)
- Volume icon animation: bars pulse/grow rhythmically using CSS keyframes while playing

Volume icon:
- 3 thin bars (decorative equalizer), color #d9d9d9
- On hover/play: bars animate with `scaleY` keyframes at different delays

---

## Status
- [x] Left description column
- [x] CSS Grid two-column layout
- [x] Horizontal line background grid
- [x] Photo frames bug — use rawImages (source JPEGs) not rendered exports
- [x] Photo container overflow:hidden + object-fit: cover
- [ ] Music widget: equalizer bars top-RIGHT, text bottom, audio on hover
- [ ] Hover tilt + annotation reveal (deferred)

## Music widget — redesign (node 1246:13846)
Layout: same outer card (bg #f7f7f7, border #d1dce8, rounded-8, p-8, flex gap-7)

Left — circular album art (80×80, border-radius 50%):
- Album art: `border-radius: 50%; overflow: hidden; object-fit: cover`
- Center hole dot: `4×4px`, absolutely centered at `top: calc(50%+1px)`, bg #f7f7f7, border-radius 50%
- SPIN on play: `animation: vinyl-spin 3s linear infinite` (keyframe already in globals.css)

Right column — `flex-col justify-between align-items:flex-end h-full`:
- TOP: 3 equalizer bars (1px wide, 6–8px tall) — animate when isPlaying
- BOTTOM: "Portrait" (NM Medium 12px) + "Samara Joy" (NM Italic 12px)

Audio:
- Fetch iTunes preview on mount: `https://itunes.apple.com/search?term=samara+joy+you+stepped+out+of+a+dream&entity=song&limit=1`
- `previewUrl` → `new Audio(url)` in useRef
- `onMouseEnter`: play + setIsPlaying(true)
- `onMouseLeave`: pause + reset + setIsPlaying(false)

Equalizer CSS:
- `.eq-bar`: 1px × 7px, background #d9d9d9
- `.eq-bar--playing`: background #617180, `@keyframes eq-bounce` (4px→12px, 0.7s)
- 3 bars with staggered delays: 0ms, 150ms, 75ms

## Status
- [x] Left description column
- [x] CSS Grid two-column layout
- [x] Photos — raw source images, overflow:hidden crop
- [x] Music widget — circular vinyl, spins on play, audio from iTunes preview
  - Playback: hover=play, leave=pause (keep position), hover again=resume; pendingPlay ref handles race where user hovers before iTunes fetch resolves
  - Size: vinyl 80→106px, text 12→16px (proportionate 4/3 scale)
  - Album annotation: moved from left:190,top:647 → left:280,top:665 to dodge music widget and sky card
- [x] Equalizer bars — top-right, animated on play
- [x] Centering — horizontal: flexbox justify-content:center; vertical: align-items:center + padding-bottom:147px for footer
- [x] Annotate button — always visible top-right of about-scroll; toggles showAllAnnotations; default=flat+text, active=gradient+🪄
- [x] Music widget hover shadow — same drop-shadow + scale(1.04) as photo cards
- [x] Cards pop-in — @keyframes card-pop (translate+opacity, no transform conflict), staggered animationDelay per card
- [x] Footer slide-up — @keyframes footer-slide-up on .about-footer
- [x] Annotations — text now in normal flow (marginTop/Left), container width constrains wrapping; sky keeps whiteSpace:nowrap; arrow SVGs cleaned of Figma background

## Annotation fixes (NEXT)
Issues from Figma node 1231:46603:
1. white-space: nowrap on .about-annotation-text prevents multi-line text (nails/album/sunset/jazz all wrap)
2. Arrow SVGs need correct CSS transforms per annotation:
   - sky: rotate(25.99deg), size 34×5.4px, at top-left of container
   - jazz: rotate(132.84deg), size 34×5.4px, at BOTTOM-LEFT of container (left:0, top:62)
   - nails: scaleY(-1) rotate(165.04deg), size 44.2×5.15px, at top-right (left:63.48, top:15.93)
   - album: scaleY(-1) rotate(-150deg), size 34×7.5px, at top-left (left:7, top:5)
   - sunset: scaleY(-1) rotate(-150deg), size 34×7.5px, at top-left (left:7, top:5)

## Annotations plan (NEXT)
Pull annotation text + positions from Figma node 1246:13846.
Each photo card gets an annotation div that fades in on hover.
Implementation:
- Annotation: `opacity: 0; transition: opacity 0.2s ease; pointer-events: none`
- `.about-photo:hover .about-annotation { opacity: 1 }`
- Font: Geist Mono Regular, 16px, color #617180, tracking -0.32px
- Arrow SVGs: download from Figma per annotation

## Files changing this round
- `app/about/page.tsx` — audio ref, isPlaying state, hover handlers, widget JSX fix
- `app/globals.css` — eq-bar keyframe animation

---

## Work Page — build notes

### Layout
- Route: `/work`
- File: `app/work/page.tsx`
- Full-width 3-column CSS grid: `grid-template-columns: 521fr 359fr 359fr; gap: 20px; padding: 60px 80px 187px`
- 5 projects (IDs 1, 2, 3, 4, 6 from `data/projects.ts`)
- Row 1: Bounce (col 1), GameSense (col 2), Serene (col 3)
- Row 2: CityHarvest (col 1), MusicWandered (col 2, span 2)

### Card design (new vs home page)
- Same `Thumbnail` component (tilt + metallic shine) — exported from `WorkCard.tsx`
- Text section FLIPPED: description (with `<strong>` bold key phrases) first, then `Name / Year` label in muted gray
- CSS: `.work-page-desc` + `.work-page-desc strong { font-weight: 700; color: #473E3D }`

### Global nav — `components/shared/PortfolioFooter.tsx`
- Mounted in `app/layout.tsx` (root layout) — appears on ALL pages
- Hidden on `/ha-do-portfolio/*` case study pages (they use CaseStudyNav instead)
- `key={pathname}` on `<footer>` → remounts on every route change → re-triggers `footer-slide-up` animation
- All nav items always have `href` (no dead `<span>` nav items)
- Home page gets `padding-bottom: 187px` on `.home-projects` to clear the fixed footer

### Rules / preferences
- Footer slide-up animation MUST play on every page navigation, not just initial load
- Nav must be global — accessible from every non-case-study page
- Update SCROLL_PLAN.md before code changes every session
