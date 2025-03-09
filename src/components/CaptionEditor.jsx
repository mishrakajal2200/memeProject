import React from "react";

const CaptionEditor = ({ caption, setCaption }) => {
  return (
    <div className="mt-4">
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full h-32 p-2 border rounded-md"
        placeholder="Add a funny caption..."
      />
    </div>
  );
};

export default CaptionEditor;
