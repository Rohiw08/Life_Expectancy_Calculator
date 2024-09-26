import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import myImage from '../images/image.jpg';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false); // Track if page is scrolled
  const navigate = useNavigate();
  const auth = getAuth();

  // Check if the user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // User is logged in
      } else {
        setUser(null); // No user is logged in
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [auth]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null); // Clear user state on sign out
      navigate("/auth"); // Redirect to login page
    });
  };

  // Handle scroll event to toggle sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // Adjust this value as needed
        setIsScrolled(true); // When scrolled past 100px, hide the navbar
      } else {
        setIsScrolled(false); // Show the navbar again when near the top
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    };
  }, []);

  return (
    <nav
      className={`${
        isScrolled ? "-translate-y-full" : "translate-y-0"
      } fixed top-0 left-0 w-full z-10 bg-white text-black p-4 transition-transform duration-500 ease-in-out`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: Home and About buttons */}
        <div className="flex space-x-4">
          <a
            href="/"
            className="text-black hover:border-blue-500 border border-transparent px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-black hover:border-blue-500 border border-transparent px-3 py-2 rounded-md text-sm font-medium"
          >
            About
          </a>
        </div>

        {/* Right side: Login button or user profile */}
        <div className="flex items-center space-x-4">
          {user ? (
            // Show user profile icon when logged in
            <div className="flex items-center space-x-2">
              <img
                src={user.photoURL || myImage}
                alt="User Avatar"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm">{user.displayName || "User"}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-black px-3 py-2 rounded-md text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            // Show login button when not logged in
            <button
              onClick={() => navigate("/auth")}
              className="bg-blue-500 hover:bg-gray-500 text-white px-3 py-2 rounded-md text-sm"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
