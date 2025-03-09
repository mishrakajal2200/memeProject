
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const memeAPI = "https://api.imgflip.com/get_memes";

const NotFound = () => {
  const navigate = useNavigate();
  const [randomMeme, setRandomMeme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(memeAPI)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const memes = data.data.memes;
          setRandomMeme(memes[Math.floor(Math.random() * memes.length)].url);
        }
      })
      .catch(() => {
        const fallbackMemes = [
          "https://i.imgflip.com/5gtd7j.jpg",
          "https://i.imgflip.com/1bij.jpg",
          "https://i.imgflip.com/4acrn3.jpg",
        ];
        setRandomMeme(fallbackMemes[Math.floor(Math.random() * fallbackMemes.length)]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleEasterEgg = () => {
    alert("🐣 You found the Easter Egg! Try refreshing for new memes! 😂");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white text-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold glitch-text mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        404 - Lost in MemeVerse
      </motion.h1>

      <p className="text-sm sm:text-lg mt-2 sm:mt-4 text-gray-300">
        Oops! Looks like you took a wrong turn... 🚀
      </p>

      {loading ? (
        <p className="text-gray-400 mt-4 text-lg sm:text-xl">Loading the perfect meme for you... ⏳</p>
      ) : (
        <motion.img
          src={randomMeme}
          alt="Funny 404 Meme"
          className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl rounded-lg shadow-lg mt-4 sm:mt-6 cursor-pointer hover:scale-105 transition-transform max-h-[60vh] object-contain"
          onClick={handleEasterEgg}
          whileHover={{ rotate: 2, scale: 1.05 }}
        />
      )}

      <motion.button
        className="mt-6 px-6 py-3 text-sm sm:text-lg font-semibold bg-neon-gradient rounded-lg shadow-lg transition-all hover:scale-110"
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.1 }}
      >
        🏠 Go Home
      </motion.button>

      <style>{`
        .glitch-text {
          text-shadow: 0px 0px 10px #ff00ff, 0px 0px 20px #ff00ff, 0px 0px 40px #ff00ff;
          animation: glitch 1s infinite alternate;
        }
        @keyframes glitch {
          0% { text-shadow: 0px 0px 10px #ff00ff, 0px 0px 20px #00ffff; }
          100% { text-shadow: 0px 0px 20px #00ffff, 0px 0px 30px #ff00ff; }
        }
        .bg-neon-gradient {
          background: linear-gradient(90deg, #ff00ff, #00ffff);
          color: black;
          border: none;
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
