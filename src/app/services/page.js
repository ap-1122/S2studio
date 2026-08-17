import Link from 'next/link';
import ScrollWrapper from '@/components/ScrollWrapper';
import BeforeAfterSlider from '@/components/BeforeAfterSlider'; // Naya slider import kiya

export default function ServicesPage() {
  const servicesList = [
    {
      title: "Architecture Planning Only",
      shortDesc: "Floor Plans, 3D Elevations & Structural Blueprints.",
      detail: "Perfect for clients who only need expert architectural drawings, Vastu consultation, and structural planning before they start their own construction.",
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80",
    },
    {
      title: "Turnkey Construction",
      shortDesc: "End-to-end building construction (Foundation to Finish).",
      detail: "We handle everything. From digging the foundation to handing over the keys. Includes all materials, labor, interiors, and premium finishing.",
      img: "https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&q=80",
    },
    {
      title: "Basic Structure (Grey Structure)",
      shortDesc: "Complete structural framework without interiors.",
      detail: "We build the core shell of your house including pillars, walls, and roof casting, allowing you to finish the interiors at your own pace.",
      img: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80",
    },
    {
      title: "Interior Design",
      shortDesc: "Bespoke interior solutions and space planning.",
      detail: "Transforming empty spaces into luxury homes. We offer custom furniture design, false ceilings, lighting layouts, and premium material selection.",
      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80",
    },
    {
      title: "Commercial & Hospitality",
      shortDesc: "Hotels, Showrooms & Large Commercial Buildings.",
      detail: "Specialized construction and planning for high-traffic commercial spaces. Delivering modern aesthetics with functional and durable engineering.",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
    },
    {
      title: "Roof Waterproofing",
      shortDesc: "Advanced chemical waterproofing solutions.",
      detail: "Protecting your investment with multi-layer terrace and bathroom waterproofing to ensure zero seepage and a longer lifespan for your building.",
      img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80",
    },
    {
      title: "Premium Flooring",
      shortDesc: "Italian Marble, Hardwood & Custom Tiling.",
      detail: "Flawless installation of luxury flooring options. We ensure perfect leveling and chemical polishing for that mirror-finish look.",
      img: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80",
    }
  ];

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#121212] min-h-screen pt-32 pb-24 transition-colors duration-700">
      
      {/* Page Header */}
      <ScrollWrapper className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-20">
        <h2 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Our Expertise</h2>
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-6 transition-colors duration-700">What We Offer</h1>
        <div className="w-16 h-1 bg-[#C5A059] mx-auto"></div>
        <p className="mt-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-700">
          From drafting the first line on a blueprint to placing the final piece of Italian marble, we provide a comprehensive suite of architectural and construction services tailored to your exact needs.
        </p>
      </ScrollWrapper>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col gap-20">
          {servicesList.map((service, index) => (
            <ScrollWrapper 
              key={index} 
              className={`flex flex-col md:flex-row items-center gap-10 lg:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2 group overflow-hidden relative shadow-lg dark:shadow-none rounded-sm">
                <div 
                  className="h-80 md:h-[400px] w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url('${service.img}')` }}
                ></div>
                <div className="absolute inset-0 bg-black/10 dark:bg-black/30 group-hover:bg-black/0 transition-all duration-500"></div>
              </div>

              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-4 transition-colors duration-700">{service.title}</h2>
                <h3 className="text-[#C5A059] text-sm tracking-[0.1em] font-bold uppercase mb-6 border-l-2 border-[#C5A059] pl-3">
                  {service.shortDesc}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-justify transition-colors duration-700">
                  {service.detail}
                </p>
                <Link 
                  href="/contact"
                  className="inline-block border-b-2 border-gray-900 dark:border-white text-gray-900 dark:text-white pb-1 tracking-[0.2em] text-xs font-bold hover:text-[#C5A059] dark:hover:text-[#C5A059] hover:border-[#C5A059] dark:hover:border-[#C5A059] transition-all duration-300 uppercase"
                >
                  Consult With Us
                </Link>
              </div>
            </ScrollWrapper>
          ))}
        </div>
      </div>

      {/* ================= NAYA SECTION: BEFORE / AFTER SHOWCASE ================= */}
      <ScrollWrapper className="max-w-7xl mx-auto px-6 md:px-12 mt-32 text-center">
        <h2 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Transformation Showcase</h2>
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-6 transition-colors duration-700">See The Difference</h1>
        <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-10"></div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12 transition-colors duration-700">
          From raw concrete structures to ultra-luxury living spaces. Drag the slider to see how we breathe life into empty walls through our premium construction and interior design services.
        </p>

        {/* Humara Naya BeforeAfterSlider Component */}
        <BeforeAfterSlider 
          beforeImage="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80" 
          afterImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80" 
        />
      </ScrollWrapper>
      {/* ========================================================================= */}

      {/* Bottom Call to Action */}
      <ScrollWrapper className="max-w-4xl mx-auto px-6 mt-20 text-center border-t border-gray-200 dark:border-gray-800 pt-16 transition-colors duration-700">
        <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-4 transition-colors duration-700">Have a unique project in mind?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 transition-colors duration-700">We also take up custom requirements and bespoke architectural challenges.</p>
        <Link 
          href="/contact"
          className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 tracking-[0.2em] text-sm font-bold hover:bg-[#C5A059] dark:hover:bg-[#C5A059] dark:hover:text-white transition-all duration-300 inline-block rounded-sm shadow-md"
        >
          GET IN TOUCH
        </Link>
      </ScrollWrapper>

    </div>
  );
}








