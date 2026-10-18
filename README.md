# Clean Spaces website

Single-page marketing site for Clean Spaces (kitchen design, built-in cabinetry,
renovations and installation), built with React, TypeScript and Vite.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                     |
| `npm run build`     | Typecheck, then build to `dist/`               |
| `npm run preview`   | Serve the built `dist/` locally                |
| `npm run typecheck` | `tsc --noEmit` (strict)                        |
| `npm run hero:montage` | Build the hero video from authorised clips  |

Requires Node 20+. Built and verified on Node 24.16, npm 11.13.

---

## Before this goes live

These are the only things still outstanding. Everything else is wired up.

1. **Business email address.** `src/site.config.ts` has a placeholder
   (`hello@cleanspaces.example`) and `emailConfirmed: false`. While that flag is
   false the site honestly shows "Email to be confirmed" and the email button on
   the form is disabled. Set the real address and flip the flag to `true`.
2. **Live domain.** Set `VITE_SITE_URL` in `.env` to the real domain. The
   canonical URL, the Open Graph tags and the structured data are all built
   from it, so until it is set, shared links show no preview card. See
   "Link previews" below.
3. **Service area.** `site.serviceArea` is `null`, so nothing is claimed. Set it
   to a string and it appears in the footer.
4. **Confirm the service list.** The four services come from the client's own
   brand sheet (kitchen design, built-in cabinetry, renovations, installation)
   and the copy in the previous site. Confirm the wording and scope.
5. **Confirm the process steps.** `processSteps` in `src/data/content.ts` is a
   sensible five-step default (consultation → design → materials → installation →
   handover), not a client-confirmed process. Edit freely.
6. **Confirm the business name.** The TikTok profile `@cleanspaces_co` displays
   as "Mahlake Group" with the same phone number. The site uses "Clean Spaces"
   throughout, so check whether Mahlake Group should be credited anywhere.

### Things deliberately NOT on the site

No testimonials, no statistics, no client names, no project locations beyond what
the client's own TikTok captions state, and no awards. None of that was supplied,
so none of it was invented.

---

## The enquiry form

**There is no backend, and the site never claims there is one.**

The form validates in the browser, then hands the enquiry to WhatsApp with the
message pre-filled. The visitor still presses send in WhatsApp, so nothing is
transmitted silently. The WhatsApp number (`064 807 5408` → `wa.me/27648075408`)
is real and working. A secondary "open an email draft" button appears once
`emailConfirmed` is set to `true`.

A note under the form explains this to the visitor in plain language.

### Connecting a real form service later

Replace the body of `handleWhatsApp` in `src/components/ContactForm.tsx` with a
`fetch` to your endpoint. The validated values are already in hand:

```ts
const valid = check();
if (!valid) return;
const response = await fetch('https://formspree.io/f/XXXXXXX', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify(valid),
});
setStatus(
  response.ok
    ? { tone: 'info', text: 'Thank you, we will be in touch shortly.' }
    : { tone: 'error', text: 'Something went wrong. Please WhatsApp us instead.' },
);
```

Formspree, Netlify Forms, Web3Forms and Basin all work with this shape. Keep any
API key out of the client bundle. Use a provider that accepts a public form ID,
or proxy through a serverless function.

---

## Project structure

```
index.html                 Vite entry, all SEO/social/favicon metadata
scripts/                   build-hero-montage.mjs (ffmpeg pipeline)
media/hero-source/         Where authorised hero clips go (not built, not shipped)
public/                    Served as-is at the site root
  favicon.*, apple-touch-icon.png, android-chrome-*.png, site.webmanifest
  images/hero|projects|renders|inspiration|videos|og/
src/
  main.tsx                 Entry; mounts App inside an ErrorBoundary
  App.tsx                  Section composition
  site.config.ts           Client-configurable details (phone, email, TikTok)
  data/content.ts          Services, gallery, videos, process steps
  components/              One .tsx + one .module.css per section
    icons/                 WhatsApp and TikTok glyphs (not in Lucide)
  hooks/                   useReveal, useScrolledPast, useBodyScrollLock
  styles/                  tokens.css (design system) + global.css
  assets/branding/         Logo masters, originals and web variants
  assets/projects/originals/   Untouched client photographs
legacy-static/             The original HTML/CSS/JS site, kept for reference
```

