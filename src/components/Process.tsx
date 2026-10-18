import { Reveal } from './Reveal';
import { processSteps } from '../data/content';
import styles from './Process.module.css';

export function Process() {
  return (
    <section className={`section ${styles.process}`} id="process">
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.intro}>
              <Reveal>
                <p className="eyebrow">How it works</p>
                <h2 className={styles.heading}>
                  From first visit to <em>final fix.</em>
                </h2>
                <p className={styles.note}>
                  A clear sequence, so you always know what happens next and what we need from you
                  at each stage.
                </p>
                <figure className={styles.figure}>
                  <img
                    src="/images/projects/project-workshop-fit-1200.webp"
                    srcSet="/images/projects/project-workshop-fit-800.webp 800w, /images/projects/project-workshop-fit-1200.webp 1200w"
                    sizes="(max-width: 900px) 92vw, 32vw"
                    width={1200}
                    height={800}
                    alt="A fitter installing cabinetry and lighting on site"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>On site during installation.</figcaption>
                </figure>
              </Reveal>
            </div>
          </div>

          <Reveal delay={100}>
            <ol className={styles.steps}>
              {processSteps.map((item) => (
                <li key={item.step} className={styles.step}>
                  <span className={styles.number}>{item.step}</span>
                  <div>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.copy}>{item.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
