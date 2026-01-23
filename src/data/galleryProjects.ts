export interface GalleryProject {
  id: string;
  title: string;
  description: string;
  year: string;
  techStack: string[];
  screenshot: string;
}

import camundaHome from '@/assets/gallery/camunda-home.png';
import sumtotalBrand from '@/assets/gallery/sumtotal-brand-redesign.png';
import sumtotalBrand2 from '@/assets/gallery/sumtotal-brand-redesign2.png';
import skillsoftBrand from '@/assets/gallery/skillsoft-brand-redesign.png';
import perspectivesSkillsoft from '@/assets/gallery/perspectives-skillsoft.png';

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
    id: 'sumtotal-brand',
    title: 'SumTotal Brand Redesign',
    description: 'Transformed SumTotal\'s brand identity and website experience, creating a modern visual language that increased brand recognition and user engagement.',
    year: '2023',
    techStack: ['Brand Strategy', 'UI Design', 'Figma', 'CSS'],
    screenshot: sumtotalBrand
  },
  {
    id: 'sumtotal-website',
    title: 'SumTotal Website Redesign',
    description: 'Redesigned the complete SumTotal website with improved information architecture and modern UI patterns, resulting in 35% better conversion rates.',
    year: '2023',
    techStack: ['UX Research', 'Wireframing', 'Figma', 'React'],
    screenshot: sumtotalBrand2
  },
  {
    id: 'skillsoft-brand',
    title: 'Skillsoft Brand Redesign',
    description: 'Led the comprehensive brand redesign for Skillsoft, establishing a cohesive visual identity across all digital touchpoints.',
    year: '2022',
    techStack: ['Brand Identity', 'UI Design', 'Figma', 'Design System'],
    screenshot: skillsoftBrand
  },
  {
    id: 'perspectives-event',
    title: 'Perspectives 2020 Event',
    description: 'Designed the digital experience for Skillsoft\'s flagship Perspectives event, creating an engaging virtual conference platform.',
    year: '2020',
    techStack: ['Event Design', 'Web Design', 'Figma', 'Responsive'],
    screenshot: perspectivesSkillsoft
  }
];
