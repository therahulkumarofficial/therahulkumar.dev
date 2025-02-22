"use client"
import React, { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

// Define types for navLinks
type NavLink = {
  name: string
  href: string
  dropdown?: { name: string; href: string }[]
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null) // Corrected type

  const navLinks: NavLink[] = [
    {
      name: "Portfolio",
      href: "/portfolio",
      dropdown: [
        { name: "Web Projects", href: "/portfolio/web" },
        { name: "Mobile Projects", href: "/portfolio/mobile" },
      ],
    },
    {
      name: "Blog",
      href: "/blog",
      dropdown: [
        { name: "Tutorials", href: "/blog/tutorials" },
        { name: "Tech Trends", href: "/blog/tech-trends" },
      ],
    },
    {
      name: "Shop",
      href: "/shop",
      dropdown: [
        { name: "T-Shirts", href: "/shop/tshirts" },
        { name: "Digital Products", href: "/shop/digital" },
      ],
    },
    {
      name: "Tools",
      href: "/tools",
      dropdown: [
        { name: "Free Tools", href: "/tools/free" },
        { name: "Premium Tools", href: "/tools/premium" },
      ],
    },
  ]

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  }

  return (
    <div className="flex justify-center">
      <nav className="fixed mt-3 rounded-3xl w-[90%] z-50 backdrop-blur-md bg-gradient-to-r from-gray-900/90 via-purple-900/90 to-gray-900/90 border-b border-purple-500/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/profile.png"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full cursor-pointer border-2 border-purple-500 shadow-lg transition-transform hover:scale-110"
                priority // Optional: Improves loading performance
              />
              <a
                href="/"
                className="text-xl font-bold text-white bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-blue-300 transition-all duration-300"
              >
                therahulkumar.dev
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={link.href}
                    className="text-gray-200 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-purple-500/20"
                  >
                    {link.name}
                  </a>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {link.dropdown && activeDropdown === index && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-36 rounded-xl bg-gray-800/95 backdrop-blur-md border border-purple-500/20 shadow-xl overflow-hidden"
                      >
                        {link.dropdown.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-200 hover:bg-purple-600/30 hover:text-white transition-colors duration-200"
                          >
                            {item.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              title="hamburger"
              className="md:hidden text-gray-200 hover:text-white p-2 rounded-lg transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gradient-to-r from-gray-900/90 via-purple-900/90 to-gray-900/90 backdrop-blur-md border-t border-b border-purple-500/20 shadow-lg max-h-[85vh] overflow-y-auto rounded-3xl"
            >
              {navLinks.map((link) => (
                <div key={link.name} className="px-2 py-3 space-y-2">
                  <a
                    href={link.href}
                    className="block text-gray-200 hover:text-white px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200 hover:bg-purple-500/20"
                  >
                    {link.name}
                  </a>
                  {link.dropdown && (
                    <div className="pl-6 space-y-1">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 hover:bg-purple-500/20"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  )
}

export default Navbar