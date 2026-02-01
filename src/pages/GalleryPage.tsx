import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { X, Calendar, MapPin, Camera, Heart } from 'lucide-react';

const mockPhotos = [
  {
    id: '1',
    title: '秋日街头',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
    album: '街拍',
    capturedAt: '2024-01-15',
    location: '北京',
    tags: ['街拍', '秋天', '建筑'],
  },
  {
    id: '2',
    title: '咖啡时光',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
    album: '生活',
    capturedAt: '2024-01-14',
    location: '上海',
    tags: ['咖啡', '生活', '静物'],
  },
  {
    id: '3',
    title: '夕阳西下',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
    album: '风景',
    capturedAt: '2024-01-13',
    location: '杭州',
    tags: ['夕阳', '风景', '自然'],
  },
  {
    id: '4',
    title: '城市夜景',
    imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300&h=300&fit=crop',
    album: '夜景',
    capturedAt: '2024-01-12',
    location: '深圳',
    tags: ['夜景', '城市', '灯光'],
  },
  {
    id: '5',
    title: '花朵特写',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=300&fit=crop',
    album: '自然',
    capturedAt: '2024-01-11',
    location: '成都',
    tags: ['花朵', '自然', '微距'],
  },
  {
    id: '6',
    title: '美食记录',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop',
    album: '美食',
    capturedAt: '2024-01-10',
    location: '广州',
    tags: ['美食', '生活', '记录'],
  },
];

export function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof mockPhotos[0] | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string>('全部');

  const albums = ['全部', ...Array.from(new Set(mockPhotos.map(photo => photo.album)))];

  const filteredPhotos = selectedAlbum === '全部'
    ? mockPhotos
    : mockPhotos.filter(photo => photo.album === selectedAlbum);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            我的相册
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            用镜头记录生活的美好瞬间
          </p>
        </motion.div>

        {/* Album Filter */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlassCard>
            <div className="flex flex-wrap gap-2">
              {albums.map((album) => (
                <Button
                  key={album}
                  variant={selectedAlbum === album ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedAlbum(album)}
                >
                  {album}
                </Button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          layout
        >
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="glass rounded-lg p-2">
                    <Heart size={20} className="text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-medium text-sm mb-1">
                    {photo.title}
                  </h3>
                  <p className="text-white/80 text-xs">
                    {photo.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Photo Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                className="relative max-w-4xl max-h-[90vh] w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                  onClick={() => setSelectedPhoto(null)}
                >
                  <X size={24} />
                </button>

                <div className="glass rounded-2xl overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className="lg:flex-1">
                      <img
                        src={selectedPhoto.imageUrl}
                        alt={selectedPhoto.title}
                        className="w-full h-64 lg:h-96 object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="lg:w-80 p-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        {selectedPhoto.title}
                      </h2>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar size={16} />
                          {selectedPhoto.capturedAt}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <MapPin size={16} />
                          {selectedPhoto.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Camera size={16} />
                          {selectedPhoto.album}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                          标签
                        </h3>
                        <div className="flex flex-wrap gap-1">
                          {selectedPhoto.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="primary" size="sm" className="flex-1">
                          <Heart size={16} className="mr-1" />
                          喜欢
                        </Button>
                        <Button variant="secondary" size="sm">
                          分享
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}