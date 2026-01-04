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
    name: 'Dave Paradis',
    title: 'Director of Web Marketing',
    company: 'Camunda',
    quote: 'Pramod is quite simply one of the most talented people I have had the pleasure of working with. He is a true rarity - an incredibly creative individual with an astute technical acumen. When faced with adversity, Pramod accepts challenges head-on and overcomes them with aplomb.',
    initials: 'DP',
  },
  {
    id: '2',
    name: 'Kieran King',
    title: 'Chief Customer Officer',
    company: 'Pindrop',
    quote: 'Pramod is a highly experienced and incredibly creative digital marketing expert. He combines modern insight with a deep knowledge of demand generating tactics that come to life on any web project that he touches.',
    initials: 'KK',
  },
  {
    id: '3',
    name: 'Andrea Davis',
    title: 'Director, Demand Generation',
    company: 'Camunda',
    quote: 'Pramod brings an incredible level of care and ownership to everything he touches. He balances speed, strategic thinking, and attention to detail in a way that has made a meaningful impact on our demand generation goals.',
    initials: 'AD',
  },
  {
    id: '4',
    name: 'Shane Ernest',
    title: 'User-focused Design & Branding',
    company: 'Camunda',
    quote: 'Pramod is a standout web partner. His webpages helped support a near 3x lift in win rates for BFSI industry alone. He shines in strategic work and was especially strong in time-critical moments, delivering clean results.',
    initials: 'SE',
  },
  {
    id: '5',
    name: 'Pedro Gastal',
    title: 'Global Partner Marketing Lead',
    company: 'Camunda',
    quote: "Pramod's web marketing skills and work ethics are extraordinary. I highly recommend any team to bring him on board as a skilled individual and trusted colleague, who delivers consistently and can work cross-functionally.",
    initials: 'PG',
  },
  {
    id: '6',
    name: 'Ummu Fallon',
    title: 'Senior Legal Operations Manager',
    company: 'Camunda',
    quote: 'Pramod is highly efficient, knowledgeable, and consistently eager to support the team\'s ever-changing requirements. He is genuinely a pleasure to work with—collaborative, positive, and dependable.',
    initials: 'UF',
  },
];
