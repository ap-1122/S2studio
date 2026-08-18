"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [buttonText, setButtonText] = useState("SUBMIT INQUIRY");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonText("SENDING...");
    setError("");

    const formData = new FormData(event.target);
    formData.append("access_key", "31bb57e3-91c6-49c0-ade7-e974d9626ac1"); 
    formData.append("subject", "New Project Inquiry - S2 Studio Website");
    formData.append("from_name", "S2 Studio Portfolio");

    // Extracting data specifically for our Sanity Dashboard
    const sanityData = {
      name: formData.get("Client Name"),
      email: formData.get("Email"),
      phone: formData.get("Phone") || "N/A",
      service: formData.get("Service Requested"),
      details: formData.get("Project Details"),
    };

    try {
      // 1. Save directly to Sanity Dashboard (Mini-CRM)
      try {
        await fetch('/api/save-contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sanityData)
        });
      } catch (sanityErr) {
        console.warn("Sanity save skipped/failed, proceeding to email...", sanityErr);
      }

      // 2. Send Email via Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setButtonText("MESSAGE SENT");
        event.target.reset(); 

        setTimeout(() => {
          setIsSuccess(false);
          setButtonText("SUBMIT INQUIRY");
        }, 5000);
      } else {
        setError(data.message);
        setButtonText("SUBMIT INQUIRY");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setButtonText("SUBMIT INQUIRY");
    }
  };

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#121212] min-h-screen pt-32 pb-24 transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Reach Out</h2>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-6 transition-colors duration-700">Get in Touch</h1>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-8"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg font-light transition-colors duration-700">
            Whether you have a clear vision or need inspiration, our team is ready to bring your dream architectural project to life.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-0 shadow-2xl dark:shadow-[#C5A059]/10 rounded-sm overflow-hidden">

          {/* Left Side: Premium Image & Contact Information (Slides from Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/5 relative bg-gray-900 dark:bg-black text-[#F3F2EC] p-12 flex flex-col justify-between overflow-hidden transition-colors duration-700"
          >
            {/* Background Image with Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-30"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')" }}
            ></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-serif mb-10 text-white">Contact Details</h3>

              <div className="space-y-10">
                <div>
                  <h4 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-3 uppercase">Headquarters</h4>
                  <p className="font-light leading-relaxed text-gray-300">
                    123, Premium Corporate Park,<br />
                    New Delhi, India - 110001
                  </p>
                </div>

                <div>
                  <h4 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-3 uppercase">Direct Contact</h4>
                  <p className="font-light leading-relaxed text-gray-300">
                    <a href="mailto:s2studio.03@gmail.com" className="hover:text-[#C5A059] transition-colors block">s2studio.03@gmail.com</a>
                    <a href="tel:+919876543210" className="hover:text-[#C5A059] transition-colors block mt-2">+91 98765 43210</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-20">
              <h4 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-4 uppercase">Follow Us</h4>
              <div className="flex gap-6 text-sm tracking-widest uppercase font-bold text-gray-300">
                <a href="#" className="hover:text-[#C5A059] transition-colors">Instagram</a>
                <a href="#" className="hover:text-[#C5A059] transition-colors">LinkedIn</a>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Inquiry Form (Slides from Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-3/5 bg-white dark:bg-[#1A1A1A] p-10 md:p-16 transition-colors duration-700"
          >
            <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-2 transition-colors duration-700">Send an Inquiry</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-10 text-sm">We typically respond within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 mb-2 uppercase font-bold transition-colors duration-700">Full Name</label>
                  <input type="text" name="Client Name" required className="w-full border-b border-gray-300 dark:border-gray-700 py-3 focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] transition-colors bg-transparent text-gray-700 dark:text-white" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 mb-2 uppercase font-bold transition-colors duration-700">Email Address</label>
                  <input type="email" name="Email" required className="w-full border-b border-gray-300 dark:border-gray-700 py-3 focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] transition-colors bg-transparent text-gray-700 dark:text-white" placeholder="john@example.com" />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 mb-2 uppercase font-bold transition-colors duration-700">Phone Number (Optional)</label>
                <input type="tel" name="Phone" className="w-full border-b border-gray-300 dark:border-gray-700 py-3 focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] transition-colors bg-transparent text-gray-700 dark:text-white" placeholder="+91 98765 43210" />
              </div>

              <div>
                <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 mb-2 uppercase font-bold transition-colors duration-700">Service Required</label>
                <select name="Service Requested" required className="w-full border-b border-gray-300 dark:border-gray-700 py-3 focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] transition-colors bg-transparent text-gray-700 dark:text-white">
                  <option value="Architecture Design" className="dark:bg-[#1A1A1A]">Architecture Design</option>
                  <option value="Interior Design" className="dark:bg-[#1A1A1A]">Interior Design</option>
                  <option value="Turnkey Construction" className="dark:bg-[#1A1A1A]">Turnkey Construction</option>
                  <option value="Commercial Project" className="dark:bg-[#1A1A1A]">Commercial Project</option>
                  <option value="Other" className="dark:bg-[#1A1A1A]">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 mb-2 uppercase font-bold transition-colors duration-700">Project Details</label>
                <textarea name="Project Details" required rows="4" className="w-full border-b border-gray-300 dark:border-gray-700 py-3 focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] transition-colors bg-transparent resize-none text-gray-700 dark:text-white" placeholder="Tell us about your plot size, location, and vision..."></textarea>
              </div>

              {isSuccess && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-400 p-4 border border-green-200 dark:border-green-800 text-sm tracking-wide font-bold rounded-sm">
                  Thank you! Your message has been sent successfully. We will contact you soon.
                </motion.div>
              )}
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-400 p-4 border border-red-200 dark:border-red-800 text-sm tracking-wide rounded-sm">
                  {error}
                </motion.div>
              )}

              <button 
                type="submit" 
                disabled={buttonText === "SENDING..."}
                className="bg-gray-900 dark:bg-[#C5A059] text-white px-10 py-4 tracking-[0.2em] text-sm font-bold hover:bg-[#C5A059] dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 w-full md:w-auto disabled:opacity-70 rounded-sm shadow-md"
              >
                {buttonText}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}













// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function ContactPage() {
//   const [buttonText, setButtonText] = useState("SUBMIT INQUIRY");
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setButtonText("SENDING...");
//     setError("");

//     const formData = new FormData(event.target);
//     formData.append("access_key", "31bb57e3-91c6-49c0-ade7-e974d9626ac1"); 
//     formData.append("subject", "New Project Inquiry - S2 Studio Website");
//     formData.append("from_name", "S2 Studio Portfolio");

//     try {
//       const response = await fetch("https://api.web3forms.com/submit", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (data.success) {
//         setIsSuccess(true);
//         setButtonText("MESSAGE SENT");
//         event.target.reset(); 

//         setTimeout(() => {
//           setIsSuccess(false);
//           setButtonText("SUBMIT INQUIRY");
//         }, 5000);
//       } else {
//         setError(data.message);
//         setButtonText("SUBMIT INQUIRY");
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//       setButtonText("SUBMIT INQUIRY");
//     }
//   };

//   return (
//     <div className="bg-[#FAFAFA] dark:bg-[#121212] min-h-screen pt-32 pb-24 transition-colors duration-700">
//       <div className="max-w-7xl mx-auto px-6 md:px-12">

//         {/* Page Header */}
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="text-center mb-20"
//         >
//           <h2 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Reach Out</h2>
//           <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-6 transition-colors duration-700">Get in Touch</h1>
//           <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-8"></div>
//           <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg font-light transition-colors duration-700">
//             Whether you have a clear vision or need inspiration, our team is ready to bring your dream architectural project to life.
//           </p>
//         </motion.div>

//         <div className="flex flex-col lg:flex-row gap-0 shadow-2xl dark:shadow-[#C5A059]/10 rounded-sm overflow-hidden">

//           {/* Left Side: Premium Image & Contact Information (Slides from Left) */}
//           <motion.div 
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="w-full lg:w-2/5 relative bg-gray-900 dark:bg-black text-[#F3F2EC] p-12 flex flex-col justify-between overflow-hidden transition-colors duration-700"
//           >
//             {/* Background Image with Overlay */}
//             <div 
//               className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-30"
//               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')" }}
//             ></div>

//             <div className="relative z-10">
//               <h3 className="text-2xl font-serif mb-10 text-white">Contact Details</h3>

//               <div className="space-y-10">
//                 <div>
//                   <h4 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-3 uppercase">Headquarters</h4>
//                   <p className="font-light leading-relaxed text-gray-300">
//                     123, Premium Corporate Park,<br />
//                     New Delhi, India - 110001
//                   </p>
//                 </div>

//                 <div>
//                   <h4 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-3 uppercase">Direct Contact</h4>
//                   <p className="font-light leading-relaxed text-gray-300">
//                     <a href="mailto:s2studio.03@gmail.com" className="hover:text-[#C5A059] transition-colors block">s2studio.03@gmail.com</a>
//                     <a href="tel:+919876543210" className="hover:text-[#C5A059] transition-colors block mt-2">+91 98765 43210</a>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="relative z-10 mt-20">
//               <h4 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-4 uppercase">Follow Us</h4>
//               <div className="flex gap-6 text-sm tracking-widest uppercase font-bold text-gray-300">
//                 <a href="#" className="hover:text-[#C5A059] transition-colors">Instagram</a>
//                 <a href="#" className="hover:text-[#C5A059] transition-colors">LinkedIn</a>
//               </div>
//             </div>
//           </motion.div>

//           {/* Right Side: Inquiry Form (Slides from Right) */}
//           <motion.div 
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="w-full lg:w-3/5 bg-white dark:bg-[#1A1A1A] p-10 md:p-16 transition-colors duration-700"
//           >
//             <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-2 transition-colors duration-700">Send an Inquiry</h2>
//             <p className="text-gray-500 dark:text-gray-400 mb-10 text-sm">We typically respond within 24 hours.</p>

//             <form onSubmit={handleSubmit} className="space-y-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div>
//                   <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 mb-2 uppercase font-bold transition-colors duration-700">Full Name</label>
//                   <input type="text" name="Client Name" required className="w-full border-b border-gray-300 dark:border-gray-700 py-3 focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] transition-colors bg-transparent text-gray-700 dark:text-white" placeholder="John Doe" />
//                 </div>
//                 <div>
//                   <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 mb-2 uppercase font-bold transition-colors duration-700">Email Address</label>
//                   <input type="email" name="Email" required className="w-full border-b border-gray-300 dark:border-gray-700 py-3 focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] transition-colors bg-transparent text-gray-700 dark:text-white" placeholder="john@example.com" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 mb-2 uppercase font-bold transition-colors duration-700">Phone Number (Optional)</label>
//                 <input type="tel" name="Phone" className="w-full border-b border-gray-300 dark:border-gray-700 py-3 focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] transition-colors bg-transparent text-gray-700 dark:text-white" placeholder="+91 98765 43210" />
//               </div>

//               <div>
//                 <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 mb-2 uppercase font-bold transition-colors duration-700">Service Required</label>
//                 <select name="Service Requested" required className="w-full border-b border-gray-300 dark:border-gray-700 py-3 focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] transition-colors bg-transparent text-gray-700 dark:text-white">
//                   <option value="Architecture Design" className="dark:bg-[#1A1A1A]">Architecture Design</option>
//                   <option value="Interior Design" className="dark:bg-[#1A1A1A]">Interior Design</option>
//                   <option value="Turnkey Construction" className="dark:bg-[#1A1A1A]">Turnkey Construction</option>
//                   <option value="Commercial Project" className="dark:bg-[#1A1A1A]">Commercial Project</option>
//                   <option value="Other" className="dark:bg-[#1A1A1A]">Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-xs tracking-widest text-gray-900 dark:text-gray-300 mb-2 uppercase font-bold transition-colors duration-700">Project Details</label>
//                 <textarea name="Project Details" required rows="4" className="w-full border-b border-gray-300 dark:border-gray-700 py-3 focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] transition-colors bg-transparent resize-none text-gray-700 dark:text-white" placeholder="Tell us about your plot size, location, and vision..."></textarea>
//               </div>

//               {isSuccess && (
//                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-400 p-4 border border-green-200 dark:border-green-800 text-sm tracking-wide font-bold rounded-sm">
//                   Thank you! Your message has been sent successfully. We will contact you soon.
//                 </motion.div>
//               )}
//               {error && (
//                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-400 p-4 border border-red-200 dark:border-red-800 text-sm tracking-wide rounded-sm">
//                   {error}
//                 </motion.div>
//               )}

//               <button 
//                 type="submit" 
//                 disabled={buttonText === "SENDING..."}
//                 className="bg-gray-900 dark:bg-[#C5A059] text-white px-10 py-4 tracking-[0.2em] text-sm font-bold hover:bg-[#C5A059] dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 w-full md:w-auto disabled:opacity-70 rounded-sm shadow-md"
//               >
//                 {buttonText}
//               </button>
//             </form>
//           </motion.div>

//         </div>
//       </div>
//     </div>
//   );
// }









// "use client";

// import { useState } from "react";

// export default function ContactPage() {
//   const [buttonText, setButtonText] = useState("SUBMIT INQUIRY");
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setButtonText("SENDING...");
//     setError("");

//     const formData = new FormData(event.target);
    
//     // Your specific Web3Forms Access Key
//     formData.append("access_key", "31bb57e3-91c6-49c0-ade7-e974d9626ac1"); 
    
//     // Hidden fields to make the email format look highly professional
//     formData.append("subject", "New Project Inquiry - S2 Studio Website");
//     formData.append("from_name", "S2 Studio Portfolio");

//     try {
//       const response = await fetch("https://api.web3forms.com/submit", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (data.success) {
//         setIsSuccess(true);
//         setButtonText("MESSAGE SENT");
//         event.target.reset(); // Clears the form fields
        
//         // Reset the success message after 5 seconds
//         setTimeout(() => {
//           setIsSuccess(false);
//           setButtonText("SUBMIT INQUIRY");
//         }, 5000);
//       } else {
//         setError(data.message);
//         setButtonText("SUBMIT INQUIRY");
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//       setButtonText("SUBMIT INQUIRY");
//     }
//   };

//   return (
//     <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24">
//       <div className="max-w-7xl mx-auto px-6 md:px-12">
        
//         {/* Page Header */}
//         <div className="text-center mb-20">
//           <h2 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Reach Out</h2>
//           <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Get in Touch</h1>
//           <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-8"></div>
//           <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
//             Whether you have a clear vision or need inspiration, our team is ready to bring your dream architectural project to life.
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-0 shadow-2xl">
          
//           {/* Left Side: Premium Image & Contact Information */}
//           <div className="w-full lg:w-2/5 relative bg-gray-900 text-[#F3F2EC] p-12 flex flex-col justify-between overflow-hidden">
//             {/* Background Image with Overlay */}
//             <div 
//               className="absolute inset-0 bg-cover bg-center opacity-20"
//               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')" }}
//             ></div>
            
//             <div className="relative z-10">
//               <h3 className="text-2xl font-serif mb-10 text-white">Contact Details</h3>
              
//               <div className="space-y-10">
//                 <div>
//                   <h4 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-3 uppercase">Headquarters</h4>
//                   <p className="font-light leading-relaxed text-gray-300">
//                     123, Premium Corporate Park,<br />
//                     New Delhi, India - 110001
//                   </p>
//                 </div>
                
//                 <div>
//                   <h4 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-3 uppercase">Direct Contact</h4>
//                   <p className="font-light leading-relaxed text-gray-300">
//                     <a href="mailto:s2studio.03@gmail.com" className="hover:text-white transition-colors block">s2studio.03@gmail.com</a>
//                     <a href="tel:+919876543210" className="hover:text-white transition-colors block mt-2">+91 98765 43210</a>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="relative z-10 mt-20">
//               <h4 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-4 uppercase">Follow Us</h4>
//               <div className="flex gap-6 text-sm tracking-widest uppercase font-bold text-gray-300">
//                 <a href="#" className="hover:text-white transition-colors">Instagram</a>
//                 <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
//               </div>
//             </div>
//           </div>

//           {/* Right Side: Inquiry Form */}
//           <div className="w-full lg:w-3/5 bg-white p-10 md:p-16">
//             <h2 className="text-3xl font-serif text-gray-900 mb-2">Send an Inquiry</h2>
//             <p className="text-gray-500 mb-10 text-sm">We typically respond within 24 hours.</p>
            
//             <form onSubmit={handleSubmit} className="space-y-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div>
//                   <label className="block text-xs tracking-widest text-gray-900 mb-2 uppercase font-bold">Full Name</label>
//                   <input type="text" name="Client Name" required className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#C5A059] transition-colors bg-transparent text-gray-700" placeholder="John Doe" />
//                 </div>
//                 <div>
//                   <label className="block text-xs tracking-widest text-gray-900 mb-2 uppercase font-bold">Email Address</label>
//                   <input type="email" name="Email" required className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#C5A059] transition-colors bg-transparent text-gray-700" placeholder="john@example.com" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs tracking-widest text-gray-900 mb-2 uppercase font-bold">Phone Number (Optional)</label>
//                 <input type="tel" name="Phone" className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#C5A059] transition-colors bg-transparent text-gray-700" placeholder="+91 98765 43210" />
//               </div>
              
//               <div>
//                 <label className="block text-xs tracking-widest text-gray-900 mb-2 uppercase font-bold">Service Required</label>
//                 <select name="Service Requested" required className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#C5A059] transition-colors bg-transparent text-gray-700">
//                   <option value="Architecture Design">Architecture Design</option>
//                   <option value="Interior Design">Interior Design</option>
//                   <option value="Turnkey Construction">Turnkey Construction</option>
//                   <option value="Commercial Project">Commercial Project</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-xs tracking-widest text-gray-900 mb-2 uppercase font-bold">Project Details</label>
//                 <textarea name="Project Details" required rows="4" className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#C5A059] transition-colors bg-transparent resize-none text-gray-700" placeholder="Tell us about your plot size, location, and vision..."></textarea>
//               </div>

//               {/* Success / Error Messages */}
//               {isSuccess && (
//                 <div className="bg-green-50 text-green-800 p-4 border border-green-200 text-sm tracking-wide font-bold">
//                   Thank you! Your message has been sent successfully. We will contact you soon.
//                 </div>
//               )}
//               {error && (
//                 <div className="bg-red-50 text-red-800 p-4 border border-red-200 text-sm tracking-wide">
//                   {error}
//                 </div>
//               )}

//               <button 
//                 type="submit" 
//                 disabled={buttonText === "SENDING..."}
//                 className="bg-gray-900 text-white px-10 py-4 tracking-[0.2em] text-sm font-bold hover:bg-[#C5A059] transition-all duration-300 w-full md:w-auto disabled:opacity-70"
//               >
//                 {buttonText}
//               </button>
//             </form>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }












// "use client"; // Required for handling form submissions

// import { useState } from "react";
// import Link from "next/link";

// export default function ContactPage() {
//   const [buttonText, setButtonText] = useState("SUBMIT INQUIRY");
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState("");

//   // Function to handle sending the email
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setButtonText("SENDING...");
//     setError("");

//     const formData = new FormData(event.target);
    
//     // ⚠️ PASTE YOUR WEB3FORMS ACCESS KEY HERE ⚠️
//     formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); 

//     try {
//       const response = await fetch("https://api.web3forms.com/submit", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (data.success) {
//         setIsSuccess(true);
//         setButtonText("MESSAGE SENT");
//         event.target.reset(); // Clear the form
        
//         // Reset success message after 5 seconds
//         setTimeout(() => {
//           setIsSuccess(false);
//           setButtonText("SUBMIT INQUIRY");
//         }, 5000);
//       } else {
//         setError(data.message);
//         setButtonText("SUBMIT INQUIRY");
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//       setButtonText("SUBMIT INQUIRY");
//     }
//   };

//   return (
//     <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24">
//       <div className="max-w-7xl mx-auto px-6 md:px-12">
        
//         {/* Page Header */}
//         <div className="text-center mb-20">
//           <h2 className="text-[#C5A059] tracking-[0.3em] text-sm font-bold mb-4 uppercase">Reach Out</h2>
//           <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Get in Touch</h1>
//           <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-8"></div>
//           <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
//             Whether you have a clear vision or need inspiration, our team is ready to bring your dream architectural project to life.
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-0 shadow-2xl">
          
//           {/* Left Side: Premium Image & Contact Information */}
//           <div className="w-full lg:w-2/5 relative bg-gray-900 text-[#F3F2EC] p-12 flex flex-col justify-between overflow-hidden">
//             {/* Background Image with Overlay */}
//             <div 
//               className="absolute inset-0 bg-cover bg-center opacity-20"
//               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')" }}
//             ></div>
            
//             <div className="relative z-10">
//               <h3 className="text-2xl font-serif mb-10 text-white">Contact Details</h3>
              
//               <div className="space-y-10">
//                 <div>
//                   <h4 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-3 uppercase">Headquarters</h4>
//                   <p className="font-light leading-relaxed text-gray-300">
//                     123, Premium Corporate Park,<br />
//                     New Delhi, India - 110001
//                   </p>
//                 </div>
                
//                 <div>
//                   <h4 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-3 uppercase">Direct Contact</h4>
//                   <p className="font-light leading-relaxed text-gray-300">
//                     <a href="mailto:hello@s2studio.com" className="hover:text-white transition-colors block">hello@s2studio.com</a>
//                     <a href="tel:+919876543210" className="hover:text-white transition-colors block mt-2">+91 98765 43210</a>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="relative z-10 mt-20">
//               <h4 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-4 uppercase">Follow Us</h4>
//               <div className="flex gap-6 text-sm tracking-widest uppercase font-bold text-gray-300">
//                 <a href="#" className="hover:text-white transition-colors">Instagram</a>
//                 <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
//               </div>
//             </div>
//           </div>

//           {/* Right Side: Inquiry Form */}
//           <div className="w-full lg:w-3/5 bg-white p-10 md:p-16">
//             <h2 className="text-3xl font-serif text-gray-900 mb-2">Send an Inquiry</h2>
//             <p className="text-gray-500 mb-10 text-sm">We typically respond within 24 hours.</p>
            
//             <form onSubmit={handleSubmit} className="space-y-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div>
//                   <label className="block text-xs tracking-widest text-gray-900 mb-2 uppercase font-bold">Full Name</label>
//                   <input type="text" name="name" required className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#C5A059] transition-colors bg-transparent text-gray-700" placeholder="John Doe" />
//                 </div>
//                 <div>
//                   <label className="block text-xs tracking-widest text-gray-900 mb-2 uppercase font-bold">Email Address</label>
//                   <input type="email" name="email" required className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#C5A059] transition-colors bg-transparent text-gray-700" placeholder="john@example.com" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs tracking-widest text-gray-900 mb-2 uppercase font-bold">Phone Number (Optional)</label>
//                 <input type="tel" name="phone" className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#C5A059] transition-colors bg-transparent text-gray-700" placeholder="+91 98765 43210" />
//               </div>
              
//               <div>
//                 <label className="block text-xs tracking-widest text-gray-900 mb-2 uppercase font-bold">Service Required</label>
//                 <select name="service" required className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#C5A059] transition-colors bg-transparent text-gray-700">
//                   <option value="Architecture Design">Architecture Design</option>
//                   <option value="Interior Design">Interior Design</option>
//                   <option value="Turnkey Construction">Turnkey Construction</option>
//                   <option value="Commercial Project">Commercial Project</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-xs tracking-widest text-gray-900 mb-2 uppercase font-bold">Project Details</label>
//                 <textarea name="message" required rows="4" className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#C5A059] transition-colors bg-transparent resize-none text-gray-700" placeholder="Tell us about your plot size, location, and vision..."></textarea>
//               </div>

//               {/* Success / Error Messages */}
//               {isSuccess && (
//                 <div className="bg-green-50 text-green-800 p-4 border border-green-200 text-sm tracking-wide">
//                   Thank you! Your message has been sent successfully. We will contact you soon.
//                 </div>
//               )}
//               {error && (
//                 <div className="bg-red-50 text-red-800 p-4 border border-red-200 text-sm tracking-wide">
//                   {error}
//                 </div>
//               )}

//               <button 
//                 type="submit" 
//                 disabled={buttonText === "SENDING..."}
//                 className="bg-gray-900 text-white px-10 py-4 tracking-[0.2em] text-sm font-bold hover:bg-[#C5A059] transition-all duration-300 w-full md:w-auto disabled:opacity-70"
//               >
//                 {buttonText}
//               </button>
//             </form>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }









// export default function ContactPage() {
//   return (
//     <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24">
//       <div className="max-w-6xl mx-auto px-6 md:px-12">
        
//         {/* Page Header */}
//         <div className="text-center mb-20">
//           <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Get in Touch</h1>
//           <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
//             Whether you have a clear vision or need inspiration, our team is ready to bring your dream project to life.
//           </p>
//         </div>

//         <div className="flex flex-col md:flex-row gap-16">
          
//           {/* Left Side: Contact Information */}
//           <div className="w-full md:w-1/3 space-y-12">
//             <div>
//               <h3 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-4 uppercase">Headquarters</h3>
//               <p className="text-gray-700 font-light leading-relaxed">
//                 123, Premium Corporate Park,<br />
//                 New Delhi, India - 110001
//               </p>
//             </div>
            
//             <div>
//               <h3 className="text-[#C5A059] tracking-[0.2em] text-xs font-bold mb-4 uppercase">Direct Contact</h3>
//               <p className="text-gray-700 font-light leading-relaxed">
//                 <a href="mailto:hello@s2studio.com" className="hover:text-[#C5A059] transition-colors block">hello@s2studio.com</a>
//                 <a href="tel:+919876543210" className="hover:text-[#C5A059] transition-colors block mt-1">+91 98765 43210</a>
//               </p>
//             </div>
//           </div>

//           {/* Right Side: Inquiry Form */}
//           <div className="w-full md:w-2/3 bg-white p-8 md:p-12 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100">
//             <h2 className="text-2xl font-serif text-gray-900 mb-8">Send an Inquiry</h2>
//             <form className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">Full Name</label>
//                   <input type="text" className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#C5A059] transition-colors bg-transparent" placeholder="John Doe" />
//                 </div>
//                 <div>
//                   <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">Email Address</label>
//                   <input type="email" className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#C5A059] transition-colors bg-transparent" placeholder="john@example.com" />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">Service Required</label>
//                 <select className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#C5A059] transition-colors bg-transparent text-gray-700">
//                   <option>Architecture Design</option>
//                   <option>Interior Design</option>
//                   <option>Turnkey Construction</option>
//                   <option>Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">Message</label>
//                 <textarea rows="4" className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#C5A059] transition-colors bg-transparent resize-none" placeholder="Tell us about your project..."></textarea>
//               </div>

//               <button type="button" className="bg-gray-900 text-white px-10 py-4 tracking-[0.2em] text-sm font-bold hover:bg-[#C5A059] transition-all duration-300 w-full md:w-auto mt-4">
//                 SUBMIT INQUIRY
//               </button>
//             </form>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }