 "use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollWrapper from '@/components/ScrollWrapper';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CostEstimatorPage() {
  const [area, setArea] = useState(1000);
  const [projectType, setProjectType] = useState("Residential");
  const [serviceScope, setServiceScope] = useState("Turnkey Construction");
  const [quality, setQuality] = useState("Premium");

  const [totalCost, setTotalCost] = useState(0);
  const [breakdown, setBreakdown] = useState({ material: 0, labor: 0, design: 0 });

  // Modal & Download States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', contact: '' });

  const rates = {
    "Turnkey Construction": { Standard: 1500, Premium: 2200, Luxury: 3200 },
    "Interior Design Only": { Standard: 800, Premium: 1400, Luxury: 2500 },
    "Architecture Design Only": { Standard: 60, Premium: 100, Luxury: 150 },
  };

  useEffect(() => {
    let baseRate = rates[serviceScope][quality];

    if (projectType === "Commercial" && serviceScope !== "Architecture Design Only") {
      baseRate = baseRate * 1.1; 
    }

    const total = baseRate * area;
    setTotalCost(total);

    if (serviceScope === "Architecture Design Only") {
      setBreakdown({ material: 0, labor: 0, design: total });
    } else {
      setBreakdown({
        material: total * 0.60,
        labor: total * 0.30,
        design: total * 0.10,
      });
    }
  }, [area, projectType, serviceScope, quality]);

  const formatINR = (number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(number);
  };

  // ================= PDF & SANITY LOGIC =================
  const handleDownloadSubmit = async (e) => {
    e.preventDefault();
    setIsDownloading(true);

    try {
      // 1. Try to save Data to Sanity
      try {
        await fetch('/api/save-estimate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: leadData.name,
            contact: leadData.contact,
            projectType,
            serviceScope,
            quality,
            area,
            totalCost
          })
        });
        console.log("Lead Saved to Sanity!");
      } catch (sanityError) {
        // Agar Sanity fail bhi ho jaye, toh client ko PDF milni chahiye (Client experience kharab nahi hoga)
        console.warn("Sanity Error (Ignored for PDF):", sanityError);
      }

      // 2. Generate Professional PDF (Bypassing lab() error by using hex codes)
      const element = document.getElementById('pdf-quote-template');
      
      // Temporary unhide for capture
      element.style.display = 'block';
      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: '#FFFFFF'
      });
      element.style.display = 'none';

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`S2_Studio_Estimate_${leadData.name.replace(/\s+/g, '_')}.pdf`);

      // 3. Reset and Close
      setIsDownloading(false);
      setIsModalOpen(false);
      setLeadData({ name: '', contact: '' });
      
    } catch (error) {
      console.error("PDF Generation Error:", error);
      setIsDownloading(false);
      alert("Something went wrong while generating PDF. Please try again.");
    }
  };

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#121212] min-h-screen pt-32 pb-24 transition-colors duration-700 relative">
      
      {/* ================= HIDDEN PDF TEMPLATE ================= */}
      {/* Notice: We are using strict HEX codes [#...] here to prevent the html2canvas lab() crash */}
      <div className="absolute -left-[9999px] top-0 opacity-0 pointer-events-none">
        <div id="pdf-quote-template" className="bg-[#FFFFFF] text-[#111827] w-[800px] p-16 font-sans hidden">
          
          {/* Header */}
          <div className="border-b-2 border-[#C5A059] pb-6 mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-serif tracking-widest font-bold">S<span className="text-[#C5A059] text-2xl align-super">2</span> STUDIO</h1>
              <p className="text-[#6B7280] tracking-[0.2em] text-xs mt-2 uppercase">Architecture • Interiors • Construction</p>
            </div>
            <div className="text-right text-xs text-[#6B7280] space-y-1">
              <p>Satna, Madhya Pradesh, India</p>
              <p>s2studio.03@gmail.com</p>
              <p>+91 95893 03667</p>
            </div>
          </div>

          {/* Client Details */}
          <div className="mb-10 bg-[#F9FAFB] p-6 border border-[#E5E7EB]">
            <p className="text-[#9CA3AF] uppercase tracking-widest text-[10px] font-bold mb-2">Quotation Prepared For:</p>
            <h2 className="text-2xl font-serif font-bold text-[#111827]">{leadData.name || 'Valued Client'}</h2>
            <p className="text-sm text-[#4B5563] mt-1">{leadData.contact || 'N/A'}</p>
            <p className="text-xs text-[#6B7280] mt-4 font-bold">Date: {new Date().toLocaleDateString('en-IN')}</p>
          </div>

          {/* Project Details */}
          <h3 className="text-[#C5A059] uppercase tracking-widest text-sm font-bold mb-4">Project Specifications</h3>
          <div className="grid grid-cols-2 gap-4 mb-10 text-sm">
            <div className="border border-[#E5E7EB] p-4"><span className="text-[#6B7280] block text-xs uppercase mb-1">Property Type</span> <strong className="text-lg">{projectType}</strong></div>
            <div className="border border-[#E5E7EB] p-4"><span className="text-[#6B7280] block text-xs uppercase mb-1">Scope of Work</span> <strong className="text-lg">{serviceScope}</strong></div>
            <div className="border border-[#E5E7EB] p-4"><span className="text-[#6B7280] block text-xs uppercase mb-1">Finish Quality</span> <strong className="text-lg">{quality}</strong></div>
            <div className="border border-[#E5E7EB] p-4"><span className="text-[#6B7280] block text-xs uppercase mb-1">Built-up Area</span> <strong className="text-lg">{area} Sq. Ft.</strong></div>
          </div>

          {/* Cost Summary */}
          <h3 className="text-[#C5A059] uppercase tracking-widest text-sm font-bold mb-4">Cost Estimation</h3>
          <div className="bg-[#111827] text-[#FFFFFF] p-8 mb-10">
            <p className="text-[#9CA3AF] uppercase tracking-widest text-xs mb-2">Total Estimated Investment</p>
            <h2 className="text-5xl font-serif">{formatINR(totalCost)}</h2>
            <p className="text-[#9CA3AF] text-sm italic mt-2">Approx. {formatINR(totalCost / area)} per sq.ft</p>
          </div>

          {/* Breakdown */}
          <h3 className="text-[#C5A059] uppercase tracking-widest text-sm font-bold mb-4">Investment Breakdown</h3>
          <table className="w-full text-left text-sm border-collapse mb-12">
            <tbody>
              <tr className="border-b border-[#E5E7EB]"><td className="py-3 text-[#4B5563]">Premium Materials (60%)</td><td className="py-3 text-right font-bold">{formatINR(breakdown.material)}</td></tr>
              <tr className="border-b border-[#E5E7EB]"><td className="py-3 text-[#4B5563]">Labor & Execution (30%)</td><td className="py-3 text-right font-bold">{formatINR(breakdown.labor)}</td></tr>
              <tr className="border-b border-[#E5E7EB]"><td className="py-3 text-[#4B5563]">Design & Management (10%)</td><td className="py-3 text-right font-bold">{formatINR(breakdown.design)}</td></tr>
            </tbody>
          </table>

          {/* Footer */}
          <div className="text-[10px] text-[#9CA3AF] text-justify leading-relaxed border-t border-[#E5E7EB] pt-6">
            <strong>Disclaimer:</strong> This is a preliminary system-generated estimate based on current market rates. Final pricing is subject to detailed architectural drawings, site conditions, and specific material selections. This document does not serve as a legal binding contract.
          </div>
          <div className="text-center mt-12 text-[#C5A059] text-xs font-bold tracking-widest uppercase">
            Designed & Estimated by S² Studio
          </div>
        </div>
      </div>
      {/* ========================================================================================= */}


      {/* ================= MODAL POPUP FOR LEADS ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-[#1A1A1A] w-full max-w-md p-8 md:p-10 shadow-2xl relative rounded-sm border border-[#C5A059]/20"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                ✕
              </button>

              <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-2">Download Estimate</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                Please enter your details to download your customized PDF quotation.
              </p>

              <form onSubmit={handleDownloadSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 mb-2 uppercase font-bold">Full Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    value={leadData.name}
                    onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                    className="w-full border-b border-gray-300 dark:border-gray-700 py-2 focus:outline-none focus:border-[#C5A059] bg-transparent text-gray-900 dark:text-white" 
                    placeholder="Enter your name" 
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 mb-2 uppercase font-bold">Phone Number or Email <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    value={leadData.contact}
                    onChange={(e) => setLeadData({...leadData, contact: e.target.value})}
                    className="w-full border-b border-gray-300 dark:border-gray-700 py-2 focus:outline-none focus:border-[#C5A059] bg-transparent text-gray-900 dark:text-white" 
                    placeholder="Enter phone or email" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isDownloading}
                  className="w-full bg-gray-900 dark:bg-[#C5A059] text-white py-4 tracking-[0.2em] text-xs font-bold uppercase hover:bg-[#C5A059] dark:hover:bg-white dark:hover:text-gray-900 transition-colors disabled:opacity-70 flex justify-center items-center gap-2 mt-4"
                >
                  {isDownloading ? (
                    <>Generating PDF <span className="animate-pulse">...</span></>
                  ) : (
                    "Download PDF Quote"
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ======================================================= */}

      <ScrollWrapper className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Transparent Pricing</h2>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-6 transition-colors duration-700">Project Cost Estimator</h1>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-8"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-700">
            Get an instant, data-driven estimate for your dream project based on current Indian market rates. No hidden fees, just pure transparency.
          </p>
        </div>

        {/* Calculator Container */}
        <div className="flex flex-col lg:flex-row gap-12 shadow-2xl dark:shadow-[#C5A059]/10 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-gray-800 rounded-sm overflow-hidden transition-colors duration-700">
          
          {/* LEFT SIDE: Inputs & Controls */}
          <div className="w-full lg:w-1/2 p-8 md:p-12">
            <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4 transition-colors duration-700">Project Details</h3>
            
            {/* 1. Project Type */}
            <div className="mb-8">
              <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 mb-4 uppercase font-bold transition-colors">Property Type</label>
              <div className="flex gap-4">
                {["Residential", "Commercial"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setProjectType(type)}
                    className={`flex-1 py-3 text-sm tracking-widest uppercase font-bold transition-all duration-300 border ${
                      projectType === type 
                        ? 'bg-gray-900 dark:bg-[#C5A059] text-white border-gray-900 dark:border-[#C5A059]' 
                        : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-[#C5A059]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Service Scope */}
            <div className="mb-8">
              <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 mb-4 uppercase font-bold transition-colors">Scope of Work</label>
              <select 
                value={serviceScope}
                onChange={(e) => setServiceScope(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 py-3 px-4 focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] text-gray-700 dark:text-gray-200 bg-transparent transition-colors duration-300"
              >
                <option value="Turnkey Construction" className="dark:bg-[#1A1A1A]">Turnkey Construction (End-to-End)</option>
                <option value="Interior Design Only" className="dark:bg-[#1A1A1A]">Interior Design & Fit-outs</option>
                <option value="Architecture Design Only" className="dark:bg-[#1A1A1A]">Architecture Plans & 3D Only</option>
              </select>
            </div>

            {/* 3. Quality Standard */}
            <div className="mb-8">
              <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 mb-4 uppercase font-bold transition-colors">Finish Quality</label>
              <div className="grid grid-cols-3 gap-2">
                {["Standard", "Premium", "Luxury"].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setQuality(lvl)}
                    className={`py-3 text-[10px] sm:text-xs tracking-widest uppercase font-bold transition-all duration-300 border ${
                      quality === lvl 
                        ? 'bg-[#C5A059] text-white border-[#C5A059]' 
                        : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:border-[#C5A059] dark:hover:border-[#C5A059]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 italic">* Standard (Basic), Premium (Branded), Luxury (Imported)</p>
            </div>

            {/* 4. Area Slider */}
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 uppercase font-bold transition-colors">Built-up Area</label>
                <span className="text-[#C5A059] font-bold">{area} Sq. Ft.</span>
              </div>
              <input 
                type="range" 
                min="500" 
                max="10000" 
                step="100" 
                value={area} 
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full accent-[#C5A059] h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer transition-colors"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>500 sq.ft</span>
                <span>10,000+ sq.ft</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: The Live Estimate */}
          <div className="w-full lg:w-1/2 bg-gray-900 dark:bg-[#0A0A0A] text-[#F3F2EC] p-8 md:p-12 relative overflow-hidden transition-colors duration-700 flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 3.83L18.17 19H5.83L12 5.83z"/></svg>
            </div>
            
            <div>
              <h3 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-4 uppercase relative z-10">Estimated Investment</h3>
              
              <div className="mb-10 relative z-10">
                <motion.h2 
                  key={totalCost}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl md:text-6xl font-serif text-white mb-2 tracking-tight"
                >
                  {formatINR(totalCost)}
                </motion.h2>
                <p className="text-gray-400 text-sm italic">
                  Approx. {formatINR(totalCost / area)} per sq.ft
                </p>
              </div>

              <div className="space-y-6 mb-12 relative z-10">
                <h4 className="text-sm uppercase tracking-widest border-b border-gray-700 pb-2">Cost Breakdown</h4>
                
                <div>
                  <div className="flex justify-between text-xs mb-1 text-gray-300">
                    <span>Materials (60%)</span>
                    <span>{formatINR(breakdown.material)}</span>
                  </div>
                  <div className="w-full bg-gray-800 dark:bg-gray-800/50 h-2 rounded overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} transition={{ duration: 1 }} className="bg-[#C5A059] h-full"></motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 text-gray-300">
                    <span>Labor & Execution (30%)</span>
                    <span>{formatINR(breakdown.labor)}</span>
                  </div>
                  <div className="w-full bg-gray-800 dark:bg-gray-800/50 h-2 rounded overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '30%' }} transition={{ duration: 1, delay: 0.2 }} className="bg-gray-400 h-full"></motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 text-gray-300">
                    <span>Design & Management (10%)</span>
                    <span>{formatINR(breakdown.design)}</span>
                  </div>
                  <div className="w-full bg-gray-800 dark:bg-gray-800/50 h-2 rounded overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '10%' }} transition={{ duration: 1, delay: 0.4 }} className="bg-white h-full"></motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="relative z-10 mt-4 space-y-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="block text-center border-2 border-white text-white px-8 py-4 tracking-[0.2em] text-sm font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 w-full uppercase"
              >
                Download PDF Quote
              </button>
              <Link 
                href="/contact"
                className="block text-center bg-[#C5A059] text-white px-8 py-4 tracking-[0.2em] text-sm font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 w-full uppercase"
              >
                Discuss This Estimate
              </Link>
            </div>

          </div>
        </div>

      </ScrollWrapper>
    </div>
  );
}






// "use client";

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
//  import ScrollWrapper from '@/components/ScrollWrapper';

// export default function CostEstimatorPage() {
//   const [area, setArea] = useState(1000);
//   const [projectType, setProjectType] = useState("Residential");
//   const [serviceScope, setServiceScope] = useState("Turnkey Construction");
//   const [quality, setQuality] = useState("Premium");

//   const [totalCost, setTotalCost] = useState(0);
//   const [breakdown, setBreakdown] = useState({ material: 0, labor: 0, design: 0 });

//   const rates = {
//     "Turnkey Construction": { Standard: 1500, Premium: 2200, Luxury: 3200 },
//     "Interior Design Only": { Standard: 800, Premium: 1400, Luxury: 2500 },
//     "Architecture Design Only": { Standard: 60, Premium: 100, Luxury: 150 },
//   };

//   useEffect(() => {
//     let baseRate = rates[serviceScope][quality];

//     if (projectType === "Commercial" && serviceScope !== "Architecture Design Only") {
//       baseRate = baseRate * 1.1; 
//     }

//     const total = baseRate * area;
//     setTotalCost(total);

//     if (serviceScope === "Architecture Design Only") {
//       setBreakdown({ material: 0, labor: 0, design: total });
//     } else {
//       setBreakdown({
//         material: total * 0.60,
//         labor: total * 0.30,
//         design: total * 0.10,
//       });
//     }
//   }, [area, projectType, serviceScope, quality]);

//   const formatINR = (number) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0,
//     }).format(number);
//   };

//   return (
//     <div className="bg-[#FAFAFA] dark:bg-[#121212] min-h-screen pt-32 pb-24 transition-colors duration-700">
//       <ScrollWrapper className="max-w-7xl mx-auto px-6 md:px-12">
        
//         {/* Page Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Transparent Pricing</h2>
//           <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-6 transition-colors duration-700">Project Cost Estimator</h1>
//           <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-8"></div>
//           <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-700">
//             Get an instant, data-driven estimate for your dream project based on current Indian market rates. No hidden fees, just pure transparency.
//           </p>
//         </div>

//         {/* Calculator Container */}
//         <div className="flex flex-col lg:flex-row gap-12 shadow-2xl dark:shadow-[#C5A059]/10 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-gray-800 rounded-sm overflow-hidden transition-colors duration-700">
          
//           {/* LEFT SIDE: Inputs & Controls */}
//           <div className="w-full lg:w-1/2 p-8 md:p-12">
//             <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4 transition-colors duration-700">Project Details</h3>
            
//             {/* 1. Project Type */}
//             <div className="mb-8">
//               <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 mb-4 uppercase font-bold transition-colors">Property Type</label>
//               <div className="flex gap-4">
//                 {["Residential", "Commercial"].map((type) => (
//                   <button
//                     key={type}
//                     onClick={() => setProjectType(type)}
//                     className={`flex-1 py-3 text-sm tracking-widest uppercase font-bold transition-all duration-300 border ${
//                       projectType === type 
//                         ? 'bg-gray-900 dark:bg-[#C5A059] text-white border-gray-900 dark:border-[#C5A059]' 
//                         : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-[#C5A059]'
//                     }`}
//                   >
//                     {type}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* 2. Service Scope */}
//             <div className="mb-8">
//               <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 mb-4 uppercase font-bold transition-colors">Scope of Work</label>
//               <select 
//                 value={serviceScope}
//                 onChange={(e) => setServiceScope(e.target.value)}
//                 className="w-full border border-gray-300 dark:border-gray-700 py-3 px-4 focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] text-gray-700 dark:text-gray-200 bg-transparent transition-colors duration-300"
//               >
//                 <option value="Turnkey Construction" className="dark:bg-[#1A1A1A]">Turnkey Construction (End-to-End)</option>
//                 <option value="Interior Design Only" className="dark:bg-[#1A1A1A]">Interior Design & Fit-outs</option>
//                 <option value="Architecture Design Only" className="dark:bg-[#1A1A1A]">Architecture Plans & 3D Only</option>
//               </select>
//             </div>

//             {/* 3. Quality Standard */}
//             <div className="mb-8">
//               <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 mb-4 uppercase font-bold transition-colors">Finish Quality</label>
//               <div className="grid grid-cols-3 gap-2">
//                 {["Standard", "Premium", "Luxury"].map((lvl) => (
//                   <button
//                     key={lvl}
//                     onClick={() => setQuality(lvl)}
//                     className={`py-3 text-[10px] sm:text-xs tracking-widest uppercase font-bold transition-all duration-300 border ${
//                       quality === lvl 
//                         ? 'bg-[#C5A059] text-white border-[#C5A059]' 
//                         : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:border-[#C5A059] dark:hover:border-[#C5A059]'
//                     }`}
//                   >
//                     {lvl}
//                   </button>
//                 ))}
//               </div>
//               <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 italic">* Standard (Basic), Premium (Branded), Luxury (Imported)</p>
//             </div>

//             {/* 4. Area Slider */}
//             <div className="mb-8">
//               <div className="flex justify-between mb-4">
//                 <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 uppercase font-bold transition-colors">Built-up Area</label>
//                 <span className="text-[#C5A059] font-bold">{area} Sq. Ft.</span>
//               </div>
//               <input 
//                 type="range" 
//                 min="500" 
//                 max="10000" 
//                 step="100" 
//                 value={area} 
//                 onChange={(e) => setArea(Number(e.target.value))}
//                 className="w-full accent-[#C5A059] h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer transition-colors"
//               />
//               <div className="flex justify-between text-xs text-gray-400 mt-2">
//                 <span>500 sq.ft</span>
//                 <span>10,000+ sq.ft</span>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE: The Live Estimate */}
//           <div className="w-full lg:w-1/2 bg-gray-900 dark:bg-[#0A0A0A] text-[#F3F2EC] p-8 md:p-12 relative overflow-hidden transition-colors duration-700">
//             <div className="absolute top-0 right-0 p-8 opacity-10">
//               <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 3.83L18.17 19H5.83L12 5.83z"/></svg>
//             </div>
            
//             <h3 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-4 uppercase relative z-10">Estimated Investment</h3>
            
//             {/* Massive Number Display (ANIMATED) */}
//             <div className="mb-10 relative z-10">
//               <motion.h2 
//                 key={totalCost} // Har baar cost change hone par animation trigger hoga
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3 }}
//                 className="text-5xl md:text-6xl font-serif text-white mb-2 tracking-tight"
//               >
//                 {formatINR(totalCost)}
//               </motion.h2>
//               <p className="text-gray-400 text-sm italic">
//                 Approx. {formatINR(totalCost / area)} per sq.ft
//               </p>
//             </div>

//             {/* Visual Breakdown */}
//             <div className="space-y-6 mb-12 relative z-10">
//               <h4 className="text-sm uppercase tracking-widest border-b border-gray-700 pb-2">Cost Breakdown</h4>
              
//               <div>
//                 <div className="flex justify-between text-xs mb-1 text-gray-300">
//                   <span>Materials (60%)</span>
//                   <span>{formatINR(breakdown.material)}</span>
//                 </div>
//                 <div className="w-full bg-gray-800 dark:bg-gray-800/50 h-2 rounded overflow-hidden">
//                   <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} transition={{ duration: 1 }} className="bg-[#C5A059] h-full"></motion.div>
//                 </div>
//               </div>

//               <div>
//                 <div className="flex justify-between text-xs mb-1 text-gray-300">
//                   <span>Labor & Execution (30%)</span>
//                   <span>{formatINR(breakdown.labor)}</span>
//                 </div>
//                 <div className="w-full bg-gray-800 dark:bg-gray-800/50 h-2 rounded overflow-hidden">
//                   <motion.div initial={{ width: 0 }} animate={{ width: '30%' }} transition={{ duration: 1, delay: 0.2 }} className="bg-gray-400 h-full"></motion.div>
//                 </div>
//               </div>

//               <div>
//                 <div className="flex justify-between text-xs mb-1 text-gray-300">
//                   <span>Design & Management (10%)</span>
//                   <span>{formatINR(breakdown.design)}</span>
//                 </div>
//                 <div className="w-full bg-gray-800 dark:bg-gray-800/50 h-2 rounded overflow-hidden">
//                   <motion.div initial={{ width: 0 }} animate={{ width: '10%' }} transition={{ duration: 1, delay: 0.4 }} className="bg-white h-full"></motion.div>
//                 </div>
//               </div>
//             </div>

//             {/* Disclaimer & CTA */}
//             <div className="bg-black/30 p-6 rounded-sm border border-gray-800 mb-8 relative z-10">
//               <p className="text-xs text-gray-400 leading-relaxed text-justify">
//                 <strong className="text-[#C5A059]">Disclaimer:</strong> This is a rough baseline estimate based on current market rates in Madhya Pradesh & Central India. Final costs may vary depending on specific site conditions, chosen brands, and structural complexities.
//               </p>
//             </div>

//             <Link 
//               href="/contact"
//               className="block text-center bg-white text-gray-900 px-8 py-4 tracking-[0.2em] text-sm font-bold hover:bg-[#C5A059] hover:text-white transition-all duration-300 w-full uppercase relative z-10"
//             >
//               Discuss This Estimate With Us
//             </Link>

//           </div>
//         </div>

//       </ScrollWrapper>
//     </div>
//   );
// }







// "use client";

// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// export default function CostEstimatorPage() {
//   // States for Calculator
//   const [area, setArea] = useState(1000);
//   const [projectType, setProjectType] = useState("Residential");
//   const [serviceScope, setServiceScope] = useState("Turnkey Construction");
//   const [quality, setQuality] = useState("Premium");

//   // Output States
//   const [totalCost, setTotalCost] = useState(0);
//   const [breakdown, setBreakdown] = useState({ material: 0, labor: 0, design: 0 });

//   // Indian Market Base Rates (Per Sq. Ft.)
//   const rates = {
//     "Turnkey Construction": { Standard: 1500, Premium: 2200, Luxury: 3200 },
//     "Interior Design Only": { Standard: 800, Premium: 1400, Luxury: 2500 },
//     "Architecture Design Only": { Standard: 60, Premium: 100, Luxury: 150 },
//   };

//   // Calculate whenever inputs change
//   useEffect(() => {
//     // 1. Get Base Rate
//     let baseRate = rates[serviceScope][quality];

//     // 2. Add Commercial Premium if applicable (+10% for commercial structural needs)
//     if (projectType === "Commercial" && serviceScope !== "Architecture Design Only") {
//       baseRate = baseRate * 1.1; 
//     }

//     // 3. Total Calculation
//     const total = baseRate * area;
//     setTotalCost(total);

//     // 4. Breakdown Logic (Realistic Industry Standards)
//     if (serviceScope === "Architecture Design Only") {
//       setBreakdown({
//         material: 0,
//         labor: 0,
//         design: total,
//       });
//     } else {
//       setBreakdown({
//         material: total * 0.60, // 60% Material
//         labor: total * 0.30,    // 30% Labor & Execution
//         design: total * 0.10,   // 10% Design & Management
//       });
//     }
//   }, [area, projectType, serviceScope, quality]);

//   // Format Number to Indian Rupee (INR)
//   const formatINR = (number) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0,
//     }).format(number);
//   };

//   return (
//     <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24">
//       <div className="max-w-7xl mx-auto px-6 md:px-12">
        
//         {/* Page Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Transparent Pricing</h2>
//           <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Project Cost Estimator</h1>
//           <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-8"></div>
//           <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
//             Get an instant, data-driven estimate for your dream project based on current Indian market rates. No hidden fees, just pure transparency.
//           </p>
//         </div>

//         {/* Calculator Container */}
//         <div className="flex flex-col lg:flex-row gap-12 shadow-2xl bg-white border border-gray-100">
          
//           {/* LEFT SIDE: Inputs & Controls */}
//           <div className="w-full lg:w-1/2 p-8 md:p-12">
//             <h3 className="text-2xl font-serif text-gray-900 mb-8 border-b pb-4">Project Details</h3>
            
//             {/* 1. Project Type */}
//             <div className="mb-8">
//               <label className="block text-xs tracking-widest text-gray-900 mb-4 uppercase font-bold">Property Type</label>
//               <div className="flex gap-4">
//                 {["Residential", "Commercial"].map((type) => (
//                   <button
//                     key={type}
//                     onClick={() => setProjectType(type)}
//                     className={`flex-1 py-3 text-sm tracking-widest uppercase font-bold transition-all duration-300 border ${
//                       projectType === type ? 'bg-gray-900 text-white border-gray-900' : 'bg-transparent text-gray-500 border-gray-300 hover:border-gray-900'
//                     }`}
//                   >
//                     {type}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* 2. Service Scope */}
//             <div className="mb-8">
//               <label className="block text-xs tracking-widest text-gray-900 mb-4 uppercase font-bold">Scope of Work</label>
//               <select 
//                 value={serviceScope}
//                 onChange={(e) => setServiceScope(e.target.value)}
//                 className="w-full border border-gray-300 py-3 px-4 focus:outline-none focus:border-[#C5A059] text-gray-700 bg-transparent"
//               >
//                 <option value="Turnkey Construction">Turnkey Construction (End-to-End)</option>
//                 <option value="Interior Design Only">Interior Design & Fit-outs</option>
//                 <option value="Architecture Design Only">Architecture Plans & 3D Only</option>
//               </select>
//             </div>

//             {/* 3. Quality Standard */}
//             <div className="mb-8">
//               <label className="block text-xs tracking-widest text-gray-900 mb-4 uppercase font-bold">Finish Quality</label>
//               <div className="grid grid-cols-3 gap-2">
//                 {["Standard", "Premium", "Luxury"].map((lvl) => (
//                   <button
//                     key={lvl}
//                     onClick={() => setQuality(lvl)}
//                     className={`py-3 text-xs tracking-widest uppercase font-bold transition-all duration-300 border ${
//                       quality === lvl ? 'bg-[#C5A059] text-white border-[#C5A059]' : 'bg-transparent text-gray-500 border-gray-300 hover:border-[#C5A059]'
//                     }`}
//                   >
//                     {lvl}
//                   </button>
//                 ))}
//               </div>
//               <p className="text-[10px] text-gray-400 mt-2 italic">* Standard (Basic Materials), Premium (Branded/High-End), Luxury (Imported/Bespoke)</p>
//             </div>

//             {/* 4. Area Slider */}
//             <div className="mb-8">
//               <div className="flex justify-between mb-4">
//                 <label className="block text-xs tracking-widest text-gray-900 uppercase font-bold">Built-up Area</label>
//                 <span className="text-[#C5A059] font-bold">{area} Sq. Ft.</span>
//               </div>
//               <input 
//                 type="range" 
//                 min="500" 
//                 max="10000" 
//                 step="100" 
//                 value={area} 
//                 onChange={(e) => setArea(Number(e.target.value))}
//                 className="w-full accent-[#C5A059] h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//               />
//               <div className="flex justify-between text-xs text-gray-400 mt-2">
//                 <span>500 sq.ft</span>
//                 <span>10,000+ sq.ft</span>
//               </div>
//             </div>

//           </div>

//           {/* RIGHT SIDE: The Live Estimate (Dark Luxury UI) */}
//           <div className="w-full lg:w-1/2 bg-gray-900 text-[#F3F2EC] p-8 md:p-12 relative overflow-hidden">
//             <div className="absolute top-0 right-0 p-8 opacity-10">
//               <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 3.83L18.17 19H5.83L12 5.83z"/></svg>
//             </div>
            
//             <h3 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-4 uppercase">Estimated Investment</h3>
            
//             {/* Massive Number Display */}
//             <div className="mb-10">
//               <h2 className="text-5xl md:text-6xl font-serif text-white mb-2 tracking-tight transition-all duration-500">
//                 {formatINR(totalCost)}
//               </h2>
//               <p className="text-gray-400 text-sm italic">
//                 Approx. {formatINR(totalCost / area)} per sq.ft
//               </p>
//             </div>

//             {/* Visual Breakdown */}
//             <div className="space-y-6 mb-12">
//               <h4 className="text-sm uppercase tracking-widest border-b border-gray-700 pb-2">Cost Breakdown</h4>
              
//               {/* Material Bar */}
//               <div>
//                 <div className="flex justify-between text-xs mb-1 text-gray-300">
//                   <span>Materials (60%)</span>
//                   <span>{formatINR(breakdown.material)}</span>
//                 </div>
//                 <div className="w-full bg-gray-800 h-2 rounded overflow-hidden">
//                   <div className="bg-[#C5A059] h-full" style={{ width: '60%' }}></div>
//                 </div>
//               </div>

//               {/* Labor Bar */}
//               <div>
//                 <div className="flex justify-between text-xs mb-1 text-gray-300">
//                   <span>Labor & Execution (30%)</span>
//                   <span>{formatINR(breakdown.labor)}</span>
//                 </div>
//                 <div className="w-full bg-gray-800 h-2 rounded overflow-hidden">
//                   <div className="bg-gray-400 h-full" style={{ width: '30%' }}></div>
//                 </div>
//               </div>

//               {/* Design Bar */}
//               <div>
//                 <div className="flex justify-between text-xs mb-1 text-gray-300">
//                   <span>Design & Management (10%)</span>
//                   <span>{formatINR(breakdown.design)}</span>
//                 </div>
//                 <div className="w-full bg-gray-800 h-2 rounded overflow-hidden">
//                   <div className="bg-white h-full" style={{ width: '10%' }}></div>
//                 </div>
//               </div>
//             </div>

//             {/* Disclaimer & CTA */}
//             <div className="bg-black/30 p-6 rounded-sm border border-gray-800 mb-8">
//               <p className="text-xs text-gray-400 leading-relaxed text-justify">
//                 <strong className="text-[#C5A059]">Disclaimer:</strong> This is a rough baseline estimate based on current market rates in Madhya Pradesh & Central India. Final costs may vary depending on specific site conditions, chosen brands, and structural complexities.
//               </p>
//             </div>

//             <Link 
//               href="/contact"
//               className="block text-center bg-white text-gray-900 px-8 py-4 tracking-[0.2em] text-sm font-bold hover:bg-[#C5A059] hover:text-white transition-all duration-300 w-full uppercase"
//             >
//               Discuss This Estimate With Us
//             </Link>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }