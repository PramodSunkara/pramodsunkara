const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-section text-dark-section-foreground py-8 border-t border-dark-section-foreground/10 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-blob-orange/5 blur-2xl pointer-events-none" aria-hidden="true" />
      
      <div className="container-narrow flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <p className="text-caption opacity-60">
          {currentYear} All rights reserved — © Pramod Sunkara
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-caption opacity-60 hover:opacity-100 transition-opacity duration-300">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
