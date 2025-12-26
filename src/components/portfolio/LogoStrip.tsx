const tools = [
  'Figma',
  'React',
  'WordPress',
  'JavaScript',
  'TypeScript',
  'Tailwind CSS',
  'Adobe XD',
  'Photoshop',
  'Sketch',
  'HTML5',
  'CSS3',
  'Node.js',
  'Git',
  'Webflow',
];

const LogoStrip = () => {
  return (
    <div className="w-full overflow-hidden py-8 mt-16 reveal reveal-delay-3">
      <div className="relative">
        <div className="flex animate-scroll">
          {[...tools, ...tools].map((tool, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-8 text-muted-foreground/60 text-sm font-medium tracking-wide hover:text-foreground transition-colors duration-300"
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoStrip;
