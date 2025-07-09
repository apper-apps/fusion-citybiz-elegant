import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import CitySelector from "@/components/molecules/CitySelector";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationLinks = [
    { path: "/", label: "Home", icon: "Home" },
    { path: "/search", label: "Search", icon: "Search" },
    { path: "/add-business", label: "Add Business", icon: "Plus" },
  ];

  const isActivePath = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-premium border-b border-surface-200"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Building" className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl gradient-text">
              CityBiz Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActivePath(link.path)
                    ? "bg-primary-50 text-primary-700 font-medium"
                    : "text-surface-700 hover:bg-surface-50 hover:text-primary-600"
                }`}
              >
                <ApperIcon name={link.icon} className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Search and Controls */}
          <div className="hidden lg:flex items-center gap-4">
            <SearchBar className="w-80" />
            <CitySelector selectedCity={selectedCity} onCityChange={setSelectedCity} />
            <Button variant="primary" size="sm" asChild>
              <Link to="/add-business">
                <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                Add Business
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors"
          >
            <ApperIcon
              name={isMenuOpen ? "X" : "Menu"}
              className="w-6 h-6 text-surface-600"
            />
          </button>
        </div>

        {/* Mobile Search (shown on larger mobile screens) */}
        <div className="lg:hidden pb-4">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-surface-200 bg-white/95 backdrop-blur-sm"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                <CitySelector selectedCity={selectedCity} onCityChange={setSelectedCity} />
                
                <nav className="flex flex-col gap-2">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActivePath(link.path)
                          ? "bg-primary-50 text-primary-700 font-medium"
                          : "text-surface-700 hover:bg-surface-50"
                      }`}
                    >
                      <ApperIcon name={link.icon} className="w-4 h-4" />
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </nav>
                
                <Button variant="primary" size="sm" asChild className="self-start">
                  <Link to="/add-business" onClick={() => setIsMenuOpen(false)}>
                    <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                    Add Business
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;