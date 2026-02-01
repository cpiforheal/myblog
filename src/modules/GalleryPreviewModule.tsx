import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Camera, ArrowRight } from 'lucide-react';

interface GalleryPreviewModuleProps {
  photos?: string[];
  onViewMore?: () => void;
}

export function GalleryPreviewModule({
  photos = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=300&fit=crop'
  ],
  onViewMore
}: GalleryPreviewModuleProps) {
  return (
    <ScrollReveal delay={0.3}>
      <GlassCard hover className="h-full group">
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-apple"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <Camera size={22} className="text-white" />
          </motion.div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
            精选照片
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {photos.slice(0, 4).map((photo, index) => (
            <motion.div
              key={index}
              className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-apple-xs"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.1 * index,
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={{
                scale: 1.05,
                zIndex: 10,
                transition: { duration: 0.2 }
              }}
            >
              <img
                src={photo}
                alt={`精选照片 ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewMore}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
            className="w-full group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 group-hover:text-purple-600 dark:group-hover:text-purple-400"
          >
            查看更多照片
          </Button>
        </motion.div>

        {/* 装饰性元素 */}
        <motion.div
          className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full opacity-60"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1]
          }}
        />
      </GlassCard>
    </ScrollReveal>
  );
}