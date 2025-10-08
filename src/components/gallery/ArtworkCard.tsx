import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Check, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Artwork } from '@/contexts/CartContext';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useState } from 'react';
import { ImageLightbox } from './ImageLightbox';
import { cn } from '@/lib/utils';

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
}

export const ArtworkCard = ({ artwork, index = 0 }: ArtworkCardProps) => {
  const { t, i18n } = useTranslation();
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const getTitle = () => {
    switch (i18n.language) {
      case 'ru':
        return artwork.titleRu;
      case 'uz':
        return artwork.titleUz;
      default:
        return artwork.title;
    }
  };

  const inCart = isInCart(artwork.id);
  const isFav = isFavorite(artwork.id);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card className="group overflow-hidden hover-lift card-elegant border-border/50">
          <div className="relative">
            <div 
              className="relative aspect-[3/4] overflow-hidden bg-muted cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={artwork.image}
                alt={getTitle()}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(artwork.id, getTitle());
              }}
              className={cn(
                "absolute top-3 right-3 z-10 bg-background/80 backdrop-blur-sm hover:bg-background",
                isFav && "text-red-500"
              )}
            >
              <Heart className={cn("h-5 w-5", isFav && "fill-current")} />
            </Button>
          </div>

        <CardContent className="p-4">
          <Link to={`/artwork/${artwork.id}`}>
            <h3 className="font-heading text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
              {getTitle()}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-3">{artwork.dimensions}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">${artwork.price}</span>
            <Button
              onClick={() => addToCart(artwork)}
              disabled={inCart}
              size="sm"
              variant={inCart ? "secondary" : "default"}
              className="gap-2"
            >
              {inCart ? (
                <>
                  <Check className="h-4 w-4" />
                  {t('artwork.inCart')}
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  {t('artwork.addToCart')}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>

    <ImageLightbox
      isOpen={lightboxOpen}
      onClose={() => setLightboxOpen(false)}
      image={artwork.image}
      title={getTitle()}
    />
  </>
  );
};
