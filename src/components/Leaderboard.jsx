
import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [topMemes, setTopMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Define the error state

  // Fetch memes and cache them
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        // Check if data is already in localStorage
        const cachedData = localStorage.getItem("topMemes");
        if (cachedData) {
          setTopMemes(JSON.parse(cachedData));
          setLoading(false);
        } else {
          const response = await fetch("https://api.imgflip.com/get_memes");
          const data = await response.json();

          if (data.success) {
            const memes = data.data.memes;

            // Assigning random likes to each meme (API doesn't provide it)
            const sortedMemes = memes
              .map((meme) => ({ ...meme, likes: Math.floor(Math.random() * 1000) }))
              .sort((a, b) => b.likes - a.likes)
              .slice(0, 10);

            setTopMemes(sortedMemes);
            localStorage.setItem("topMemes", JSON.stringify(sortedMemes)); // Cache the data
            setLoading(false);
          } else {
            setError("API response was unsuccessful"); // Set error if the API doesn't return successful
            setLoading(false);
          }
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError("Error fetching memes"); // Set error in case of fetch failure
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  // Rank badge colors for top 3
  const rankColors = ["bg-yellow-400", "bg-gray-400", "bg-orange-500"];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold text-white mb-6 mt-8">🔥 Top Memes Leaderboard</h2>

      <div className="w-full max-w-2xl">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin border-t-4 border-blue-500 border-solid w-12 h-12 rounded-full"></div>
          </div>
        )}

        {/* Show Error Message if there is an error */}
        {error && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        {/* Show message if no memes available */}
        {!loading && !error && topMemes.length === 0 && (
          <p className="text-gray-400 text-center">No memes available.</p>
        )}

        {/* Meme List */}
        {!loading && !error && topMemes.length > 0 && (
          <ul className="space-y-4">
            {topMemes.map((meme, index) => (
              <li
                key={meme.id}
                className="bg-white/10 backdrop-blur-lg p-4 rounded-lg flex items-center shadow-lg hover:scale-105 transition-all duration-300"
              >
                {/* Rank Badge */}
                <span
                  className={`w-10 h-10 flex items-center justify-center text-white font-bold text-lg rounded-full ${
                    rankColors[index] || "bg-gray-700"
                  } mr-4`}
                >
                  {index + 1}
                </span>

                {/* Meme Image */}
                <img
                  src={meme.url}
                  alt={meme.name}
                  className="w-16 h-16 rounded-lg mr-4 shadow-md"
                />

                {/* Meme Details */}
                <div>
                  <p className="text-lg font-semibold text-white">{meme.name}</p>
                  <p className="text-gray-300">{meme.likes} Likes ❤️</p>
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
