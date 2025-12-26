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
        duration: 'Jan 2021 - Present',
        description: 'Leading web development initiatives and building scalable solutions for process automation platform.'
      }
    ],
    responsibilities: [
      'Lead development of customer-facing web applications',
      'Architect and implement scalable frontend solutions',
      'Collaborate with cross-functional teams to deliver product features',
      'Mentor junior developers and conduct code reviews',
      'Optimize application performance and user experience'
    ],
    projects: [
      {
        name: 'Camunda Platform UI',
        description: 'Developed and maintained the core platform user interface',
        impact: 'Improved user engagement by 40%'
      },
      {
        name: 'Design System Implementation',
        description: 'Led the implementation of a cohesive design system across products',
        impact: 'Reduced development time by 30%'
      },
      {
        name: 'Performance Optimization',
        description: 'Optimized web application performance and loading times',
        impact: 'Achieved 50% faster page load times'
      }
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'REST APIs', 'Design Systems', 'Agile/Scrum', 'Git', 'CI/CD'],
    achievements: [
      'Successfully delivered 15+ major feature releases',
      'Improved platform performance metrics by 50%',
      'Established coding standards adopted across teams',
      'Mentored 5 junior developers to senior positions'
    ],
    testimonials: [
      {
        quote: 'An exceptional developer who consistently delivers high-quality work and brings innovative solutions to complex problems.',
        author: 'Team Lead',
        role: 'Engineering Manager at Camunda'
      }
    ]
  },
  {
    id: 'sumtotal',
    company: 'SumTotal Systems & Skillsoft',
    logos: ['sumtotal-logo.svg', 'skillsoft-logo.svg'],
    currentTitle: 'Digital Marketing Manager',
    duration: 'Nov 2006 - Dec 2020',
    yearsWorked: '14+ years',
    roles: [
      {
        title: 'Digital Marketing Manager',
        duration: '2015 - Dec 2020',
        description: 'Led digital marketing strategies and managed cross-functional teams to drive brand awareness and lead generation.'
      },
      {
        title: 'Senior Marketing Specialist',
        duration: '2010 - 2015',
        description: 'Developed and executed marketing campaigns, analyzed performance metrics, and optimized conversion funnels.'
      },
      {
        title: 'Marketing Coordinator',
        duration: 'Nov 2006 - 2010',
        description: 'Supported marketing initiatives, managed content creation, and coordinated events and campaigns.'
      }
    ],
    responsibilities: [
      'Developed and executed comprehensive digital marketing strategies',
      'Managed marketing automation and CRM systems',
      'Led a team of marketing professionals',
      'Analyzed marketing metrics and optimized campaigns',
      'Collaborated with sales teams to align marketing efforts'
    ],
    projects: [
      {
        name: 'Global Brand Refresh',
        description: 'Led the digital transformation of brand presence across all channels',
        impact: 'Increased brand recognition by 60%'
      },
      {
        name: 'Marketing Automation Platform',
        description: 'Implemented and optimized marketing automation workflows',
        impact: 'Generated 200% more qualified leads'
      },
      {
        name: 'Content Strategy Overhaul',
        description: 'Redesigned content strategy to improve engagement and SEO',
        impact: 'Achieved 150% increase in organic traffic'
      }
    ],
    skills: ['Digital Marketing', 'SEO/SEM', 'Marketing Automation', 'Analytics', 'CRM', 'Content Strategy', 'Team Leadership', 'Project Management', 'A/B Testing'],
    achievements: [
      'Grew digital marketing ROI by 300% over 5 years',
      'Built and managed a team of 8 marketing professionals',
      'Launched 50+ successful marketing campaigns',
      'Established data-driven marketing practices'
    ],
    testimonials: [
      {
        quote: 'A strategic thinker who transformed our digital marketing approach and delivered exceptional results consistently.',
        author: 'VP of Marketing',
        role: 'Executive at SumTotal Systems'
      }
    ]
  }
];
