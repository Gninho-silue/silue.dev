'use client';

import { useRef, useState, type FormEvent, type ChangeEvent } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { personal, social } from '@/content/personal';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof FormFields, string>>;
type SubmitState = 'idle' | 'loading' | 'success' | 'error';

// ─── Validation ───────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateFields(fields: FormFields, t: ReturnType<typeof useTranslations<'contact'>>): FieldErrors {
  const errors: FieldErrors = {};
  if (!fields.name.trim()) errors.name = t('form.errorRequired');
  if (!fields.email.trim()) {
    errors.email = t('form.errorRequired');
  } else if (!EMAIL_RE.test(fields.email.trim())) {
    errors.email = t('form.errorEmail');
  }
  if (!fields.subject.trim()) errors.subject = t('form.errorRequired');
  if (!fields.message.trim()) errors.message = t('form.errorRequired');
  return errors;
}

// ─── Framer variants ──────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 } },
};

const slideRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
};

const infoCardVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut', delay: 0.15 + i * 0.08 },
  }),
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function SpinnerIcon() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

// ─── Floating Label Field ─────────────────────────────────────────────────────

interface FloatFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
  textarea?: boolean;
  rows?: number;
  disabled?: boolean;
}

function FloatField({
  id,
  label,
  type = 'text',
  value,
  error,
  onChange,
  onBlur,
  textarea = false,
  rows = 5,
  disabled = false,
}: FloatFieldProps) {
  const filled = value.length > 0;
  const Tag = textarea ? 'textarea' : 'input';

  return (
    <div className="relative">
      <Tag
        id={id}
        name={id}
        type={textarea ? undefined : type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={textarea ? rows : undefined}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`contact-input peer w-full px-4 pt-6 pb-2.5 rounded-xl text-sm text-foreground
          bg-transparent border outline-none transition-all duration-200 resize-none
          ${error ? 'border-red-500/60 focus:border-red-500' : 'border-border focus:border-brand-primary'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${textarea ? 'min-h-[130px]' : ''}
        `}
      />
      <label
        htmlFor={id}
        className={`contact-label absolute left-4 pointer-events-none font-sans text-sm transition-all duration-200
          ${filled || true
            ? 'top-2 text-[10px] font-semibold tracking-wide uppercase'
            : 'top-1/2 -translate-y-1/2 text-sm'}
          ${error ? 'text-red-400' : 'text-muted peer-focus:text-brand-primary'}
        `}
        style={{
          top: filled ? '0.5rem' : undefined,
          fontSize: filled ? '10px' : undefined,
        }}
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-400 font-mono">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Contact Info Card ────────────────────────────────────────────────────────

interface InfoCardProps {
  icon: string;
  label: string;
  value: string;
  href?: string;
  index: number;
  inView: boolean;
}

function InfoCard({ icon, label, value, href, index, inView }: InfoCardProps) {
  const content = (
    <div className="contact-info-card card-glow flex items-center gap-4 rounded-xl px-5 py-4">
      <div className="contact-info-icon flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xl">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-0.5">{label}</p>
        <p className="font-sans text-sm text-foreground truncate">{value}</p>
      </div>
    </div>
  );

  return (
    <motion.div
      custom={index}
      variants={infoCardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </a>
      ) : (
        content
      )}
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

const EMPTY_FIELDS: FormFields = { name: '', email: '', subject: '', message: '' };

export default function ContactSection() {
  const t = useTranslations('contact');
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' });
  const formRef = useRef<HTMLDivElement>(null);
  const isFormInView = useInView(formRef, { once: true, margin: '-60px' });
  const infoRef = useRef<HTMLDivElement>(null);
  const isInfoInView = useInView(infoRef, { once: true, margin: '-60px' });

  const [fields, setFields] = useState<FormFields>(EMPTY_FIELDS);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [serverError, setServerError] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormFields]) {
      const updated = { ...fields, [name]: value };
      const newErrors = validateFields(updated, t);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormFields] }));
    }
  }

  function handleBlur(field: keyof FormFields) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validateFields(fields, t);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const allTouched = { name: true, email: true, subject: true, message: true };
    setTouched(allTouched);
    const newErrors = validateFields(fields, t);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitState('loading');
    setServerError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setSubmitState('success');
        setFields(EMPTY_FIELDS);
        setTouched({});
        setErrors({});
      } else {
        const data = await res.json().catch(() => ({}));
        setServerError(data.error ?? t('form.error'));
        setSubmitState('error');
      }
    } catch {
      setServerError(t('form.error'));
      setSubmitState('error');
    }
  }

  const INFO_CARDS = [
    { icon: '📧', label: t('info.emailLabel'), value: personal.email, href: `mailto:${personal.email}` },
    { icon: '💼', label: t('info.linkedinLabel'), value: 'linkedin.com/in/gninema-silue', href: social.linkedin },
    { icon: '🐙', label: t('info.githubLabel'), value: 'github.com/Gninho-silue', href: social.github },
    { icon: '🌍', label: t('info.locationLabel'), value: t('info.locationValue') },
  ];

  const isDisabled = submitState === 'loading' || submitState === 'success';

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      {/* Background orbs */}
      <div aria-hidden className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none contact-bg-orb-1" />
      <div aria-hidden className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none contact-bg-orb-2" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <motion.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={isHeaderInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center gap-4 mb-16"
        >
          <p className="text-xs font-mono font-semibold tracking-widest text-muted uppercase">
            {t('label')}
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
            {t('sectionTitle')}
          </h2>
          <p className="font-sans text-base text-muted max-w-xl leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">

          {/* ── Left: Contact form ── */}
          <motion.div
            ref={formRef}
            variants={slideLeft}
            initial="hidden"
            animate={isFormInView ? 'visible' : 'hidden'}
          >
            <form onSubmit={handleSubmit} noValidate className="contact-form-card rounded-2xl p-6 md:p-8 flex flex-col gap-5">

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FloatField
                  id="name"
                  label={t('form.name')}
                  value={fields.name}
                  error={errors.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur('name')}
                  disabled={isDisabled}
                />
                <FloatField
                  id="email"
                  label={t('form.email')}
                  type="email"
                  value={fields.email}
                  error={errors.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  disabled={isDisabled}
                />
              </div>

              {/* Subject */}
              <FloatField
                id="subject"
                label={t('form.subject')}
                value={fields.subject}
                error={errors.subject}
                onChange={handleChange}
                onBlur={() => handleBlur('subject')}
                disabled={isDisabled}
              />

              {/* Message */}
              <FloatField
                id="message"
                label={t('form.message')}
                value={fields.message}
                error={errors.message}
                onChange={handleChange}
                onBlur={() => handleBlur('message')}
                textarea
                rows={5}
                disabled={isDisabled}
              />

              {/* Server error */}
              {submitState === 'error' && serverError && (
                <p role="alert" className="text-sm text-red-400 font-mono bg-red-500/8 border border-red-500/20 rounded-lg px-4 py-2.5">
                  {serverError}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isDisabled}
                className={`contact-submit-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200
                  ${submitState === 'success'
                    ? 'contact-submit-success'
                    : 'contact-submit-primary'
                  }
                  ${isDisabled ? 'opacity-75 cursor-not-allowed' : ''}
                `}
              >
                {submitState === 'loading' && <SpinnerIcon />}
                {submitState === 'success' && <CheckIcon />}
                {submitState === 'idle' || submitState === 'error' ? <SendIcon /> : null}

                {submitState === 'loading' && t('form.sending')}
                {submitState === 'success' && t('form.success')}
                {(submitState === 'idle' || submitState === 'error') && t('form.send')}
              </button>

            </form>
          </motion.div>

          {/* ── Right: Contact info ── */}
          <div ref={infoRef} className="flex flex-col gap-6">

            {/* Info cards title */}
            <motion.h3
              variants={fadeUp}
              initial="hidden"
              animate={isInfoInView ? 'visible' : 'hidden'}
              className="font-display font-bold text-xl text-foreground"
            >
              {t('info.title')}
            </motion.h3>

            {/* Info cards */}
            <div className="flex flex-col gap-3">
              {INFO_CARDS.map((card, i) => (
                <InfoCard
                  key={card.label}
                  icon={card.icon}
                  label={card.label}
                  value={card.value}
                  href={card.href}
                  index={i}
                  inView={isInfoInView}
                />
              ))}
            </div>

            {/* Availability card */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              animate={isInfoInView ? 'visible' : 'hidden'}
              className="contact-avail-card rounded-xl p-5"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <span className="relative flex w-2.5 h-2.5">
                  <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </span>
                <span className="font-display font-bold text-sm text-foreground">
                  {t('info.availTitle')}
                </span>
              </div>
              <p className="font-sans text-sm text-muted leading-relaxed mb-2">
                {t('info.openTo')}
              </p>
              <p className="font-mono text-xs text-muted opacity-75">
                {t('info.responseTime')}
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
