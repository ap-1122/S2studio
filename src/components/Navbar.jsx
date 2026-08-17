"use client"; // Ye zaroori hai kyunki hum useState use kar rahe hain
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Determine current theme for the icon
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <>
      {/* Dark mode background aur border add kiya */}
      <nav className="w-full bg-[#FAFAFA]/90 dark:bg-[#121212]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 py-6 px-8 md:px-16 flex justify-between items-center sticky top-0 z-50 transition-colors duration-700">
        
        {/* Logo Section */}
        <Link href="/">
          <h1 className="text-3xl md:text-5xl font-serif tracking-[0.2em] text-gray-900 dark:text-white font-bold cursor-pointer transition-colors duration-700">
            S<span className="align-super text-lg md:text-2xl text-[#C5A059]">2</span> STUDIO
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 lg:space-x-12 items-center text-sm lg:text-base tracking-[0.15em] text-gray-700 dark:text-gray-300 font-semibold">
          <Link href="/projects" className="hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-all duration-300">PROJECTS</Link>
          <Link href="/services" className="hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-all duration-300">SERVICES</Link>
          <Link href="/process" className="hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-all duration-300">PROCESS</Link>
        </div>

        {/* Right Side: Theme Toggle + Login + Contact + Mobile Menu */}
        <div className="flex items-center space-x-5 lg:space-x-6">
          
          {/* Theme Toggle Button (Premium Smooth Animation) */}
          {mounted && (
            <button
              onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-500 overflow-hidden group"
              aria-label="Toggle Dark Mode"
            >
              {currentTheme === 'dark' ? (
                <svg className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 transform group-hover:-rotate-12 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          )}

          {/* Admin Login (Chota aur premium) */}
          <Link href="/studio" className="hidden md:block text-xs tracking-[0.2em] text-gray-500 dark:text-gray-400 hover:text-[#C5A059] dark:hover:text-[#C5A059] font-medium transition-colors">
            LOGIN
          </Link>

          {/* Contact Button */}
          <Link href="/contact" className="hidden md:inline-block border-2 border-[#C5A059] text-[#C5A059] px-6 lg:px-8 py-3 hover:bg-[#C5A059] hover:text-white transition-all duration-500 tracking-[0.2em] text-xs lg:text-sm font-bold">
            CONTACT US
          </Link>
          
          {/* Hamburger Icon for Mobile/Tablet */}
          <button onClick={toggleSidebar} className="text-gray-900 dark:text-white focus:outline-none ml-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[60] transition-opacity" 
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar Panel (Dark mode setup done) */}
      <div className={`fixed top-0 right-0 h-full w-72 md:w-96 bg-[#FAFAFA] dark:bg-[#1A1A1A] z-[70] transform transition-transform duration-500 ease-in-out shadow-2xl ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Close Button */}
        <div className="flex justify-end p-6 border-b border-gray-200 dark:border-gray-800">
          <button onClick={toggleSidebar} className="text-gray-900 dark:text-gray-400 hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-colors duration-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col px-8 py-10 space-y-8 text-lg tracking-[0.2em] text-gray-900 dark:text-gray-200 font-semibold">
          <Link href="/" onClick={toggleSidebar} className="hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-colors">HOME</Link>
          <Link href="/projects" onClick={toggleSidebar} className="hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-colors">PROJECTS</Link>
          <Link href="/about" className="hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-colors">ARCHITECT PROFILE</Link>
          <Link href="/estimator" className="hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-colors flex items-center gap-2 group">
            COST ESTIMATOR 
            <span className="bg-[#C5A059] text-white text-[10px] px-2 py-0.5 rounded-full group-hover:animate-pulse">NEW</span>
          </Link>
          <Link href="/services" onClick={toggleSidebar} className="hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-colors">SERVICES</Link>
          <Link href="/process" onClick={toggleSidebar} className="hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-colors">PROCESS</Link>
          <Link href="/contact" onClick={toggleSidebar} className="hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-colors">CONTACT US</Link>
          
          <div className="border-t border-gray-300 dark:border-gray-800 pt-8 mt-8">
            <Link href="/studio" onClick={toggleSidebar} className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#C5A059] transition-colors">
              ADMIN LOGIN
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}








// "use client"; // Ye zaroori hai kyunki hum useState use kar rahe hain
// import Link from 'next/link';
// import { useState } from 'react';

// export default function Navbar() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <>
//       <nav className="w-full bg-[#FAFAFA]/90 backdrop-blur-md border-b border-gray-200 py-6 px-8 md:px-16 flex justify-between items-center sticky top-0 z-50">
        
//         {/* Logo Section */}
//         <Link href="/">
//           <h1 className="text-3xl md:text-5xl font-serif tracking-[0.2em] text-gray-900 font-bold cursor-pointer">
//             S<span className="align-super text-lg md:text-2xl">2</span> STUDIO
//           </h1>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-10 lg:space-x-12 items-center text-sm lg:text-base tracking-[0.15em] text-gray-700 font-semibold">
//           <Link href="/projects" className="hover:text-[#C5A059] transition-all duration-300">PROJECTS</Link>
//           <Link href="/services" className="hover:text-[#C5A059] transition-all duration-300">SERVICES</Link>
//           <Link href="/process" className="hover:text-[#C5A059] transition-all duration-300">PROCESS</Link>
//         </div>

//         {/* Right Side: Login + Contact + Mobile Menu */}
//         <div className="flex items-center space-x-6">
//           {/* Admin Login (Chota aur premium) */}
//           <Link href="/studio" className="hidden md:block text-xs tracking-[0.2em] text-gray-500 hover:text-[#C5A059] font-medium transition-colors">
//             LOGIN
//           </Link>

//           {/* Contact Button */}
//           <Link href="/contact" className="hidden md:inline-block border-2 border-[#C5A059] text-[#C5A059] px-6 lg:px-8 py-3 hover:bg-[#C5A059] hover:text-white transition-all duration-500 tracking-[0.2em] text-xs lg:text-sm font-bold">
//             CONTACT US
//           </Link>
          
//           {/* Hamburger Icon for Mobile/Tablet */}
//           <button onClick={toggleSidebar} className="text-gray-900 focus:outline-none ml-2">
//             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
//             </svg>
//           </button>
//         </div>
//       </nav>

//       {/* Sidebar Overlay (Jab menu khulega to background dark hoga) */}
//       {isSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black/40 z-[60] transition-opacity" 
//           onClick={toggleSidebar}
//         ></div>
//       )}

//       {/* Sidebar Panel (Right se slide hoke aayega) */}
//       <div className={`fixed top-0 right-0 h-full w-72 md:w-96 bg-[#FAFAFA] z-[70] transform transition-transform duration-500 ease-in-out shadow-2xl ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
//         {/* Close Button */}
//         <div className="flex justify-end p-6 border-b border-gray-200">
//           <button onClick={toggleSidebar} className="text-gray-900 hover:text-[#C5A059]">
//             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
//             </svg>
//           </button>
//         </div>

//         {/* Sidebar Links */}
//         <div className="flex flex-col px-8 py-10 space-y-8 text-lg tracking-[0.2em] text-gray-900 font-semibold">
//           <Link href="/" onClick={toggleSidebar} className="hover:text-[#C5A059] transition-colors">HOME</Link>
//           <Link href="/projects" onClick={toggleSidebar} className="hover:text-[#C5A059] transition-colors">PROJECTS</Link>
//           <Link href="/about" className="hover:text-[#C5A059] transition-colors">ARCHITECT PROFILE</Link>
//          <Link href="/estimator" className="hover:text-[#C5A059] transition-colors flex items-center gap-2">
//            COST ESTIMATOR <span className="bg-[#C5A059] text-white text-[10px] px-2 py-0.5 rounded-full">NEW</span>
//                </Link>
//           <Link href="/services" onClick={toggleSidebar} className="hover:text-[#C5A059] transition-colors">SERVICES</Link>
//           <Link href="/process" onClick={toggleSidebar} className="hover:text-[#C5A059] transition-colors">PROCESS</Link>
//           <Link href="/contact" onClick={toggleSidebar} className="hover:text-[#C5A059] transition-colors">CONTACT US</Link>
          
//           <div className="border-t border-gray-300 pt-8 mt-8">
//             <Link href="/studio" onClick={toggleSidebar} className="text-sm text-gray-500 hover:text-[#C5A059] transition-colors">
//               ADMIN LOGIN
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }











//  import Link from 'next/link';

// export default function Navbar() {
//   return (
//     <nav className="w-full bg-[#FAFAFA]/90 backdrop-blur-md border-b border-gray-200 py-6 px-8 md:px-16 flex justify-between items-center sticky top-0 z-50">
      
//       {/* Bada aur Premium Logo */}
//       <Link href="/">
//         <h1 className="text-3xl md:text-5xl font-serif tracking-[0.2em] text-gray-900 font-bold cursor-pointer">
//           S<span className="align-super text-lg md:text-2xl">2</span> STUDIO
//         </h1>
//       </Link>

//       {/* Bada aur Clear Menu */}
//       <div className="hidden md:flex space-x-12 items-center text-base md:text-lg tracking-[0.15em] text-gray-700 font-semibold">
//         <Link href="/projects" className="hover:text-[#C5A059] transition-all duration-300">PROJECTS</Link>
//         <Link href="/services" className="hover:text-[#C5A059] transition-all duration-300">SERVICES</Link>
//         <Link href="/process" className="hover:text-[#C5A059] transition-all duration-300">PROCESS</Link>
//       </div>

//       {/* Prominent Contact Button */}
//       <div className="flex items-center">
//         <Link href="/contact" className="hidden md:inline-block border-2 border-[#C5A059] text-[#C5A059] px-8 py-3 hover:bg-[#C5A059] hover:text-white transition-all duration-500 tracking-[0.2em] text-sm md:text-base font-bold">
//           CONTACT US
//         </Link>
        
//         {/* Mobile Menu Icon */}
//         <button className="md:hidden text-gray-900 focus:outline-none ml-4">
//           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
//           </svg>
//         </button>
//       </div>
//     </nav>
//   );
// }





// import Link from 'next/link';

// export default function Navbar() {
//   return (
//     // 'sticky top-0 z-50' se Navbar hamesha upar chipka rahega jab user scroll karega
//     <nav className="w-full bg-[#FAFAFA] border-b border-gray-200 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
      
//       {/* 1. Logo Section */}
//       <Link href="/">
//         <h1 className="text-2xl md:text-3xl font-serif tracking-widest text-gray-900 font-bold cursor-pointer">
//           S<span className="align-super text-sm md:text-base">2</span> STUDIO
//         </h1>
//       </Link>

//       {/* 2. Desktop Menu (Mobile mein hide rahega 'hidden md:flex') */}
//       <div className="hidden md:flex space-x-10 items-center text-sm tracking-widest text-gray-600 font-medium">
//         <Link href="/projects" className="hover:text-[#C5A059] transition-colors duration-300">PROJECTS</Link>
//         <Link href="/services" className="hover:text-[#C5A059] transition-colors duration-300">SERVICES</Link>
//         <Link href="/process" className="hover:text-[#C5A059] transition-colors duration-300">PROCESS</Link>
//       </div>

//       {/* 3. Contact Button & Mobile Hamburger Icon */}
//       <div className="flex items-center space-x-4">
//         {/* Desktop Contact Button */}
//         <Link href="/contact" className="hidden md:inline-block border border-[#C5A059] text-[#C5A059] px-6 py-2 hover:bg-[#C5A059] hover:text-white transition-all duration-300 tracking-wider text-sm">
//           CONTACT US
//         </Link>
        
//         {/* Mobile Menu Icon (Sirf choti screen par dikhega) */}
//         <button className="md:hidden text-gray-900 focus:outline-none">
//           <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
//           </svg>
//         </button>
//       </div>
      
//     </nav>
//   );
// }