import { Reveal } from './Reveal';
import { services } from '../data/content';
import styles from './Services.module.css';

export function Services() {
  return (
    <section className={`section ${styles.services}`} id="services">
      <div className="container">
        <Reveal>
          <div className={styles.intro}>
            <p className="eyebrow">What we do</p>
            <h2 className={styles.heading}>
              Drawn, built and fitted <em>in house.</em>
            </h2>
            <p className={styles.lede}>
              Design, manufacture and installation stay with one team, so nothing is lost between
              the drawing you approve and the kitchen you end up with.
            </p>
          </div>
        </Reveal>

        <div className={styles.split}>
          <Reveal>
            <figure className={styles.figure}>
              <img
                src="/images/projects/project-services-panel-900.webp"
                srcSet="/images/projects/project-services-panel-600.webp 600w, /images/projects/project-services-panel-900.webp 900w"
                sizes="(max-width: 900px) 92vw, 36vw"
                width={900}
                height={1363}
                alt="Gloss cabinet fronts meeting built-in oak open shelving, with a smoked glass unit below"
                loading="lazy"
                decoding="async"
              />
              <figcaption className={styles.figcaption}>
                Gloss fronts, oak shelving and smoked glass, built into one continuous run.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={120}>
            <ul className={styles.list}>
              {services.map((service) => (
                <li key={service.id}>
                  <div className={styles.item}>
                    <span className={styles.number}>{service.number}</span>
                    <div>
                      <h3 className={styles.title}>{service.title}</h3>
                      <p className={styles.copy}>{service.copy}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
