import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { ArtworkCard } from '@/components/gallery/ArtworkCard';
import { artworks } from '@/data/artworks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type Category = 'all' | 'oil' | 'watercolor' | 'digital' | 'mixed';

const Gallery = () => {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: Category[] = ['all', 'oil', 'watercolor', 'digital', 'mixed'];

  const filteredArtworks = artworks.filter((artwork) => {
    // Filter by category
    const categoryMatch = activeCategory === 'all' || artwork.category === activeCategory;
    
    // Filter by search query
    if (!searchQuery) return categoryMatch;
    
    const query = searchQuery.toLowerCase();
    const title = i18n.language === 'ru' ? artwork.titleRu : 
                  i18n.language === 'uz' ? artwork.titleUz : artwork.title;
    const description = i18n.language === 'ru' ? artwork.descriptionRu : 
                        i18n.language === 'uz' ? artwork.descriptionUz : artwork.description;
    
    return categoryMatch && (
      title.toLowerCase().includes(query) ||
      description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {t('gallery.title')}
          </h1>
          <div className="w-24 h-1 bg-gradient-hero mx-auto rounded-full" />
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('gallery.search') || 'Search artworks...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? 'default' : 'outline'}
              className={cn(
                "transition-all",
                activeCategory === category && "shadow-elegant"
              )}
            >
              {t(`gallery.filter.${category}`)}
            </Button>
          ))}
        </motion.div>

        {/* Artworks Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredArtworks.map((artwork, index) => (
            <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
          ))}
        </motion.div>

        {filteredArtworks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">No artworks found in this category</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
