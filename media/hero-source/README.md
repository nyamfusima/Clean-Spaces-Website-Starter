# Hero montage source clips

Put the five authorised Clean Spaces clips here, named exactly as below, then
run `npm run hero:montage` from the project root.

Nothing in this repository downloads footage. These files have to be supplied
by Clean Spaces, either from the original recordings (best quality) or using
TikTok's own download option while signed in to the `@cleanspaces_co` account.

| Save as                   | Source post                                                              | What it shows                                  |
| ------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------- |
| `01-before-after.mp4`     | https://www.tiktok.com/@cleanspaces_co/video/7674882044261829908          | Modern kitchen, before and after               |
| `02-machadodorp.mp4`      | https://www.tiktok.com/@cleanspaces_co/video/7696416387933228295          | Dunblane Grey and Kirkwall kitchen, Machadodorp|
| `03-iceberg-displays.mp4` | https://www.tiktok.com/@cleanspaces_co/video/7658223222646770962          | Iceberg Gloss displays, warm white LED         |
| `04-dunblane-gloss.mp4`   | https://www.tiktok.com/@cleanspaces_co/video/7650452938447473928          | Small high-gloss Dunblane kitchen              |
| `05-cappuccino.mp4`       | https://www.tiktok.com/@cleanspaces_co/video/7659296218153028882          | Cappuccino and Kirkwall kitchen                |

Original recordings are strongly preferred. The TikTok copies are 1080 x 1920
with burnt-in captions and the Clean Spaces watermark, and the montage crops
them to 16:9, so anything near the top or bottom of frame is lost.

## Read this before using the TikTok copies

The montage crops a 16:9 window out of a 9:16 clip, which keeps roughly a third
of the frame height. On these particular posts that means:

- burnt-in captions sitting in the upper third will usually be cropped out,
  which is what you want for a background;
- the Clean Spaces watermark sits low in frame on several clips and may be
  cropped out too, so check the result before publishing;
- a clip whose subject fills the full vertical frame will lose its top and
  bottom. Adjust `focus` per shot in `scripts/build-hero-montage.mjs`
  (0 = crop from the top, 0.5 = middle, 1 = crop from the bottom).

If the crops do not look right, the honest alternative is to leave the hero on
its still image and keep the clips in the Project videos section, where they
play full frame at their native 9:16 with attribution intact.

## Licensing

These are Clean Spaces' own posts, so Clean Spaces holds the rights. Confirm
with the client before publishing, particularly if any clip features music, a
person who has not consented, or a client's home that was filmed on the
understanding it would only appear on social media.

## After building

`npm run hero:montage` writes to `public/videos/`. Then switch the hero over in
`src/site.config.ts`:

```ts
heroVideo: { mp4: '/videos/hero-montage.mp4', webm: '/videos/hero-montage.webm' },
```

This folder is not part of the build. Keep the source clips out of the deployed
site; only the exported montage in `public/videos/` ships.
