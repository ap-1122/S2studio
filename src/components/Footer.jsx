"use client"; // Animations ke liye zaroori hai

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    // motion.footer use kiya hai jisse scroll karne par animation trigger ho
    <motion.footer 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#F3F2EC] dark:bg-[#1A1A1A] pt-24 pb-10 px-8 md:px-16 border-t border-gray-300 dark:border-gray-800 text-gray-900 dark:text-gray-100 relative overflow-hidden transition-colors duration-700"
    >
      
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059] opacity-[0.03] dark:opacity-[0.05] rounded-bl-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 relative z-10">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1 pr-4">
          <h2 className="text-3xl font-serif tracking-widest text-gray-900 dark:text-white font-bold mb-6 transition-colors duration-700">
            S<span className="align-super text-lg text-[#C5A059]">2</span> STUDIO
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 text-justify transition-colors duration-700">
            Elevating spaces through innovative architecture, bespoke interiors, and flawless construction execution. Crafting reality from your dreams.
          </p>
        </div>

        {/* Quick Links with Premium Hover Effect */}
        <div>
          <h3 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-6 uppercase">Quick Links</h3>
          <ul className="space-y-4 text-sm font-medium tracking-widest uppercase text-gray-800 dark:text-gray-300">
            <li>
              <Link href="/" className="hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-all duration-300 flex items-center gap-2 group">
                <span className="w-0 group-hover:w-4 h-[1px] bg-[#C5A059] transition-all duration-300"></span> HOME
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-all duration-300 flex items-center gap-2 group">
                <span className="w-0 group-hover:w-4 h-[1px] bg-[#C5A059] transition-all duration-300"></span> PORTFOLIO
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-all duration-300 flex items-center gap-2 group">
                <span className="w-0 group-hover:w-4 h-[1px] bg-[#C5A059] transition-all duration-300"></span> SERVICES
              </Link>
            </li>
            <li>
              <Link href="/estimator" className="hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-all duration-300 flex items-center gap-2 group">
                <span className="w-0 group-hover:w-4 h-[1px] bg-[#C5A059] transition-all duration-300"></span> COST ESTIMATOR
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-all duration-300 flex items-center gap-2 group">
                <span className="w-0 group-hover:w-4 h-[1px] bg-[#C5A059] transition-all duration-300"></span> CONTACT US
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-6 uppercase">Reach Us</h3>
          <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light transition-colors duration-700">
            <li>
              <strong className="block text-gray-900 dark:text-white font-bold mb-1 tracking-widest text-xs uppercase transition-colors duration-700">Head Office</strong>
              Satna, Madhya Pradesh<br />
              India - 485001
            </li>
            <li className="pt-2 border-t border-gray-300 dark:border-gray-800 mt-4 transition-colors duration-700">
              <a href="mailto:s2studio.03@gmail.com" className="hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-colors flex items-center gap-2 mt-4">
                <span className="text-lg">✉</span> s2studio.03@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+919589303667" className="hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-colors flex items-center gap-2">
                <span className="text-lg">✆</span> +91 95893 03667
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-6 uppercase">Connect</h3>
          <div className="flex flex-col space-y-4">
            <a 
              href="https://www.instagram.com/arsachin_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-900 dark:text-gray-300 hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-all duration-300 tracking-widest text-sm font-bold flex items-center justify-between group border-b border-gray-300 dark:border-gray-800 pb-2 hover:border-[#C5A059] dark:hover:border-[#C5A059]"
            >
              INSTAGRAM
              <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/aditya-pratap-singh-aaa136274/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-900 dark:text-gray-300 hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-all duration-300 tracking-widest text-sm font-bold flex items-center justify-between group border-b border-gray-300 dark:border-gray-800 pb-2 hover:border-[#C5A059] dark:hover:border-[#C5A059]"
            >
              LINKEDIN
              <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </a>
          </div>
        </div>

      </div>
      
      {/* Copyright & Developer Credit */}
      <div className="text-center text-[10px] md:text-xs text-gray-500 dark:text-gray-500 tracking-[0.2em] border-t border-gray-300 dark:border-gray-800 pt-8 uppercase flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto transition-colors duration-700">
        <span>© {new Date().getFullYear()} S² STUDIO. ALL RIGHTS RESERVED.</span>
        <span className="mt-2 md:mt-0">DESIGNED & DEVELOPED WITH PRECISION BY <a href="https://www.linkedin.com/in/aditya-pratap-singh-aaa136274/" target="_blank" rel="noopener noreferrer" className="font-bold text-gray-900 dark:text-gray-300 hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-colors">ADITYA PRATAP SINGH</a>.</span>
      </div>
    </motion.footer>
  );
}








