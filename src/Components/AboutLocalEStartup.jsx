

import React from 'react'
import AllTech from "/sudha.png";

const AboutLocalEStartup = () => {
  return (
   <section className="pt-28 pb-28 bg-sky-50 ">
     <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row md:flex-col items-center md:items-center">
       
       {/* Mobile Heading */}
       <div className="w-full text-center lg:hidden mb-6">
         <h2
           className="relative inline-block text-4xl font-bold text-sky-500">
           About Us
         </h2>
       </div>
   
       {/* Image Section */}
       <div className="md:w-1/3 flex justify-center md:justify-start items-center">
         <img
           src={AllTech}
           alt="Logo"
           className=""
         />
       </div>
   
       {/* Text Section */}
       <div className="md:w-2/3 text-center md:text-left md:pl-12 mt-6 md:mt-0 mb-16 flex flex-col justify-center">
         <h2
           className="relative hidden md:hidden lg:inline-block text-4xl font-bold text-sky-500">
           About Us
         </h2>
         <p className="mt-4 text-lg text-gray-700 text-justify">
           Hi, I'm <strong>Sudhakar</strong> – a passionate freelancer and software developer who loves building
           real-world solutions. My journey began on <strong>December 17, 2024</strong> while working on my
           college project. From that day onwards, I discovered my interest in creating and learning through
           hands-on projects.
           <br /><br />
           Currently, I work at a software company where I contribute to impactful projects and sharpen my
           technical skills. At the same time, I continue freelancing to explore new technologies and deliver
           value to businesses and individuals.
           <br /><br />
           Freelancing gives me the opportunity to work on diverse ideas, learn continuously, and build
           innovative solutions tailored to client needs. Whether it's web development, software solutions,
           or creating user-focused digital experiences – I love helping people bring their ideas to life.
           <br /><br />
           My mission is simple: <strong>learn, build, and grow – together with my clients</strong>. Every project
           I take on is a chance to make an impact and help others achieve their goals while enhancing my
           own expertise.
         </p>
       </div>
     </div>
   </section>
  )
}

export default AboutLocalEStartup;