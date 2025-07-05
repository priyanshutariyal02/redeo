"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ProfilePictureUpload from "../components/profile-picture-upload";
import { User, Mail, Settings, Camera } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-4 sm:mb-6">
              <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              Profile Settings
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Manage your profile information and customize your account
              settings
            </p>
          </div>

          {/* Profile Settings Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 p-6 sm:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="w-1.5 h-6 sm:w-2 sm:h-8 bg-gradient-to-b from-purple-500 to-blue-600 rounded-full"></div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Profile Information
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Picture Section */}
              <div className="lg:col-span-1">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
                    <Camera className="w-5 h-5" />
                    Profile Picture
                  </h3>
                  <ProfilePictureUpload />
                </div>
              </div>

              {/* User Information Section */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {/* Username */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Username
                    </label>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                      <span className="text-gray-800 font-medium">
                        {session?.user?.username || "Not set"}
                      </span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                      <span className="text-gray-800">
                        {session?.user?.email}
                      </span>
                    </div>
                  </div>

                  {/* Account Status */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Account Status
                    </label>
                    <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                      <span className="text-green-800 font-medium flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Active
                      </span>
                    </div>
                  </div>

                  {/* Member Since */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Member Since
                    </label>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                      <span className="text-gray-800">
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium">
                      Save Changes
                    </button>
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base text-center">
                Account Security
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm text-center">
                Change password and manage security settings
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base text-center">
                Preferences
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm text-center">
                Customize your app experience and notifications
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base text-center">
                Content Management
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm text-center">
                Manage your uploaded videos and content
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
