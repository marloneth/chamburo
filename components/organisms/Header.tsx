'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import LanguageSelector from '../atoms/LanguageSelector'

interface Link {
  label: string
  url: string
  show: boolean
}

interface Props {
  links: Link[]
}

export default function Header({ links }: Props) {
  const [showVerticalMenu, setShowVerticalMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleMenuRef = useRef<HTMLElement>(null)
  const { user } = useUser()

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
      <div className="flex justify-between bg-vibrant-blue text-[#F4F4F4] px-2 md:px-5 h-12 items-center">
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
        <nav className="hidden md:flex w-1/2">
          {links
            .filter(({ show }) => show)
            .map(({ label, url }, i) => (
              <Link
                key={i}
                href={url}
                onClick={handleNavLinkClick}
                className="ml-8"
              >
                {label}
              </Link>
            ))}
        </nav>

        <div className="flex justify-between items-center">
          <div className="hidden mr-2 md:inline-block">
            <LanguageSelector />
          </div>

          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link href="/sign-in" className="">
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* mobile navbar */}
      <nav
        ref={menuRef}
        className="flex-col text-center pt-5 absolute z-[1] bg-vibrant-blue hidden w-full h-[calc(100%-32px)] text-white text-lg"
      >
        <div className="w-full flex justify-center">
          <LanguageSelector showSelectedLangName />
        </div>
        {links
          .filter(({ show }) => show)
          .map(({ label, url }, i) => (
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
