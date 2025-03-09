
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo on the Left */}
            <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              MemeVerse
            </Link>

            {/* Desktop Navigation - Aligned to the Right */}
            <div className="hidden md:flex space-x-6 ml-auto">
              <NavLink to="/" text="Home" />
              <NavLink to="/explore" text="Explore" />
              <NavLink to="/upload" text="Upload" />
              <NavLink to="/leaderboard" text="Leaderboard" />
              <NavLink to="/profile" text="Profile" />
            </div>

            {/* Mobile Menu Button - Aligned to the Right */}
            <button className="md:hidden ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
            >
              <div className="flex flex-col items-center py-6 space-y-5">
                <NavLink to="/" text="Home" onClick={() => setMenuOpen(false)} />
                <NavLink to="/explore" text="Explore" onClick={() => setMenuOpen(false)} />
                <NavLink to="/upload" text="Upload" onClick={() => setMenuOpen(false)} />
                <NavLink to="/leaderboard" text="Leaderboard" onClick={() => setMenuOpen(false)} />
                <NavLink to="/profile" text="Profile" onClick={() => setMenuOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Add Padding to Prevent Overlapping */}
      <div className="pt-16"></div>
    </>
  );
};

// Reusable Navigation Link Component
const NavLink = ({ to, text, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-gray-900 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 transition-all text-lg"
  >
    {text}
  </Link>
);

export default Navbar;
