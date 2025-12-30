import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AnimatedDog } from "./Chatbot";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="bg-dark-section text-dark-section-foreground py-8 border-t border-dark-section-foreground/10">
        <div className="container-narrow flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AnimatedDog size={36} />
            <p className="text-caption opacity-60">
              {currentYear} All rights reserved — © Pramod Sunkara
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setPrivacyOpen(true)}
              className="text-caption opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              Privacy
            </button>
          </div>
        </div>
      </footer>

      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-w-lg bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Privacy Policy</DialogTitle>
            <DialogDescription className="sr-only">
              Privacy policy and data collection information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground">
            <section>
              <h3 className="font-medium text-foreground mb-2">Data Collection</h3>
              <p>
                This portfolio website does not collect, store, or process any personal data. 
                No cookies, analytics, or tracking scripts are used.
              </p>
            </section>
            
            <section>
              <h3 className="font-medium text-foreground mb-2">Cookies</h3>
              <p>
                This website does not use cookies or any similar tracking technologies. 
                Your browsing experience is completely private.
              </p>
            </section>
            
            <section>
              <h3 className="font-medium text-foreground mb-2">Third-Party Services</h3>
              <p>
                This site is hosted on Lovable's infrastructure. External links to LinkedIn, 
                GitHub, or other platforms are subject to their respective privacy policies.
              </p>
            </section>
            
            <section>
              <h3 className="font-medium text-foreground mb-2">Contact</h3>
              <p>
                For any privacy-related questions, please reach out via the contact section above.
              </p>
            </section>
            
            <p className="text-xs opacity-70 pt-2 border-t border-border">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;
