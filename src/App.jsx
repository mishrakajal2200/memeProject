
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";

// import Navbar from "./components/Navbar"; // Import Navbar
// import Explore from "./components/Explore";
// import UploadForm from "./components/UploadForm";
// import MemeDetails from "./components/MemeDetails";
// import UserProfile from "./components/UserProfile";
// import Leaderboard from "./components/Leaderboard";
// import NotFound from "./components/NotFound";



// function App() {
//   return (
//     <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
//       {/* Navbar (Visible on all pages) */}
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/explore" element={<Explore />} />
//         <Route path="/upload" element={<UploadForm />} />
//         <Route path="/meme/:id" element={<MemeDetails />} />
//         <Route path="/profile" element={<UserProfile />} />
//         <Route path="/leaderboard" element={<Leaderboard />} />
//         <Route path="*" element={<NotFound />} /> 
//       </Routes>
//     </div>
//   );
// }

// export default App;

// import React from "react";
// import { DarkModeProvider } from "./DarkModeContext";
// import Navbar from "./Navbar";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import Explore from "./components/Explore";
// import Upload from "./components/UploadForm";
// import Leaderboard from "./components/Leaderboard";
// import Profile from "./components/UserProfile";

// function App() {
//   return (
//     <DarkModeProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/explore" element={<Explore />} />
//           <Route path="/upload" element={<Upload />} />
//           <Route path="/leaderboard" element={<Leaderboard />} />
//           <Route path="/profile" element={<Profile />} />
//         </Routes>
//       </Router>
//     </DarkModeProvider>
//   );
// }

// export default App;

import React from "react";

import Navbar from "./components/Navbar.jsx";
import {Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./components/Explore";

import Leaderboard from "./components/Leaderboard";
import UploadForm from "./components/UploadForm.jsx";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/NotFound.jsx";
import MemeDetails from "./components/MemeDetails.jsx";

function App() {
  return (
  
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/upload" element={<UploadForm />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/meme/:id" element={<MemeDetails />} />
      <Route path="*" element={<NotFound />} />
      
    </Routes>
  </>
    
  );
}

export default App;