// import Link from 'next/link';

// export default function Footer() {
//   return (
//     <footer className="bg-[#F3F2EC] pt-24 pb-10 px-8 md:px-16 border-t border-gray-300 text-gray-900 relative overflow-hidden">
      
//       {/* Subtle Background Accent */}
//       <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059] opacity-[0.03] rounded-bl-full pointer-events-none"></div>

//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 relative z-10">
        
//         {/* Brand Column */}
//         <div className="col-span-1 md:col-span-1 pr-4">
//           <h2 className="text-3xl font-serif tracking-widest text-gray-900 font-bold mb-6">
//             S<span className="align-super text-lg">2</span> STUDIO
//           </h2>
//           <p className="text-sm leading-relaxed text-gray-600 text-justify">
//             Elevating spaces through innovative architecture, bespoke interiors, and flawless construction execution. Crafting reality from your dreams.
//           </p>
//         </div>

//         {/* Quick Links with Premium Hover Effect */}
//         <div>
//           <h3 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-6 uppercase">Quick Links</h3>
//           <ul className="space-y-4 text-sm font-medium tracking-widest uppercase">
//             <li>
//               <Link href="/" className="hover:text-[#C5A059] transition-all duration-300 flex items-center gap-2 group">
//                 <span className="w-0 group-hover:w-4 h-[1px] bg-[#C5A059] transition-all duration-300"></span> HOME
//               </Link>
//             </li>
//             <li>
//               <Link href="/projects" className="hover:text-[#C5A059] transition-all duration-300 flex items-center gap-2 group">
//                 <span className="w-0 group-hover:w-4 h-[1px] bg-[#C5A059] transition-all duration-300"></span> PORTFOLIO
//               </Link>
//             </li>
//             <li>
//               <Link href="/services" className="hover:text-[#C5A059] transition-all duration-300 flex items-center gap-2 group">
//                 <span className="w-0 group-hover:w-4 h-[1px] bg-[#C5A059] transition-all duration-300"></span> SERVICES
//               </Link>
//             </li>
//             <li>
//               <Link href="/estimator" className="hover:text-[#C5A059] transition-all duration-300 flex items-center gap-2 group">
//                 <span className="w-0 group-hover:w-4 h-[1px] bg-[#C5A059] transition-all duration-300"></span> COST ESTIMATOR
//               </Link>
//             </li>
//             <li>
//               <Link href="/contact" className="hover:text-[#C5A059] transition-all duration-300 flex items-center gap-2 group">
//                 <span className="w-0 group-hover:w-4 h-[1px] bg-[#C5A059] transition-all duration-300"></span> CONTACT US
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Contact Info */}
//         <div>
//           <h3 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-6 uppercase">Reach Us</h3>
//           <ul className="space-y-4 text-sm text-gray-600 leading-relaxed font-light">
//             <li>
//               <strong className="block text-gray-900 font-bold mb-1 tracking-widest text-xs uppercase">Head Office</strong>
//               Satna, Madhya Pradesh<br />
//               India - 485001
//             </li>
//             <li className="pt-2 border-t border-gray-300 mt-4">
//               <a href="mailto:s2studio.03@gmail.com" className="hover:text-[#C5A059] transition-colors flex items-center gap-2 mt-4">
//                 <span className="text-lg">✉</span> s2studio.03@gmail.com
//               </a>
//             </li>
//             <li>
//               <a href="tel:+919589303667" className="hover:text-[#C5A059] transition-colors flex items-center gap-2">
//                 <span className="text-lg">✆</span> +91 95893 03667
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Social Links */}
//         <div>
//           <h3 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-6 uppercase">Connect</h3>
//           <div className="flex flex-col space-y-4">
//             <a 
//               href="https://www.instagram.com/arsachin_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
//               target="_blank" 
//               rel="noopener noreferrer" 
//               className="text-gray-900 hover:text-[#C5A059] transition-all duration-300 tracking-widest text-sm font-bold flex items-center justify-between group border-b border-gray-300 pb-2 hover:border-[#C5A059]"
//             >
//               INSTAGRAM
//               <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
//             </a>
//             <a 
//               href="https://www.linkedin.com/in/aditya-pratap-singh-aaa136274/" 
//               target="_blank" 
//               rel="noopener noreferrer" 
//               className="text-gray-900 hover:text-[#C5A059] transition-all duration-300 tracking-widest text-sm font-bold flex items-center justify-between group border-b border-gray-300 pb-2 hover:border-[#C5A059]"
//             >
//               LINKEDIN
//               <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
//             </a>
//           </div>
//         </div>