// import Link from 'next/link';
// import ScrollWrapper from '@/components/ScrollWrapper'; // Sahi import path lagaya hai

// export default function ServicesPage() {
//   const servicesList = [
//     {
//       title: "Architecture Planning Only",
//       shortDesc: "Floor Plans, 3D Elevations & Structural Blueprints.",
//       detail: "Perfect for clients who only need expert architectural drawings, Vastu consultation, and structural planning before they start their own construction.",
//       img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80",
//     },
//     {
//       title: "Turnkey Construction",
//       shortDesc: "End-to-end building construction (Foundation to Finish).",
//       detail: "We handle everything. From digging the foundation to handing over the keys. Includes all materials, labor, interiors, and premium finishing.",
//       img: "https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&q=80",
//     },
//     {
//       title: "Basic Structure (Grey Structure)",
//       shortDesc: "Complete structural framework without interiors.",
//       detail: "We build the core shell of your house including pillars, walls, and roof casting, allowing you to finish the interiors at your own pace.",
//       img: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80",
//     },
//     {
//       title: "Interior Design",
//       shortDesc: "Bespoke interior solutions and space planning.",
//       detail: "Transforming empty spaces into luxury homes. We offer custom furniture design, false ceilings, lighting layouts, and premium material selection.",
//       img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80",
//     },
//     {
//       title: "Commercial & Hospitality",
//       shortDesc: "Hotels, Showrooms & Large Commercial Buildings.",
//       detail: "Specialized construction and planning for high-traffic commercial spaces. Delivering modern aesthetics with functional and durable engineering.",
//       img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
//     },
//     {
//       title: "Roof Waterproofing",
//       shortDesc: "Advanced chemical waterproofing solutions.",
//       detail: "Protecting your investment with multi-layer terrace and bathroom waterproofing to ensure zero seepage and a longer lifespan for your building.",
//       img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80",
//     },
//     {
//       title: "Premium Flooring",
//       shortDesc: "Italian Marble, Hardwood & Custom Tiling.",
//       detail: "Flawless installation of luxury flooring options. We ensure perfect leveling and chemical polishing for that mirror-finish look.",
//       img: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80",
//     }
//   ];

//   return (
//     <div className="bg-[#FAFAFA] dark:bg-[#121212] min-h-screen pt-32 pb-24 transition-colors duration-700">
      
