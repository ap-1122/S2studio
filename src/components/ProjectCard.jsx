 import Link from 'next/link';
import Image from 'next/image';

export default function ProjectCard({ project }) {
  // We use the slug to create a clickable link to the project's detail page
  const projectUrl = project.slug ? `/projects/${project.slug.current}` : '#';

  return (
    <Link href={projectUrl} className="group cursor-pointer block">
      <div className="overflow-hidden relative h-80 w-full mb-6 bg-gray-200">
        {project.img ? (
          <Image 
            src={project.img}
            alt={project.title || "Project thumbnail"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 z-10"></div>
      </div>
      <h3 className="text-[#C5A059] text-xs tracking-[0.2em] font-bold uppercase mb-2">
        {project.category}
      </h3>
      <h2 className="text-2xl font-serif text-gray-900 group-hover:text-[#C5A059] transition-colors">
        {project.title}
      </h2>
    </Link>
  );
}








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