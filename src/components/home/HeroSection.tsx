import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedElement } from "@/components/ui/AnimatedElement";
import { Phone, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const carouselImages = [
  "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526048/_MG_2339_sw833f.jpg",
  "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526048/_MG_2096_lzzbst.jpg",
  "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526046/_MG_2223_fkxcna.jpg",
  "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526048/_MG_2072_py3x31.jpg",
  "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526047/_MG_2164_tve1cf.jpg",
  "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526046/_MG_2263_maovcx.jpg",
  "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526044/_MG_2169_di9o8p.jpg",
  "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526044/_MG_2158_tnoqlk.jpg",
  "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526044/_MG_2122_svr52z.jpg"
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const controls = useAnimation();

  // Carousel logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, []);

  // Animation sequence
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });
  }, [controls]);

  return (
    <div className="relative text-white py-32 md:py-48 lg:py-64 min-h-[90vh] flex items-center">
      {/* Background Image with Motion */}
      <motion.div 
        key={currentImage}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: [0, 10, 0, -10, 0],
          y: [0, 5, 0, -5, 0],
        }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 15,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          opacity: { duration: 1 },
          scale: { duration: 15, ease: "easeInOut" },
          x: { duration: 30, repeat: Infinity, repeatType: "reverse" },
          y: { duration: 20, repeat: Infinity, repeatType: "reverse" }
        }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${carouselImages[currentImage]})`,
          backgroundPosition: 'center',
          willChange: 'transform',
          transformOrigin: 'center center',
          width: '100%',
          height: '100%',
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Carousel indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex space-x-2 -translate-x-1/2">
        {carouselImages.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrentImage(idx)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`inline-block w-3 h-3 rounded-full transition-all duration-300 ${idx === currentImage ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="space-y-6"
          >
            <AnimatedElement variant="slideUp" delay={0.2}>
              <div className="mb-2">
                <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium inline-block">
                  Trusted Veterinary Care in Accra
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                Caring For Your <span className="text-vet-coral">Pets</span>{" "}
                Like Family
              </h1>
            </AnimatedElement>

            <AnimatedElement variant="slideUp" delay={0.4}>
              <p className="text-lg md:text-xl opacity-90">
                Welcome to Koney's Veterinary Hospital in Accra — providing
                exceptional care for your beloved pets with compassion and
                expertise.
              </p>
            </AnimatedElement>

            <AnimatedElement variant="slideUp" delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                <Link to="tel:+233533734385">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="bg-vet-coral hover:bg-vet-coral/90 text-white rounded-full px-6 flex items-center gap-2"
                    >
                      <Phone className="h-5 w-5" />
                      <span>Call Us</span>
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/services">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-white bg-vet-teal/10 border-white hover:bg-vet-teal/20 rounded-full px-6 flex items-center gap-2"
                    >
                      <span>Explore Our Services</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </AnimatedElement>

            <AnimatedElement variant="fadeIn" delay={0.8}>
              <div className="grid grid-cols-3 gap-4 mt-12 bg-white/10 p-4 rounded-lg backdrop-blur-sm max-w-2xl mx-auto">
                <div className="text-center p-3">
                  <h3 className="text-2xl font-bold text-vet-coral">10+</h3>
                  <p className="text-sm">Years Experience</p>
                </div>
                <div className="text-center p-3 border-x border-white/20">
                  <h3 className="text-2xl font-bold text-vet-coral">5000+</h3>
                  <p className="text-sm">Pets Treated</p>
                </div>
                <div className="text-center p-3">
                  <h3 className="text-2xl font-bold text-vet-coral">15+</h3>
                  <p className="text-sm">Expert Vets</p>
                </div>
              </div>
            </AnimatedElement>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