`legacy-static/` is a snapshot of the pre-React site. Safe to delete.

---

## Brand assets

Everything is derived from the single logo file the client supplied
(cream marble artwork on a solid black canvas).

### How the background was removed

The source composites the artwork over pure black, so `pixel = alpha × colour`.
Recovering the foreground colour per pixel (nearest fully-opaque neighbour) and
dividing gives an exact alpha matte: genuinely transparent, soft edges intact,
and no dark halo when the logo sits on a light background. 26,167 pixels carry
partial alpha, which is the anti-aliased edge being preserved rather than
thresholded away.

The letter counters (A, E, P, S) and the gaps in the house mark are transparent.
Verified by compositing over white, warm off-white, black and charcoal.

### Files in `src/assets/branding/`

| File                                  | Use                                               |
| ------------------------------------- | ------------------------------------------------- |
| `clean-spaces-logo-original.jpg`      | The supplied original, untouched backup           |
| `cleanspaces-logo-primary.png`        | Light backgrounds: marble icon + taupe wordmark   |
| `cleanspaces-logo-reversed.png`       | Dark backgrounds: the original cream marble       |
| `cleanspaces-logo-mono-charcoal.png`  | Single-colour charcoal, for mono/print            |
| `cleanspaces-mark.png`                | The house symbol alone, marble                    |
| `cleanspaces-mark-mono-charcoal.png`  | The house symbol, charcoal                        |
| `cleanspaces-mark-simplified.png`     | Flat silhouette, used to cut the small favicons   |
| `web/*.webp`                          | Display copies the app imports (~128 kB vs 810 kB)|

The three lockups match the client's brand sheet exactly: **primary (light)**,
**dark background**, **icon only**. The header cross-fades primary ↔ reversed as
it changes from transparent to solid, so the logo always has contrast.

### Why there is no SVG of the full logo

The mark is a photographic marble texture with fine brown veining. A vector
cannot reproduce that faithfully, and tracing it would change the artwork, so
the full logo ships as transparent PNG/WebP only.

`public/favicon.svg` **is** a real vector, but of a deliberately simplified
version: the house silhouette traced from the artwork's alpha channel (marching
squares, `fill-rule: evenodd`) in flat brand cream on the brand's near-black. It
is 1.7 kB and stays crisp at any size. That is the standard approach for a
favicon and it is not presented as a vector of the full logo.

### Favicons and app icons

| File                                   | Size    | Artwork                        |
| -------------------------------------- | ------- | ------------------------------ |
| `favicon.ico`                          | 16/32/48| Simplified silhouette          |
| `favicon.svg`                          | vector  | Traced simplified silhouette   |
| `favicon-16x16.png`, `favicon-32x32.png`| 16, 32 | Simplified silhouette          |
| `apple-touch-icon.png`                 | 180     | Full marble mark               |
| `android-chrome-192x192.png`           | 192     | Full marble mark               |
| `android-chrome-512x512.png`           | 512     | Full marble mark               |
| `android-chrome-maskable-512x512.png`  | 512     | Full marble mark, 28% padding  |
| `site.webmanifest`                     | n/a     | Name "Clean Spaces", any+maskable |

Small sizes use the simplified silhouette because the marble veining and the
window outline turn to mush below ~32 px. Larger sizes keep the full texture.

---

## Media: what is real and what is not

This matters, so please keep the distinction when editing.

### Genuine Clean Spaces work

- **Photographs.** Supplied by the client. Originals preserved untouched in
  `src/assets/projects/originals/`. The web versions are crops with gentle
  white-balance, brightness, contrast and sharpening only. Nothing was added to
  or invented in any photograph.
