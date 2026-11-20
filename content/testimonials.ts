export interface Testimonial {
  id: string;
  name: string;
  organization: string;
  /** Role, quote and translation note live in messages/*.json under testimonials.<camelCaseId>. */
  quoteKey: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'abdelhadi-laassi',
    name: 'Abdelhadi Laassi',
    organization: 'TechPal Services',
    quoteKey: 'testimonials.abdelhadiLaassi.quote',
    initials: 'AL',
  },
  {
    id: 'tarik-boudaa',
    name: 'Pr. Tarik Boudaa',
    organization: 'ENSA Al Hoceima',
    quoteKey: 'testimonials.tarikBoudaa.quote',
    initials: 'TB',
  },
];
