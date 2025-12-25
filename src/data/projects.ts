export interface Project {
  id: string;
  title: string;
  outcome: string;
  role: string;
  tools: string[];
  caseStudy: {
    overview: string;
    roleDescription: string;
    problem: string;
    approach: string;
    solution: string;
    results: string[];
  };
}

export const projects: Project[] = [
  {
    id: 'enterprise-portal',
    title: 'Enterprise Portal Redesign',
    outcome: 'Reduced navigation complexity by 60%, improving task completion rates.',
    role: 'Lead UI/UX Engineer',
    tools: ['React', 'TypeScript', 'Figma'],
    caseStudy: {
      overview: 'A comprehensive redesign of a legacy enterprise portal used by 50,000+ employees daily.',
      roleDescription: 'Led the front-end development team and collaborated closely with UX researchers to implement a user-centered design approach.',
      problem: 'The existing portal had accumulated features over 10 years, resulting in a cluttered interface with poor information architecture. Users reported spending excessive time finding essential tools.',
      approach: 'Conducted card sorting sessions, analyzed usage data, and created a new information hierarchy. Implemented progressive disclosure patterns and contextual navigation.',
      solution: 'Built a modular component system with adaptive navigation that learns user preferences. Introduced a command palette for power users and simplified the visual language.',
      results: [
        '60% reduction in navigation clicks',
        '45% improvement in task completion time',
        '92% user satisfaction score',
        '35% reduction in support tickets',
      ],
    },
  },
  {
    id: 'event-platform',
    title: 'Global Event Platform',
    outcome: 'Built registration system handling 100K+ concurrent users.',
    role: 'Senior Developer',
    tools: ['Vue.js', 'Node.js', 'AWS'],
    caseStudy: {
      overview: 'Designed and developed a scalable event registration platform for a Fortune 500 company\'s annual conference.',
      roleDescription: 'Served as the senior front-end developer, architecting the client-side application and optimizing for high-traffic scenarios.',
      problem: 'Previous events experienced system crashes during peak registration periods, leading to frustrated attendees and lost registrations.',
      approach: 'Implemented queue-based registration flow, optimistic UI updates, and edge caching. Designed graceful degradation strategies for high-load scenarios.',
      solution: 'Created a resilient registration experience with real-time availability updates, smart form validation, and progressive enhancement for varying network conditions.',
      results: [
        'Zero downtime during peak registration',
        '100,000+ successful registrations',
        '3-second average completion time',
        '98% reduction in support calls',
      ],
    },
  },
  {
    id: 'conversion-optimization',
    title: 'E-commerce Conversion Suite',
    outcome: 'Achieved 3x improvement in checkout conversion rates.',
    role: 'UX Developer',
    tools: ['React', 'A/B Testing', 'Analytics'],
    caseStudy: {
      overview: 'Led a conversion rate optimization initiative for a mid-market e-commerce platform.',
      roleDescription: 'Combined UX design skills with front-end development to create and test conversion hypotheses.',
      problem: 'High cart abandonment rates and a 12-step checkout process were causing significant revenue loss.',
      approach: 'Mapped the customer journey, identified friction points through heatmaps and session recordings, and designed a streamlined checkout experience.',
      solution: 'Reduced checkout to 3 steps with smart defaults, guest checkout option, and trust-building micro-interactions. Implemented progressive form disclosure.',
      results: [
        '312% increase in conversion rate',
        '67% reduction in cart abandonment',
        '$2.4M additional annual revenue',
        '4.8/5 customer satisfaction rating',
      ],
    },
  },
  {
    id: 'design-system',
    title: 'Enterprise Design System',
    outcome: 'Created component library used across 40+ applications.',
    role: 'Design Systems Lead',
    tools: ['React', 'Storybook', 'Figma'],
    caseStudy: {
      overview: 'Established a comprehensive design system to unify the digital experience across a global organization.',
      roleDescription: 'Led the design system initiative, bridging design and development to create a cohesive component ecosystem.',
      problem: 'Inconsistent user experiences across products, duplicated development effort, and slow time-to-market for new features.',
      approach: 'Audited existing patterns, conducted stakeholder interviews, and established governance processes. Built with accessibility and theming as core principles.',
      solution: 'Developed a token-based design system with 80+ components, comprehensive documentation, and automated testing. Created contribution guidelines and review processes.',
      results: [
        '40+ applications unified',
        '50% faster development time',
        'WCAG 2.1 AA compliance',
        '200+ developers onboarded',
      ],
    },
  },
  {
    id: 'performance-optimization',
    title: 'Performance Transformation',
    outcome: 'Reduced page load times by 60% for a news platform.',
    role: 'Performance Engineer',
    tools: ['JavaScript', 'Webpack', 'CDN'],
    caseStudy: {
      overview: 'Comprehensive performance optimization for a high-traffic news and media platform.',
      roleDescription: 'Led the performance optimization initiative, implementing modern web performance best practices.',
      problem: 'Slow page loads causing high bounce rates and poor Core Web Vitals scores, impacting SEO and advertising revenue.',
      approach: 'Conducted thorough performance audits, implemented code splitting, optimized critical rendering path, and established performance budgets.',
      solution: 'Rebuilt the rendering pipeline with streaming SSR, lazy loading, and intelligent prefetching. Optimized images with modern formats and responsive sizing.',
      results: [
        '60% faster page loads',
        '45% improvement in LCP',
        '30% reduction in bounce rate',
        '25% increase in ad revenue',
      ],
    },
  },
  {
    id: 'mobile-app',
    title: 'Healthcare Mobile Experience',
    outcome: 'Designed mobile-first patient portal with 4.8★ rating.',
    role: 'Mobile UX Lead',
    tools: ['React Native', 'Figma', 'Accessibility'],
    caseStudy: {
      overview: 'Created an accessible, intuitive mobile experience for patients to manage their healthcare.',
      roleDescription: 'Led the mobile UX design and front-end development, with a focus on accessibility and ease of use.',
      problem: 'Existing patient portal was desktop-only, difficult to navigate, and inaccessible to users with disabilities.',
      approach: 'Conducted user research with diverse patient groups, prioritized accessibility from the start, and designed for varying levels of digital literacy.',
      solution: 'Built a mobile-first responsive experience with large touch targets, clear visual hierarchy, and comprehensive accessibility features including VoiceOver support.',
      results: [
        '4.8★ App Store rating',
        '85% mobile adoption rate',
        'WCAG 2.1 AAA compliance',
        '60% reduction in call center volume',
      ],
    },
  },
  {
    id: 'dashboard-analytics',
    title: 'Analytics Dashboard Suite',
    outcome: 'Built real-time dashboard reducing reporting time by 80%.',
    role: 'Front-end Architect',
    tools: ['React', 'D3.js', 'WebSocket'],
    caseStudy: {
      overview: 'Developed a suite of real-time analytics dashboards for executive decision-making.',
      roleDescription: 'Architected the front-end application and led the development of complex data visualization components.',
      problem: 'Executives relied on weekly manual reports, leading to delayed decision-making and missed opportunities.',
      approach: 'Worked with stakeholders to identify key metrics, designed intuitive visualizations, and implemented real-time data streaming.',
      solution: 'Created a modular dashboard system with customizable widgets, real-time updates, and automated alerting. Built accessible charts with multiple view options.',
      results: [
        '80% reduction in reporting time',
        'Real-time decision capability',
        '$1.5M saved in analyst hours',
        '95% executive adoption rate',
      ],
    },
  },
  {
    id: 'marketing-platform',
    title: 'Marketing Automation UI',
    outcome: 'Simplified complex workflows, increasing user adoption by 150%.',
    role: 'Product Designer',
    tools: ['React', 'Redux', 'User Research'],
    caseStudy: {
      overview: 'Redesigned the user interface for a B2B marketing automation platform.',
      roleDescription: 'Led the UX redesign effort, combining user research insights with modern interaction patterns.',
      problem: 'The platform had powerful features but a steep learning curve, leading to low adoption and high churn.',
      approach: 'Conducted extensive user interviews, mapped complex workflows, and identified opportunities for progressive disclosure and guided experiences.',
      solution: 'Introduced a template-based approach, visual workflow builder, and contextual help system. Simplified the interface while maintaining power-user capabilities.',
      results: [
        '150% increase in user adoption',
        '40% reduction in time-to-first-campaign',
        '65% decrease in support tickets',
        'NPS improved from 12 to 58',
      ],
    },
  },
];
