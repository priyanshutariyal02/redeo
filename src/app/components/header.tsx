"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Home,
  User,
  Upload,
  LogOut,
  Settings,
  Bell,
  Video,
  Menu,
  X,
} from "lucide-react";
import { useNotification } from "./notification";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group"
            prefetch={true}
            onClick={() => showNotification("Welcome to Redeo", "info")}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center transition-transform duration-200">
              <Home className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Redeo
            </span>
          </Link>

          {/* Desktop User Menu */}
          <div className="hidden sm:flex items-center gap-3 lg:gap-4">
            {session && (
              <Link
                href="/upload"
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200 relative"
              >
                <Video className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 text-purple-500 rounded-full">
                  +
                </span>
              </Link>
            )}
            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              {session ? (
                <div>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                      {session.user?.profilePicture ? (
                        <img
                          src={session.user.profilePicture}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-sm font-medium">
                          {session.user?.email?.charAt(0).toUpperCase() || "U"}
                        </span>
                      )}
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-700 truncate max-w-32">
                        {session.user?.username ||
                          session.user?.email?.split("@")[0] ||
                          "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-32">
                        {session.user?.email}
                      </p>
                    </div>
                    <User className="w-4 h-4 text-gray-500" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                      <div className="p-3">
                        <div className="flex items-center gap-3 px-3 py-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                            {session.user?.profilePicture ? (
                              <img
                                src={session.user.profilePicture}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-white text-sm font-medium">
                                {session.user?.email?.charAt(0).toUpperCase() ||
                                  "U"}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate">
                              {session.user?.username ||
                                session.user?.email?.split("@")[0] ||
                                "User"}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {session.user?.email}
                            </p>
                          </div>
                        </div>

                        <div className="border-t border-gray-100 my-2"></div>

                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200"
                          onClick={() => {
                            showNotification("Profile Settings", "info");
                            setIsDropdownOpen(false);
                          }}
                        >
                          <User className="w-4 h-4" />
                          Profile Settings
                        </Link>

                        <Link
                          href="/upload"
                          className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200"
                          onClick={() => {
                            showNotification("Welcome to Upload", "info");
                            setIsDropdownOpen(false);
                          }}
                        >
                          <Upload className="w-4 h-4" />
                          Upload Video
                        </Link>

                        <button className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 w-full text-left">
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>

                        <div className="border-t border-gray-100 my-2"></div>

                        <button
                          onClick={() => {
                            handleSignOut();
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform text-sm sm:text-base"
                  onClick={() =>
                    showNotification("Please Login to continue", "info")
                  }
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center gap-2">
            {session && (
              <Link
                href="/upload"
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200 relative"
              >
                <Video className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 text-purple-500 rounded-full">
                  +
                </span>
              </Link>
            )}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 py-4">
            <div className="space-y-3">
              {/* Notifications */}
              <button className="w-full flex items-center gap-3 p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
                <span className="ml-auto w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {session ? (
                <>
                  {/* User Info */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                      {session.user?.profilePicture ? (
                        <img
                          src={session.user.profilePicture}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-sm font-medium">
                          {session.user?.email?.charAt(0).toUpperCase() || "U"}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {session.user?.username ||
                          session.user?.email?.split("@")[0] ||
                          "User"}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200"
                    onClick={() => {
                      showNotification("Profile Settings", "info");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <User className="w-5 h-5" />
                    Profile Settings
                  </Link>

                  <Link
                    href="/upload"
                    className="flex items-center gap-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200"
                    onClick={() => {
                      showNotification("Welcome to Upload", "info");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Upload className="w-5 h-5" />
                    Upload Video
                  </Link>

                  <button className="w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-left">
                    <Settings className="w-5 h-5" />
                    Settings
                  </button>

                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                  onClick={() => {
                    showNotification("Please Login to continue", "info");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <User className="w-5 h-5" />
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
