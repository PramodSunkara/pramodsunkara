import { Users, Layers, PenTool, Grid, Eye, Palette, FileCode, Code, FileText, Smartphone, Zap, Play, FlaskConical, TrendingUp, BarChart3, Layout, Mail, Search } from 'lucide-react';

const skillCategories = [
  {
    title: 'Design & UX',
    skills: [
      { name: 'User Research & Testing', icon: Users, color: '#6366F1' },
      { name: 'Information Architecture', icon: Layers, color: '#8B5CF6' },
      { name: 'Wireframing & Prototyping', icon: PenTool, color: '#EC4899' },
      { name: 'Design Systems', icon: Grid, color: '#14B8A6' },
      { name: 'Accessibility (WCAG)', icon: Eye, color: '#F59E0B' },
      { name: 'Visual Design', icon: Palette, color: '#EF4444' },
    ],
  },
  {
    title: 'Front-End & Web',
    skills: [
      { name: 'HTML5 & CSS3', icon: FileText, color: '#E34F26' },
      { name: 'Responsive Design', icon: Smartphone, color: '#3B82F6' },
      { name: 'Performance Optimization', icon: Zap, color: '#FBBF24' },
      { name: 'React & TypeScript', icon: FileCode, color: '#61DAFB' },
      { name: 'Vue.js', icon: Code, color: '#42B883' },
      { name: 'Animation & Motion', icon: Play, color: '#A855F7' },
    ],
  },
  {
    title: 'Marketing & Growth',
    skills: [
      { name: 'A/B Testing', icon: FlaskConical, color: '#10B981' },
      { name: 'Conversion Optimization', icon: TrendingUp, color: '#F97316' },
      { name: 'Analytics & Data', icon: BarChart3, color: '#6366F1' },
      { name: 'Landing Page Design', icon: Layout, color: '#EC4899' },
      { name: 'Email Templates', icon: Mail, color: '#EF4444' },
      { name: 'SEO Best Practices', icon: Search, color: '#22C55E' },
    ],
  },
];

