import Link from 'next/link';

export default function ProcessPage() {
  const steps = [
    {
      number: "01",
      title: "Consultation & Briefing",
      desc: "Every masterpiece begins with a conversation. We sit down with you to understand your vision, lifestyle requirements, budget, and the raw potential of your plot.",
      img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
    },
    {
      number: "02",
      title: "Architectural Drafting & Layout",
      desc: "Our architects draft the initial 2D floor plans, ensuring optimal space utilization, Vastu compliance (if required), and seamless flow between indoor and outdoor spaces.",
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80"
    },
    {
      number: "03",
      title: "3D Elevation & Virtual Walkthrough",
      desc: "Before a single brick is laid, we bring your project to life using ultra-realistic 3D rendering. You will see exactly how your building's exterior and interiors will look.",
      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80"
    },
    {
      number: "04",
      title: "Cost Estimation & Approvals",
      desc: "Transparency is our core value. We provide a highly detailed Bill of Quantities (BOQ) and cost estimation. Once approved, we handle the government sanctions and building permits.",
      img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80"
    },
    {
      number: "05",
      title: "Construction & Execution",
      desc: "Our expert engineers and skilled workforce take over. From deep foundation digging to the final roof casting, we ensure top-tier material quality and structural safety.",
      img: "https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&q=80"
    },
    {
      number: "06",
      title: "Interiors & Final Handover",
      desc: "The final touch. Premium flooring, custom woodwork, lighting installation, and paint. We clean the site thoroughly and hand over the keys to your new dream space.",
      img: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80](https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24 overflow-hidden">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-24">
        <h2 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">How We Work</h2>
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Our Design & Build Process</h1>
        <div className="w-16 h-1 bg-[#C5A059] mx-auto"></div>
        <p className="mt-8 text-gray-600 max-w-2xl mx-auto leading-relaxed">
          A seamless, transparent, and highly organized journey from a simple sketch to a fully furnished architectural marvel.
        </p>
      </div>

      {/* Vertical Timeline Process */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* The Center Vertical Line (Visible on Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-300 transform -translate-x-1/2"></div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Empty space for the alternating layout */}
              <div className="hidden md:block w-5/12"></div>

              {/* Number Circle in the center */}
              <div className="hidden md:flex w-12 h-12 bg-gray-900 text-[#C5A059] font-serif text-xl items-center justify-center rounded-full z-10 shadow-lg absolute left-1/2 transform -translate-x-1/2">
                {step.number}
              </div>

              {/* Content Card */}
              <div className="w-full md:w-5/12 group cursor-default">
                <div className="bg-white p-8 border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl relative overflow-hidden">
                  
                  {/* Small Number for Mobile */}
                  <span className="md:hidden text-[#C5A059] font-serif text-3xl mb-4 block opacity-50">
                    {step.number}
                  </span>

                  <h3 className="text-2xl font-serif text-gray-900 mb-4 group-hover:text-[#C5A059] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-8 text-justify">
                    {step.desc}
                  </p>
                  
                  {/* Step Image */}
                  <div className="w-full h-48 md:h-64 relative overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                      style={{ backgroundImage: `url('${step.img}')` }}
                    ></div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Teaser for Cost Calculator & Profile */}
      <div className="max-w-4xl mx-auto px-6 mt-32 text-center bg-gray-900 py-16 text-[#F3F2EC] shadow-2xl">
        <h2 className="text-3xl font-serif mb-4 text-white">Curious About Construction Costs?</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          We believe in 100% transparency. Check out our interactive cost estimator or view the profile of our Principal Architect to see our industry collaborations.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/contact"
            className="bg-[#C5A059] text-white px-8 py-3 tracking-[0.2em] text-sm font-bold hover:bg-white hover:text-gray-900 transition-colors"
          >
            REQUEST A QUOTE
          </Link>
          <Link 
            href="/about"
            className="border border-gray-500 text-white px-8 py-3 tracking-[0.2em] text-sm font-bold hover:border-white transition-colors"
          >
            VIEW ARCHITECT PROFILE
          </Link>
        </div>
      </div>

    </div>
  );
}
