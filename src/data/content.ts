export interface Service {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly copy: string;
}

export interface GalleryImage {
  readonly id: string;
  readonly src: string;
  readonly srcSet: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly caption: string;
  readonly kind: 'photograph' | 'render';
}

export interface ProcessStep {
  readonly step: string;
  readonly title: string;
  readonly copy: string;
}

/* ------------------------------------------------------------------ services
   The four disciplines on the client's brand sheet. Confirm the final wording
   and scope with Clean Spaces before launch. */
export const services: readonly Service[] = [
  {
    id: 'design',
    number: '01',
    title: 'Kitchen design',
    copy: 'Layouts planned around how you actually cook, store and gather, balanced for flow, light and the proportions of the room.',
  },
  {
    id: 'cabinetry',
    number: '02',
    title: 'Built-in cabinetry',
    copy: 'Cupboards, islands and storage built to the millimetre for your space, from tall appliance units to open oak shelving.',
  },
  {
    id: 'installation',
    number: '03',
    title: 'Manufacture and installation',
    copy: 'Built and fitted by the same team that designed it, so the detailing you were shown is the detailing you get.',
  },
  {
    id: 'renovation',
    number: '04',
    title: 'Renovations and interiors',
    copy: 'Reworking tired kitchens and interior spaces with new finishes, better storage and a layout that finally makes sense.',
  },
];

/* -------------------------------------------------- genuine Clean Spaces work
   Photographs and design renders supplied by the client. Descriptions cover
   only what is visible. No project names, clients or locations are invented. */
export const projects: readonly GalleryImage[] = [
  {
    id: 'island-view',
    src: '/images/projects/project-island-view-900.webp',
    srcSet:
      '/images/projects/project-island-view-600.webp 600w, /images/projects/project-island-view-900.webp 900w',
    width: 900,
    height: 1500,
    alt: 'Kitchen island with an induction hob below a tall pendant light, with cabinetry either side and a garden door beyond',
    caption: 'Island, pendant lighting and a view through',
    kind: 'photograph',
  },
  {
    id: 'cabinetry-elevation',
    src: '/images/projects/project-cabinetry-elevation-1800.webp',
    srcSet:
      '/images/projects/project-cabinetry-elevation-1200.webp 1200w, /images/projects/project-cabinetry-elevation-1800.webp 1800w',
    width: 1800,
    height: 714,
    alt: 'A row of glass pendant lights over gloss wall cabinets, with oak open shelving at one end',
    caption: 'Gloss fronts, smoked glass and oak shelving',
    kind: 'photograph',
  },
  {
    id: 'cabinetry-run',
    src: '/images/projects/project-cabinetry-run-1200.webp',
    srcSet:
      '/images/projects/project-cabinetry-run-800.webp 800w, /images/projects/project-cabinetry-run-1200.webp 1200w',
    width: 1200,
    height: 968,
    alt: 'Tall cabinetry with a built-in oven and microwave, a backlit glass display column and a fridge',
    caption: 'Tall units and integrated appliances',
    kind: 'photograph',
  },
  {
    id: 'tall-units',
    src: '/images/projects/project-tall-units-900.webp',
    srcSet:
      '/images/projects/project-tall-units-600.webp 600w, /images/projects/project-tall-units-900.webp 900w',
    width: 900,
    height: 726,
    alt: 'Close view of the built-in oven and microwave beside a backlit glass display cabinet',
    caption: 'Oven tower and backlit glazing',
    kind: 'photograph',
  },
  {
    id: 'galley-pano',
    src: '/images/projects/project-galley-pano-1800.webp',
    srcSet:
      '/images/projects/project-galley-pano-1200.webp 1200w, /images/projects/project-galley-pano-1800.webp 1800w',
    width: 1800,
    height: 714,
    alt: 'Wide view of the kitchen with a stone-topped island, drawer runs on the left and tall units on the right',
    caption: 'The full run, island to garden door',
    kind: 'photograph',
  },
  {
    id: 'oak-shelving',
    src: '/images/projects/project-oak-shelving-900.webp',
    srcSet:
      '/images/projects/project-oak-shelving-600.webp 600w, /images/projects/project-oak-shelving-900.webp 900w',
    width: 900,
    height: 727,
    alt: 'Oak open shelving built in beside gloss wall cabinets and a smoked glass unit',
    caption: 'Oak open shelving, built in',
    kind: 'photograph',
  },
  {
    id: 'render-a',
    src: '/images/renders/render-folkstone-grey-a-540.webp',
    srcSet: '/images/renders/render-folkstone-grey-a-540.webp 540w',
    width: 540,
    height: 403,
    alt: 'Design visualisation of a grey handleless kitchen with walnut accents and a sculptural light fitting',
    caption: 'Design visualisation, Folkstone Grey kitchen',
    kind: 'render',
  },
  {
    id: 'render-b',
    src: '/images/renders/render-folkstone-grey-b-540.webp',
    srcSet: '/images/renders/render-folkstone-grey-b-540.webp 540w',
    width: 540,
    height: 404,
    alt: 'Design visualisation showing the oven tower, microwave niche and fridge of a grey kitchen',
    caption: 'Design visualisation, appliance wall',
    kind: 'render',
  },
];

