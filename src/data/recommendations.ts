export interface Recommendation {
  id: string;
  name: string;
  title: string;
  company: string;
  quote: string;
  photoUrl?: string;
  initials: string;
}

export const recommendations: Recommendation[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'VP of Product',
    company: 'TechCorp',
    quote: 'Pramod is an exceptional product designer who consistently delivers outstanding results. His ability to understand complex user needs and translate them into elegant solutions is remarkable.',
    initials: 'SJ',
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Engineering Director',
    company: 'Innovate Labs',
    quote: 'Working with Pramod was a game-changer for our team. His design thinking approach and collaborative spirit elevated our entire product development process.',
    initials: 'MC',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    title: 'Head of UX',
    company: 'DesignFirst',
    quote: 'Pramod brings a unique blend of creativity and strategic thinking to every project. His work on our enterprise platform significantly improved user satisfaction scores.',
    initials: 'ER',
  },
];
