@AGENTS.md

---

## Open design tasks — home page ID card + map

These are active, unresolved issues. Resume these at the start of every session.

### 1. Map tooltip z-index
The map hotspot SVG overlay is at `z-index: 5` (`components/home/MapHotspots.tsx`, wrapper div).
The ID card assembly is at `z-index: 10` (`app/globals.css` `.id-assembly`).
**Bug**: tooltips render behind the card on hover. Fix: raise MapHotspots overlay z-index above 10.
(Note: the hover pin layer already renders at `z-index: 15`; verify against the current layout before changing.)

### 2. Map tooltip design
Reference Figma node `1395:14783` in file `BBoNEpct7Zf5NRKM07wetk`.
Design: horizontal pill — location pin icon + city name, single line.
Currently: vertical layout with city label + local time. Needs redesign to match Figma.
**Pending clarification**: keep local time display or drop it to match Figma exactly?

### ~~3–5. Dangler (top-of-viewport hanging loop)~~ — SUPERSEDED
The hanging-dangler design (Figma `1395:14270`) was replaced by Figma node `1722:29990`:
the card no longer hangs from the top. A carabiner hook now enters diagonally from the
**left viewport edge** (rotated -68.31°) and slips behind the card's left side.
Implemented: `.hero-hook` in `app/globals.css`, rendered from `app/page.tsx`,
artwork `public/assets/hook.svg` (full-height viewBox `0 -31 101 200`).
`dangler.svg` and the old `.id-thread` are no longer used.

---

## Key file map (home page)

| What | Where |
|---|---|
| ID card component | `components/home/IDCard.tsx` |
| Carabiner hook SVG | `public/assets/hook.svg` (rendered by `.hero-hook` in `app/page.tsx`) |
| Card body SVG | `public/svg/card-body.svg` |
| Intro copy | `app/page.tsx` — `.hero-intro` |
| Map overlay + "Places I call home!" label | `components/home/MapHotspots.tsx` |
| All home CSS | `app/globals.css` — search `.id-assembly`, `.hero-hook`, `.hero-intro`, `.map-tooltip` |

---

## Figma references

| Screen | Node | Notes |
|---|---|---|
| Full home page (current) | `1722:29990` | Card left-of-center, left-edge hook, intro copy, both map shapes on the right |
| Hook element | `1697:26170` | Carabiner at left edge, img 100.5×199.9 rotated -68.31° |
| Full home page (old) | `1395:14270` | Superseded hanging-dangler layout |
| Tooltip component | `1395:14783` | Pin icon + city name pill, single line |
| File key | `BBoNEpct7Zf5NRKM07wetk` | Portfolio-2.0 |
