import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'


const Navbar = () => {
      // <header className="relative pt-6 pb-16 sm:pb-24">
    // <div className ="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center text-white">
    // <Link href='/' className ="flex title-font font-medium items-center text-white mb-4 md:mb-0">
  return (

    <header className="relative pt-2 pb-16 sm:pb-24">
    <div className="container mx-auto flex flex-wrap p-5 flex-row gap-1 md:flex-row items-center text-white" style={{ flexWrap: 'nowrap' }}>
        <Link href='/' className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className ="w-10 h-10 text-white p-2 bg-sky-800 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span className ="ml-3 text-xl">CFL</span>
    </Link>
    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
    {/* Hide these links on small screens and show icons instead */}
    <div className="hidden md:flex">
        <Link href='#' className="mr-5 hover:text-cyan-400">Matches</Link>
        <Link href='/table' className="mr-5 hover:text-cyan-400">Table</Link>
        <Link href='#' className="mr-5 hover:text-cyan-400">Notice</Link>
    </div>
    {/* Show icons on small screens */}
    <div className="md:hidden flex">
        {/* Replace these with your icon components */}
        <Link href='#'>
        <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="24"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm200-500 54-18 16-54q-32-48-77-82.5T574-786l-54 38v56l160 112Zm-400 0 160-112v-56l-54-38q-54 17-99 51.5T210-652l16 54 54 18Zm-42 308 46-4 30-54-58-174-56-20-40 30q0 65 18 118.5T238-272Zm242 112q26 0 51-4t49-12l28-60-26-44H378l-26 44 28 60q24 8 49 12t51 4Zm-90-200h180l56-160-146-102-144 102 54 160Zm332 88q42-50 60-103.5T800-494l-40-28-56 18-58 174 30 54 46 4Z"/></svg>
        </Link>
        <Link href='/table'>
        <svg className ="w-[26px] h-[26px]  text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
         <path fillRule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm2 8v-2h7v2H4Zm0 2v2h7v-2H4Zm9 2h7v-2h-7v2Zm7-4v-2h-7v2h7Z" clipRule="evenodd"/>
        </svg>
        </Link>
        <Link href='#'>
        <svg className="w-[26px] h-[26px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11.5c.07 0 .14-.007.207-.021.095.014.193.021.293.021h2a2 2 0 0 0 2-2V7a1 1 0 0 0-1-1h-1a1 1 0 1 0 0 2v11h-2V5a2 2 0 0 0-2-2H5Zm7 4a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm-6 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1ZM7 6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7Zm1 3V8h1v1H8Z" clipRule="evenodd"/>
        </svg>
        </Link>
    </div>
     </nav>
    <Link href='/login'><Button>IFA Login</Button></Link>
     </div>
     </header>
  )
}

export default Navbar