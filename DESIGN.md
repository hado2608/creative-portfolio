# Design System: Creative Portfolio — Ha Do

## 1. Visual Theme & Atmosphere

**Mood:** Clean, minimal, tactile. A creative portfolio that feels like an instrument — precise, expressive, and a little unexpected. The hero experience centers on a 3D MIDI keyboard that invites interaction before revealing the work underneath. The overall vibe is "studio desk at 2am" — dark ambient tones with warm accent lighting, not cold or corporate.

**Aesthetic philosophy:** Let the instrument do the talking. Typography is restrained so the keyboard commands full attention. As the user scrolls, the keyboard "falls away" into a sticky bottom dock, skewed in perspective — like setting down a controller before looking at your work. Everything earns its place on screen.

**Density:** Spacious in the hero, denser in the work grid. Generous breathing room gives the keyboard room to feel three-dimensional.

---

## 2. Color Palette & Roles

| Descriptive Name | Hex | Role |
|---|---|---|
| Deep Matte Black | `#0A0A0A` | Page background, keyboard body |
| Warm Off-White | `#F2EFE9` | Primary text, key faces |
| Brushed Pewter | `#8A8A8A` | Secondary text, inactive knobs |
| Amber Glow | `#E8A838` | Active/hover accent, knob highlights |
| Pale Ivory | `#EDE8DC` | White keys on keyboard |
| Charcoal Slate | `#1C1C1E` | Black keys, card backgrounds |
| Dusty Rose | `#C9957A` | Optional accent (personal warmth, sticker palette) |
| Transparent Smoke | `rgba(255,255,255,0.06)` | Glass surfaces, overlay cards |

**Color philosophy:** Near-monochrome base (black + off-white) keeps the 3D keyboard visually prominent. Amber is the only strong accent — used sparingly on the knob CTAs to signal interactivity. Dusty rose appears in the About popup / scrapbook layer only, adding personal warmth in that intimate context.

---

## 3. Typography Rules

**Primary font:** `Inter` or `DM Sans` — geometric, neutral, modern. Used for body, labels, and UI text.

**Display/Name font:** `PP Neue Montreal` or `Sohne` — slightly wider tracking for the name in the hero. If unavailable, `DM Sans` at 700 weight.

**Monospace accent:** `JetBrains Mono` — used for small technical labels (knob names, metadata tags on work cards).

| Usage | Font | Weight | Size | Tracking |
|---|---|---|---|---|
| Name (hero) | Display | 700 | `clamp(48px, 8vw, 96px)` | `-0.02em` |
| Tagline | Sans | 400 | `clamp(16px, 2vw, 22px)` | `0.01em` |
| Knob labels | Mono | 500 | `11px` | `0.08em` (uppercase) |
| Work card title | Sans | 600 | `18px` | `0` |
| Body / about | Sans | 400 | `16px` | `0` |

---

## 4. Component Specs

### 4a. 3D MIDI Keyboard (Hero Centerpiece)

Built with **React Three Fiber** (Three.js). Modeled as a simplified MIDI controller — not a full 88-key piano, more like a 25-key MIDI pad controller with:
- **Keys:** 2 octaves of white + black keys. Slightly beveled top edges. MeshStandardMaterial with subtle roughness.
- **Knobs (CTAs):** 4–6 rotary knobs on the top panel. Each labeled:
  - `ABOUT` → opens About popup
  - `LINKEDIN` → external link
  - `X / TWITTER` → external link
  - `RESUME` → PDF download
- **Name plate:** Engraved or printed text on the keyboard body: name + tagline.
- **Facial expression element:** Small pixel-art or emoji-style face display panel (like an LCD screen) above the keys — reacts to hover with different expressions.
- **Lighting:** Three-point soft studio lighting. One warm key light from upper-left, fill from right, subtle rim light behind.
- **Interaction:** Keys depress on hover/click with spring animation. Knobs rotate on hover. Subtle idle animation (very slow breathing/float).

### 4b. Scroll Transition — Keyboard Drift

Triggered by scroll position using **GSAP ScrollTrigger** (preferred over Framer Motion for precise scroll-linked animation):

1. **Phase 1 (0–30% scroll):** Keyboard scales slightly down, begins drifting toward bottom of viewport. Camera pulls back subtly.
2. **Phase 2 (30–60% scroll):** Keyboard rotates on X-axis — perspective skew kicks in (CSS `perspective` + `rotateX` on the canvas wrapper, or manipulated via Three.js camera tilt). Keyboard appears to tilt away from viewer, like looking at it from slightly above.
3. **Phase 3 (60–100% scroll of hero section):** Keyboard settles at bottom of viewport, sticky. Fixed position. Fully skewed inward — about `rotateX(35deg)` equivalent. Work grid fades/slides up from underneath.
4. **Sticky state:** Keyboard remains at bottom while user browses work grid. Height of sticky keyboard: ~120px (just enough to see the top of the keys + knobs). Pressing a knob still works in sticky state.

**CSS skeleton for scroll rig:**
```css
.keyboard-wrapper {
  /* In sticky state */
  position: fixed;
  bottom: 0;
  width: 100%;
  transform: perspective(800px) rotateX(35deg);
  transform-origin: bottom center;
}
```

### 4c. Work Grid

- **Layout:** Masonry-style, 2–3 columns on desktop, 1 on mobile. Cards vary in height based on media ratio.
- **Cards:** Sharp, squared-off edges (`border-radius: 4px`). Dark background (`#1C1C1E`). Project thumbnail fills top 60–70%, title + tags below.
- **Hover state:** Card lifts slightly (`translateY(-4px)` + subtle shadow bloom). Thumbnail gets a soft overlay with a short description or "view" label. Transition: `200ms ease-out`.
- **Tags:** Monospace font, small, subdued color. Categories like `design`, `code`, `motion`.

