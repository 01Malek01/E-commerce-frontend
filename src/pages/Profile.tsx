import { useEffect, useState } from "react";
import Orders from "../components/Orders";
import useGetProfile from "../hooks/api/useGetProfile";
import useUpdateProfile from "../hooks/api/useUpdateProfile";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { profile, isLoading, isError } = useGetProfile();
  const navigate = useNavigate();
  const {
    updateUserProfile,
    isError: isUpdateProfileError,
    isPending: isUpdatePending,
  } = useUpdateProfile();

  useEffect(() => {
    if (profile) {
      setUserProfile(profile);
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };
  const handleSave = async () => {
    if (userProfile) {
      try {
        await updateUserProfile(userProfile);
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    }
  };

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;

  if (isError) {
    signOut();
    navigate("/auth");

    return (
      <div className="text-center text-red-500">Error loading profile.</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 ">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Information Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Profile Information
          </h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={userProfile?.name || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-lg text-gray-900">
                  {userProfile?.name || "No name provided"}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="country"
                  value={userProfile?.country || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-lg text-gray-900">
                  {userProfile?.country || "No country provided"}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  value={userProfile?.city || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-lg text-gray-900">
                  {userProfile?.city || "No city provided"}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={userProfile?.address || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-lg text-gray-900">
                  {userProfile?.address || "No address provided"}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6">
            {isEditing ? (
              <button
                onClick={handleSave}
                disabled={isUpdatePending}
                className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdatePending ? "Saving..." : "Save Changes"}
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Edit Profile
              </button>
            )}
          </div>
          {isUpdateProfileError && (
            <div className="mt-4 text-center text-red-500">
              Failed to update profile. Please try again.
            </div>
          )}
        </div>

        {/* Orders Section */}
        <div className="space-y-6">
          <Orders />
        </div>
        <button
          onClick={handleSignOut}
          className="w-full md:w-auto px-6 py-2  text-black outline outline-black hover:bg-black hover:text-white rounded-md  focus:outline-none focus:ring-2 "
        >
          Logout
        </button>
      </div>
    </div>
  );
}
