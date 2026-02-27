"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ProfilePictureUpload from "../components/profile-picture-upload";
import { User, Mail, Settings, Camera } from "lucide-react";
import Link from "next/link";

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-900 text-white mb-6">
              <Settings className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Profile Settings
            </h1>

            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              Manage your profile information and customize your account
              settings
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-10 transition-all duration-300">
            {/* Section Title */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 bg-gray-900 rounded-full"></div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Profile Information
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Profile Picture */}
              <div className="lg:col-span-1">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center justify-center gap-2">
                    <Camera className="w-5 h-5 text-gray-700" />
                    Profile Picture
                  </h3>

                  <ProfilePictureUpload />
                </div>
              </div>

              {/* User Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Username */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Username
                  </label>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                    <span className="text-gray-900 font-medium">
                      {session?.user?.username || "Not set"}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                    <span className="text-gray-900">
                      {session?.user?.email}
                    </span>
                  </div>
                </div>

                {/* Account Status */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Account Status
                  </label>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
                    <span className="text-emerald-700 font-medium flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      Active
                    </span>
                  </div>
                </div>

                {/* Member Since */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Member Since
                  </label>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                    <span className="text-gray-900">
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-6 border-t border-gray-200">
                  <Link
                    href={"/"}
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-all duration-200 font-medium"
                  >
                    Save Changes
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-center">
                Account Security
              </h3>
              <p className="text-gray-500 text-sm text-center">
                Change password and manage security settings
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-center">
                Preferences
              </h3>
              <p className="text-gray-500 text-sm text-center">
                Customize your app experience and notifications
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Camera className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-center">
                Content Management
              </h3>
              <p className="text-gray-500 text-sm text-center">
                Manage your uploaded videos and content
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
