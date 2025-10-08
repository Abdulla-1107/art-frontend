import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Mail } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-gradient mb-4">Bibisora</h3>
            <p className="text-muted-foreground text-sm">
              Original artworks by Uzbek artist Bibisora. Each piece tells a unique story.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-start md:items-center">
            <h4 className="font-heading font-semibold mb-4">{t('footer.followMe')}</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="mailto:bibisora@example.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-start md:items-end">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Bibisora
            </p>
            <p className="text-sm text-muted-foreground">{t('footer.rights')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