/* --------------------------------------------------------------- inspiration
   Licensed stock photography (Pexels), shown as material and style references.
   These are not Clean Spaces projects, and the section never says they are. */
export const inspiration: readonly GalleryImage[] = [
  {
    id: 'oak-black-marble',
    src: '/images/inspiration/insp-oak-black-marble-1200.webp',
    srcSet:
      '/images/inspiration/insp-oak-black-marble-800.webp 800w, /images/inspiration/insp-oak-black-marble-1200.webp 1200w',
    width: 1200,
    height: 800,
    alt: 'Full-height oak panelling with a black marble island',
    caption: 'Oak panelling, black marble',
    kind: 'photograph',
  },
  {
    id: 'stone-backsplash',
    src: '/images/inspiration/insp-stone-backsplash-1200.webp',
    srcSet:
      '/images/inspiration/insp-stone-backsplash-800.webp 800w, /images/inspiration/insp-stone-backsplash-1200.webp 1200w',
    width: 1200,
    height: 800,
    alt: 'Beige cabinetry with a dramatic stone splashback and bar stools',
    caption: 'Beige fronts, feature stone',
    kind: 'photograph',
  },
  {
    id: 'gloss-handleless',
    src: '/images/inspiration/insp-gloss-handleless-1200.webp',
    srcSet:
      '/images/inspiration/insp-gloss-handleless-800.webp 800w, /images/inspiration/insp-gloss-handleless-1200.webp 1200w',
    width: 1200,
    height: 800,
    alt: 'Handleless gloss cabinetry above a warm beige splashback',
    caption: 'Handleless gloss',
    kind: 'photograph',
  },
  {
    id: 'wood-accents',
    src: '/images/inspiration/insp-wood-accents-1200.webp',
    srcSet:
      '/images/inspiration/insp-wood-accents-800.webp 800w, /images/inspiration/insp-wood-accents-1200.webp 1200w',
    width: 1200,
    height: 800,
    alt: 'Bright kitchen with white cabinetry and warm wood detailing',
    caption: 'White with warm wood',
    kind: 'photograph',
  },
  {
    id: 'stone-worktop',
    src: '/images/inspiration/insp-stone-worktop-1200.webp',
    srcSet:
      '/images/inspiration/insp-stone-worktop-800.webp 800w, /images/inspiration/insp-stone-worktop-1200.webp 1200w',
    width: 1200,
    height: 800,
    alt: 'Taupe and white cupboards with a stone worktop and integrated sink',
    caption: 'Taupe and stone',
    kind: 'photograph',
  },
  {
    id: 'beige-integrated',
    src: '/images/inspiration/insp-beige-integrated-1200.webp',
    srcSet:
      '/images/inspiration/insp-beige-integrated-800.webp 800w, /images/inspiration/insp-beige-integrated-1200.webp 1200w',
    width: 1200,
    height: 800,
    alt: 'Beige minimalist kitchen with integrated appliances and a wooden floor',
    caption: 'Beige, fully integrated',
    kind: 'photograph',
  },
  {
    id: 'marble-dining',
    src: '/images/inspiration/insp-marble-dining-1200.webp',
    srcSet:
      '/images/inspiration/insp-marble-dining-800.webp 800w, /images/inspiration/insp-marble-dining-1200.webp 1200w',
    width: 1200,
    height: 800,
    alt: 'Kitchen opening onto a marble dining table with upholstered chairs',
    caption: 'Kitchen into dining',
    kind: 'photograph',
  },
  {
    id: 'dark-gloss',
    src: '/images/inspiration/insp-dark-gloss-1200.webp',
    srcSet:
      '/images/inspiration/insp-dark-gloss-800.webp 800w, /images/inspiration/insp-dark-gloss-1200.webp 1200w',
    width: 1200,
    height: 800,
    alt: 'Dark gloss cabinetry with brass-toned lighting',
    caption: 'Dark gloss, warm light',
    kind: 'photograph',
  },
];

