export interface Role {
  title: string;
  duration: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  impact?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface CompanyExperience {
  id: string;
  company: string;
  logos: string[];
  currentTitle: string;
  duration: string;
  yearsWorked: string;
  roles: Role[];
  responsibilities: string[];
  projects: Project[];
  skills: string[];
  achievements: string[];
  testimonials: Testimonial[];
}

export const experiences: CompanyExperience[] = [
  {
    id: 'camunda',
    company: 'Camunda Inc',
    logos: ['camunda-logo.svg'],
    currentTitle: 'Senior Web Developer',
    duration: 'Jan 2021 - Present',
    yearsWorked: '4+ years',
    roles: [
      {
        title: 'Senior Web Developer',
        duration: 'April 2023 - Present',
        description: 'Lead UX and visual execution across Camunda\'s global marketing websites, landing pages, and campaign microsites, with a focus on optimizing user flows and demo conversions.'
      },
      {
        title: 'Senior Web Marketing Manager',
        duration: 'January 2021 - March 2023',
        description: 'Owned the web channel strategy supporting global demand generation and brand initiatives. Partnered with stakeholders across Product Marketing, Sales, and Leadership to align web UX with business objectives.'
      }
    ],
    responsibilities: [
      'Lead UX and visual execution across global marketing websites, landing pages, and campaign microsites',
      'Act as the primary liaison between Creative, Marketing, and Development teams',
      'Analyze web performance and user behavior using Google Analytics to identify friction points',
      'Design and implement responsive, accessible page templates aligned with WCAG standards',
      'Oversee special web initiatives including campaign microsites, event platforms, and system integrations',
      'Maintain and evolve reusable components and page patterns to improve consistency and delivery speed',
      'Guide designers and developers on UX best practices, accessibility, and responsive design standards'
    ],
    projects: [
      {
        name: 'Camunda Website Redesign',
        description: 'Introduced Elementor-based design system on WordPress, rebuilt navigation, mega menu, and page transitions',
        impact: 'Improved demo conversion rates by 3x'
      },
      {
        name: 'HubSpot Demo Flows',
        description: 'Designed high-conversion HubSpot demo flows with advanced animations and interaction patterns',
        impact: 'Increased engagement across event and campaign pages'
      },
      {
        name: 'Marketing Page Templates',
        description: 'Created reusable page patterns enabling faster page creation for marketing teams',
        impact: 'Delivered pixel-perfect mobile experiences'
      }
    ],
    skills: ['UI/UX Design', 'Web Design', 'Front-End Development', 'WordPress', 'Elementor', 'HTML5', 'CSS3', 'JavaScript', 'Figma', 'Google Analytics', 'HubSpot', 'WCAG Accessibility', 'Responsive Design', 'A/B Testing'],
    achievements: [
      'Improved demo conversion rates by 3x through UX optimization',
      'Increased engagement across event and campaign pages',
      'Enabled faster page creation for marketing teams',
      'Delivered pixel-perfect mobile experiences across all devices'
    ],
    testimonials: [
      {
        quote: 'Pramod brings an incredible level of care and ownership to everything he touches. He steps in quickly to make sure things are fixed and the site is performing at its best. He takes a strategic approach to web development, partnering closely with marketing and brand teams to improve the customer journey and strengthen calls to action.',
        author: '',
        role: 'Director, Demand Generation'
      },
      {
        quote: 'Pramod is a standout web partner. He moved quickly, owned the work from start to finish, and consistently offered suggestions for improvements. His webpages helped support a near 3x lift in win rates for BFSI industry alone. I\'d happily work with him again and recommend him to any SaaS team that cares about best practices, clean UX/UI, and solid collaboration.',
        author: '',
        role: 'Branding | User-focused Design | Content Production'
      }
    ]
  },
  {
    id: 'sumtotal',
    company: 'SumTotal Systems & Skillsoft',
    logos: ['sumtotal-logo.svg', 'skillsoft-logo.svg'],
    currentTitle: 'Digital Marketing Manager',
    duration: 'Nov 2006 - Jan 2021',
    yearsWorked: '14+ years',
    roles: [
      {
        title: 'Digital Marketing Manager',
        duration: 'December 2017 - January 2021',
        description: 'Led digital marketing operations with a strong emphasis on web experience, conversion optimization, and performance reporting. Directed UX improvements across enterprise websites supporting multiple geographies and languages.'
      },
      {
        title: 'Lead – Digital Marketing Operations',
        duration: 'April 2014 - December 2017',
        description: 'Managed large-scale website initiatives, microsites, and campaign-focused properties. Established UX and design standards to improve consistency and scalability.'
      },
      {
        title: 'Senior Specialist – Digital Marketing Operations',
        duration: 'April 2013 - April 2014',
        description: 'Executed website updates, landing pages, and UX enhancements aligned with marketing goals.'
      },
      {
        title: 'Webmaster',
        duration: 'September 2010 - March 2013',
        description: 'Owned day-to-day management of enterprise web properties, ensuring performance, usability, and accessibility.'
      },
      {
        title: 'Graphic Designer',
        duration: 'November 2006 - September 2010',
        description: 'Designed visual assets and early web interfaces, building a strong foundation in visual design and interaction principles.'
      }
    ],
    responsibilities: [
      'Led digital marketing operations with emphasis on web experience and conversion optimization',
      'Directed UX improvements across enterprise websites supporting multiple geographies and languages',
      'Managed large-scale website initiatives, microsites, and campaign-focused properties',
      'Established UX and design standards to improve consistency and scalability',
      'Supported lead generation and marketing programs with conversion-focused landing pages',
      'Maintained content consistency and technical integrity across large, multi-page web ecosystems'
    ],
    projects: [
      {
        name: 'Enterprise Website Redesign',
        description: 'Led the digital transformation of brand presence across all channels',
        impact: 'Improved user engagement and brand consistency globally'
      },
      {
        name: 'Multi-Region Website Management',
        description: 'Managed websites supporting multiple geographies and languages',
        impact: 'Ensured high standards for responsiveness, accessibility, and brand alignment'
      },
      {
        name: 'Conversion Optimization Initiative',
        description: 'Optimized landing pages and lead flows for better engagement',
        impact: 'Significantly improved conversion performance'
      }
    ],
    skills: ['Digital Marketing', 'UI/UX Design', 'Web Design', 'WordPress', 'HTML5', 'CSS3', 'JavaScript', 'PHP', 'SEO/SEM', 'Marketing Automation', 'HubSpot', 'Marketo', 'Google Analytics', 'A/B Testing', 'Accessibility'],
    achievements: [
      'Grew from Graphic Designer to Digital Marketing Manager over 14+ years',
      'Managed global marketing and multi-region website operations',
      'Established UX and design standards adopted across the organization',
      'Led successful digital transformation initiatives'
    ],
    testimonials: [
      {
        quote: 'Pramod is one of the most talented people I have had the pleasure of working with. He is a true rarity — an incredibly creative individual with an astute technical acumen. He is eager to constantly evolve his skills and apply those learnings to the betterment of not just himself, but the entire team.',
        author: '',
        role: 'Director of Web Marketing | Global Digital Marketing Professional'
      },
      {
        quote: 'Pramod is a highly experienced and incredibly creative digital marketing expert. He combines modern insight with a deep knowledge of demand generating tactics that come to life on any web project. He continuously advances his skills and provides recommendations that are highly progressive and reflect best practice.',
        author: '',
        role: 'Chief Customer Officer | Inclusion Advocate'
      }
    ]
  }
];
