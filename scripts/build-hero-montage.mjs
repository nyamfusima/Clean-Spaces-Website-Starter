#!/usr/bin/env node
/**
 * Builds the cinematic hero montage from Clean Spaces' own project clips.
 *
 *   npm run hero:montage
 *
 * It expects authorised source clips in media/hero-source/ (see the README in
 * that folder). Nothing in this repository downloads footage: put the files
 * there yourself, from the original recordings or from TikTok's own download
 * option on the Clean Spaces account.
 *
 * Needs ffmpeg. It uses, in order: FFMPEG_PATH, ffmpeg on PATH, or the
 * ffmpeg-static package if you install it (npm i -D ffmpeg-static).
 */
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIR = path.join(ROOT, 'media', 'hero-source');
const OUT_DIR = path.join(ROOT, 'public', 'videos');
const TMP_DIR = path.join(ROOT, 'node_modules', '.cache', 'hero-montage');

/**
 * The montage, in order. Edit freely.
 *
 *  file   name inside media/hero-source/
 *  start  seconds into the clip to begin
 *  length seconds to use (keep each between 2 and 4 for a calm rhythm)
 *  focus  vertical crop centre, 0 = top of frame, 1 = bottom, 0.5 = middle.
 *         Source clips are 9:16, so a 16:9 crop keeps roughly a third of the
 *         frame height. Set this per clip so the crop lands on the cabinetry
 *         rather than the ceiling or the floor.
 */
const SHOTS = [
  { file: '01-before-after.mp4', start: 1.5, length: 3.0, focus: 0.5 },
  { file: '02-machadodorp.mp4', start: 2.0, length: 3.5, focus: 0.55 },
  { file: '03-iceberg-displays.mp4', start: 1.0, length: 3.0, focus: 0.45 },
  { file: '04-dunblane-gloss.mp4', start: 1.5, length: 3.0, focus: 0.5 },
  { file: '05-cappuccino.mp4', start: 2.0, length: 3.0, focus: 0.55 },
];

const WIDTH = 1280;
const HEIGHT = 720;
const FPS = 30;
const XFADE = 0.6; // seconds of crossfade between shots

/** Warm, restrained grade that sits with the stone and taupe palette. */
const GRADE =
  'eq=contrast=1.06:brightness=0.01:saturation=0.92,' +
  'colorbalance=rs=0.02:gs=0.005:bs=-0.03:rm=0.015:bm=-0.02,' +
  'unsharp=5:5:0.3';

function findFfmpeg() {
  if (process.env.FFMPEG_PATH && fs.existsSync(process.env.FFMPEG_PATH)) {
    return process.env.FFMPEG_PATH;
  }
  const probe = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' });
  if (probe.status === 0) return 'ffmpeg';
  try {
    const resolved = createRequire(import.meta.url)('ffmpeg-static');
    return typeof resolved === 'string' && fs.existsSync(resolved) ? resolved : null;
  } catch {
    return null;
  }
}

const ffmpeg = findFfmpeg();
if (!ffmpeg) {
  console.error(
    'ffmpeg was not found.\n' +
      'Install it and re-run, or: npm i -D ffmpeg-static\n' +
      'You can also point FFMPEG_PATH at an ffmpeg binary.',
  );
  process.exit(1);
}

const missing = SHOTS.filter((s) => !fs.existsSync(path.join(SOURCE_DIR, s.file)));
if (missing.length > 0) {
  console.error(`Missing source clips in ${path.relative(ROOT, SOURCE_DIR)}:`);
  for (const s of missing) console.error(`  - ${s.file}`);
  console.error('\nSee media/hero-source/README.md for which clips these are.');
  process.exit(1);
}

fs.mkdirSync(TMP_DIR, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

const run = (args) => execFileSync(ffmpeg, args, { stdio: ['ignore', 'ignore', 'inherit'] });

// 1. Normalise each shot: trim, crop 9:16 down to 16:9, grade, drop audio.
console.log('Preparing shots');
const segments = SHOTS.map((shot, i) => {
  const out = path.join(TMP_DIR, `seg-${String(i).padStart(2, '0')}.mp4`);
  // Crop the largest 16:9 window the source allows, positioned by `focus`,
  // so nothing is ever stretched.
  const filter =
    `crop=w='min(iw,ih*${WIDTH}/${HEIGHT})':h='min(ih,iw*${HEIGHT}/${WIDTH})':` +
    `x='(iw-ow)/2':y='(ih-oh)*${shot.focus}',` +
    `scale=${WIDTH}:${HEIGHT}:flags=lanczos,setsar=1,fps=${FPS},${GRADE}`;

  run([
    '-y',
    '-ss', String(shot.start),
    '-t', String(shot.length),
    '-i', path.join(SOURCE_DIR, shot.file),
    '-an',
    '-vf', filter,
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', '20',
    '-pix_fmt', 'yuv420p',
    out,
  ]);
  console.log(`  ${shot.file} -> ${path.basename(out)}`);
  return out;
});

// 2. Chain them with crossfades.
console.log('Joining with crossfades');
const inputs = segments.flatMap((s) => ['-i', s]);
let filter = '';
let last = '0:v';
let offset = SHOTS[0].length - XFADE;
for (let i = 1; i < segments.length; i += 1) {
  const label = i === segments.length - 1 ? 'vout' : `v${i}`;
  filter += `[${last}][${i}:v]xfade=transition=fade:duration=${XFADE}:offset=${offset.toFixed(3)}[${label}];`;
  last = label;
  offset += SHOTS[i].length - XFADE;
}
filter = filter.replace(/;$/, '');

const mp4 = path.join(OUT_DIR, 'hero-montage.mp4');
run([
  '-y', ...inputs,
  '-filter_complex', filter,
  '-map', '[vout]',
  '-an',
  '-c:v', 'libx264',
  '-preset', 'slow',
  '-crf', '23',
  '-profile:v', 'high',
  '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart',
  mp4,
]);

const webm = path.join(OUT_DIR, 'hero-montage.webm');
run([
  '-y', ...inputs,
  '-filter_complex', filter,
  '-map', '[vout]',
  '-an',
  '-c:v', 'libvpx-vp9',
  '-crf', '36',
  '-b:v', '0',
  '-row-mt', '1',
  webm,
]);

// 3. A poster frame from the first shot, so the still matches the video.
const poster = path.join(OUT_DIR, 'hero-montage-poster.jpg');
run(['-y', '-ss', '0.8', '-i', mp4, '-frames:v', '1', '-update', '1', '-q:v', '3', poster]);

const total = SHOTS.reduce((n, s) => n + s.length, 0) - XFADE * (SHOTS.length - 1);
const mb = (f) => (fs.statSync(f).size / 1e6).toFixed(2);
console.log(`\nDone. ${total.toFixed(1)}s montage at ${WIDTH}x${HEIGHT}`);
console.log(`  ${path.relative(ROOT, mp4)}    ${mb(mp4)} MB`);
console.log(`  ${path.relative(ROOT, webm)}   ${mb(webm)} MB`);
console.log(`  ${path.relative(ROOT, poster)} ${mb(poster)} MB`);
console.log('\nNow set heroVideo in src/site.config.ts:');
console.log("  heroVideo: { mp4: '/videos/hero-montage.mp4', webm: '/videos/hero-montage.webm' },");
