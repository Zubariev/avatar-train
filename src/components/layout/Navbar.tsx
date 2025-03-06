
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 border-b",
        isScrolled 
          ? "bg-white/80 backdrop-blur border-gray-200" 
          : "bg-transparent border-transparent"
      )}
    >
      <Container className="flex items-center justify-between">
        <a 
          href="#home" 
          className="text-2xl font-semibold tracking-tight relative transition-transform-200 hover:scale-105"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Minimalist
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium relative transition-all-200 hover:text-gray-900",
                "after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-gray-900",
                "after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300",
                isScrolled ? "text-gray-600" : "text-gray-700"
              )}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 animate-fade-in">
            <div className="py-4 px-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Navbar;
