"use client";

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import ProjectCard from '@/components/ProjectCard';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const query = `*[_type == "project"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        category,
        "img": mainImage.asset->url
      }`;
      const data = await client.fetch(query);
      setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const categories = ['All', 'Architecture', 'Interior Design', 'Commercial', 'Construction'];

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16">
          <h2 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Our Portfolio</h2>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Featured Projects</h1>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto"></div>
        </div>

        {/* Premium Box Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 border 
                ${activeCategory === category 
                  ? 'bg-gray-900 border-gray-900 text-[#F3F2EC] shadow-lg' 
                  : 'bg-white border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-400 tracking-[0.3em] uppercase text-sm animate-pulse">Loading Premium Portfolio...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}














// "use client"; // We need this because filtering categories is an interactive client action

// import { useState, useEffect } from 'react';
// import { client } from '@/sanity/lib/client';
// import ProjectCard from '@/components/ProjectCard';

// export default function ProjectsPage() {
//   const [projects, setProjects] = useState([]);
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [loading, setLoading] = useState(true);

//   // Fetch real data from Sanity when the page loads
//   useEffect(() => {
//     const fetchProjects = async () => {
//       const query = `*[_type == "project"] | order(_createdAt desc) {
//         _id,
//         title,
//         slug,
//         category,
//         "img": mainImage.asset->url
//       }`;
//       const data = await client.fetch(query);
//       setProjects(data);
//       setLoading(false);
//     };
//     fetchProjects();
//   }, []);

//   // Filter logic
//   const filteredProjects = activeCategory === 'All' 
//     ? projects 
//     : projects.filter(project => project.category === activeCategory);

//   // Get unique categories dynamically from the uploaded projects
//   const categories = ['All', ...new Set(projects.map(p => p.category))];

//   return (
//     <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24">
//       <div className="max-w-7xl mx-auto px-6 md:px-12">
        
//         <div className="text-center mb-12">
//           <h2 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Our Portfolio</h2>
//           <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Featured Projects</h1>
//           <div className="w-16 h-1 bg-[#C5A059] mx-auto"></div>
//         </div>

//         {/* Dynamic Category Filter Buttons */}
//         <div className="flex flex-wrap justify-center gap-4 mb-16">
//           {categories.map((category, index) => (
//             <button
//               key={index}
//               onClick={() => setActiveCategory(category)}
//               className={`px-6 py-2 text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 border-b-2 
//                 ${activeCategory === category 
//                   ? 'border-[#C5A059] text-[#C5A059]' 
//                   : 'border-transparent text-gray-500 hover:text-gray-900'}`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* Projects Grid */}
//         {loading ? (
//           <p className="text-center text-gray-500 tracking-widest uppercase">Loading Projects...</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {filteredProjects.map((project) => (
//               <ProjectCard key={project._id} project={project} />
//             ))}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }










// export default function ProjectsPage() {
//   // Abhi ke liye dummy data (Baad mein ye Sanity CMS se aayega)
//   const projects = [
//     { title: "The Glass Villa", category: "Architecture", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80" },
//     { title: "Urban Oasis Interior", category: "Interior Design", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80" },
//     { title: "Minimalist Workspace", category: "Commercial", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" },
//     { title: "Heritage Restoration", category: "Construction", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80" },
//     { title: "Luxe Penthouse", category: "Interior Design", img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80" },
//     { title: "Eco-Friendly Retreat", category: "Architecture", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80" }
//   ];

//   return (
//     <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24">
//       <div className="max-w-7xl mx-auto px-6 md:px-12">
        
//         {/* Page Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Our Portfolio</h2>
//           <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Featured Projects</h1>
//           <div className="w-16 h-1 bg-[#C5A059] mx-auto"></div>
//         </div>

//         {/* Projects Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {projects.map((project, index) => (
//             <div key={index} className="group cursor-pointer">
//               <div className="overflow-hidden relative h-80 w-full mb-6">
//                 {/* Image scaling on hover for premium feel */}
//                 <div 
//                   className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
//                   style={{ backgroundImage: `url('${project.img}')` }}
//                 ></div>
//                 {/* Dark overlay on hover */}
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
//               </div>
//               <h3 className="text-[#C5A059] text-xs tracking-[0.2em] font-bold uppercase mb-2">{project.category}</h3>
//               <h2 className="text-2xl font-serif text-gray-900 group-hover:text-[#C5A059] transition-colors">{project.title}</h2>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }