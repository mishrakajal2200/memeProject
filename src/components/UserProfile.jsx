
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Cyber Phantom",
    bio: "Meme alchemist in the digital realm.",
    profilePic: "https://via.placeholder.com/150",
  });

  const [uploadedMemes, setUploadedMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    const storedUploadedMemes = localStorage.getItem("uploadedMemes");
    const storedLikedMemes = localStorage.getItem("likedMemes");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedUploadedMemes) setUploadedMemes(JSON.parse(storedUploadedMemes));
    if (storedLikedMemes) setLikedMemes(JSON.parse(storedLikedMemes));
  }, []);

  const handleEditProfile = () => setEditing(true);

  const handleSaveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    setEditing(false);
  };

  const handleProfileChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...user, profilePic: reader.result };
        setUser(updatedUser);
        localStorage.setItem("userProfile", JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black via-gray-900 to-black text-white px-4 sm:px-6 md:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-purple-400 mb-6 text-center">👾 Cyber Profile 👾</h2>

      <motion.div
        className="relative p-4 sm:p-6 rounded-2xl w-full max-w-xs sm:max-w-md shadow-2xl bg-gray-800 border border-purple-500 text-center"
        whileHover={{ scale: 1.03, rotateX: 3, rotateY: -3 }}
      >
        <label className="cursor-pointer block relative mx-auto">
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-24 sm:w-32 h-24 sm:h-32 rounded-full mx-auto mb-4 border-4 border-purple-500 shadow-lg transition-all hover:scale-110"
          />
          <input type="file" accept="image/*" onChange={handleProfilePicChange} className="hidden" />
        </label>

        {editing ? (
          <>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleProfileChange}
              className="w-full p-2 bg-gray-900 text-white rounded border border-purple-500 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            />
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleProfileChange}
              className="w-full p-2 mt-2 bg-gray-900 text-white rounded border border-purple-500 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            ></textarea>
            <button onClick={handleSaveProfile} className="mt-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base">
              Save Profile
            </button>
          </>
        ) : (
          <>
            <h3 className="text-xl sm:text-2xl font-bold">{user.name}</h3>
            <p className="text-gray-300 text-sm sm:text-base">{user.bio}</p>
            <button onClick={handleEditProfile} className="mt-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base">
              Edit Profile
            </button>
          </>
        )}
      </motion.div>

      <div className="mt-8 w-full max-w-xs sm:max-w-lg">
        <h3 className="text-2xl sm:text-3xl font-bold text-purple-400 text-center mb-4">🔥 Uploaded Memes 🔥</h3>
        {uploadedMemes.length === 0 ? (
          <p className="text-gray-400 text-center text-sm sm:text-base">No memes uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {uploadedMemes.map((meme, index) => (
              <motion.div
                key={index}
                className="relative group rounded-lg overflow-hidden shadow-lg border border-purple-500 bg-gray-900"
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
              >
                <img src={meme.url} alt="Uploaded Meme" className="w-full rounded-lg" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 w-full max-w-xs sm:max-w-lg">
        <h3 className="text-2xl sm:text-3xl font-bold text-purple-400 text-center mb-4">💜 Liked Memes ({likedMemes.length}) 💜</h3>
        {likedMemes.length === 0 ? (
          <p className="text-gray-400 text-center text-sm sm:text-base">No liked memes yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {likedMemes.map((meme, index) => (
              <motion.div
                key={index}
                className="relative group rounded-lg overflow-hidden shadow-lg border border-purple-500 bg-gray-900"
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
              >
                <img src={meme.url} alt="Liked Meme" className="w-full rounded-lg" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;