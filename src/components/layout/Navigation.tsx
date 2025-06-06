"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from 'next/navigation';
import { useSupabase } from '@/utils/supabase/SupabaseContext';

const navItems = {
  main: [
    { label: "Home", href: "/" },
    { label: "Members Area", href: "/members" },
  ],
  getInvolved: [
    { label: "Become A TSA Member", href: "/join-tsa" },
    { label: "Find Your Local Grotto", href: "/texas-grottos" },
    { label: "Calendar", href: "/calendar" },
  ],
  whoWeAre: [
    { label: "About TSA", href: "/about" },
    { label: "Officers", href: "/tsa-officers" },
    {
      label: "The Texas Caver Magazine",
      href: "/texas-caver-magazines-archive",
    },
    {
      label: "The Hall of Texas and Mexico Cavers",
      href: "https://hall.cavetexas.org/",
      external: true,
    },
  ],
  caving: [
    { label: "Spring Convention", href: "/convention" },
    { label: "Texas Caver's Reunion", href: "/tcr" },
    { label: "Cave Rescue", href: "/cave-rescue" },
    { label: "Colorado Bend State Park Project", href: "/cbsp" },
    { label: "Government Canyon SNA Project", href: "/gcsna" },
  ],
};

export default function Navigation() {
  const pathname = usePathname();
  const supabase = useSupabase();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setIsAuthenticated(true);
        
        const { data: member } = await supabase
          .from('members')
          .select('editor')
          .eq('user_id', user.id)
          .single();

        setIsEditor(member?.editor || false);
      }
    };

    checkAuth();
  }, [supabase]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownClick = (dropdown: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setIsEditor(false);
  };

  return (
    <nav className="bg-[#1a1f36] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/tsa-logo.png"
                alt="TSA Logo"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block" ref={dropdownRef}>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className={`text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === '/'
                    ? 'bg-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Home
              </Link>

              <div className="relative">
                <button
                  onClick={(e) => handleDropdownClick("getInvolved", e)}
                  className={`text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/join-tsa' || pathname === '/texas-grottos' || pathname === '/calendar'
                      ? 'bg-gray-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Get Involved
                </button>
                {openDropdown === "getInvolved" && (
                  <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {navItems.getInvolved.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeDropdowns}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={(e) => handleDropdownClick("whoWeAre", e)}
                  className={`text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/about' || pathname === '/tsa-officers' || pathname === '/texas-caver-magazines-archive' || pathname === 'https://hall.cavetexas.org/'
                      ? 'bg-gray-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Who We Are
                </button>
                {openDropdown === "whoWeAre" && (
                  <div className="absolute z-10 left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {navItems.whoWeAre.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={
                            item.external ? "noopener noreferrer" : undefined
                          }
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeDropdowns}
                        >
                          {item.label}
                          {item.external && (
                            <span className="ml-1 text-xs text-gray-400">
                              ↗
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={(e) => handleDropdownClick("caving", e)}
                  className={`text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/convention' || pathname === '/tcr' || pathname === '/cave-rescue' || pathname === '/cbsp' || pathname === '/gcsna'
                      ? 'bg-gray-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Caving
                </button>
                {openDropdown === "caving" && (
                  <div className="absolute z-10 left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {navItems.caving.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeDropdowns}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {isAuthenticated ? (
                <>
                  <Link
                    href="/members"
                    className={`bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium ${
                      pathname === '/members'
                        ? 'bg-gray-900'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Members
                  </Link>

                  {isEditor && (
                    <Link
                      href="/editor"
                      className={`bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium ${
                        pathname === '/editor'
                          ? 'bg-gray-900'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Editor
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className={`bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium ${
                    pathname === '/login'
                      ? 'bg-gray-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-500 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1a1f36]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-yellow-500"
            >
              Home
            </Link>

            <div className="space-y-1">
              <div className="px-3 py-2 text-base font-medium text-white">
                Get Involved
              </div>
              {navItems.getInvolved.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-yellow-500 pl-6"
                  onClick={closeDropdowns}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="space-y-1">
              <div className="px-3 py-2 text-base font-medium text-white">
                Who We Are
              </div>
              {navItems.whoWeAre.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-yellow-500 pl-6"
                  onClick={closeDropdowns}
                >
                  {item.label}
                  {item.external && (
                    <span className="ml-1 text-xs text-gray-400">↗</span>
                  )}
                </Link>
              ))}
            </div>

            <div className="space-y-1">
              <div className="px-3 py-2 text-base font-medium text-white">
                Caving
              </div>
              {navItems.caving.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-yellow-500 pl-6"
                  onClick={closeDropdowns}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="px-3 py-2">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/members"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Members
                  </Link>

                  {isEditor && (
                    <Link
                      href="/editor"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Editor
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