- **Design renders.** Two visualisations cropped from the client's
  "Folkstone Grey Kitchen" PDF, labelled "Render" on the page.
- **Videos.** Six posts from the client's own TikTok, `@cleanspaces_co`.

These appear in **Our work** and **Project videos**, and nowhere else makes a
claim of authorship.

### Illustrative stock photography

Eight images from [Pexels](https://www.pexels.com), used in the hero, the
inspiration section and some service cards.

The Pexels License allows free commercial use and **does not require
attribution**, so there is no visible credit on the page. Credits are kept here
instead. If you swap any of these for an asset under a licence that *does*
require visible attribution, either add that credit or choose a different asset.

| File stem                   | Pexels photo | Photographer             |
| --------------------------- | ------------ | ------------------------ |
| `hero-kitchen` / `insp-oak-black-marble` | 35021550 | ajit-singh-2157881190 |
| `insp-gloss-handleless`     | 7005291      | artbovich                |
| `insp-beige-integrated`     | 38310800     | bilguun-gantumur         |
| `insp-marble-dining`        | 7031879      | artbovich                |
| `insp-wood-accents`         | 7214450      | artbovich                |
| `insp-stone-backsplash`     | 38310837     | bilguun-gantumur         |
| `insp-stone-worktop`        | 7533760      | artbovich                |
| `insp-dark-gloss`           | 35189709     | ranamatloob567           |

The inspiration section is headed "Style directions" and framed as a starting
point for material conversations. It does not claim these are completed
projects, so **do not relabel it as Clean Spaces work.**

### Hero video

**The hero currently uses its still photograph.** `heroVideo` in
`src/site.config.ts` is `null`, and no montage file exists in this project.

Two things were tried. Freely licensed stock clips were reviewed via their cover
frames and none was good enough to lead the page. Building a montage from Clean
Spaces' own TikTok clips is the better idea, but downloading those files was
blocked in the environment this was built in, so **no montage was produced and
none is claimed.**

What *is* in place is the whole pipeline around it:

- `scripts/build-hero-montage.mjs` trims, crops 9:16 to 16:9 with a per-shot
  focal point, applies a warm grade matched to the palette, crossfades the
  shots and exports MP4, WebM and a poster frame. Verified end to end with
  synthetic clips: it produced a 13.1 second 1280x720 montage, 2.3 MB MP4.
  Those test files were deleted so nothing fabricated ships.
- `media/hero-source/README.md` lists the five exact clips needed, with their
  TikTok URLs and the filenames to save them as.
- `Hero.tsx` already handles the video properly: the still renders underneath
  as a base layer, the video layers over it, and it falls back to the still on
  reduced motion, on screens under 760 px, on a load error, or if autoplay is
  refused.

So the remaining work is: put five files in `media/hero-source/`, run
`npm run hero:montage`, and set `heroVideo` in `src/site.config.ts`.

**One caveat worth reading first.** The TikTok clips are 1080 x 1920 vertical.
Cropping them to a 16:9 background keeps roughly a third of the frame height,
which on some of these posts will cut the Clean Spaces watermark or the subject.
If the crops do not look right, leaving the hero on the still and keeping the
clips in the Project videos section, where they play full frame at 9:16, is the
better result. `media/hero-source/README.md` covers how to tune the crop.

---

## TikTok integration

`src/data/content.ts` holds six posts from `@cleanspaces_co`. Captions are the
client's own, with hashtags stripped; `project` is only set where their caption
names a location (currently just "Project Machadodorp").

Each card is a **facade**: a local poster image plus a play button. The official
TikTok player is only mounted after a click, so the page never loads six embeds
up front. Playback happens in TikTok's own iframe, which keeps creator
attribution intact. Posters were saved from the posts' own cover frames.

To change the selection, edit `projectVideos`. The poster helper builds both
image paths from the video id, so you need matching files at
`public/images/videos/tiktok-<id>-400.webp` and `-640.webp`.

---

## Design system

Tokens live in `src/styles/tokens.css`.

| Token           | Value     | Role                               |
| --------------- | --------- | ---------------------------------- |
| `--stone-beige` | `#D9D0C3` | Accents on dark surfaces           |
| `--warm-grey`   | `#A7A59A` | Decorative only                    |
| `--taupe`       | `#6B665E` | Secondary text                     |
| `--charcoal`    | `#2B2B2B` | Body text, dark sections           |
| `--white`       | `#FFFFFF` | n/a                                |
| `--shell`       | `#FAF8F5` | Page background                    |
| `--sand`        | `#F2EDE6` | Alternating sections               |
| `--brass`       | `#A88257` | Decorative icon accents            |
| `--brass-ink`   | `#87643B` | Brass **as text** (4.6:1 on sand)  |
| `--warm-grey-ink` | `#6F6B61` | Warm grey **as text** (5.0:1)    |

`--brass` and `--warm-grey` are the brand's decorative tones and do not reach
4.5:1 on the light surfaces, so the `-ink` variants exist for text. Use those
for anything readable.

Type: **Montserrat** headings, **Inter** body, loaded from Google Fonts with
preconnect. Fluid scale via `clamp()`.

---

## Accessibility and motion

- Semantic landmarks, a skip link, and labelled form fields.
- Mobile menu and lightbox both trap focus, close on `Escape` and restore scroll.
- Lightbox supports `←` / `→` and announces position ("image 2 of 8").
- `prefers-reduced-motion: reduce` disables transitions, the scroll cue and the
  hero entrance; scroll reveals render fully opaque so nothing stays hidden.
- All body text meets WCAG AA (4.5:1); ratios were computed, not estimated.

---

## Link previews (WhatsApp, Facebook, LinkedIn)

When someone shares the link, the preview shows a 1200 x 630 card with the
Clean Spaces logo, the tagline and the service list over a kitchen photograph,
plus the page title and description. The card lives at
`public/images/og/og-image.jpg`.

**This only works once the real domain is set.** Social crawlers need absolute
URLs, so the card, the canonical URL and the structured data are all built from
`VITE_SITE_URL`:

```bash
# .env
VITE_SITE_URL=https://your-real-domain.co.za
```

Vite substitutes it into `index.html` at build time. Until it points at a live,
reachable domain, shared links show a bare link with no image. Set it, rebuild,
redeploy, then re-scrape:

- Facebook and WhatsApp: https://developers.facebook.com/tools/debug/
- LinkedIn: https://www.linkedin.com/post-inspector/

WhatsApp caches previews aggressively, so re-scraping through the Facebook
debugger is usually what makes an updated card appear.

To change the card, edit the title and description meta tags in `index.html`
and replace `public/images/og/og-image.jpg` (keep it 1200 x 630 and under
roughly 300 kB, which is what WhatsApp will fetch).

## Deployment

Static output. `npm run build` emits `dist/`, deployable anywhere.

**Framework preset: Vite.** That is the only preset to pick, on every host that
asks. This is a single page with hash anchors and no client-side router, so do
not add SPA rewrite or catch-all redirect rules; they are unnecessary here.

| Setting          | Value           |
| ---------------- | --------------- |
| Framework preset | Vite            |
| Install command  | `npm install`   |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Node version     | 22 (20.19+ also works) |

Node matters: Vite 8 requires `^20.19.0 || >=22.12.0`, so a host still
defaulting to Node 18 will fail the build. This repo pins it for you in three
places, so most hosts need no manual setting:

- `engines.node` in `package.json`
- `.nvmrc` (Netlify, Vercel and Render read this)
- `NODE_VERSION` in `netlify.toml`

Committed config files: `vercel.json` and `netlify.toml` already contain the
settings above, so those two hosts configure themselves on import.

**Cloudflare Pages:** preset Vite, build `npm run build`, output `dist`, and set
the `NODE_VERSION` environment variable to `22`.

**GitHub Pages:** set `base: '/<repo-name>/'` in `vite.config.ts` first, then
publish `dist`. Skip this if you are deploying to a custom domain or a
`<user>.github.io` root repo.

After deploying, update the domain in `index.html` (see "Before this goes live")
or the canonical URL and the social preview image will not resolve.

## Verification performed

Run against the production build served by `vite preview`, driven by headless
Chrome at 1440×900, 834×1112 and 390×844:

- `npm run typecheck`, clean, strict TypeScript, no `any`.
- `npm run build`, clean.
- 30 images load, **0 broken**, no console errors, no page errors, no horizontal
  overflow at any of the three widths.
- Every in-page anchor resolves to a real element.
- Mobile menu opens, locks scroll, closes on `Escape` and unlocks.
- Lightbox opens, moves focus to the close button, advances on `→`, closes on
  `Escape` and unlocks scroll.
- Submitting the empty form flags the invalid fields and does not navigate.
- All three `wa.me` links carry `rel="noopener"`; the `tel:` link is correct.
- Under reduced motion, all 30 reveal elements are opaque while off-screen.
- Contrast ratios computed for 17 foreground/background pairs; the two failures
  found (`--warm-grey` and `--brass` as text) were fixed with the `-ink` tokens.

Also verified across mobile, tablet and desktop:

- Project videos become a swipeable rail below 700 px (6 cards, snap points,
  labelled region, keyboard reachable) and return to the staggered grid above
  it. Style directions is a rail at every width. Neither causes page overflow.
- The floating WhatsApp control is the standard badge: a 56 px green circle
  (52 px on mobile) with the white glyph and no text label.
- At 320, 360, 390, 414 and 768 px: no horizontal overflow, no interactive
  target under 36 px, and no text under 11 px.
- Animations run normally and are switched off under `prefers-reduced-motion`,
  confirmed by reading computed styles in both states.

Also verified after the design pass:

- No em dashes, en dashes or hyphens standing in for punctuation anywhere in
  the site copy, metadata, buttons, labels or form messages.
- No invented statistics, testimonials, client names or project locations. The
  only location used, "Project Machadodorp", comes from the client's own TikTok
  caption.
- The hero montage script runs correctly end to end (checked with synthetic
  clips, output then deleted).

Not tested: real iOS/Android devices, real screen readers, live WhatsApp message
delivery (links verified by URL, not by sending), and the hero montage against
real client footage, which was not available.

---

## Design notes

The layout deliberately avoids repeating one card grid down the page. Each
section is composed differently:

| Section       | Composition                                               |
| ------------- | --------------------------------------------------------- |
| Hero          | Full-bleed photograph, text bottom left, layered overlay   |
| About         | Text column against a landscape figure with an offset plate|
| Services      | One tall photograph beside a numbered typographic index    |
| Our work      | Asymmetric 3x3 bento, with wide and tall tiles             |
| Project videos| Staggered portrait grid, middle column dropped             |
| Philosophy    | Dark typographic band, uneven three-column text            |
| Process       | Sticky intro and photograph beside a numbered list         |
| Style directions | Horizontal rail with alternating tile widths            |
| Contact       | Contact details beside the form                            |

Corners are square throughout, there are no gradients other than the neutral
overlays that make text legible over photographs, and icons are used only where
they carry meaning (WhatsApp, TikTok, navigation, the lightbox and the play
control).

Motion, all of it disabled or made instant under `prefers-reduced-motion`:

| Where | What |
| ----- | ---- |
| Hero image | A 32 second scale drift, giving the still some of the life a video would |
| Hero copy | Staggered entrance on load |
| Header | Condenses from 84 px to 70 px on scroll, logo scales to 0.88, background fades in |
| Section content | Fade and lift on first scroll past, staggered across gallery tiles |
| Eyebrow rules | Draw in from the left as their section reveals |
| Service rules | Draw in one after another down the list |
| Process rows | A brass rule draws under the row on hover |
| Images | Slow zoom on hover, captions slide up |
| Buttons | Arrow icons nudge up and to the right on hover |
| Lightbox | Fade with a slight scale on open |
