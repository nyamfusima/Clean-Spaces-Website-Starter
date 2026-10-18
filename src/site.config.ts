/**
 * Client-configurable details.
 *
 * Everything the business owns lives here so it can be changed without
 * touching components. Values marked TODO were NOT supplied by the client
 * and must be confirmed before the site goes live.
 */

export interface SiteConfig {
  readonly name: string;
  readonly tagline: string;
  /** International format, digits only, used to build wa.me links. */
  readonly whatsappNumber: string;
  /** Human-readable, as the client writes it locally. */
  readonly phoneDisplay: string;
  /** tel: href, E.164. */
  readonly phoneHref: string;
  /** TODO(client): confirm the business email address. */
  readonly email: string;
  readonly emailConfirmed: boolean;
  /** TODO(client): confirm the service area. */
  readonly serviceArea: string | null;
  readonly tiktok: { handle: string; profileUrl: string } | null;
  /**
   * Cinematic hero background. Null means the hero uses its still image.
   * Set this once an authorised montage exists at the given paths, and the
   * Hero component picks it up with no other changes.
   */
  readonly heroVideo: { mp4: string; webm: string | null } | null;
  readonly socials: ReadonlyArray<{ label: string; href: string }>;
}

export const site: SiteConfig = {
  name: 'Clean Spaces',
  // From the client's brand sheet.
  tagline: 'Beautiful spaces. Built to last.',

  whatsappNumber: '27648075408',
  phoneDisplay: '064 807 5408',
  phoneHref: '+27648075408',

  // Placeholder. See the README. Nothing is sent anywhere until this is real.
  email: 'hello@cleanspaces.example',
  emailConfirmed: false,

  serviceArea: null,

  tiktok: {
    handle: '@cleanspaces_co',
    profileUrl: 'https://www.tiktok.com/@cleanspaces_co',
  },

  // To switch the hero to video, drop the files into public/videos/ and use:
  // heroVideo: { mp4: '/videos/hero-montage.mp4', webm: '/videos/hero-montage.webm' },
  heroVideo: null,

  socials: [],
};

/** Build a wa.me link with an optional prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
