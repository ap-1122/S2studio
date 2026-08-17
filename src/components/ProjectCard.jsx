"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Animation variants card ke liye
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function ProjectCard({ project }) {
  // We use the slug to create a clickable link to the project's detail page
  const projectUrl = project.slug ? `/projects/${project.slug.current}` : '#';

  return (
    // motion.div ko wrapper banaya hai taaki parent container ka stagger effect ispe lag sake
    <motion.div variants={cardVariants}>
      <Link href={projectUrl} className="group cursor-pointer block">
        
        {/* Image Box */}
        <div className="overflow-hidden relative h-80 w-full mb-6 bg-gray-200 dark:bg-gray-800 shadow-sm transition-colors duration-700">
          {project.img ? (
            <Image 
              src={project.img}
              alt={project.title || "Project thumbnail"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
              No Image
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 dark:group-hover:bg-black/40 transition-all duration-500 z-10"></div>
        </div>

        {/* Text Section */}
        <h3 className="text-[#C5A059] text-xs tracking-[0.2em] font-bold uppercase mb-2">
          {project.category}
        </h3>
        <h2 className="text-2xl font-serif text-gray-900 dark:text-white group-hover:text-[#C5A059] dark:group-hover:text-[#C5A059] transition-colors duration-300">
          {project.title}
        </h2>

      </Link>
    </motion.div>
  );
}








//  import Link from 'next/link';
// import Image from 'next/image';

// export default function ProjectCard({ project }) {
//   // We use the slug to create a clickable link to the project's detail page
//   const projectUrl = project.slug ? `/projects/${project.slug.current}` : '#';

//   return (
//     <Link href={projectUrl} className="group cursor-pointer block">
//       <div className="overflow-hidden relative h-80 w-full mb-6 bg-gray-200">
//         {project.img ? (
//           <Image 
//             src={project.img}
//             alt={project.title || "Project thumbnail"}
//             fill
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//             className="object-cover transition-transform duration-700 group-hover:scale-110"
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
//         )}
//         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 z-10"></div>
//       </div>
//       <h3 className="text-[#C5A059] text-xs tracking-[0.2em] font-bold uppercase mb-2">
//         {project.category}
//       </h3>
//       <h2 className="text-2xl font-serif text-gray-900 group-hover:text-[#C5A059] transition-colors">
//         {project.title}
//       </h2>
//     </Link>
//   );
// }








// import Link from 'next/link';

// export default function ProjectCard({ project }) {
//   // We use the slug to create a clickable link to the project's detail page
//   const projectUrl = project.slug ? `/projects/${project.slug.current}` : '#';

//   return (
//     <Link href={projectUrl} className="group cursor-pointer block">
//       <div className="overflow-hidden relative h-80 w-full mb-6 bg-gray-200">
//         {project.img ? (
//           <div 
//             className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
//             style={{ backgroundImage: `url('${project.img}')` }}
//           ></div>
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
//         )}
//         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
//       </div>
//       <h3 className="text-[#C5A059] text-xs tracking-[0.2em] font-bold uppercase mb-2">
//         {project.category}
//       </h3>
//       <h2 className="text-2xl font-serif text-gray-900 group-hover:text-[#C5A059] transition-colors">
//         {project.title}
//       </h2>
//     </Link>
//   );
// }