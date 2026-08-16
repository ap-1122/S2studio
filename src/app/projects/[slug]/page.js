import { client } from '@/sanity/lib/client';
import Link from 'next/link';

// Helper Function: YouTube link ko Embed link me convert karne ke liye
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
};

export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Sanity Query me 'youtubeUrl' add kar diya hai
  const query = `*[_type == "project" && slug.current == $slug][0] {
    title,
    category,
    description,
    "mainImg": mainImage.asset->url,
    "gallery": gallery[].asset->url,
    "pdfUrl": projectPdf.asset->url,
    youtubeUrl
  }`;

  const project = await client.fetch(query, { slug });

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F2EC]">
        <h1 className="text-2xl font-serif text-gray-900">Project Not Found</h1>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-24">
      
      {/* 1. HERO SECTION: Big Cover Image */}
      <div className="relative w-full h-[60vh] bg-gray-900">
        {project.mainImg && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{ backgroundImage: `url('${project.mainImg}')` }}
          ></div>
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-20">
          <h3 className="text-[#C5A059] text-sm tracking-[0.3em] font-bold uppercase mb-4">
            {project.category}
          </h3>
          <h1 className="text-5xl md:text-7xl font-serif text-white drop-shadow-md">
            {project.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
        
        {/* Two-Column Organized Layout */}
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT COLUMN: Details & Documents */}
          <div className="lg:w-1/3">
            <h2 className="text-2xl font-serif text-gray-900 mb-6 border-b border-gray-200 pb-4">
              Project Overview
            </h2>
            
            {project.description ? (
              <p className="text-gray-600 leading-relaxed mb-10 text-justify">
                {project.description}
              </p>
            ) : (
              <p className="text-gray-400 italic mb-10">No detailed description provided.</p>
            )}

            {/* Document / Plan Section */}
            <div className="bg-white p-8 border border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase mb-4">
                Architecture Plans
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Download the official floor plans, elevations, and structural documents.
              </p>
              
              {project.pdfUrl ? (
                <a 
                  href={project.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-gray-900 text-white px-6 py-3 tracking-[0.2em] text-xs font-bold hover:bg-[#C5A059] transition-colors"
                >
                  DOWNLOAD PDF PLAN
                </a>
              ) : (
                <button disabled className="block w-full text-center bg-gray-200 text-gray-400 px-6 py-3 tracking-[0.2em] text-xs font-bold cursor-not-allowed">
                  NO PLAN UPLOADED
                </button>
              )}
            </div>

            <div className="mt-10">
              <Link 
                href="/projects"
                className="text-sm font-bold tracking-[0.2em] text-[#C5A059] hover:text-gray-900 transition-colors uppercase flex items-center gap-2"
              >
                ← Back to Portfolio
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Video & Image Gallery */}
          <div className="lg:w-2/3">
            
            {/* NEW: Cinematic Video Walkthrough Section */}
            {project.youtubeUrl && (
              <div className="mb-16">
                <h2 className="text-2xl font-serif text-gray-900 mb-6 border-b border-gray-200 pb-4 flex items-center justify-between">
                  3D Walkthrough <span className="bg-[#C5A059] text-white text-[10px] tracking-widest px-2 py-1 uppercase rounded-sm">Cinematic</span>
                </h2>
                <div className="relative w-full bg-black overflow-hidden shadow-lg border border-gray-200" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={getYouTubeEmbedUrl(project.youtubeUrl)}
                    title="Project Walkthrough"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Existing Image Gallery */}
            <h2 className="text-2xl font-serif text-gray-900 mb-6 border-b border-gray-200 pb-4">
              Image Gallery
            </h2>
            
            {project.gallery && project.gallery.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((imgUrl, index) => (
                  <div key={index} className="h-64 w-full relative bg-gray-200 overflow-hidden group cursor-pointer border border-gray-100 shadow-sm">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${imgUrl}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
                <p className="text-gray-400 tracking-widest text-sm uppercase">No Gallery Images Uploaded</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}















// import { client } from '@/sanity/lib/client';
// import Link from 'next/link';

// export default async function ProjectDetailPage({ params }) {
//   const resolvedParams = await params;
//   const slug = resolvedParams.slug;

//   // Fetch the highly detailed data from Sanity
//   const query = `*[_type == "project" && slug.current == $slug][0] {
//     title,
//     category,
//     description,
//     "mainImg": mainImage.asset->url,
//     "gallery": gallery[].asset->url,
//     "pdfUrl": projectPdf.asset->url
//   }`;

//   const project = await client.fetch(query, { slug });

//   if (!project) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#F3F2EC]">
//         <h1 className="text-2xl font-serif text-gray-900">Project Not Found</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#FAFAFA] min-h-screen pb-24">
      
//       {/* 1. HERO SECTION: Big Cover Image */}
//       <div className="relative w-full h-[60vh] bg-gray-900">
//         {project.mainImg && (
//           <div 
//             className="absolute inset-0 bg-cover bg-center opacity-70"
//             style={{ backgroundImage: `url('${project.mainImg}')` }}
//           ></div>
//         )}
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-20">
//           <h3 className="text-[#C5A059] text-sm tracking-[0.3em] font-bold uppercase mb-4">
//             {project.category}
//           </h3>
//           <h1 className="text-5xl md:text-7xl font-serif text-white drop-shadow-md">
//             {project.title}
//           </h1>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
        
//         {/* Two-Column Organized Layout */}
//         <div className="flex flex-col lg:flex-row gap-16">
          
//           {/* LEFT COLUMN: Details & Documents */}
//           <div className="lg:w-1/3">
//             <h2 className="text-2xl font-serif text-gray-900 mb-6 border-b border-gray-200 pb-4">
//               Project Overview
//             </h2>
            
//             {project.description ? (
//               <p className="text-gray-600 leading-relaxed mb-10 text-justify">
//                 {project.description}
//               </p>
//             ) : (
//               <p className="text-gray-400 italic mb-10">No detailed description provided.</p>
//             )}

//             {/* Document / Plan Section */}
//             <div className="bg-white p-8 border border-gray-100 shadow-sm">
//               <h3 className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase mb-4">
//                 Architecture Plans
//               </h3>
//               <p className="text-sm text-gray-500 mb-6">
//                 Download the official floor plans, elevations, and structural documents.
//               </p>
              
//               {project.pdfUrl ? (
//                 <a 
//                   href={project.pdfUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block w-full text-center bg-gray-900 text-white px-6 py-3 tracking-[0.2em] text-xs font-bold hover:bg-[#C5A059] transition-colors"
//                 >
//                   DOWNLOAD PDF PLAN
//                 </a>
//               ) : (
//                 <button disabled className="block w-full text-center bg-gray-200 text-gray-400 px-6 py-3 tracking-[0.2em] text-xs font-bold cursor-not-allowed">
//                   NO PLAN UPLOADED
//                 </button>
//               )}
//             </div>

//             <div className="mt-10">
//               <Link 
//                 href="/projects"
//                 className="text-sm font-bold tracking-[0.2em] text-[#C5A059] hover:text-gray-900 transition-colors uppercase flex items-center gap-2"
//               >
//                 ← Back to Portfolio
//               </Link>
//             </div>
//           </div>

//           {/* RIGHT COLUMN: Organized Image Gallery */}
//           <div className="lg:w-2/3">
//             <h2 className="text-2xl font-serif text-gray-900 mb-6 border-b border-gray-200 pb-4">
//               Image Gallery
//             </h2>
            
//             {project.gallery && project.gallery.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {project.gallery.map((imgUrl, index) => (
//                   <div key={index} className="h-64 w-full relative bg-gray-200 overflow-hidden group cursor-pointer border border-gray-100 shadow-sm">
//                     <div 
//                       className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
//                       style={{ backgroundImage: `url('${imgUrl}')` }}
//                     ></div>
//                     {/* Dark overlay on hover for premium feel */}
//                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="w-full h-64 bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
//                 <p className="text-gray-400 tracking-widest text-sm uppercase">No Gallery Images Uploaded</p>
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }







// import { client } from '@/sanity/lib/client';
// import Link from 'next/link';

// export default async function ProjectDetailPage({ params }) {
//   // URL se slug nikalna
//   const resolvedParams = await params;
//   const slug = resolvedParams.slug;

//   // Sanity se us ek project ka poora data mangwana (Gallery, PDF, Description sab)
//   const query = `*[_type == "project" && slug.current == $slug][0] {
//     title,
//     category,
//     description,
//     "mainImg": mainImage.asset->url,
//     "gallery": gallery[].asset->url,
//     "pdfUrl": projectPdf.asset->url
//   }`;

//   const project = await client.fetch(query, { slug });

//   // Agar project nahi mila URL galat hone par
//   if (!project) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#F3F2EC]">
//         <h1 className="text-2xl font-serif text-gray-900">Project Not Found</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#F3F2EC] min-h-screen pt-24 pb-24">
      
//       {/* Big Hero Image */}
//       <div className="relative w-full h-[60vh] bg-gray-200">
//         {project.mainImg && (
//           <div 
//             className="absolute inset-0 bg-cover bg-center"
//             style={{ backgroundImage: `url('${project.mainImg}')` }}
//           ></div>
//         )}
//         <div className="absolute inset-0 bg-black/30"></div>
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
//           <h3 className="text-[#C5A059] text-sm tracking-[0.3em] font-bold uppercase mb-4 shadow-black drop-shadow-md">
//             {project.category}
//           </h3>
//           <h1 className="text-5xl md:text-7xl font-serif text-white drop-shadow-lg">
//             {project.title}
//           </h1>
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto px-6 md:px-12 mt-16">
        
//         {/* Project Description */}
//         <div className="mb-16 text-center">
//           <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-8"></div>
//           {project.description ? (
//             <p className="text-gray-600 leading-relaxed md:text-lg">
//               {project.description}
//             </p>
//           ) : (
//             <p className="text-gray-400 italic">No description provided for this project.</p>
//           )}
//         </div>

//         {/* Gallery Grid (Agar aur images upload ki hain) */}
//         {project.gallery && project.gallery.length > 0 && (
//           <div className="mb-16">
//             <h4 className="text-center text-gray-900 tracking-[0.2em] uppercase font-bold mb-10">Project Gallery</h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {project.gallery.map((imgUrl, index) => (
//                 <div key={index} className="h-80 w-full relative bg-gray-200 overflow-hidden group">
//                   <div 
//                     className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
//                     style={{ backgroundImage: `url('${imgUrl}')` }}
//                   ></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Action Buttons (PDF & Back) */}
//         <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-20">
//           {project.pdfUrl && (
//             <a 
//               href={project.pdfUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-[#C5A059] text-white px-8 py-3 tracking-[0.2em] text-sm font-bold hover:bg-gray-900 transition-colors"
//             >
//               DOWNLOAD PLAN (PDF)
//             </a>
//           )}
//           <Link 
//             href="/projects"
//             className="border border-gray-900 text-gray-900 px-8 py-3 tracking-[0.2em] text-sm font-bold hover:bg-gray-900 hover:text-white transition-colors"
//           >
//             BACK TO PORTFOLIO
//           </Link>
//         </div>

//       </div>
//     </div>
//   );
// }