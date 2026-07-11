export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  quoteKey: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'abdelhadi-laassi',
    name: 'Abdelhadi Laassi',
    role: 'Software Developer',
    organization: 'TechPal Services',
    quoteKey: 'testimonials.abdelhadiLaassi.quote',
    initials: 'AL',
  },
  {
    id: 'tarik-boudaa',
    name: 'Pr. Tarik Boudaa',
    role: 'Enseignant Chercheur',
    organization: 'ENSA Al Hoceima',
    quoteKey: 'testimonials.tarikBoudaa.quote',
    initials: 'TB',
  },
];
