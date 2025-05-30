import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample image data - replace with your actual images
const galleryImages = [
  {
    id: 1,
    src: 'https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526048/_MG_2339_sw833f.jpg',
    alt: 'Pet care at our clinic',
    category: 'clinic'
  },
  {
    id: 2,
    src: 'https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526048/_MG_2096_lzzbst.jpg',
    alt: 'Veterinary team in action',
    category: 'team'
  },
  {
    id: 3,
    src: 'https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526046/_MG_2223_fkxcna.jpg',
    alt: 'Pet grooming services',
    category: 'grooming'
  },
  {
    id: 4,
    src: 'https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526048/_MG_2072_py3x31.jpg',
    alt: 'Pet surgery',
    category: 'surgery'
  },
  {
    id: 5,
    src: 'https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526047/_MG_2164_tve1cf.jpg',
    alt: 'Happy pets',
    category: 'pets'
  },
  {
    id: 6,
    src: 'https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526046/_MG_2263_maovcx.jpg',
    alt: 'Pet consultation',
    category: 'consultation'
  },
];

// Sample video data - replace with your actual videos
const videos = [
  {
    id: 1,
    title: 'Koney\'s Veterinary Hospital',
    thumbnail: 'https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526044/_MG_2158_tnoqlk.jpg',
    videoId: 'JARTJWJKXXE',
    description: 'A glimpse of our veterinary services and facilities.'
  },
  {
    id: 2,
    title: 'Clinic Tour',
    thumbnail: 'https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526044/_MG_2158_tnoqlk.jpg',
    videoId: 'YOUR_YOUTUBE_VIDEO_ID_1',
    description: 'Take a virtual tour of our state-of-the-art facilities.'
  },
  {
    id: 3,
    title: 'Pet Care Tips',
    thumbnail: 'https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526044/_MG_2122_svr52z.jpg',
    videoId: 'YOUR_YOUTUBE_VIDEO_ID_2',
    description: 'Expert tips for taking care of your pets at home.'
  }
];

const Media = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'gallery' | 'videos'>('gallery');
  const [category, setCategory] = useState<string>('all');

  const categories = ['all', ...new Set(galleryImages.map(img => img.category))];
  
  const filteredImages = category === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === category);

  const openImage = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const openVideo = (index: number) => {
    setSelectedVideo(index);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const lastIndex = filteredImages.length - 1;
    let newIndex;
    
    if (direction === 'next') {
      newIndex = selectedImage >= lastIndex ? 0 : selectedImage + 1;
    } else {
      newIndex = selectedImage <= 0 ? lastIndex : selectedImage - 1;
    }
    
    setSelectedImage(newIndex);
  };

  return (
    <MainLayout>
      <PageHeader
        title="Media Gallery"
        description="Explore our collection of photos and videos showcasing our clinic, team, and happy pets."
        bgImage="https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526044/_MG_2158_tnoqlk.jpg"
        breadcrumbs={[{ label: 'Media', path: '/media' }]}
      />

      <section className="py-16 bg-white">
        <div className="container-custom">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 p-1 rounded-lg">
              {['gallery', 'videos'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'gallery' | 'videos')}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-white shadow-sm text-vet-teal'
                      : 'text-gray-600 hover:text-vet-teal'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'gallery' ? (
            <>
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      category === cat
                        ? 'bg-vet-teal text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredImages.map((img, index) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => openImage(index)}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white bg-opacity-90 w-12 h-12 rounded-full flex items-center justify-center transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-vet-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all"
                  onClick={() => openVideo(index)}
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-t-8 border-b-8 border-t-transparent border-b-transparent border-l-16 border-l-vet-teal ml-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
                    <p className="text-gray-600 text-sm">{video.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeImage}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                closeImage();
              }}
              className="absolute top-4 right-4 text-white hover:text-vet-teal transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-4 md:left-8 text-white hover:text-vet-teal transition-colors"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            
            <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                className="max-w-full max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-4 md:right-8 text-white hover:text-vet-teal transition-colors"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeVideo}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                closeVideo();
              }}
              className="absolute top-4 right-4 text-white hover:text-vet-teal transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            
            <div className="relative w-full max-w-4xl">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${videos[selectedVideo].videoId}?autoplay=1`}
                  title={videos[selectedVideo].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[60vh] rounded-lg"
                ></iframe>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default Media;
