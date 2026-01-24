export interface GalleryProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  screenshot: string;
}

import camundaHome from '@/assets/gallery/camunda-home-2025.png';
import camundaconLatest from '@/assets/gallery/camundacon-latest.png';
import sumtotalBrand from '@/assets/gallery/sumtotal-brand-redesign.png';
import sumtotalBrand2 from '@/assets/gallery/sumtotal-brand-redesign2.png';
import skillsoftBrand from '@/assets/gallery/skillsoft-brand-redesign.png';
import perspectivesSkillsoft from '@/assets/gallery/perspectives-skillsoft.png';

export const galleryProjects: GalleryProject[] = [
  {
    id: 'camunda-redesign',
    title: 'Enterprise Web Platform Redesign for Camunda',
    description: 'Drove the strategic redesign of Camunda\'s public website, aligning UX, visual design, and frontend execution to enterprise standards. Built a flexible WordPress and Elementor-based system that enabled faster iteration, consistent branding, and measurable improvements in engagement and usability.',
    techStack: ['WordPress', 'Elementor', 'Figma', 'JavaScript', 'HTML', 'CSS', 'UX Strategy', 'UI Systems', 'Frontend Architecture', 'Web Performance'],
    screenshot: camundaHome
  },
  {
    id: 'camundacon-event',
    title: 'CamundaCon Event Website Experience',
    description: 'Built the official CamundaCon event website, delivering a responsive, modern UI and performant frontend to support conference registration, speaker promotion, and agenda browsing across devices and regions.',
    techStack: ['Event Design', 'Bizzabo', 'Event Experience', 'Figma', 'React', 'JavaScript', 'HTML', 'CSS', 'Frontend Engineering', 'Responsive UI'],
    screenshot: camundaconLatest
  },
  {
    id: 'sumtotal-brand',
    title: 'SumTotal Enterprise Brand & Website Redesign',
    description: 'Led the transformation of SumTotal\'s brand identity and digital presence, redefining the visual language and website experience to support a modern, enterprise talent management platform. Delivered a cohesive brand system and redesigned web experience that strengthened brand recognition, improved clarity of messaging, and increased user engagement across key touchpoints.',
    techStack: ['Craft CMS', 'Brand Redesign', 'UI Design', 'Web Design', 'Adobe Creative Suite', 'CSS', 'Visual Identity', 'Design Systems', 'Enterprise SaaS', 'User Experience', 'Evergage'],
    screenshot: sumtotalBrand
  },
  {
    id: 'sumtotal-website',
    title: 'SumTotal Website Redesign & Conversion Optimization',
    description: 'Redesigned the SumTotal corporate website with a focus on improved information architecture, clearer user journeys, and modern UI patterns. Led UX research and wireframing through execution to deliver a more intuitive experience that increased engagement and achieved a 35% improvement in conversion rates.',
    techStack: ['UX Research', 'Craft CMS', 'Wireframing', 'UI Design', 'Web Design', 'Adobe Creative Suite', 'JavaScript', 'HTML', 'CSS', 'Conversion Optimization', 'Enterprise UX', 'Evergage'],
    screenshot: sumtotalBrand2
  },
  {
    id: 'skillsoft-brand',
    title: 'Skillsoft Enterprise Brand & Digital Experience',
    description: 'Drove the evolution of Skillsoft\'s brand and digital presence, aligning visual language and UX standards across marketing and product-facing experiences. Delivered a scalable brand system that enabled consistency, faster execution, and improved enterprise perception.',
    techStack: ['Craft CMS', 'Brand Strategy', 'UI Systems', 'Design Systems', 'UX Design', 'Adobe Creative Suite', 'Enterprise Branding', 'Digital Experience'],
    screenshot: skillsoftBrand
  },
  {
    id: 'perspectives-event',
    title: 'Perspectives 2020 Virtual Event Website (Design & Development)',
    description: 'Designed and developed the Perspectives 2020 event website, translating brand direction into a high-performance, responsive frontend experience. Built a modern event interface supporting global participation and content delivery.',
    techStack: ['Web Development', 'WordPress CMS', 'Frontend Engineering', 'UI Design', 'JavaScript', 'HTML', 'CSS', 'Adobe Creative Suite', 'Responsive UI', 'Event Technology'],
    screenshot: perspectivesSkillsoft
  }
];
