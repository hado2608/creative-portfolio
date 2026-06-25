@AGENTS.md

---

## Open design tasks — home page ID card + map

These are active, unresolved issues. Resume these at the start of every session.

### 1. Map tooltip z-index
The map hotspot SVG overlay is at `z-index: 5` (`components/home/MapHotspots.tsx`, wrapper div).
The ID card assembly is at `z-index: 10` (`app/globals.css` `.id-assembly`).
**Bug**: tooltips render behind the card on hover. Fix: raise MapHotspots overlay z-index above 10.

### 2. Map tooltip design
Reference Figma node `1395:14783` in file `BBoNEpct7Zf5NRKM07wetk`.
Design: horizontal pill — location pin icon + city name, single line.
Currently: vertical layout with city label + local time. Needs redesign to match Figma.
**Pending clarification**: keep local time display or drop it to match Figma exactly?

### 3. Dangler — no gap from top of viewport
`public/assets/dangler.svg` is a filled path that renders thick/bold.
Figma shows a thin-stroked delicate oval ring. The ring should start at (or clip at) `y=0` of the viewport — no visible gap above it.
**Pending**: replace dangler.svg with thin-stroke version matching Figma node `1395:14270`.

### 4. Dangler — no gap between hook and card
Currently `.id-thread` (24px line in CSS) creates a visible gap between the dangler bottom and the card top.
In the Figma design the inner ring connects directly to the card hole with no thread gap.
**Pending clarification**: remove `.id-thread` entirely, or keep a very thin connector?

### 5. Dangler stroke weight
Current SVG uses fill to simulate a loop — looks heavy.
Figma design uses a thin stroke (~1–1.5px at 1440px viewport scale).
Fix: replace `dangler.svg` with a clean thin-stroke SVG exported/traced from Figma.

---

## Key file map (home page)

| What | Where |
|---|---|
| ID card component | `components/home/IDCard.tsx` |
| Dangler loop SVG | `public/assets/dangler.svg` |
| Card body SVG | `public/svg/card-body.svg` |
| Map overlay | `components/home/MapHotspots.tsx` |
| All home CSS | `app/globals.css` — search `.id-assembly`, `.id-dangler`, `.id-thread`, `.map-tooltip` |

---

## Figma references

| Screen | Node | Notes |
|---|---|---|
| Full home page | `1395:14270` | Card, dangler, map, tooltips in context |
| Tooltip component | `1395:14783` | Pin icon + city name pill, single line |
| File key | `BBoNEpct7Zf5NRKM07wetk` | Portfolio-2.0 |
