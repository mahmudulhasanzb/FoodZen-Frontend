'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks= [
  { label: 'Home', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="w-full relative z-50 bg-transparent py-4 px-6 md:px-12 flex items-center justify-between">
      {/* Brand Logo - Left Side */}
      <Link href="/" className="flex items-center gap-2 group cursor-pointer select-none">
        <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
          Food<span className="text-red-600">Zen</span>
        </span>
      </Link>

      {/* Middle Navigation Routes - Desktop */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`font-semibold text-base transition-colors duration-200 relative py-1 cursor-pointer ${
                isActive
                  ? 'text-red-600 font-bold'
                  : 'text-slate-700 hover:text-red-600 dark:text-slate-200 dark:hover:text-red-500'
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          )
        })}
      </div>

      {/* Sign Up Button - Right Side (Desktop) */}
      <div className="hidden md:block">
        <Link
          href="/signup"
          className="bg-red-600 text-white font-bold px-6 py-2.5 rounded-full hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 active:scale-95 transition-all duration-200 cursor-pointer inline-block"
        >
          Sign Up
        </Link>
      </div>

      {/* Hamburger Menu - Mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          className="text-slate-800 dark:text-white hover:text-red-600 transition-colors duration-200 cursor-pointer focus:outline-none"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 mx-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-5 md:hidden animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  onClick={() => setIsOpen(false)}
                  href={item.path}
                  className={`font-semibold text-lg transition-colors duration-200 py-1.5 border-b border-slate-50 dark:border-slate-800/50 cursor-pointer ${
                    isActive
                      ? 'text-red-600 font-bold'
                      : 'text-slate-700 hover:text-red-600 dark:text-slate-200 dark:hover:text-red-500'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
          <Link
            href="/signup"
            onClick={() => setIsOpen(false)}
            className="bg-red-600 text-white text-center font-bold py-3 rounded-full hover:bg-red-700 active:scale-98 transition-all duration-200 cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  )
}
export default Navbar