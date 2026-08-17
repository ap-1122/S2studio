"use client";

import { useState, useRef } from 'react';

export default function BeforeAfterSlider({ beforeImage, afterImage }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleDrag = (e) => {
    if (!containerRef.current) return;
    
    // Mouse ya Touch ki position nikalna
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    
    setSliderPosition(percent);
  };

  return (
    <div className="w-full flex flex-col items-center my-12">
      <div 
        ref={containerRef}
        className="relative w-full max-w-5xl h-[400px] md:h-[600px] overflow-hidden cursor-ew-resize select-none rounded-sm shadow-2xl group"
        onMouseMove={handleDrag}
        onTouchMove={(e) => handleDrag(e.touches[0])}
      >
        {/* AFTER IMAGE (Bottom Layer - Yeh poori dikhegi) */}
        <img 
          src={afterImage} 
          alt="After Renovation" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        
        {/* 'AFTER' Tag */}
        <span className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-sm text-white px-4 py-2 text-xs tracking-widest font-bold uppercase rounded-sm z-0">
          After
        </span>

        {/* BEFORE IMAGE (Top Layer - Yeh slider ke hisaab se kategi) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }} // CSS magic jo image ko kaat raha hai
        >
          <img 
            src={beforeImage} 
            alt="Before Renovation" 
            className="absolute inset-0 w-[100vw] max-w-5xl h-full object-cover"
            style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
          />
          {/* 'BEFORE' Tag */}
          <span className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm text-white px-4 py-2 text-xs tracking-widest font-bold uppercase rounded-sm">
            Before
          </span>
        </div>

        {/* SLIDER LINE & BUTTON (Custom Design) */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none transition-all duration-75"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Circular Handle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-[#C5A059] group-hover:scale-110 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l6-6-6-6" />
              <path d="M9 18l-6-6 6-6" />
            </svg>
          </div>
        </div>
      </div>
      
      <p className="text-gray-400 text-xs tracking-[0.2em] uppercase mt-6 font-bold">
        Drag to compare
      </p>
    </div>
  );
}