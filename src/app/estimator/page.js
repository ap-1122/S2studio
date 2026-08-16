"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CostEstimatorPage() {
  // States for Calculator
  const [area, setArea] = useState(1000);
  const [projectType, setProjectType] = useState("Residential");
  const [serviceScope, setServiceScope] = useState("Turnkey Construction");
  const [quality, setQuality] = useState("Premium");

  // Output States
  const [totalCost, setTotalCost] = useState(0);
  const [breakdown, setBreakdown] = useState({ material: 0, labor: 0, design: 0 });

  // Indian Market Base Rates (Per Sq. Ft.)
  const rates = {
    "Turnkey Construction": { Standard: 1500, Premium: 2200, Luxury: 3200 },
    "Interior Design Only": { Standard: 800, Premium: 1400, Luxury: 2500 },
    "Architecture Design Only": { Standard: 60, Premium: 100, Luxury: 150 },
  };

  // Calculate whenever inputs change
  useEffect(() => {
    // 1. Get Base Rate
    let baseRate = rates[serviceScope][quality];

    // 2. Add Commercial Premium if applicable (+10% for commercial structural needs)
    if (projectType === "Commercial" && serviceScope !== "Architecture Design Only") {
      baseRate = baseRate * 1.1; 
    }

    // 3. Total Calculation
    const total = baseRate * area;
    setTotalCost(total);

    // 4. Breakdown Logic (Realistic Industry Standards)
    if (serviceScope === "Architecture Design Only") {
      setBreakdown({
        material: 0,
        labor: 0,
        design: total,
      });
    } else {
      setBreakdown({
        material: total * 0.60, // 60% Material
        labor: total * 0.30,    // 30% Labor & Execution
        design: total * 0.10,   // 10% Design & Management
      });
    }
  }, [area, projectType, serviceScope, quality]);

  // Format Number to Indian Rupee (INR)
  const formatINR = (number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Transparent Pricing</h2>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Project Cost Estimator</h1>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get an instant, data-driven estimate for your dream project based on current Indian market rates. No hidden fees, just pure transparency.
          </p>
        </div>

        {/* Calculator Container */}
        <div className="flex flex-col lg:flex-row gap-12 shadow-2xl bg-white border border-gray-100">
          
          {/* LEFT SIDE: Inputs & Controls */}
          <div className="w-full lg:w-1/2 p-8 md:p-12">
            <h3 className="text-2xl font-serif text-gray-900 mb-8 border-b pb-4">Project Details</h3>
            
            {/* 1. Project Type */}
            <div className="mb-8">
              <label className="block text-xs tracking-widest text-gray-900 mb-4 uppercase font-bold">Property Type</label>
              <div className="flex gap-4">
                {["Residential", "Commercial"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setProjectType(type)}
                    className={`flex-1 py-3 text-sm tracking-widest uppercase font-bold transition-all duration-300 border ${
                      projectType === type ? 'bg-gray-900 text-white border-gray-900' : 'bg-transparent text-gray-500 border-gray-300 hover:border-gray-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Service Scope */}
            <div className="mb-8">
              <label className="block text-xs tracking-widest text-gray-900 mb-4 uppercase font-bold">Scope of Work</label>
              <select 
                value={serviceScope}
                onChange={(e) => setServiceScope(e.target.value)}
                className="w-full border border-gray-300 py-3 px-4 focus:outline-none focus:border-[#C5A059] text-gray-700 bg-transparent"
              >
                <option value="Turnkey Construction">Turnkey Construction (End-to-End)</option>
                <option value="Interior Design Only">Interior Design & Fit-outs</option>
                <option value="Architecture Design Only">Architecture Plans & 3D Only</option>
              </select>
            </div>

            {/* 3. Quality Standard */}
            <div className="mb-8">
              <label className="block text-xs tracking-widest text-gray-900 mb-4 uppercase font-bold">Finish Quality</label>
              <div className="grid grid-cols-3 gap-2">
                {["Standard", "Premium", "Luxury"].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setQuality(lvl)}
                    className={`py-3 text-xs tracking-widest uppercase font-bold transition-all duration-300 border ${
                      quality === lvl ? 'bg-[#C5A059] text-white border-[#C5A059]' : 'bg-transparent text-gray-500 border-gray-300 hover:border-[#C5A059]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-2 italic">* Standard (Basic Materials), Premium (Branded/High-End), Luxury (Imported/Bespoke)</p>
            </div>

            {/* 4. Area Slider */}
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                <label className="block text-xs tracking-widest text-gray-900 uppercase font-bold">Built-up Area</label>
                <span className="text-[#C5A059] font-bold">{area} Sq. Ft.</span>
              </div>
              <input 
                type="range" 
                min="500" 
                max="10000" 
                step="100" 
                value={area} 
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full accent-[#C5A059] h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>500 sq.ft</span>
                <span>10,000+ sq.ft</span>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: The Live Estimate (Dark Luxury UI) */}
          <div className="w-full lg:w-1/2 bg-gray-900 text-[#F3F2EC] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 3.83L18.17 19H5.83L12 5.83z"/></svg>
            </div>
            
            <h3 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-4 uppercase">Estimated Investment</h3>
            
            {/* Massive Number Display */}
            <div className="mb-10">
              <h2 className="text-5xl md:text-6xl font-serif text-white mb-2 tracking-tight transition-all duration-500">
                {formatINR(totalCost)}
              </h2>
              <p className="text-gray-400 text-sm italic">
                Approx. {formatINR(totalCost / area)} per sq.ft
              </p>
            </div>

            {/* Visual Breakdown */}
            <div className="space-y-6 mb-12">
              <h4 className="text-sm uppercase tracking-widest border-b border-gray-700 pb-2">Cost Breakdown</h4>
              
              {/* Material Bar */}
              <div>
                <div className="flex justify-between text-xs mb-1 text-gray-300">
                  <span>Materials (60%)</span>
                  <span>{formatINR(breakdown.material)}</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded overflow-hidden">
                  <div className="bg-[#C5A059] h-full" style={{ width: '60%' }}></div>
                </div>
              </div>

              {/* Labor Bar */}
              <div>
                <div className="flex justify-between text-xs mb-1 text-gray-300">
                  <span>Labor & Execution (30%)</span>
                  <span>{formatINR(breakdown.labor)}</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded overflow-hidden">
                  <div className="bg-gray-400 h-full" style={{ width: '30%' }}></div>
                </div>
              </div>

              {/* Design Bar */}
              <div>
                <div className="flex justify-between text-xs mb-1 text-gray-300">
                  <span>Design & Management (10%)</span>
                  <span>{formatINR(breakdown.design)}</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded overflow-hidden">
                  <div className="bg-white h-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>

            {/* Disclaimer & CTA */}
            <div className="bg-black/30 p-6 rounded-sm border border-gray-800 mb-8">
              <p className="text-xs text-gray-400 leading-relaxed text-justify">
                <strong className="text-[#C5A059]">Disclaimer:</strong> This is a rough baseline estimate based on current market rates in Madhya Pradesh & Central India. Final costs may vary depending on specific site conditions, chosen brands, and structural complexities.
              </p>
            </div>

            <Link 
              href="/contact"
              className="block text-center bg-white text-gray-900 px-8 py-4 tracking-[0.2em] text-sm font-bold hover:bg-[#C5A059] hover:text-white transition-all duration-300 w-full uppercase"
            >
              Discuss This Estimate With Us
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}