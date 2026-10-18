# Clean Spaces brand assets

All derived from `clean-spaces-logo-original.jpg`, the file the client supplied.
**Do not overwrite that file.** It is the untouched backup.

## Lockups (match the client's brand sheet)

| File                                 | Brand sheet name  | Use on                        |
| ------------------------------------ | ----------------- | ----------------------------- |
| `cleanspaces-logo-primary.png`       | PRIMARY (LIGHT)   | Warm off-white / stone        |
| `cleanspaces-logo-reversed.png`      | DARK BACKGROUND   | Charcoal / near-black / photos|
| `cleanspaces-mark.png`               | ICON ONLY         | Anywhere the lockup is too wide|
| `cleanspaces-logo-mono-charcoal.png` | n/a               | Single-colour / print         |
| `cleanspaces-mark-mono-charcoal.png` | n/a               | Single-colour mark            |
| `cleanspaces-mark-simplified.png`    | n/a               | Source for the small favicons |

The primary lockup keeps the marble house icon and renders the wordmark in
taupe, exactly as the brand sheet shows it. The reversed lockup is the original
cream-marble artwork with the background removed.

## `web/`

Display copies the app actually imports: same artwork, resized to 480 px wide
(lockups) or 500 px wide (mark) and encoded as WebP. 810 kB of PNG becomes
128 kB. The PNGs above stay as the full-resolution masters for print, signage,
social profiles and anything else outside this site.

## Transparency

The artwork was composited over pure black, so `pixel = alpha × colour`. The
matte was recovered by estimating the true foreground colour per pixel (nearest
fully-opaque neighbour) and dividing. That gives exact alpha: soft anti-aliased
edges survive, and there is no dark fringe when the logo sits on a light
background. Letter counters and the gaps in the house mark are transparent.

## Don't

- Don't stretch, recolour or re-letter the logo. `Logo.tsx` sizes by height with
  `width: auto`, so the aspect ratio cannot drift.
- Don't place the reversed (cream) lockup on a light surface, or the primary
  lockup on a dark one. Use the pair the header already cross-fades between.
- Don't substitute plain text for the logo.
