
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMemes, setSearch, setCategory, setSortBy, nextPage } from "../redux/memeSlice";
import MemeCard from "../components/MemeCard";
import { debounce } from "../utils/api";
import { Link } from "react-router-dom"; // Import for routing

const Explore = () => {
  const dispatch = useDispatch();
  const { memes, page, totalPages, search, category, sortBy, loading } = useSelector((state) => state.memes);

  // Fetch memes when filters change
  useEffect(() => {
    dispatch(fetchMemes({ page, search, category, sortBy }));
  }, [dispatch, page, search, category, sortBy]);

  // Handle Search with Debounce
  const handleSearch = useCallback(
    debounce((query) => dispatch(setSearch(query)), 500),
    [dispatch]
  );

  // Infinite Scroll Handler
  const loadMore = () => {
    if (page < totalPages) {
      dispatch(nextPage());
    }
  };

  // Infinite scroll implementation
  useEffect(() => {
    const handleScroll = () => {
      if (loading || page >= totalPages) return;
      const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
      if (bottom) {
        dispatch(nextPage());
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page, totalPages, dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
        <input
          type="text"
          placeholder="Search memes..."
          className="p-2 border rounded w-full sm:w-1/3 text-sm"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <select className="p-2 border rounded w-full sm:w-1/4 text-sm" onChange={(e) => dispatch(setCategory(e.target.value))}>
          {["Trending", "New", "Classic", "Random"].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select className="p-2 border rounded w-full sm:w-1/4 text-sm" onChange={(e) => dispatch(setSortBy(e.target.value))}>
          {["likes", "date", "comments"].map((sort) => (
            <option key={sort} value={sort}>{sort}</option>
          ))}
        </select>
      </div>

      {/* Meme List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {memes.map((meme) => (
          <Link key={meme.id} to={`/meme/${meme.id}`}>
            <MemeCard meme={meme} />
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {page < totalPages && !loading && (
        <button onClick={loadMore} className="mt-4 p-2 bg-blue-500 text-white rounded w-full">
          Load More
        </button>
      )}

      {/* Loading Spinner */}
      {loading && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
};

export default Explore;
