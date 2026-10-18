import { useState } from 'react';
import type { FormEvent } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import { Reveal } from './Reveal';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { projectTypes } from '../data/content';
import { site, whatsappLink } from '../site.config';
import styles from './ContactForm.module.css';

interface Values {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

type Errors = Partial<Record<keyof Values | 'contact', string>>;

const EMPTY: Values = { name: '', email: '', phone: '', projectType: '', message: '' };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Please tell us your name.';
  }

  if (values.email.trim() !== '' && !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'That email address does not look right.';
  }

  if (values.email.trim() === '' && values.phone.trim() === '') {
    errors.contact = 'Add an email address or a phone number so we can reply.';
  }

  if (values.message.trim().length < 10) {
    errors.message = 'A sentence or two about the space helps us answer properly.';
  }

  return errors;
}

function buildMessage(values: Values): string {
  return [
    `Hello ${site.name}, I would like to discuss a project.`,
    '',
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim() || 'Not provided'}`,
    `Phone: ${values.phone.trim() || 'Not provided'}`,
    `Project: ${values.projectType || 'Not specified'}`,
    '',
    'About the space:',
    values.message.trim(),
  ].join('\n');
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ tone: 'info' | 'error'; text: string } | null>(null);

  const update = (field: keyof Values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((previous) => ({ ...previous, [field]: event.target.value }));
  };

  const check = (): Values | null => {
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus({ tone: 'error', text: 'Please check the highlighted fields and try again.' });
      return null;
    }
    setStatus(null);
    return values;
  };

  const handleWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = check();
    if (!valid) return;

    const opened = window.open(whatsappLink(buildMessage(valid)), '_blank', 'noopener,noreferrer');
    setStatus(
      opened
        ? {
            tone: 'info',
            text: 'WhatsApp is opening with your enquiry ready to send. Tap send in WhatsApp to deliver it.',
          }
        : {
            tone: 'error',
            text: `Your browser blocked the WhatsApp window. Please message us directly on ${site.phoneDisplay}.`,
          },
    );
  };

  const handleEmail = () => {
    const valid = check();
    if (!valid) return;

    const subject = `Website enquiry: ${valid.projectType || 'New project'}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage(valid))}`;
    setStatus({
      tone: 'info',
      text: 'Your email app is opening with a draft. Nothing is sent until you send it yourself.',
    });
  };

  return (
    <section className={`section ${styles.contact}`} id="contact">
      <div className="container">
        <div className={styles.grid}>
          <Reveal>
            <p className="eyebrow">Start a project</p>
            <h2 className={styles.heading}>
              Tell us about <em>your space.</em>
            </h2>
            <p className={styles.blurb}>
              Share a few details and we will come back to you about a consultation, a measure up
              and a quote.
            </p>

            <div className={styles.details}>
              <a
                className={styles.detail}
                href={whatsappLink(`Hello ${site.name}, I would like to discuss a project.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={`${styles.detailIcon} ${styles.whatsappIcon}`}>
                  <WhatsAppIcon size={19} />
                </span>
                <span>
                  <span className={styles.detailLabel}>WhatsApp</span>
                  {site.phoneDisplay}
                </span>
              </a>

              <a className={styles.detail} href={`tel:${site.phoneHref}`}>
                <span className={styles.detailIcon}>
                  <Phone size={17} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span>
                  <span className={styles.detailLabel}>Call</span>
                  {site.phoneDisplay}
                </span>
              </a>

              {site.emailConfirmed ? (
                <a className={styles.detail} href={`mailto:${site.email}`}>
                  <span className={styles.detailIcon}>
                    <Mail size={17} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span>
                    <span className={styles.detailLabel}>Email</span>
                    {site.email}
                  </span>
                </a>
              ) : (
                <span className={styles.detail}>
                  <span className={styles.detailIcon}>
                    <Mail size={17} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span>
                    <span className={styles.detailLabel}>Email</span>
                    <span className={styles.pending}>To be confirmed</span>
                  </span>
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form className={styles.form} onSubmit={handleWhatsApp} noValidate>
              <div className={styles.formHead}>
                <h3 className={styles.formTitle}>Request a quote</h3>
                <span className={styles.formStep}>It takes a minute</span>
              </div>

              <div className={styles.row}>
                <label className={styles.field}>
                  <span className={styles.label}>Your name</span>
                  <input
                    className={styles.input}
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={update('name')}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                  />
                  {errors.name && (
                    <span className={styles.error} id="error-name">
                      {errors.name}
                    </span>
                  )}
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>
                    Phone or WhatsApp <span className={styles.optional}>(optional)</span>
                  </span>
                  <input
                    className={styles.input}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={update('phone')}
                  />
                </label>
              </div>

              <label className={styles.field}>
                <span className={styles.label}>
                  Email <span className={styles.optional}>(optional if you give a number)</span>
                </span>
                <input
                  className={styles.input}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={update('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                />
                {errors.email && (
                  <span className={styles.error} id="error-email">
                    {errors.email}
                  </span>
                )}
                {errors.contact && <span className={styles.error}>{errors.contact}</span>}
              </label>

              <label className={styles.field}>
                <span className={styles.label}>What are you planning?</span>
                <select
                  className={styles.select}
                  name="projectType"
                  value={values.projectType}
                  onChange={update('projectType')}
                >
                  <option value="">Choose a project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.field}>
                <span className={styles.label}>About the space</span>
                <textarea
                  className={styles.textarea}
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={update('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                />
                {errors.message && (
                  <span className={styles.error} id="error-message">
                    {errors.message}
                  </span>
                )}
              </label>

              <button type="submit" className={styles.submit}>
                <WhatsAppIcon size={18} />
                Send on WhatsApp
              </button>

              <button
                type="button"
                className={styles.secondary}
                onClick={handleEmail}
                disabled={!site.emailConfirmed}
                title={
                  site.emailConfirmed
                    ? undefined
                    : 'Add the business email address in src/site.config.ts to enable this.'
                }
              >
                <Send size={16} aria-hidden="true" />
                {site.emailConfirmed ? 'Open an email draft instead' : 'Email address to be confirmed'}
              </button>

              {status && (
                <p className={styles.status} data-tone={status.tone} role="status" aria-live="polite">
                  {status.text}
                </p>
              )}

              <p className={styles.footnote}>
                This form does not send anything by itself. There is no server behind it, so your
                enquiry is handed to WhatsApp and you stay in control of what gets sent.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