//       {/* Page Header */}
//       <ScrollWrapper className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-20">
//         <h2 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Our Expertise</h2>
//         <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-6 transition-colors duration-700">What We Offer</h1>
//         <div className="w-16 h-1 bg-[#C5A059] mx-auto"></div>
//         <p className="mt-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-700">
//           From drafting the first line on a blueprint to placing the final piece of Italian marble, we provide a comprehensive suite of architectural and construction services tailored to your exact needs.
//         </p>
//       </ScrollWrapper>

//       {/* Services List (Large Alternate Layout) */}
//       <div className="max-w-7xl mx-auto px-6 md:px-12">
//         <div className="flex flex-col gap-20">
//           {servicesList.map((service, index) => (
//             <ScrollWrapper 
//               key={index} 
//               className={`flex flex-col md:flex-row items-center gap-10 lg:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
//             >
//               {/* Image Section */}
//               <div className="w-full md:w-1/2 group overflow-hidden relative shadow-lg dark:shadow-none rounded-sm">
//                 <div 
//                   className="h-80 md:h-[400px] w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
//                   style={{ backgroundImage: `url('${service.img}')` }}
//                 ></div>
//                 <div className="absolute inset-0 bg-black/10 dark:bg-black/30 group-hover:bg-black/0 transition-all duration-500"></div>
//               </div>

//               {/* Text Section */}
//               <div className="w-full md:w-1/2">
//                 <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-4 transition-colors duration-700">{service.title}</h2>
//                 <h3 className="text-[#C5A059] text-sm tracking-[0.1em] font-bold uppercase mb-6 border-l-2 border-[#C5A059] pl-3">
//                   {service.shortDesc}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-justify transition-colors duration-700">
//                   {service.detail}
//                 </p>
//                 <Link 
//                   href="/contact"
//                   className="inline-block border-b-2 border-gray-900 dark:border-white text-gray-900 dark:text-white pb-1 tracking-[0.2em] text-xs font-bold hover:text-[#C5A059] dark:hover:text-[#C5A059] hover:border-[#C5A059] dark:hover:border-[#C5A059] transition-all duration-300 uppercase"
//                 >
//                   Consult With Us
//                 </Link>
//               </div>
//             </ScrollWrapper>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Call to Action */}
//       <ScrollWrapper className="max-w-4xl mx-auto px-6 mt-32 text-center border-t border-gray-200 dark:border-gray-800 pt-16 transition-colors duration-700">
//         <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-4 transition-colors duration-700">Have a unique project in mind?</h2>
//         <p className="text-gray-600 dark:text-gray-400 mb-8 transition-colors duration-700">We also take up custom requirements and bespoke architectural challenges.</p>
//         <Link 
//           href="/contact"
//           className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 tracking-[0.2em] text-sm font-bold hover:bg-[#C5A059] dark:hover:bg-[#C5A059] dark:hover:text-white transition-all duration-300 inline-block rounded-sm shadow-md"
//         >
//           GET IN TOUCH
//         </Link>
//       </ScrollWrapper>

//     </div>
//   );
// }








// import Link from 'next/link';

