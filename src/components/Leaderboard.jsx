
import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [topMemes, setTopMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const cachedData = localStorage.getItem("topMemes");
        if (cachedData) {
          setTopMemes(JSON.parse(cachedData));
          setLoading(false);
        } else {
          const response = await fetch("https://api.imgflip.com/get_memes");
          const data = await response.json();

          if (data.success) {
            const memes = data.data.memes;
            const sortedMemes = memes
              .map((meme) => ({ ...meme, likes: Math.floor(Math.random() * 1000) }))
              .sort((a, b) => b.likes - a.likes)
              .slice(0, 10);

            setTopMemes(sortedMemes);
            localStorage.setItem("topMemes", JSON.stringify(sortedMemes));
          } else {
            setError("API response was unsuccessful");
          }
          setLoading(false);
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError("Error fetching memes");
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  const rankColors = ["bg-yellow-400", "bg-gray-400", "bg-orange-500"];

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 mt-8 text-center">
        🔥 Top Memes Leaderboard
      </h2>

      <div className="w-full max-w-lg sm:max-w-2xl">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin border-t-4 border-blue-500 border-solid w-12 h-12 rounded-full"></div>
          </div>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && topMemes.length === 0 && (
          <p className="text-gray-400 text-center">No memes available.</p>
        )}

        {!loading && !error && topMemes.length > 0 && (
          <ul className="space-y-4">
            {topMemes.map((meme, index) => (
              <li
                key={meme.id}
                className="bg-white/10 backdrop-blur-lg p-4 rounded-lg flex flex-col sm:flex-row items-center shadow-lg hover:scale-105 transition-all duration-300"
              >
                <span
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white font-bold text-sm sm:text-lg rounded-full ${
                    rankColors[index] || "bg-gray-700"
                  } mb-2 sm:mb-0 sm:mr-4`}
                >
                  {index + 1}
                </span>

                <img
                  src={meme.url}
                  alt={meme.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg shadow-md mb-2 sm:mb-0 sm:mr-4"
                />

                <div className="text-center sm:text-left">
                  <p className="text-base sm:text-lg font-semibold text-white">{meme.name}</p>
                  <p className="text-gray-300 text-sm sm:text-base">{meme.likes} Likes ❤️</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