### 4d. About Popup / Modal

- **Trigger:** Click knob labeled `ABOUT` on keyboard.
- **Appearance:** Full-screen overlay or large centered modal. Dark background. Feels like opening a scrapbook dropped on a desk.
- **Left panel:** Photo of Ha + name + short bio + resume button.
- **Right panel — Photobook:** Flip-through of photos, navigable via:
  - Keyboard arrow keys `←` `→`
  - Click left/right edges of photo
  - Photos have stickers overlaid (CSS positioned PNG stickers)
  - Page-flip animation (CSS 3D card flip or GSAP).
- **Music player:** Small record/play widget in lower right of modal. Plays a song (ambient / personal pick). Minimal UI — just album art circle + play/pause.

### 4e. Knobs (CTA Components)

```
Shape: Circular, slightly raised (box-shadow to simulate depth)
Default: Brushed Pewter (#8A8A8A) with subtle radial gradient
Hover: Rotates ~15deg, Amber Glow (#E8A838) highlight arc appears
Active/Click: Snaps to full rotation, triggers action
Label: Monospace, 11px, uppercase, below knob
```

---

## 5. Layout Principles

**Hero section:**
- Full viewport height (`100dvh`)
- Keyboard canvas: centered, takes up ~75% of viewport width on desktop, full width on mobile
- Name + tagline: overlaid on or above the keyboard, left-aligned or centered
- No nav bar — navigation lives entirely on the keyboard knobs

**Whitespace strategy:** Generous. The keyboard needs visual air around it to read as three-dimensional. Minimum 10% viewport padding on sides in hero.

**Work grid section:**
- Starts immediately below hero (keyboard sticky masks the transition seam)
- Padding: `80px` top (accounts for sticky keyboard height) `40px` sides on desktop
- Gap between cards: `16px`

**Z-layering:**
```
z-index 100: About modal
z-index 50:  Sticky keyboard (fixed, bottom)
z-index 10:  Work grid
z-index 1:   Hero background
```

---

## 6. Animation Choreography

| Trigger | Element | Animation | Duration | Easing |
|---|---|---|---|---|
| Page load | Keyboard | Fade + float up from below | 800ms | `ease-out` |
| Page load | Name/tagline | Fade in, 200ms delay | 600ms | `ease-out` |
| Key hover | Piano key | Depress Y +2px | 80ms | `spring` |
| Knob hover | Knob | Rotate 15deg CW | 150ms | `ease-out` |
| Scroll (0→100%) | Keyboard | Drift down + skew in | scroll-linked | GSAP ScrollTrigger |
| Scroll reveal | Work cards | Stagger fade up | 400ms each | `ease-out` |
| Card hover | Work card | Lift + shadow bloom | 200ms | `ease-out` |
| Knob click (ABOUT) | Modal | Scale in from center | 300ms | `spring` |
| Photo flip | Photobook | 3D card flip | 400ms | `ease-in-out` |

---

## 7. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| 3D Keyboard | React Three Fiber + Drei |
| Scroll animation | GSAP + ScrollTrigger |
| UI animation | Framer Motion (modal, cards) |
| Styling | Tailwind CSS v4 |
| Fonts | Variable fonts via `next/font` |
| Deployment | Vercel |

---

## 8. Build Phases (from your notes)

### Phase 1 — MIDI Keyboard (front view prototype)
- [ ] Set up Next.js + R3F + Tailwind
- [ ] Model keyboard in R3F (keys, black keys, knob panel)
- [ ] Add lighting, materials, idle float animation
- [ ] Keyboard interactions (key press, knob hover/rotate)
- [ ] Add name plate + LCD face display
- [ ] Wire up knob CTAs (links + modal trigger)

### Phase 2 — Scroll transition (scrolled view)
- [ ] Implement GSAP ScrollTrigger scroll-linked animation
- [ ] Keyboard drift to bottom on scroll
- [ ] Perspective skew (rotateX) as keyboard settles
- [ ] Sticky keyboard at bottom of viewport
- [ ] Work grid reveal from underneath

### Phase 3 — Work Grid
- [ ] Build masonry card grid component
- [ ] Populate with project data (JSON or MDX)
- [ ] Hover states (lift + overlay)
- [ ] Responsive layout (mobile stacks to 1 col)

### Phase 4 — Work Grid Hover
- [ ] Hover overlay with project description snippet
- [ ] Smooth transitions
- [ ] Link to individual project pages (future)

### Phase 5 — All Home Interactions
- [ ] About modal: layout + photobook flip
- [ ] Sticker overlays on photos
- [ ] Music player widget
- [ ] Resume download
- [ ] LinkedIn + X links
- [ ] Facial expression LCD reacts to scroll/hover
- [ ] Mobile touch interactions for keyboard

---

## 9. File Structure

```
creative-portfolio/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── keyboard/
│   │   ├── MidiKeyboard.tsx  # R3F canvas + scene
│   │   ├── PianoKey.tsx
│   │   ├── Knob.tsx
│   │   └── LCDFace.tsx
│   ├── scroll/
│   │   └── KeyboardScrollRig.tsx  # GSAP scroll logic
│   ├── work/
│   │   ├── WorkGrid.tsx
│   │   └── WorkCard.tsx
│   └── about/
│       ├── AboutModal.tsx
│       ├── Photobook.tsx
│       └── MusicPlayer.tsx
├── data/
│   └── projects.ts
├── public/
│   ├── photos/
│   └── stickers/
└── DESIGN.md
```
