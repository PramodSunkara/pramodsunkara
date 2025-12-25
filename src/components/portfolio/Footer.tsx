const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container-narrow">
        <p className="text-caption text-muted-foreground text-center">
          © {currentYear} Pramod Sunkara. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
