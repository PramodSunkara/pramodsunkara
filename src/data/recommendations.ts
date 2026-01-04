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
  {
    id: '4',
    name: 'David Park',
    title: 'Product Lead',
    company: 'ScaleUp Inc',
    quote: 'I had the pleasure of working with Pramod on several high-impact projects. His attention to detail and user-centric approach consistently resulted in products that exceeded expectations.',
    initials: 'DP',
  },
  {
    id: '5',
    name: 'Amanda Foster',
    title: 'Design Director',
    company: 'Creative Co',
    quote: 'Pramod has an incredible ability to simplify complex problems. His designs are not just beautiful but highly functional, making him an invaluable asset to any product team.',
    initials: 'AF',
  },
  {
    id: '6',
    name: 'James Wilson',
    title: 'CTO',
    company: 'TechVentures',
    quote: 'Pramod understands the intersection of design and technology better than anyone I know. His collaborative approach and technical awareness make him exceptionally effective.',
    initials: 'JW',
  },
];
