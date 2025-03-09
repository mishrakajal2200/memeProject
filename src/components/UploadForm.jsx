
import React, { useState, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CaptionEditor from "./CaptionEditor"; // Assuming you have a CaptionEditor component for editing captions

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [templates, setTemplates] = useState(null);

  const username = "KajalMishra1"; // Your Imgflip credentials
  const password = "ammukaju123A@mishra";

  // Fetch meme templates on mount and cache them
  const fetchMemes = useCallback(async () => {
    if (!templates) {
      try {
        const response = await axios.get("https://api.imgflip.com/get_memes");
        setTemplates(response.data.data.memes);
      } catch (error) {
        console.error("Error fetching meme templates", error);
      }
    }
  }, [templates]);

  // Handle file input
  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    previewImage(selectedFile);
  }, []);

  // Image preview
  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageURL(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  // Generate meme using Imgflip API
  const generateMeme = async () => {
    setLoading(true);
    try {
      await fetchMemes();

      if (!templates?.length) {
        console.error("No meme templates found!");
        return;
      }

      const randomMeme = templates[Math.floor(Math.random() * templates.length)];

      const captionResponse = await axios.post(
        "https://api.imgflip.com/caption_image",
        new URLSearchParams({
          template_id: randomMeme.id,
          username: username,
          password: password,
          text0: "When you realize...",
          text1: "You forgot to submit the assignment!",
        })
      );

      if (captionResponse.data.success) {
        setImageURL(captionResponse.data.data.url);
        setGeneratedCaption("When you realize... You forgot to submit the assignment!");
      } else {
        console.error("Error generating meme:", captionResponse.data.error_message);
      }
    } catch (error) {
      console.error("Error generating meme:", error);
    } finally {
      setLoading(false);
    }
  };

  // Upload meme to Cloudinary (for both file and generated meme)
  const handleUpload = async () => {
    setLoading(true);
    try {
      let uploadFile = file; // Default to selected file
      let uploadURL = imageURL;

      // If generated meme exists, use it
      if (imageURL && !file) {
        const response = await fetch(uploadURL);
        const blob = await response.blob();
        uploadFile = new File([blob], "generated-meme.png", { type: "image/png" });
      }

      if (!uploadFile) {
        alert("Please select or generate a meme image");
        return;
      }

      // Form data for Cloudinary upload
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("upload_preset", "memverse"); // Cloudinary preset

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/kajalmishra/image/upload", // Replace with your Cloudinary URL
        formData
      );

      const uploadedImageURL = uploadResponse.data.secure_url;

      // Meme object
      const newMeme = {
        id: Date.now().toString(),
        title: caption || generatedCaption,
        image: uploadedImageURL,
        likes: 0,
        comments: [],
      };

      // Save meme to localStorage
      const storedMemes = JSON.parse(localStorage.getItem("memes")) || [];
      storedMemes.push(newMeme);
      localStorage.setItem("memes", JSON.stringify(storedMemes));

      alert("Meme uploaded successfully!");
    } catch (error) {
      console.error("Error uploading meme", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Upload Your Meme
        </h2>

        {/* File Input */}
        <input
          type="file"
          accept="image/*, .gif"
          onChange={handleFileChange}
          className="block w-full py-2 px-4 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
        />

        {/* Image Preview */}
        {imageURL && (
          <div className="mt-4 mb-6">
            <img
              src={imageURL}
              alt="Meme Preview"
              className="w-full h-auto rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105"
            />
          </div>
        )}

        {/* Caption Editor */}
        <CaptionEditor caption={caption} setCaption={setCaption} />

        {/* Action Buttons */}
        <div className="space-x-4 mt-4 text-center">
          <motion.button
            onClick={generateMeme}
            className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {loading ? "Generating Meme..." : "Generate Meme"}
          </motion.button>

          <motion.button
            onClick={handleUpload}
            className="bg-green-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {loading ? "Uploading..." : "Upload Meme"}
          </motion.button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center mt-6">
            <div className="w-10 h-10 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
