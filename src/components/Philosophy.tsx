import { Reveal } from './Reveal';
import markMarble from '../assets/branding/web/cleanspaces-mark.webp';
import styles from './Philosophy.module.css';

const POINTS = [
  {
    title: 'Layout before finishes',
    copy: 'Where the sink, hob and fridge sit decides how a kitchen feels to use. We settle the plan first, then dress it.',
  },
  {
    title: 'Storage that earns its place',
    copy: 'Deep drawers, tall units and the awkward corners worked out properly, so everything has somewhere sensible to live.',
  },
  {
    title: 'Materials chosen to last',
    copy: 'Fronts, worktops and edges picked for the way they wear, not only the way they photograph on the day.',
  },
] as const;

export function Philosophy() {
  return (
    <section className={`section ${styles.philosophy}`} id="philosophy">
      <img src={markMarble} alt="" aria-hidden="true" className={styles.watermark} />
      <div className="container">
        <Reveal>
          <p className={styles.eyebrowLight}>Design philosophy</p>
          <h2 className={styles.statement}>
            The difference is in what you <em>stop noticing.</em>
          </h2>
          <p className={styles.intro}>
            A kitchen is working well when nothing gets in your way. The drawer is where your hand
            expects it, the light falls where you are working, and the finishes still look right
            years later.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <ul className={styles.points}>
            {POINTS.map((point) => (
              <li key={point.title}>
                <h3 className={styles.pointTitle}>{point.title}</h3>
                <p className={styles.pointCopy}>{point.copy}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