// export default function ServicesPage() {
//   // Saari Services ka Data (Premium Unsplash Images ke sath)
//   const servicesList = [
//     {
//       title: "Architecture Planning Only",
//       shortDesc: "Floor Plans, 3D Elevations & Structural Blueprints.",
//       detail: "Perfect for clients who only need expert architectural drawings, Vastu consultation, and structural planning before they start their own construction.",
//       img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80",
//     },
//     {
//       title: "Turnkey Construction",
//       shortDesc: "End-to-end building construction (Foundation to Finish).",
//       detail: "We handle everything. From digging the foundation to handing over the keys. Includes all materials, labor, interiors, and premium finishing.",
//       img: "https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&q=80",
//     },
//     {
//       title: "Basic Structure (Grey Structure)",
//       shortDesc: "Complete structural framework without interiors.",
//       detail: "We build the core shell of your house including pillars, walls, and roof casting, allowing you to finish the interiors at your own pace.",
//       img: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80",
//     },
//     {
//       title: "Interior Design",
//       shortDesc: "Bespoke interior solutions and space planning.",
//       detail: "Transforming empty spaces into luxury homes. We offer custom furniture design, false ceilings, lighting layouts, and premium material selection.",
//       img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80",
//     },
//     {
//       title: "Commercial & Hospitality",
//       shortDesc: "Hotels, Showrooms & Large Commercial Buildings.",
//       detail: "Specialized construction and planning for high-traffic commercial spaces. Delivering modern aesthetics with functional and durable engineering.",
//       img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
//     },
//     {
//       title: "Roof Waterproofing",
//       shortDesc: "Advanced chemical waterproofing solutions.",
//       detail: "Protecting your investment with multi-layer terrace and bathroom waterproofing to ensure zero seepage and a longer lifespan for your building.",
//       img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80",
//     },
//     {
//       title: "Premium Flooring",
//       shortDesc: "Italian Marble, Hardwood & Custom Tiling.",
//       detail: "Flawless installation of luxury flooring options. We ensure perfect leveling and chemical polishing for that mirror-finish look.",
//       img: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80",
//     }
//   ];

//   return (
//     <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24">
      
//       {/* Page Header */}
//       <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-20">
//         <h2 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Our Expertise</h2>
//         <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">What We Offer</h1>
//         <div className="w-16 h-1 bg-[#C5A059] mx-auto"></div>
//         <p className="mt-8 text-gray-600 max-w-2xl mx-auto leading-relaxed">
//           From drafting the first line on a blueprint to placing the final piece of Italian marble, we provide a comprehensive suite of architectural and construction services tailored to your exact needs.
//         </p>
//       </div>

//       {/* Services List (Large Alternate Layout) */}
//       <div className="max-w-7xl mx-auto px-6 md:px-12">
//         <div className="flex flex-col gap-20">
//           {servicesList.map((service, index) => (
//             <div 
//               key={index} 
//               className={`flex flex-col md:flex-row items-center gap-10 lg:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
//             >
//               {/* Image Section */}
//               <div className="w-full md:w-1/2 group overflow-hidden relative shadow-lg">
//                 <div 
//                   className="h-80 md:h-[400px] w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
//                   style={{ backgroundImage: `url('${service.img}')` }}
//                 ></div>
//                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500"></div>
//               </div>

//               {/* Text Section */}
//               <div className="w-full md:w-1/2">
//                 <h2 className="text-3xl font-serif text-gray-900 mb-4">{service.title}</h2>
//                 <h3 className="text-[#C5A059] text-sm tracking-[0.1em] font-bold uppercase mb-6 border-l-2 border-[#C5A059] pl-3">
//                   {service.shortDesc}
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed mb-8 text-justify">
//                   {service.detail}
//                 </p>
//                 <Link 
//                   href="/contact"
//                   className="inline-block border-b-2 border-gray-900 text-gray-900 pb-1 tracking-[0.2em] text-xs font-bold hover:text-[#C5A059] hover:border-[#C5A059] transition-all duration-300 uppercase"
//                 >
//                   Consult With Us
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Call to Action */}
//       <div className="max-w-4xl mx-auto px-6 mt-32 text-center border-t border-gray-200 pt-16">
//         <h2 className="text-2xl font-serif text-gray-900 mb-4">Have a unique project in mind?</h2>
//         <p className="text-gray-600 mb-8">We also take up custom requirements and bespoke architectural challenges.</p>
//         <Link 
//           href="/contact"
//           className="bg-gray-900 text-white px-8 py-3 tracking-[0.2em] text-sm font-bold hover:bg-[#C5A059] transition-all duration-300 inline-block"
//         >
//           GET IN TOUCH
//         </Link>
//       </div>

//     </div>
//   );
// }