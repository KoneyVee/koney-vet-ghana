import React from 'react';
import { Phone, Clock, MapPin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TopHeader = () => {
  return (
    <div className="bg-vet-blue text-white py-2 text-sm">
      <div className="container-custom flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-4 mb-2 md:mb-0">
          <div className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            <a href="tel:+233533734385" className="hover:text-vet-teal transition-colors">053 373 4385</a>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5" />
            <a href="mailto:info@koneysvet.com" className="hover:text-vet-teal transition-colors">info@koneysvet.com</a>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>House #12 Swaniker Street, Abelempke, Accra Ghana</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>Mon-Sat: 8:00AM - 5:00PM</span>
          </div>
          <div className="hidden md:flex gap-3">
            <motion.a 
              whileHover={{ y: -2 }}
              href="https://www.facebook.com/profile.php?id=100079096176304" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-vet-teal transition-colors"
            >
              <i className="fab fa-facebook-f"></i>
            </motion.a>
            <motion.a 
              whileHover={{ y: -2 }}
              href="https://www.instagram.com/koney_s_veterinary_hospital/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-vet-teal transition-colors"
            >
              <i className="fab fa-instagram"></i>
            </motion.a>
            <motion.a 
              whileHover={{ y: -2 }}
              href="https://x.com/koneysvet20" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-vet-teal transition-colors"
            >
              <i className="fab fa-twitter"></i>
            </motion.a>
            <motion.a 
              whileHover={{ y: -2 }}
              href="https://www.tiktok.com/@koneysvethospital" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-vet-teal transition-colors"
            >
              <i className="fab fa-tiktok"></i>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