const aiTools = [
  { 
    name: 'ChatGPT', 
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 transition-colors" fill="currentColor">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364l2.0201-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4046-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
      </svg>
    ),
    color: '#10A37F'
  },
  { 
    name: 'Claude', 
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 transition-colors" fill="currentColor">
        <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.163-2.809-.17-.621-.044.053-.18.2-.135.275-.057 2.533.112 2.61.13 1.58.098-.827-.972-1.881-2.182-1.622-1.9-.475-.567.168-.07.193.075.157.18 1.873 2.27 1.742 2.132.682.876.087-.167.017-.238-.165-1.964-.242-2.58-.184-2.07-.054-.64.193-.06.19.057.09.216.121 2.864.09 2.133.072 1.765.097-.03.175-.074.119-.162-.155-.206-1.043-1.336-.978-1.242-1.056-1.316-.244-.295.19-.152.207.053.185.2 1.106 1.26 1.187 1.346 1.1 1.29.054.066.15-.034.077-.085.102-.302-.006-1.634-.014-1.06.006-1.17.04-.397.21.013.15.13.04.166-.03 1.676.04 2.15.013.504.16.02.143-.117.24-.275 1.27-1.612 1.143-1.447.28-.347.21.05.114.166-.01.212-.902 1.329-1.37 1.985-.356.506.02.246.146.04.16-.07 2.18-1.292 2.143-1.252.43-.243.176.107.055.158-.056.18-2.21 1.49-2.002 1.35.12.163.254.14.24-.016 1.592-.652 2.193-.887.474-.19.167.135.015.2-.12.167-2.12 1.02-1.897.925-.324.168.042.228.157.15.233.02 2.6-.382 1.387-.19.164.098.027.262-.194.18-1.987.398-2.002.394.017.21.19.176 1.05.1 1.59.14.653.053.02.206-.17.153-.27.023-1.786-.097-1.146-.045-.12.07-.082.235.29.307.863.906.63.686.035.2-.173.1-.198-.072-.75-.7-.994-.93-.145.05-.094.194.057.253.466.925.587 1.193.04.207-.2.067-.18-.104-.584-1.082-.562-1.028-.118.046-.054.19.017.15.093.336.202.737.098.58-.09.175-.206-.013-.114-.18-.155-.587-.263-.933-.144-.014-.18.094-.082.23.036.66-.005.91-.155.118-.202-.08-.063-.226.043-.853.04-.566-.058-.113-.167-.09-.135.055-.476.58-.517.607-.393.453-.193-.01-.084-.183.064-.19.477-.613.605-.76.057-.113-.09-.173-.182-.036-.194.055-.814.464-.787.434-.13-.013-.123-.19.022-.18.89-.543.574-.358-.005-.195-.154-.105-.13.02-1.022.26-.92.225-.157-.056-.073-.214.112-.15 1.037-.322.614-.2-.055-.22-.186-.063-.21.054-1.24.58-.617.295-.164-.03-.102-.198.055-.186.798-.42 1.1-.567-.01-.205-.19-.136-1.166.142-1.134.152-.56.083-.13-.127.008-.21.164-.116 1.372-.267 1.2-.216-.03-.177-.21-.157-.22-.008-1.372-.12-1.083-.118-.122-.157.12-.172.244-.03 1.43.085 1.29.1.117-.068.077-.176-.01-.16-.56-.596-1.115-1.163-.382-.387-.042-.197.164-.104.2.044 1.014.942.99.946.13-.028.105-.13.01-.19-.235-.706-.495-1.477-.11-.317.11-.164.22.05.088.186.513 1.41.378 1.04.184-.002.123-.142.035-.235-.024-.51-.044-1.11-.005-.35.177-.084.165.1.064.236.023 1.16.07 1.114-.06.162.104.165.17.012.168-.247 1.155-.287 1.347.08.218.17.11.163-.037.272-.32.98-1.207.94-1.187.16.006.147.13.012.2-.457.75-1.015 1.62-.21.34.066.24.188.082.172-.075 1.532-1.2 1.044-.833.18.03.12.17-.015.2-.786.717-1.587 1.432-.203.186.03.22.19.097.2-.03 1.61-.88 1.378-.77.19.053.133.17-.02.216-1.186.748-1.643 1.018.04.22.217.085.206-.04 1.86-.69 1.167-.44.173.08.054.2-.105.167-1.7.75-1.51.656.13.19.238.025 1.298-.205 1.506-.257.165.054.075.207-.094.17-1.512.355-1.392.316.063.166.225.098.252-.008 1.09-.092 1.18-.122.145.098.006.2-.143.145-1.224.198-.968.14.003.174.188.134.276.01 1.133-.025.652-.03.132.123-.037.22-.176.106-.75.072-1.19.088-.072.143.065.206.182.118.685.124.794.173.2-.043.13-.177-.013-.18-.46-.172-1.018-.34.035-.206.2-.103.262.025.596.13.91.21.122-.056.07-.198-.065-.178-.55-.332-.702-.408-.146-.082-.015-.193.164-.11.204.04.74.378.57.302.147-.035.085-.145-.035-.205-.346-.33-.57-.55-.152-.143.076-.206.22-.028.196.14.456.4.51.453.085-.038.077-.186-.06-.224-.237-.286-.405-.48-.205-.234.117-.173.227.012.165.15.336.366.445.492.173.006.113-.134.004-.195-.272-.477-.358-.62-.075-.232.196-.103.175.082.414.637.244.384.134-.01.1-.13-.012-.152-.116-.44-.166-.623-.05-.25.178-.095.173.068.068.206.21.715.166.546.15.04.127-.085.03-.187-.03-.314-.085-.9-.003-.277.173-.08.167.058.045.27.087.926.028.42.068.044.182-.048.044-.182-.066-.69-.03-.57.033-.277.203-.02.148.115.02.246.035.672.06.578.06.04.2-.04.056-.175-.083-.95-.023-.354.148-.09.18.045.085.255.136.986z"/>
      </svg>
    ),
    color: '#D97757'
  },
  { 
    name: 'Lovable', 
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 transition-colors" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
    color: '#FF69B4'
  },
  { 
    name: 'Bolt', 
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 transition-colors" fill="currentColor">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    color: '#4A90E2'
  },
  { 
    name: 'Cursor', 
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 transition-colors" fill="currentColor">
        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35z"/>
      </svg>
    ),
    color: '#00D1B2'
  },
  { 
    name: 'Framer', 
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 transition-colors" fill="currentColor">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
      </svg>
    ),
    color: '#0055FF'
  },
  { 
    name: 'Midjourney', 
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 transition-colors" fill="currentColor">
        <path d="M2.4 2.4h19.2v19.2H2.4V2.4zm1.92 1.92v15.36h15.36V4.32H4.32zm2.88 2.88h9.6v2.16H7.2V7.2zm0 3.84h9.6v2.16H7.2v-2.16zm0 3.84h6.72v2.16H7.2v-2.16z"/>
      </svg>
    ),
    color: '#000000'
  },
  { 
    name: 'Perplexity', 
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 transition-colors" fill="currentColor">
        <path d="M12 1L4 5.5V10H6V7L11 4.5V10H8V12H11V22H13V12H16V10H13V4.5L18 7V10H20V5.5L12 1ZM4 12V18.5L12 23L20 18.5V12H18V17L12 20.5L6 17V12H4Z"/>
      </svg>
    ),
    color: '#20B2AA'
  },
  { 
    name: 'Google Gemini', 
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 transition-colors" fill="currentColor">
        <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z"/>
      </svg>
    ),
    color: '#4285F4'
  },
  { 
    name: 'NotebookLM', 
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 transition-colors" fill="currentColor">
        <path d="M4 4h2v16H4V4zm4 0h2v16H8V4zm4 0h8c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-8V4zm2 2v12h6V6h-6z"/>
      </svg>
    ),
    color: '#EA4335'
  },
  { 
    name: 'Google AI Studio', 
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 transition-colors" fill="currentColor">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17l4.59-4.59L16 11l-6 6z"/>
      </svg>
    ),
    color: '#34A853'
  },
  { 
    name: 'GitHub Copilot', 
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 transition-colors" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    color: '#6e5494'
  },
  { 
    name: 'Figma AI', 
    icon: (
      <svg viewBox="0 0 38 57" className="w-4 h-4 transition-colors" fill="currentColor">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
      </svg>
    ),
    color: '#F24E1E'
  },
  { 
    name: 'Notion AI', 
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 transition-colors" fill="currentColor">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM2.64 1.782l13.168-.933c1.636-.14 2.055-.047 3.082.7l4.25 2.986c.7.513.933.653.933 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.995c0-.84.374-1.54 1.589-1.213z"/>
      </svg>
    ),
    color: '#000000'
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container-narrow">
        <h2 className="text-section mb-4 reveal">Skills & Tools</h2>
        <p className="text-base text-muted-foreground max-w-2xl mb-16 reveal reveal-delay-1">
          A blend of design thinking, technical expertise, and marketing savvy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
          {skillCategories.map((category, index) => (
            <div key={category.title} className={`reveal reveal-delay-${index + 1}`}>
              <h3 className="font-medium text-base mb-5 text-foreground">
                {category.title}
              </h3>
              <ul className="space-y-2.5">
                {category.skills.map((skill) => {
                  const IconComponent = skill.icon;
                  return (
                    <li 
                      key={skill.name} 
                      className="text-sm text-muted-foreground flex items-center gap-2.5"
                    >
                      <IconComponent className="w-4 h-4 flex-shrink-0" style={{ color: skill.color }} />
                      {skill.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* AI Tools */}
        <div className="reveal reveal-delay-4 border-t border-border pt-12">
          <h3 className="font-medium text-base mb-5">
            AI-Enhanced Workflow
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {aiTools.map((tool) => (
              <span 
                key={tool.name}
                className="text-sm px-4 py-2 bg-secondary text-foreground rounded-full transition-colors duration-300 hover:bg-primary hover:text-primary-foreground flex items-center gap-2 group"
                style={{ '--tool-color': tool.color } as React.CSSProperties}
              >
                <span className="[&>svg]:transition-colors [&>svg]:duration-300 group-hover:[&>svg]:text-primary-foreground" style={{ color: tool.color }}>
                  {tool.icon}
                </span>
                {tool.name}
              </span>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="reveal reveal-delay-5 border-t border-border pt-12 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Certifications */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-foreground">
                Professional Certification Courses
              </h3>
              <ul className="space-y-3 text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></span>
                  <span className="font-semibold text-foreground">Google UX Design Professional Certificate, 2025</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></span>
                  <span className="font-semibold text-foreground">Generative AI: Introduction and Applications by IBM, 2025</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></span>
                  <span>User Experience Fundamentals for Web Design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></span>
                  <span>Microsoft Professional Program in Front-End Web Development</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></span>
                  <span>WordPress Essential Training</span>
                </li>
              </ul>
            </div>

            {/* Educational History */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-foreground">
                Educational History
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="font-medium text-foreground text-base">
                    Pursuing Micro Master's degree in Leadership and Service Innovation
                  </p>
                  <p className="text-sm text-muted-foreground">UQ Business School, Australia</p>
                </div>
                <div>
                  <p className="font-medium text-foreground text-base">Bachelor's Degree</p>
                  <p className="text-sm text-muted-foreground">Computer Science / Information Technology</p>
                  <p className="text-sm text-muted-foreground">Andhra University 2006</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
