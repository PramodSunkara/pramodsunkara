const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-section text-dark-section-foreground py-6 md:py-8 border-t border-dark-section-foreground/10">
      <div className="container-narrow px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
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
