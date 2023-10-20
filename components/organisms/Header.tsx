'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface Props {
  children: React.ReactNode
}

export default function Header({ children }: Props) {
  const [showVerticalMenu, setShowVerticalMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleMenuRef = useRef<HTMLElement>(null)
  const navLinks = [
    { label: 'I have a job', url: '/jobs' },
    { label: 'I do a job', url: '/jobs/register' },
    { label: 'About', url: '/about' },
  ]

  function handleIconClick() {
    setShowVerticalMenu(!showVerticalMenu)
  }

  function handleNavLinkClick() {
    setShowVerticalMenu(false)
  }

  useEffect(() => {
    const menu = menuRef.current
    const toggleMenu = toggleMenuRef.current

    if (!menu || !toggleMenu) return

    menu.style.display = showVerticalMenu ? 'flex' : 'none'
    toggleMenu.classList.remove(showVerticalMenu ? 'ti-menu-2' : 'ti-x')
    toggleMenu.classList.add(showVerticalMenu ? 'ti-x' : 'ti-menu-2')
  }, [showVerticalMenu])

  return (
    <header>
      <div className="flex justify-between bg-vibrant-blue text-[#F4F4F4] px-2 md:px-5 h-10 items-center">
        <i
          ref={toggleMenuRef}
          className="ti ti-menu-2 text-2xl md:hidden cursor-pointer"
          onClick={handleIconClick}
        />
        <Link href="/" className="text-2xl">
          <i className="ti ti-hammer pr-2" />
          Chamburo
        </Link>

        {/* desktop navbar */}
        <nav className="hidden md:flex w-1/2 justify-between">
          {navLinks.map(({ label, url }, i) => (
            <Link key={i} href={url} onClick={handleNavLinkClick}>
              {label}
            </Link>
          ))}
        </nav>

        {children}
      </div>

      {/* mobile navbar */}
      <nav
        ref={menuRef}
        className="flex-col text-center pt-5 text-center absolute z-[1] bg-vibrant-blue hidden w-full h-[calc(100%-32px)] text-white text-lg"
      >
        {navLinks.map(({ label, url }, i) => (
          <Link
            key={i}
            href={url}
            onClick={handleNavLinkClick}
            className="mt-5"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