//       </div>
      
//       {/* Copyright & Developer Credit */}
//       <div className="text-center text-[10px] md:text-xs text-gray-500 tracking-[0.2em] border-t border-gray-300 pt-8 uppercase flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
//         <span>© {new Date().getFullYear()} S² STUDIO. ALL RIGHTS RESERVED.</span>
//         <span className="mt-2 md:mt-0">DESIGNED & DEVELOPED WITH PRECISION BY <a href="https://www.linkedin.com/in/aditya-pratap-singh-aaa136274/" target="_blank" rel="noopener noreferrer" className="font-bold text-gray-900 hover:text-[#C5A059] transition-colors">ADITYA PRATAP SINGH</a>.</span>
//       </div>
//     </footer>
//   );
// }








// import Link from 'next/link';

// export default function Footer() {
//   return (
//     <footer className="bg-[#F3F2EC] pt-20 pb-10 px-8 md:px-16 border-t border-gray-200 text-gray-800">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
//         {/* Brand Column */}
//         <div className="col-span-1 md:col-span-1">
//           <h2 className="text-3xl font-serif tracking-widest text-gray-900 font-bold mb-6">
//             S<span className="align-super text-lg">2</span> STUDIO
//           </h2>
//           <p className="text-sm leading-relaxed text-gray-600">
//             Elevating spaces through innovative architecture, bespoke interiors, and flawless construction execution.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="text-[#C5A059] tracking-[0.2em] text-sm font-bold mb-6">QUICK LINKS</h3>
//           <ul className="space-y-4 text-sm font-medium tracking-wider">
//             <li><Link href="/" className="hover:text-[#C5A059] transition-colors">HOME</Link></li>
//             <li><Link href="/projects" className="hover:text-[#C5A059] transition-colors">PROJECT GALLERY</Link></li>
//             <li><Link href="/services" className="hover:text-[#C5A059] transition-colors">OUR SERVICES</Link></li>
//             <li><Link href="/contact" className="hover:text-[#C5A059] transition-colors">CONTACT US</Link></li>
//           </ul>
//         </div>

//         {/* Contact Info */}
//         <div>
//           <h3 className="text-[#C5A059] tracking-[0.2em] text-sm font-bold mb-6">REACH US</h3>
//           <ul className="space-y-4 text-sm text-gray-600 leading-relaxed">
//             <li>123, Premium Corporate Park,</li>
//             <li>New Delhi, India - 110001</li>
//             <li className="pt-2"><a href="mailto:hello@s2studio.com" className="hover:text-[#C5A059]">hello@s2studio.com</a></li>
//             <li><a href="tel:+919876543210" className="hover:text-[#C5A059]">+91 98765 43210</a></li>
//           </ul>
//         </div>

//         {/* Social / Newsletter */}
//         <div>
//           <h3 className="text-[#C5A059] tracking-[0.2em] text-sm font-bold mb-6">CONNECT</h3>
//           <div className="flex space-x-6">
//             <a href="#" className="text-gray-900 hover:text-[#C5A059] transition-colors">INSTAGRAM</a>
//             <a href="#" className="text-gray-900 hover:text-[#C5A059] transition-colors">LINKEDIN</a>
//           </div>
//         </div>

//       </div>
      
//       <div className="text-center text-xs text-gray-500 tracking-wider border-t border-gray-300 pt-8">
//         © {new Date().getFullYear()} S² STUDIO. ALL RIGHTS RESERVED. DESIGNED & DEVELOPED WITH PRECISION.
//       </div>
//     </footer>
//   );
// }