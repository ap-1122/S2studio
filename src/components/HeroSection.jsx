"use client"; // Important for slider logic
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Slider images array
const slideImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80"
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === slideImages.length - 1 ? 0 : prev + 1));
    }, 5000); // Har 5 second me change hoga
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center text-center overflow-hidden">
      
      {/* Background Images Slider */}
      {slideImages.map((image, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${image}')` }}
        ></div>
      ))}
      
      {/* Premium Light Overlay */}
      <div className="absolute inset-0 bg-[#FAFAFA]/70"></div>

      {/* Main Content */}
      <div className="relative z-10 px-6 max-w-5xl mx-auto">
        <h2 className="text-[#C5A059] text-xs md:text-sm tracking-[0.4em] font-bold mb-6 uppercase">
          Architecture • Interiors • Construction
        </h2>
        <h1 className="text-5xl md:text-7xl font-serif text-gray-900 leading-tight mb-8 drop-shadow-sm">
          We Design Dreams.<br />
          <span className="font-light italic">We Build Reality.</span>
        </h1>
        <p className="text-gray-700 text-base md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          End-to-end luxury architectural and interior solutions tailored for modern living. From concept to creation.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Link href="/projects" className="bg-[#C5A059] text-white px-10 py-4 tracking-[0.2em] text-sm md:text-base font-bold hover:bg-gray-900 transition-all duration-500 w-full md:w-auto">
            EXPLORE PROJECTS
          </Link>
          <Link href="/contact" className="border-b-2 border-gray-900 text-gray-900 pb-1 tracking-[0.2em] text-sm md:text-base font-bold hover:text-[#C5A059] hover:border-[#C5A059] transition-all duration-300 w-full md:w-auto mt-4 md:mt-0">
            BOOK A CONSULTATION
          </Link>
        </div>
      </div>
      
      {/* Slider Indicators (Niche chhote dots) */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-10">
        {slideImages.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImage ? 'bg-[#C5A059] w-8' : 'bg-gray-400'
            }`}
          ></button>
        ))}
      </div>

    </section>
  );
}








// import Link from 'next/link';

// export default function HeroSection() {
//   return (
//     <section className="relative w-full h-[90vh] flex items-center justify-center text-center">
      
//       {/* Background Image Setup (Free high-quality architecture image) */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80')" }}
//       ></div>
      
//       {/* Premium Light Overlay (Image ko thoda fade karega taki text clear dikhe) */}
//       <div className="absolute inset-0 bg-[#FAFAFA]/70"></div>

//       {/* Main Content */}
//       <div className="relative z-10 px-6 max-w-5xl mx-auto">
//         <h2 className="text-[#C5A059] text-sm md:text-lg tracking-[0.3em] font-semibold mb-6 uppercase">
//           Architecture • Interiors • Construction
//         </h2>
//         <h1 className="text-5xl md:text-7xl font-serif text-gray-900 leading-tight mb-8">
//           We Design Dreams.<br />
//           <span className="font-light italic">We Build Reality.</span>
//         </h1>
//         <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
//           End-to-end luxury architectural and interior solutions tailored for modern living. From concept to creation.
//         </p>
        
//         {/* Call to action buttons */}
//         <div className="flex flex-col md:flex-row items-center justify-center gap-6">
//           <Link href="/projects" className="bg-[#C5A059] text-white px-10 py-4 tracking-[0.15em] text-sm md:text-base font-semibold hover:bg-gray-900 transition-all duration-500 w-full md:w-auto">
//             EXPLORE PROJECTS
//           </Link>
//           <Link href="/contact" className="border-b-2 border-gray-900 text-gray-900 pb-1 tracking-[0.15em] text-sm md:text-base font-semibold hover:text-[#C5A059] hover:border-[#C5A059] transition-all duration-300 w-full md:w-auto mt-4 md:mt-0">
//             BOOK A CONSULTATION
//           </Link>
//         </div>
//       </div>
      
//     </section>
//   );
// }