/* ------------------------------------------------------------ project videos
   Clean Spaces' own TikTok posts (@cleanspaces_co). Captions come from the
   client's own posts with hashtags removed. Nothing has been invented.
   Posters are the covers of those same posts, stored locally so the cards stay
   fast. Playback happens in the official TikTok embed, which keeps the creator
   attribution intact. */
export interface ProjectVideo {
  readonly id: string;
  readonly url: string;
  readonly caption: string;
  /** A location only where the client's own caption states one. */
  readonly project: string | null;
  readonly poster: string;
  readonly posterSrcSet: string;
  readonly alt: string;
}

const poster = (id: string) => ({
  poster: `/images/videos/tiktok-${id}-640.webp`,
  posterSrcSet: `/images/videos/tiktok-${id}-400.webp 400w, /images/videos/tiktok-${id}-640.webp 640w`,
});

export const projectVideos: readonly ProjectVideo[] = [
  {
    id: '7674882044261829908',
    url: 'https://www.tiktok.com/@cleanspaces_co/video/7674882044261829908',
    caption: 'Modern kitchen, before and after',
    project: null,
    alt: 'A tall unit with a built-in oven and microwave beside a fridge, in a wood-effect finish',
    ...poster('7674882044261829908'),
  },
  {
    id: '7696416387933228295',
    url: 'https://www.tiktok.com/@cleanspaces_co/video/7696416387933228295',
    caption: 'Dunblane Grey and Kirkwall modern kitchen',
    project: 'Project Machadodorp',
    alt: 'A grey kitchen with a stone-topped island, pendant lights and a full-height appliance wall',
    ...poster('7696416387933228295'),
  },
  {
    id: '7658223222646770962',
    url: 'https://www.tiktok.com/@cleanspaces_co/video/7658223222646770962',
    caption: 'Iceberg Gloss and Kirkwall displays with warm white LED',
    project: null,
    alt: 'A backlit glass display cabinet with warm white LED lighting beside gloss cabinetry',
    ...poster('7658223222646770962'),
  },
  {
    id: '7650452938447473928',
    url: 'https://www.tiktok.com/@cleanspaces_co/video/7650452938447473928',
    caption: 'Small high-gloss Dunblane kitchen',
    project: null,
    alt: 'A high-gloss kitchen with a glazed display unit above a stone-topped island',
    ...poster('7650452938447473928'),
  },
  {
    id: '7659296218153028882',
    url: 'https://www.tiktok.com/@cleanspaces_co/video/7659296218153028882',
    caption: 'Cappuccino and Kirkwall modern kitchen',
    project: null,
    alt: 'An L-shaped kitchen with wood-effect base units, open shelving and a tiled floor',
    ...poster('7659296218153028882'),
  },
  {
    id: '7684907226703678740',
    url: 'https://www.tiktok.com/@cleanspaces_co/video/7684907226703678740',
    caption: 'Nevada and Dunblane Grey modern TV display',
    project: null,
    alt: 'A built-in TV unit with slatted wood panelling above a long floating cabinet',
    ...poster('7684907226703678740'),
  },
];

export const processSteps: readonly ProcessStep[] = [
  {
    step: '01',
    title: 'Consultation',
    copy: 'We visit the space, measure up and talk through how you want it to work, including storage, appliances, budget and timing.',
  },
  {
    step: '02',
    title: 'Design',
    copy: 'Layouts and visuals so you can see the kitchen before it is built, refined until the plan genuinely fits.',
  },
  {
    step: '03',
    title: 'Materials and finishes',
    copy: 'Fronts, worktops, handles, glass and lighting chosen together, with samples where it helps you decide.',
  },
  {
    step: '04',
    title: 'Manufacture and installation',
    copy: 'Built to the approved drawings and installed by our own team, kept tidy and on schedule.',
  },
  {
    step: '05',
    title: 'Handover',
    copy: 'A final walk through, adjustments where needed, and care guidance for the finishes.',
  },
];

export const projectTypes: readonly string[] = [
  'New kitchen',
  'Kitchen renovation',
  'Built-in cupboards',
  'Other interior project',
];
