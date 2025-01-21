import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// TODO: Replace with actual auth state from Supabase
const useAuth = () => {
  return { isAuthenticated: false }; // Temporary mock
};

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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleDropdownClick = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const AuthButton = () => (
    <Link
      href={isAuthenticated ? "/members" : "/login"}
      className="bg-yellow-500 text-white hover:bg-yellow-600 px-4 py-2 rounded-md text-sm font-medium"
    >
      {isAuthenticated ? "Members Area" : "Login/Register"}
    </Link>
  );

  return (
    <nav className="bg-white shadow-md">
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
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>

              <div className="relative">
                <button
                  onClick={() => handleDropdownClick("getInvolved")}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
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
                  onClick={() => handleDropdownClick("whoWeAre")}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
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
                  onClick={() => handleDropdownClick("caving")}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
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
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <AuthButton />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Home
            </Link>

            <div className="space-y-1">
              <div className="px-3 py-2 text-base font-medium text-gray-700">
                Get Involved
              </div>
              {navItems.getInvolved.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 pl-6"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="space-y-1">
              <div className="px-3 py-2 text-base font-medium text-gray-700">
                Who We Are
              </div>
              {navItems.whoWeAre.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 pl-6"
                >
                  {item.label}
                  {item.external && (
                    <span className="ml-1 text-xs text-gray-400">↗</span>
                  )}
                </Link>
              ))}
            </div>

            <div className="space-y-1">
              <div className="px-3 py-2 text-base font-medium text-gray-700">
                Caving
              </div>
              {navItems.caving.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 pl-6"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <AuthButton />
          </div>
        </div>
      )}
    </nav>
  );
}
