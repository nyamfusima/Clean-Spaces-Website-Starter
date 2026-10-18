import { Reveal } from './Reveal';
import styles from './About.module.css';

/** The four disciplines listed on the Clean Spaces brand sheet. */
const DISCIPLINES = [
  'Kitchen design',
  'Built-in cabinetry',
  'Renovations',
  'Installation',
] as const;

export function About() {
  return (
    <section className={`section ${styles.about}`} id="about">
      <div className="container">
        <div className={styles.grid}>
          <Reveal>
            <p className="eyebrow">About Clean Spaces</p>
            <h2 className={styles.heading}>
              A kitchen should work as well as it <em>looks.</em>
            </h2>
            <div className={`lead ${styles.body}`}>
              <p>
                We design and build kitchens, cupboards and interiors from the layout outwards. The
                plan starts with how the room is actually used, and the finishes follow from there.
              </p>
              <p>
                Everything is made to measure, so storage lands where you need it and the detailing
                stays consistent from the island to the last tall unit. The team that draws the
                design also builds and installs it.
              </p>
            </div>
            <ul className={styles.disciplines}>
              {DISCIPLINES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <figure className={styles.figure}>
              <img
                src="/images/projects/project-cabinetry-run-1200.webp"
                srcSet="/images/projects/project-cabinetry-run-800.webp 800w, /images/projects/project-cabinetry-run-1200.webp 1200w"
                sizes="(max-width: 900px) 100vw, 44vw"
                width={1200}
                height={968}
                alt="Tall cabinetry with integrated oven and microwave beside a backlit glass display column"
                loading="lazy"
                decoding="async"
              />
              <figcaption className={styles.plate}>
                <span className={styles.plateLabel}>Our work</span>
                <span className={styles.plateText}>
                  Made to measure, fitted by the team that designed it.
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
