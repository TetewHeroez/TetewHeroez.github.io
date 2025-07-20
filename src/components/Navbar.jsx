import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20"
          : "bg-black/10 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className={`px-6 md:px-0 text-2xl font-bold transition-colors ${
              isScrolled
                ? "bg-gradient-to-r from-cyan-600 to-sky-600 bg-clip-text text-transparent"
                : "text-white"
            }`}
          >
            Tetew's Domain
          </button>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 ">
            <div className="flex items-center space-x-12">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors font-medium text-lg hover:scale-105 transform duration-200 ${
                    isScrolled
                      ? "text-gray-700 hover:text-cyan-600"
                      : "text-white hover:text-cyan-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact CTA or empty space for balance */}
          <div className="hidden md:flex">
            <button
              onClick={() => scrollToSection("contact")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                isScrolled
                  ? "bg-gradient-to-r from-cyan-600 to-sky-600 text-white hover:from-cyan-700 hover:to-sky-700"
                  : "border-2 border-white text-white hover:bg-white hover:text-cyan-900"
              }`}
            >
              Get In Touch
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden px-6 transition-colors ${
              isScrolled
                ? "text-gray-700 hover:text-cyan-600"
                : "text-white hover:text-cyan-300"
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden backdrop-blur-md px-3 ${
              isScrolled
                ? "bg-white/95 border-gray-200"
                : "bg-black/20 border-white/10"
            }`}
          >
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 transition-colors font-medium ${
                    isScrolled
                      ? "text-gray-700 hover:text-cyan-600 hover:bg-cyan-50"
                      : "text-white hover:text-cyan-300 hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4 pt-2">
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`w-full px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    isScrolled
                      ? "bg-gradient-to-r from-cyan-400 to-sky-600 text-white hover:from-cyan-700 hover:to-sky-700 hover:scale-105"
                      : "border-2 border-white text-white hover:bg-white hover:text-cyan-900"
                  }`}
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
