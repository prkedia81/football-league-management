'use client'
import Link from 'next/link'
import React, { use } from 'react'
import {usePathname} from 'next/navigation'

const Footer = () => {
  const pathname = usePathname();
  if(pathname.startsWith('/admin')) return null;
  else{
  return (
    <footer className="text-gray-300 bg-slate-600 body-font">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap md:text-left text-center -mb-8 -mx-4">
          {/* Contact Info */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-10">
            <h2 className="title-font font-bold text-white text-lg mb-1"><Link href="https://ifawb.in/" className='hover:underline'>IFA (WB)</Link></h2>
            <p>11/1, Sooterkin Street Kolkata - 700072</p><br/>
            <h2 className="title-font font-medium text-white tracking-widest text-sm mt-1 mb-1">E-MAIL</h2>
            <p>
              <a href="mailto:mediaifa1893@gmail.com" className="hover:text-sky-400">mediaifa1893@gmail.com</a>
            </p>
          </div>

          {/* Phone Numbers */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-10">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">PHONE NUMBERS</h2>
            <ul className="list-none">
              <li>033 3528 6779</li>
              <li>033 3508 2055</li>
              <li>033 2215 2207</li>
              <li>033 2225 2378</li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-10">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">LINKS</h2>
            <nav className="list-none">
              <li>
                <Link href="https://www.the-aiff.com/" className="text-gray-300 hover:text-white">AIFF</Link>
              </li>
              <li>
                <Link href="https://www.fifa.com/en" className="text-gray-300 hover:text-white">FIFA</Link>
              </li>
              <li>
                <Link href="https://ifawb.in/news-events.html" className="text-gray-300 hover:text-white">News</Link>
              </li>
              <li>
                <Link href="https://ifawb.in/talent-hunt.html" className="text-gray-300 hover:text-white">Talent Hunt</Link>
              </li>
            </nav>
          </div>

         {/* Social Media Links */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-10">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">SOCIAL</h2>
            <ul className="list-none">
              <li>
                <Link href="https://www.instagram.com/ifa.wb/" target="_blank" className="hover:text-sky-400">Instagram</Link>
              </li>
              <li>
                <Link href="https://www.youtube.com/channel/UCNa4rEtIB-3QlzA_St6fzGA" target="_blank" className="hover:text-sky-400">YouTube</Link>
              </li>
              <li>
                <Link href="https://www.facebook.com/ifa.wb/" target="_blank" className="hover:text-sky-400">Facebook</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-base text-gray-300 text-center mb-3">
         © {new Date().getFullYear()} - <Link href="https://ifawb.in/" className="hover:text-sky-400">Indian Football Association(IFA), WB</Link>. All rights reserved.
      </p>
      {/* Social Icons & Copyright */}
      <div className="border-t border-gray-500">
        <div className="container px-5 py-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-center sm:text-left"><Link href="https://jadavpuruniversity.in/" target='_blank' className="hover:underline">
            Developed by Jadavpur University </Link> <Link href='https://juinnovationstartup.jdvu.ac.in/index.html' target='_blank' className='hover:underline'>({"Institution's"} Innovation Council , IIC).</Link>
          </p>

          <span className="inline-flex mt-4 sm:mt-0 justify-center text-white text-sm sm:justify-start"> Developer: {""}
            <Link href="https://www.linkedin.com/in/prannay-kedia" target='_blank' className=" hover:underline mx-2">Prannay Kedia, </Link>
            <Link href="https://www.linkedin.com/in/kumarpiyushgupta" target='_blank' className=" hover:underline mx-2">Piyush Gupta</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
}

export default Footer