export interface GalleryProject {
  id: string;
  title: string;
  description: string;
  year: string;
  techStack: string[];
  screenshot: string;
}

import camundaHome from '@/assets/camunda-home.png';

export const galleryProjects: GalleryProject[] = [
  {
    id: 'camunda-redesign',
    title: 'Camunda Website Redesign',
    description: 'Led the complete redesign of Camunda\'s website, improving user engagement by 40% and reducing bounce rates through intuitive navigation and modern visual design.',
    year: '2024',
    techStack: ['React', 'TypeScript', 'Figma', 'Tailwind CSS'],
    screenshot: camundaHome
  },
  {
    id: 'design-system',
    title: 'Enterprise Design System',
    description: 'Built a comprehensive design system with 60+ components, reducing development time by 35% and ensuring brand consistency across 12 product teams.',
    year: '2023',
    techStack: ['Storybook', 'React', 'CSS Variables', 'Figma'],
    screenshot: '/placeholder.svg'
  },
  {
    id: 'modeler-ux',
    title: 'Process Modeler UX Overhaul',
    description: 'Redesigned the BPMN modeling experience, resulting in 50% faster workflow creation and a 25-point increase in user satisfaction scores.',
    year: '2023',
    techStack: ['User Research', 'Prototyping', 'React', 'Canvas API'],
    screenshot: '/placeholder.svg'
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description: 'Designed an intuitive analytics dashboard for process insights, enabling teams to identify bottlenecks 3x faster with real-time data visualization.',
    year: '2022',
    techStack: ['D3.js', 'React', 'GraphQL', 'Figma'],
    screenshot: '/placeholder.svg'
  },
  {
    id: 'mobile-app',
    title: 'Mobile Task Management',
    description: 'Created a mobile-first task management experience, achieving 4.8-star app store rating with 50,000+ downloads in the first quarter.',
    year: '2022',
    techStack: ['React Native', 'TypeScript', 'Figma', 'Lottie'],
    screenshot: '/placeholder.svg'
  },
  {
    id: 'onboarding-flow',
    title: 'User Onboarding Redesign',
    description: 'Streamlined the onboarding experience reducing time-to-value from 45 minutes to 12 minutes, increasing trial-to-paid conversion by 28%.',
    year: '2021',
    techStack: ['User Testing', 'Figma', 'React', 'Analytics'],
    screenshot: '/placeholder.svg'
  }
];
