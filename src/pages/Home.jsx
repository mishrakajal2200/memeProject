
import { Moon, Sun } from "lucide-react"; // Icons
import React, { useEffect, useRef, useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMemes } from "../redux/memeSlice";
import MemeCard from "../components/MemeCard";
import { motion } from "framer-motion";
import { DarkModeContext } from "../context/DarkModeContext"; // ✅ Import Context

const Home = () => {
  const dispatch = useDispatch();
  const { memes, status } = useSelector((state) => state.memes);
  const { darkMode, setDarkMode } = useContext(DarkModeContext); // ✅ Use Context
  const observer = useRef(null);
  const [page, setPage] = React.useState(1);

  const fetchMemeData = useCallback(() => {
    dispatch(fetchMemes({ page, search: "", category: "Trending", sortBy: "likes" }));
  }, [dispatch, page]);

  useEffect(() => {
    fetchMemeData();
  }, [fetchMemeData]);

  // Infinite Scroll
  useEffect(() => {
    if (status === "loading") return;
    if (observer.current) observer.current.disconnect();

    const lastMemeElement = document.querySelector(".last-meme");
    if (lastMemeElement) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      observer.current.observe(lastMemeElement);
    }

    return () => observer.current && observer.current.disconnect();
  }, [status, memes]);

  return (
    <div className={`min-h-screen p-4 transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Dark Mode Toggle Button */}
      <div className="flex items-center justify-center gap-3 mb-6">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-black rounded-full shadow-md transition-all hover:scale-110"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? (
          <Sun className="w-6 h-6 text-yellow-500" />
        ) : (
          <Moon className="w-6 h-6 text-gray-300" />
        )}
      </button>
      
      {/* Animated Heading */}
      <motion.h1
        className="text-4xl font-bold text-gray-800 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Trending Memes
      </motion.h1>
    </div>

      {/* Loading Skeleton */}
      {status === "loading" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              className="h-64 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          ))}
        </div>
      )}

      {/* Meme List with Animations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {memes.map((meme, index) => (
          <motion.div
            key={meme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={index === memes.length - 1 ? "last-meme" : ""}
          >
            <MemeCard meme={meme} />
          </motion.div>
        ))}
      </div>

      {status === "failed" && (
        <p className="text-center text-red-600">Failed to load memes. Please try again later.</p>
      )}
    </div>
  );
};

export default Home;
