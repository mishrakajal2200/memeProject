
import React from "react";
import { motion } from "framer-motion";

// Memoizing the component to prevent unnecessary re-renders
const MemeCard = React.memo(({ meme }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      key={meme.id} // Adding key for proper reconciliation
    >
      <img
        src={meme.url}
        alt={meme.name}
        className="w-full h-48 object-cover rounded-md"
        loading="lazy" // Lazy loading images for better performance
      />
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-2">{meme.name}</h3>
    </motion.div>
  );
});

export default MemeCard;
