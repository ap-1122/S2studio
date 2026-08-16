"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Custom Component for High-Speed Number Counter Animation
const AnimatedCounter = ({ targetNumber, label, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    // 60 frames per second calculation
    const increment = targetNumber / (duration / 16); 
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [targetNumber, duration]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-5xl md:text-7xl font-serif text-[#C5A059] mb-2 drop-shadow-md">
        {count}+
      </h3>
      <p className="text-xs tracking-[0.2em] text-gray-400 uppercase font-bold text-center">
        {label}
      </p>
    </div>
  );
};

export default function ArchitectProfile() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24 overflow-hidden">
      
      {/* 1. HERO SECTION: Profile Intro */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          {/* Architect Portrait Image */}
          <div className="w-full md:w-5/12 relative group">
            <div className="absolute inset-0 bg-[#C5A059] translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" 
              alt="Sachin Singh - Principal Architect" 
              className="relative z-10 w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-xl"
            />
          </div>

          {/* Biography & Partnership */}
          <div className="w-full md:w-7/12">
            <h2 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Principal Architect</h2>
            <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6">Sachin Singh</h1>
            <p className="text-gray-600 leading-relaxed mb-8 text-lg text-justify">
              With a relentless passion for transforming raw spaces into architectural masterpieces, Sachin Singh leads S² Studio with a vision that blends modern aesthetics with structural integrity. Every blueprint drawn is a commitment to perfection.
            </p>
            <div className="p-6 bg-gray-900 text-white border-l-4 border-[#C5A059]">
              <h4 className="text-sm tracking-[0.2em] font-bold uppercase mb-2 text-[#C5A059]">Strategic Partnership</h4>
              <p className="font-light text-gray-300">
                Proudly collaborating with <strong className="text-white font-serif tracking-wider">R Builders</strong>, dominating the construction and architectural landscape in Satna, Madhya Pradesh, to deliver high-scale, flawless turn-key projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. HIGH-SPEED ANIMATED COUNTERS (Dark Premium Section) */}
      <div className="bg-gray-900 py-24 mb-24 relative shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12">
          <AnimatedCounter targetNumber={85} label="Residential Homes" />
          <AnimatedCounter targetNumber={30} label="Commercial Spaces" />
          <AnimatedCounter targetNumber={120} label="Interior Designs" />
          <AnimatedCounter targetNumber={15} label="Awards & Honors" />
        </div>
      </div>

      {/* 3. ON-SITE ACTION GALLERY */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
        <h2 className="text-3xl font-serif text-gray-900 mb-4">On-Site Execution</h2>
        <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-80 bg-gray-200 relative group overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
            <span className="absolute bottom-6 left-6 text-white tracking-[0.2em] text-xs font-bold uppercase">Foundation Work</span>
          </div>
          <div className="h-80 bg-gray-200 relative group overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
            <span className="absolute bottom-6 left-6 text-white tracking-[0.2em] text-xs font-bold uppercase">Structural Planning</span>
          </div>
          <div className="h-80 bg-gray-200 relative group overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
            <span className="absolute bottom-6 left-6 text-white tracking-[0.2em] text-xs font-bold uppercase">Final Execution</span>
          </div>
        </div>
      </div>

    </div>
  );
}