

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaShareAlt } from "react-icons/fa";

const MemeDetails = () => {
  const { id } = useParams();
  const [meme, setMeme] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchMemeDetails = useCallback(() => {
    try {
      const storedMemes = JSON.parse(localStorage.getItem("memes")) || [];
      const selectedMeme = storedMemes.find((m) => m.id === id);

      if (selectedMeme) {
        setMeme(selectedMeme);
      } else {
        fetch("https://api.imgflip.com/get_memes")
          .then((res) => res.json())
          .then((data) => {
            const foundMeme = data?.data?.memes?.find((m) => m.id === id);
            if (foundMeme) {
              setMeme(foundMeme);
            }
          })
          .catch((error) => console.error("Error fetching meme:", error));
      }

      setLikes(JSON.parse(localStorage.getItem(`likes-${id}`)) || 0);
      setComments(JSON.parse(localStorage.getItem(`comments-${id}`)) || []);
    } catch (error) {
      console.error("Error loading meme details:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchMemeDetails();
  }, [fetchMemeDetails]);

  const handleLike = useCallback(() => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);
    localStorage.setItem(`likes-${id}`, JSON.stringify(updatedLikes));
  }, [likes, id]);

  const handleCommentSubmit = useCallback(() => {
    if (newComment.trim() === "") return;

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    setNewComment("");
  }, [comments, newComment, id]);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  }, []);

  if (!meme) return <p className="text-white text-center">Loading...</p>;

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen flex flex-col items-center">
      {/* Meme Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-200">{meme.name}</h2>
        <motion.img
          src={meme.url}
          alt={meme.name}
          className="w-full rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        />

        {/* Buttons */}
        <div className="mt-4 flex justify-center space-x-4">
          <motion.button
            onClick={handleLike}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
            aria-label="Like Meme"
          >
            <FaHeart className="text-xl" />
            <span>{likes} Likes</span>
          </motion.button>

          <motion.button
            onClick={handleShare}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
            aria-label="Share Meme"
          >
            <FaShareAlt className="text-xl" />
            <span>Share</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Comments Section */}
      <div className="mt-6 w-full max-w-md">
        <h3 className="text-lg font-bold text-gray-300">Comments</h3>
        <div className="mt-2 space-y-3">
          {comments.length === 0 ? (
            <p className="text-gray-400">No comments yet.</p>
          ) : (
            comments.map((comment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 p-3 rounded-lg shadow-md"
              >
                {comment}
              </motion.div>
            ))
          )}
        </div>

        {/* Add Comment */}
        <textarea
          className="w-full p-3 mt-4 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-green-400 focus:ring-1 focus:ring-green-400 outline-none"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>

        <motion.button
          onClick={handleCommentSubmit}
          whileTap={{ scale: 0.9 }}
          className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition w-full"
          aria-label="Submit Comment"
        >
          Submit Comment
        </motion.button>
      </div>
    </div>
  );
};

export default MemeDetails;
