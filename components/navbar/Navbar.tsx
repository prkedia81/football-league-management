import React from 'react'

const navigation = [
    { name: 'Table', href: '#', svg: 'table' },
    { name: 'Matches', href: '#',svg: 'matches' },
    { name: 'Notice', href: '#' ,svg: 'notice'},
  ]
const Navbar = () => {
  return (
  <>
    <div className="relative pt-6 pb-16 sm:pb-24">
    <nav
   className="sticky top-0 z-50 bg-white shadow-md md:bg-transparent md:shadow-none"
   style={{ backdropFilter: 'blur(10px)' }}
   aria-label="Global"
     >
       </nav>
     </div>
    </>
  )
}

export default Navbar