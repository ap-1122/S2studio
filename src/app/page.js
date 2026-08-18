import HeroSection from '../components/HeroSection';
import Link from 'next/link';
import { client } from '@/sanity/lib/client'; 
import ScrollWrapper from '../components/ScrollWrapper'; // Custom Animation Wrapper

// 1. Project Query
const projectQuery = `*[_type == "project"] | order(_createdAt desc)[0...6] {
  _id,
  title,
  category,
  "img": mainImage.asset->url,
  "pdfUrl": projectPdf.asset->url
}`;

// 2. Testimonial Query
const testimonialQuery = `*[_type == "testimonial"] | order(_createdAt desc)[0...3] {
  _id,
  clientName,
  projectDetails,
  review,
  "imageUrl": clientImage.asset->url
}`;

export default async function Home() {
  const services = [
    {
      title: "ARCHITECTURE",
      desc: "Innovative and sustainable architectural designs that stand the test of time.",
      icon: "🏛️"
    },
    {
      title: "INTERIOR DESIGN",
      desc: "Bespoke interior solutions creating spaces that reflect your luxury lifestyle.",
      icon: "🛋️"
    },
    {
      title: "CONSTRUCTION",
      desc: "Flawless execution and turnkey construction with premium materials.",
      icon: "🏗️"
    }
  ];

  const recentProjects = await client.fetch(projectQuery);
  const testimonials = await client.fetch(testimonialQuery);

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#121212] transition-colors duration-700">
      
      <HeroSection />

      {/* Premium Services Section */}
      <section className="py-24 px-8 md:px-16 bg-white dark:bg-[#1A1A1A] transition-colors duration-700">
        <ScrollWrapper className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">What We Do</h3>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white transition-colors duration-700">Our Services</h2>
            <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div key={index} className="group border border-gray-100 dark:border-gray-800 bg-[#FAFAFA] dark:bg-[#121212] p-10 hover:shadow-2xl dark:hover:shadow-[#C5A059]/10 transition-all duration-500 hover:-translate-y-2 text-center rounded-sm">
                <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                  {service.icon}
                </div>
                <h4 className="text-xl tracking-[0.1em] font-bold text-gray-900 dark:text-white mb-4 uppercase transition-colors duration-700">{service.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 transition-colors duration-700">{service.desc}</p>
                <Link href="/services" className="text-sm font-bold tracking-widest text-[#C5A059] border-b border-transparent group-hover:border-[#C5A059] transition-all duration-300">
                  DISCOVER MORE →
                </Link>
              </div>
            ))}
          </div>
        </ScrollWrapper>
      </section>

      {/* Recent Projects Section */}
      <section className="py-24 px-8 md:px-16 bg-[#FAFAFA] dark:bg-[#121212] transition-colors duration-700">
        <ScrollWrapper className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Portfolio</h3>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white transition-colors duration-700">Recent Works</h2>
            <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {recentProjects.map((project) => (
              <div key={project._id} className="group cursor-pointer">
                <div className="overflow-hidden relative h-80 w-full mb-6 rounded-sm shadow-sm">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${project.img}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500"></div>
                </div>
                <h3 className="text-[#C5A059] text-xs tracking-[0.2em] font-bold uppercase mb-2">{project.category}</h3>
                <h2 className="text-2xl font-serif text-gray-900 dark:text-white group-hover:text-[#C5A059] dark:group-hover:text-[#C5A059] transition-colors duration-300">{project.title}</h2>

                {project.pdfUrl && (
                  <a 
                    href={project.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-[10px] font-bold border-b border-gray-900 dark:border-gray-500 text-gray-800 dark:text-gray-400 tracking-widest pb-1 hover:text-[#C5A059] dark:hover:text-[#C5A059] hover:border-[#C5A059] transition-colors uppercase"
                  >
                    View Plan PDF
                  </a>
                )}
              </div>
            ))}
          </div>

          {recentProjects.length === 0 && (
            <p className="text-center text-gray-500 tracking-widest mt-10">
              NO PROJECTS UPLOADED YET. ADD SOME FROM /STUDIO.
            </p>
          )}

          <div className="text-center mt-16">
            <Link href="/projects" className="border-b-2 border-gray-900 dark:border-white text-gray-900 dark:text-white pb-1 tracking-[0.2em] text-sm font-bold hover:text-[#C5A059] dark:hover:text-[#C5A059] hover:border-[#C5A059] dark:hover:border-[#C5A059] transition-all duration-300">
              VIEW ALL PROJECTS
            </Link>
          </div>
        </ScrollWrapper>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-24 px-8 md:px-16 bg-white dark:bg-[#1A1A1A] border-t border-gray-100 dark:border-gray-800 transition-colors duration-700">
        <ScrollWrapper className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Client Stories</h3>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white transition-colors duration-700">What Our Clients Say</h2>
            <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testi) => (
              <div key={testi._id} className="p-10 border border-gray-100 dark:border-gray-800 bg-[#FAFAFA] dark:bg-[#121212] hover:shadow-xl dark:hover:shadow-[#C5A059]/5 transition-all duration-500 relative flex flex-col justify-between rounded-sm">
                <div>
                  <div className="text-6xl text-[#C5A059] font-serif absolute -top-4 left-6 opacity-20">"</div>
                  <p className="text-gray-600 dark:text-gray-300 font-serif italic mb-8 relative z-10 leading-relaxed transition-colors duration-700">
                    "{testi.review}"
                  </p>
                </div>
                <div className="flex items-center gap-4 border-t border-gray-200 dark:border-gray-800 pt-6 transition-colors duration-700">
                  {testi.imageUrl ? (
                    <img src={testi.imageUrl} alt={testi.clientName} className="w-12 h-12 rounded-full object-cover border border-[#C5A059] p-0.5" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 font-serif text-xl border border-[#C5A059] p-0.5">
                      {testi.clientName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="text-xs font-bold tracking-widest uppercase text-gray-900 dark:text-white transition-colors duration-700">{testi.clientName}</h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 tracking-wider uppercase mt-1 transition-colors duration-700">{testi.projectDetails}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollWrapper>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#F3F2EC] dark:bg-[#0A0A0A] text-center px-6 transition-colors duration-700">
        <ScrollWrapper>
          <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-6 transition-colors duration-700">Ready to start your dream project?</h2>
          <Link href="/contact" className="inline-block bg-gray-900 dark:bg-[#C5A059] text-white px-8 py-3 tracking-[0.2em] text-sm font-bold hover:bg-[#C5A059] dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 rounded-sm shadow-md">
            GET A QUOTE
          </Link>
        </ScrollWrapper>
      </section>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/9589303667?text=Hello%20S%C2%B2%20Studio,%20I%20want%20to%20discuss%20a%20project..."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] dark:shadow-[0_4px_20px_0_rgba(37,211,102,0.5)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>

        <span className="absolute right-20 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold tracking-widest px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap uppercase shadow-lg">
          Chat with us
        </span>
      </a>

    </div>
  );
}





// import HeroSection from '../components/HeroSection';
// import Link from 'next/link';
// import { client } from '@/sanity/lib/client'; 

// // 1. Project Query (Unchanged)
// const projectQuery = `*[_type == "project"] | order(_createdAt desc)[0...6] {
//   _id,
//   title,
//   category,
//   "img": mainImage.asset->url,
//   "pdfUrl": projectPdf.asset->url
// }`;

// // 2. NEW: Testimonial Query (Sanity se reviews mangwane ke liye)
// const testimonialQuery = `*[_type == "testimonial"] | order(_createdAt desc)[0...3] {
//   _id,
//   clientName,
//   projectDetails,
//   review,
//   "imageUrl": clientImage.asset->url
// }`;

// export default async function Home() {
//   // Services Data (Unchanged)
//   const services = [
//     {
//       title: "ARCHITECTURE",
//       desc: "Innovative and sustainable architectural designs that stand the test of time.",
//       icon: "🏛️"
//     },
//     {
//       title: "INTERIOR DESIGN",
//       desc: "Bespoke interior solutions creating spaces that reflect your luxury lifestyle.",
//       icon: "🛋️"
//     },
//     {
//       title: "CONSTRUCTION",
//       desc: "Flawless execution and turnkey construction with premium materials.",
//       icon: "🏗️"
//     }
//   ];

//   // Fetching both Projects and Testimonials together
//   const recentProjects = await client.fetch(projectQuery);
//   const testimonials = await client.fetch(testimonialQuery);

//   return (
//     <div>
//       {/* Auto-Slider Hero Section (Unchanged) */}
//       <HeroSection />

//       {/* Premium Services Section (Unchanged) */}
//       <section className="py-24 px-8 md:px-16 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h3 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">What We Do</h3>
//             <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Our Services</h2>
//             <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-6"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {services.map((service, index) => (
//               <div key={index} className="group border border-gray-100 bg-[#FAFAFA] p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center">
//                 <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
//                   {service.icon}
//                 </div>
//                 <h4 className="text-xl tracking-[0.1em] font-bold text-gray-900 mb-4 uppercase">{service.title}</h4>
//                 <p className="text-gray-600 leading-relaxed mb-8">{service.desc}</p>
//                 <Link href="/services" className="text-sm font-bold tracking-widest text-[#C5A059] border-b border-transparent group-hover:border-[#C5A059] transition-all duration-300">
//                   DISCOVER MORE →
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Recent Projects Section (Unchanged) */}
//       <section className="py-24 px-8 md:px-16 bg-[#FAFAFA]">
//         <div className="max-w-7xl mx-auto">
          
//           <div className="text-center mb-16">
//             <h3 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Portfolio</h3>
//             <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Recent Works</h2>
//             <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-6"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {recentProjects.map((project) => (
//               <div key={project._id} className="group cursor-pointer">
//                 <div className="overflow-hidden relative h-80 w-full mb-6">
//                   <div 
//                     className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
//                     style={{ backgroundImage: `url('${project.img}')` }}
//                   ></div>
//                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
//                 </div>
//                 <h3 className="text-[#C5A059] text-xs tracking-[0.2em] font-bold uppercase mb-2">{project.category}</h3>
//                 <h2 className="text-2xl font-serif text-gray-900 group-hover:text-[#C5A059] transition-colors">{project.title}</h2>
                
//                 {project.pdfUrl && (
//                   <a 
//                     href={project.pdfUrl} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="inline-block mt-3 text-[10px] font-bold border-b border-gray-900 tracking-widest pb-1 hover:text-[#C5A059] hover:border-[#C5A059] transition-colors uppercase"
//                   >
//                     View Plan PDF
//                   </a>
//                 )}
//               </div>
//             ))}
//           </div>

//           {recentProjects.length === 0 && (
//             <p className="text-center text-gray-500 tracking-widest mt-10">
//               NO PROJECTS UPLOADED YET. ADD SOME FROM /STUDIO.
//             </p>
//           )}

//           <div className="text-center mt-16">
//             <Link href="/projects" className="border-b-2 border-gray-900 text-gray-900 pb-1 tracking-[0.2em] text-sm font-bold hover:text-[#C5A059] hover:border-[#C5A059] transition-all duration-300">
//               VIEW ALL PROJECTS
//             </Link>
//           </div>

//         </div>
//       </section>

//       {/* Client Testimonials Section (Unchanged) */}
//       <section className="py-24 px-8 md:px-16 bg-white border-t border-gray-100">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h3 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Client Stories</h3>
//             <h2 className="text-4xl md:text-5xl font-serif text-gray-900">What Our Clients Say</h2>
//             <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-6"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {testimonials.map((testi) => (
//               <div key={testi._id} className="p-10 border border-gray-100 bg-[#FAFAFA] hover:shadow-xl transition-all duration-500 relative flex flex-col justify-between">
//                 <div>
//                   <div className="text-6xl text-[#C5A059] font-serif absolute -top-4 left-6 opacity-20">"</div>
//                   <p className="text-gray-600 font-serif italic mb-8 relative z-10 leading-relaxed">
//                     "{testi.review}"
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
//                   {testi.imageUrl ? (
//                     <img src={testi.imageUrl} alt={testi.clientName} className="w-12 h-12 rounded-full object-cover border border-[#C5A059] p-0.5" />
//                   ) : (
//                     <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-serif text-xl border border-[#C5A059] p-0.5">
//                       {testi.clientName.charAt(0)}
//                     </div>
//                   )}
//                   <div>
//                     <h4 className="text-xs font-bold tracking-widest uppercase text-gray-900">{testi.clientName}</h4>
//                     <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">{testi.projectDetails}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {testimonials.length === 0 && (
//             <p className="text-center text-gray-500 tracking-widest mt-10 uppercase text-sm">
//               No reviews uploaded yet.
//             </p>
//           )}
//         </div>
//       </section>

//       {/* Call to Action (Unchanged) */}
//       <section className="py-20 bg-[#F3F2EC] text-center px-6">
//         <h2 className="text-3xl font-serif text-gray-900 mb-6">Ready to start your dream project?</h2>
//         <Link href="/contact" className="inline-block bg-gray-900 text-white px-8 py-3 tracking-[0.2em] text-sm font-bold hover:bg-[#C5A059] transition-all duration-300">
//           GET A QUOTE
//         </Link>
//       </section>

//       {/* ================= NEW: FLOATING WHATSAPP BUTTON ================= */}
//       <a
//         // Apne real phone number se 919876543210 ko replace kar dena
//         href="https://wa.me/8269373749?text=Hello%20S%C2%B2%20Studio,%20I%20want%20to%20discuss%20a%20project..."
//         target="_blank"
//         rel="noopener noreferrer"
//         className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] transition-all duration-300 flex items-center justify-center group"
//         aria-label="Chat on WhatsApp"
//       >
//         {/* Exact WhatsApp SVG Icon */}
//         <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
//         </svg>
        
//         {/* Tooltip on Hover */}
//         <span className="absolute right-20 bg-gray-900 text-white text-xs font-bold tracking-widest px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap uppercase">
//           Chat with us
//         </span>
//       </a>

//     </div>
//   );
// }











//  import HeroSection from '../components/HeroSection';
// import Link from 'next/link';
// import { client } from '@/sanity/lib/client'; 

// // 1. Project Query (Unchanged)
// const projectQuery = `*[_type == "project"] | order(_createdAt desc)[0...6] {
//   _id,
//   title,
//   category,
//   "img": mainImage.asset->url,
//   "pdfUrl": projectPdf.asset->url
// }`;

// // 2. NEW: Testimonial Query (Sanity se reviews mangwane ke liye)
// const testimonialQuery = `*[_type == "testimonial"] | order(_createdAt desc)[0...3] {
//   _id,
//   clientName,
//   projectDetails,
//   review,
//   "imageUrl": clientImage.asset->url
// }`;

// export default async function Home() {
//   // Services Data (Unchanged)
//   const services = [
//     {
//       title: "ARCHITECTURE",
//       desc: "Innovative and sustainable architectural designs that stand the test of time.",
//       icon: "🏛️"
//     },
//     {
//       title: "INTERIOR DESIGN",
//       desc: "Bespoke interior solutions creating spaces that reflect your luxury lifestyle.",
//       icon: "🛋️"
//     },
//     {
//       title: "CONSTRUCTION",
//       desc: "Flawless execution and turnkey construction with premium materials.",
//       icon: "🏗️"
//     }
//   ];

//   // Fetching both Projects and Testimonials together
//   const recentProjects = await client.fetch(projectQuery);
//   const testimonials = await client.fetch(testimonialQuery);

//   return (
//     <div>
//       {/* Auto-Slider Hero Section (Unchanged) */}
//       <HeroSection />

//       {/* Premium Services Section (Unchanged) */}
//       <section className="py-24 px-8 md:px-16 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h3 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">What We Do</h3>
//             <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Our Services</h2>
//             <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-6"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {services.map((service, index) => (
//               <div key={index} className="group border border-gray-100 bg-[#FAFAFA] p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center">
//                 <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
//                   {service.icon}
//                 </div>
//                 <h4 className="text-xl tracking-[0.1em] font-bold text-gray-900 mb-4 uppercase">{service.title}</h4>
//                 <p className="text-gray-600 leading-relaxed mb-8">{service.desc}</p>
//                 <Link href="/services" className="text-sm font-bold tracking-widest text-[#C5A059] border-b border-transparent group-hover:border-[#C5A059] transition-all duration-300">
//                   DISCOVER MORE →
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Recent Projects Section (Unchanged) */}
//       <section className="py-24 px-8 md:px-16 bg-[#FAFAFA]">
//         <div className="max-w-7xl mx-auto">
          
//           <div className="text-center mb-16">
//             <h3 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Portfolio</h3>
//             <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Recent Works</h2>
//             <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-6"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {recentProjects.map((project) => (
//               <div key={project._id} className="group cursor-pointer">
//                 <div className="overflow-hidden relative h-80 w-full mb-6">
//                   <div 
//                     className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
//                     style={{ backgroundImage: `url('${project.img}')` }}
//                   ></div>
//                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
//                 </div>
//                 <h3 className="text-[#C5A059] text-xs tracking-[0.2em] font-bold uppercase mb-2">{project.category}</h3>
//                 <h2 className="text-2xl font-serif text-gray-900 group-hover:text-[#C5A059] transition-colors">{project.title}</h2>
                
//                 {project.pdfUrl && (
//                   <a 
//                     href={project.pdfUrl} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="inline-block mt-3 text-[10px] font-bold border-b border-gray-900 tracking-widest pb-1 hover:text-[#C5A059] hover:border-[#C5A059] transition-colors uppercase"
//                   >
//                     View Plan PDF
//                   </a>
//                 )}
//               </div>
//             ))}
//           </div>

//           {recentProjects.length === 0 && (
//             <p className="text-center text-gray-500 tracking-widest mt-10">
//               NO PROJECTS UPLOADED YET. ADD SOME FROM /STUDIO.
//             </p>
//           )}

//           <div className="text-center mt-16">
//             <Link href="/projects" className="border-b-2 border-gray-900 text-gray-900 pb-1 tracking-[0.2em] text-sm font-bold hover:text-[#C5A059] hover:border-[#C5A059] transition-all duration-300">
//               VIEW ALL PROJECTS
//             </Link>
//           </div>

//         </div>
//       </section>

//       {/* NEW: Client Testimonials Section */}
//       <section className="py-24 px-8 md:px-16 bg-white border-t border-gray-100">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h3 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Client Stories</h3>
//             <h2 className="text-4xl md:text-5xl font-serif text-gray-900">What Our Clients Say</h2>
//             <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-6"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {testimonials.map((testi) => (
//               <div key={testi._id} className="p-10 border border-gray-100 bg-[#FAFAFA] hover:shadow-xl transition-all duration-500 relative flex flex-col justify-between">
//                 <div>
//                   <div className="text-6xl text-[#C5A059] font-serif absolute -top-4 left-6 opacity-20">"</div>
//                   <p className="text-gray-600 font-serif italic mb-8 relative z-10 leading-relaxed">
//                     "{testi.review}"
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
//                   {testi.imageUrl ? (
//                     <img src={testi.imageUrl} alt={testi.clientName} className="w-12 h-12 rounded-full object-cover border border-[#C5A059] p-0.5" />
//                   ) : (
//                     <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-serif text-xl border border-[#C5A059] p-0.5">
//                       {testi.clientName.charAt(0)}
//                     </div>
//                   )}
//                   <div>
//                     <h4 className="text-xs font-bold tracking-widest uppercase text-gray-900">{testi.clientName}</h4>
//                     <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">{testi.projectDetails}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {testimonials.length === 0 && (
//             <p className="text-center text-gray-500 tracking-widest mt-10 uppercase text-sm">
//               No reviews uploaded yet.
//             </p>
//           )}
//         </div>
//       </section>

//       {/* Call to Action (Unchanged) */}
//       <section className="py-20 bg-[#F3F2EC] text-center px-6">
//         <h2 className="text-3xl font-serif text-gray-900 mb-6">Ready to start your dream project?</h2>
//         <Link href="/contact" className="inline-block bg-gray-900 text-white px-8 py-3 tracking-[0.2em] text-sm font-bold hover:bg-[#C5A059] transition-all duration-300">
//           GET A QUOTE
//         </Link>
//       </section>

//     </div>
//   );
// }








//  import HeroSection from '../components/HeroSection';
// import Link from 'next/link';

// // NEW: Sanity Client Import
// import { client } from '@/sanity/lib/client'; 

// // NEW: Sanity Fetch Query (Data mangwane ke liye)
// // Isme humne 'img' naam diya hai url ko taaki tumhare purane code se match ho jaye
// const query = `*[_type == "project"] | order(_createdAt desc)[0...6] {
//   _id,
//   title,
//   category,
//   "img": mainImage.asset->url,
//   "pdfUrl": projectPdf.asset->url
// }`;

// // NEW: Component ko 'async' banaya hai taaki data fetch ho sake
// export default async function Home() {
//   // Services Data (Unchanged)
//   const services = [
//     {
//       title: "ARCHITECTURE",
//       desc: "Innovative and sustainable architectural designs that stand the test of time.",
//       icon: "🏛️"
//     },
//     {
//       title: "INTERIOR DESIGN",
//       desc: "Bespoke interior solutions creating spaces that reflect your luxury lifestyle.",
//       icon: "🛋️"
//     },
//     {
//       title: "CONSTRUCTION",
//       desc: "Flawless execution and turnkey construction with premium materials.",
//       icon: "🏗️"
//     }
//   ];

//   // NEW: Dummy data hata kar Sanity se real data fetch kar rahe hain
//   const recentProjects = await client.fetch(query);

//   return (
//     <div>
//       {/* Auto-Slider Hero Section (Unchanged) */}
//       <HeroSection />

//       {/* Premium Services Section (Unchanged) */}
//       <section className="py-24 px-8 md:px-16 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h3 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">What We Do</h3>
//             <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Our Services</h2>
//             <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-6"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {services.map((service, index) => (
//               <div key={index} className="group border border-gray-100 bg-[#FAFAFA] p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center">
//                 <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
//                   {service.icon}
//                 </div>
//                 <h4 className="text-xl tracking-[0.1em] font-bold text-gray-900 mb-4 uppercase">{service.title}</h4>
//                 <p className="text-gray-600 leading-relaxed mb-8">{service.desc}</p>
//                 <Link href="/services" className="text-sm font-bold tracking-widest text-[#C5A059] border-b border-transparent group-hover:border-[#C5A059] transition-all duration-300">
//                   DISCOVER MORE →
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* UPDATED: Recent Projects Section with Sanity Data */}
//       <section className="py-24 px-8 md:px-16 bg-[#FAFAFA]">
//         <div className="max-w-7xl mx-auto">
          
//           <div className="text-center mb-16">
//             <h3 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Portfolio</h3>
//             <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Recent Works</h2>
//             <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-6"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {/* Sanity se aaye hue projects ko map kar rahe hain */}
//             {recentProjects.map((project) => (
//               <div key={project._id} className="group cursor-pointer">
//                 <div className="overflow-hidden relative h-80 w-full mb-6">
//                   <div 
//                     className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
//                     style={{ backgroundImage: `url('${project.img}')` }} // Sanity Image URL
//                   ></div>
//                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
//                 </div>
//                 <h3 className="text-[#C5A059] text-xs tracking-[0.2em] font-bold uppercase mb-2">{project.category}</h3>
//                 <h2 className="text-2xl font-serif text-gray-900 group-hover:text-[#C5A059] transition-colors">{project.title}</h2>
                
//                 {/* Agar PDF upload ki hai to button dikhega */}
//                 {project.pdfUrl && (
//                   <a 
//                     href={project.pdfUrl} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="inline-block mt-3 text-[10px] font-bold border-b border-gray-900 tracking-widest pb-1 hover:text-[#C5A059] hover:border-[#C5A059] transition-colors uppercase"
//                   >
//                     View Plan PDF
//                   </a>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Agar Sanity me koi project nahi hai to ye message dikhega */}
//           {recentProjects.length === 0 && (
//             <p className="text-center text-gray-500 tracking-widest mt-10">
//               NO PROJECTS UPLOADED YET. ADD SOME FROM /STUDIO.
//             </p>
//           )}

//           <div className="text-center mt-16">
//             <Link href="/projects" className="border-b-2 border-gray-900 text-gray-900 pb-1 tracking-[0.2em] text-sm font-bold hover:text-[#C5A059] hover:border-[#C5A059] transition-all duration-300">
//               VIEW ALL PROJECTS
//             </Link>
//           </div>

//         </div>
//       </section>

//       {/* Call to Action (Unchanged) */}
//       <section className="py-20 bg-[#F3F2EC] text-center px-6">
//         <h2 className="text-3xl font-serif text-gray-900 mb-6">Ready to start your dream project?</h2>
//         <Link href="/contact" className="inline-block bg-gray-900 text-white px-8 py-3 tracking-[0.2em] text-sm font-bold hover:bg-[#C5A059] transition-all duration-300">
//           GET A QUOTE
//         </Link>
//       </section>

//     </div>
//   );
// }








// import HeroSection from '../components/HeroSection';
// import Link from 'next/link';

// export default function Home() {
//   // Services Data
//   const services = [
//     {
//       title: "ARCHITECTURE",
//       desc: "Innovative and sustainable architectural designs that stand the test of time.",
//       icon: "🏛️"
//     },
//     {
//       title: "INTERIOR DESIGN",
//       desc: "Bespoke interior solutions creating spaces that reflect your luxury lifestyle.",
//       icon: "🛋️"
//     },
//     {
//       title: "CONSTRUCTION",
//       desc: "Flawless execution and turnkey construction with premium materials.",
//       icon: "🏗️"
//     }
//   ];

//   // Dummy Recent Projects Data (Baad me Sanity API se aayega)
//   const recentProjects = [
//     { title: "The Glass Villa", category: "Architecture", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80" },
//     { title: "Urban Oasis", category: "Interior Design", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80" },
//     { title: "Minimalist Workspace", category: "Commercial", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" }
//   ];

//   return (
//     <div>
//       {/* Auto-Slider Hero Section */}
//       <HeroSection />

//       {/* Premium Services Section */}
//       <section className="py-24 px-8 md:px-16 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h3 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">What We Do</h3>
//             <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Our Services</h2>
//             <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-6"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {services.map((service, index) => (
//               <div key={index} className="group border border-gray-100 bg-[#FAFAFA] p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center">
//                 <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
//                   {service.icon}
//                 </div>
//                 <h4 className="text-xl tracking-[0.1em] font-bold text-gray-900 mb-4 uppercase">{service.title}</h4>
//                 <p className="text-gray-600 leading-relaxed mb-8">{service.desc}</p>
//                 <Link href="/services" className="text-sm font-bold tracking-widest text-[#C5A059] border-b border-transparent group-hover:border-[#C5A059] transition-all duration-300">
//                   DISCOVER MORE →
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* NEW: Recent Projects Section */}
//       <section className="py-24 px-8 md:px-16 bg-[#FAFAFA]">
//         <div className="max-w-7xl mx-auto">
          
//           <div className="text-center mb-16">
//             <h3 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Portfolio</h3>
//             <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Recent Works</h2>
//             <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-6"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {recentProjects.map((project, index) => (
//               <div key={index} className="group cursor-pointer">
//                 <div className="overflow-hidden relative h-80 w-full mb-6">
//                   <div 
//                     className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
//                     style={{ backgroundImage: `url('${project.img}')` }}
//                   ></div>
//                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
//                 </div>
//                 <h3 className="text-[#C5A059] text-xs tracking-[0.2em] font-bold uppercase mb-2">{project.category}</h3>
//                 <h2 className="text-2xl font-serif text-gray-900 group-hover:text-[#C5A059] transition-colors">{project.title}</h2>
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-16">
//             <Link href="/projects" className="border-b-2 border-gray-900 text-gray-900 pb-1 tracking-[0.2em] text-sm font-bold hover:text-[#C5A059] hover:border-[#C5A059] transition-all duration-300">
//               VIEW ALL PROJECTS
//             </Link>
//           </div>

//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-20 bg-[#F3F2EC] text-center px-6">
//         <h2 className="text-3xl font-serif text-gray-900 mb-6">Ready to start your dream project?</h2>
//         <Link href="/contact" className="inline-block bg-gray-900 text-white px-8 py-3 tracking-[0.2em] text-sm font-bold hover:bg-[#C5A059] transition-all duration-300">
//           GET A QUOTE
//         </Link>
//       </section>

//     </div>
//   );
// }









// import HeroSection from '../components/HeroSection';
// import Link from 'next/link';

// export default function Home() {
//   // Services Data
//   const services = [
//     {
//       title: "ARCHITECTURE",
//       desc: "Innovative and sustainable architectural designs that stand the test of time.",
//       icon: "🏛️"
//     },
//     {
//       title: "INTERIOR DESIGN",
//       desc: "Bespoke interior solutions creating spaces that reflect your luxury lifestyle.",
//       icon: "🛋️"
//     },
//     {
//       title: "CONSTRUCTION",
//       desc: "Flawless execution and turnkey construction with premium materials.",
//       icon: "🏗️"
//     }
//   ];

//   return (
//     <div>
//       {/* Auto-Slider Hero Section */}
//       <HeroSection />

//       {/* Premium Services Section */}
//       <section className="py-24 px-8 md:px-16 bg-white">
//         <div className="max-w-7xl mx-auto">
          
//           {/* Section Header */}
//           <div className="text-center mb-16">
//             <h3 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">What We Do</h3>
//             <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Our Services</h2>
//             <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-6"></div>
//           </div>

//           {/* Services Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {services.map((service, index) => (
//               <div 
//                 key={index} 
//                 className="group border border-gray-100 bg-[#FAFAFA] p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center"
//               >
//                 <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
//                   {service.icon}
//                 </div>
//                 <h4 className="text-xl tracking-[0.1em] font-bold text-gray-900 mb-4 uppercase">
//                   {service.title}
//                 </h4>
//                 <p className="text-gray-600 leading-relaxed mb-8">
//                   {service.desc}
//                 </p>
//                 <Link 
//                   href="/services" 
//                   className="text-sm font-bold tracking-widest text-[#C5A059] border-b border-transparent group-hover:border-[#C5A059] transition-all duration-300"
//                 >
//                   DISCOVER MORE →
//                 </Link>
//               </div>
//             ))}
//           </div>
          
//         </div>
//       </section>

//       {/* Ek aur section call to action ke liye */}
//       <section className="py-20 bg-[#F3F2EC] text-center px-6">
//         <h2 className="text-3xl font-serif text-gray-900 mb-6">Ready to start your dream project?</h2>
//         <Link href="/contact" className="inline-block bg-gray-900 text-white px-8 py-3 tracking-[0.2em] text-sm font-bold hover:bg-[#C5A059] transition-all duration-300">
//           GET A QUOTE
//         </Link>
//       </section>

//     </div>
//   );
// }



// import HeroSection from '../components/HeroSection';

// export default function Home() {
//   return (
//     <div>
//       <HeroSection />
//       {/* Aage hum yahan "Our Services", "Recent Projects" slider add karenge */}
//     </div>
//   );
// }










// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center">
//       <h2 className="text-4xl md:text-6xl font-light mb-6 text-gray-900 tracking-wide">
//         WE DESIGN DREAMS.
//       </h2>
//       <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
//         End-to-end architecture, interiors, and turnkey construction solutions tailored for modern living.
//       </p>
//     </div>
//   );
// }


















// // src/app/page.js
// export default function Home() {
//   return (
//     <div className="min-h-screen bg-black text-white p-8">
//       <header className="flex justify-between items-center py-6 border-b border-gray-800">
//         <h1 className="text-3xl font-bold tracking-widest uppercase">S² Studio</h1>
//         <nav className="space-x-8 text-sm uppercase tracking-tighter">
//           <a href="#" className="hover:text-amber-500">Projects</a>
//           <a href="#" className="hover:text-amber-500">Services</a>
//           <button className="border border-amber-600 px-6 py-2 hover:bg-amber-600">Contact</button>
//         </nav>
//       </header>

//       <section className="py-20 text-center">
//         <h2 className="text-6xl font-light mb-6">WE DESIGN DREAMS.</h2>
//         <p className="text-gray-400 max-w-lg mx-auto">
//           End-to-end architecture, interiors and construction solutions.
//         </p>
//       </section>
//     </div>
//   );
// }