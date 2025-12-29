// Profile Pge

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { Button, Input, Container } from "../components";
import { login } from "../features/authSlice";
import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Query } from "appwrite";
import { Card } from "../components";

function ProfilePage() {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.auth.userData);
  const { username } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [userPosts, setUserPosts] = useState<any[]>([]);

  useEffect(() => {
    if (username) {
      setLoading(true);

      appwriteService.getAllArticles([
        Query.equal("username", username),
        Query.equal("status", "active")
      ]).then((posts) => {
        if (posts) {
          setUserPosts(posts);
        }
      }).finally(() => setLoading(false));
    }
  }, [username]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      username: userData?.name || '',
      name: userData?.prefs?.name || '',
      email: userData?.email || '',
      phone: userData?.prefs?.phone || userData?.phone || '',
      country: userData?.prefs?.country || '',
      password: "********"
    }
  });

  useEffect(() => {
    if (userData) {
      reset({
        username: userData.name || '',
        name: userData.prefs?.name || '',
        email: userData.email || '',
        phone: userData.prefs?.phone || '',
        country: userData.prefs?.country || '',
        password: "********"
      });
    }
  }, [userData, reset]);

  const update = async (data: any) => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await authService.updateProfile({
        name: data.name,
        country: data.country,
        phone: data.phone
      });

      const user = await authService.getCurrentUser();
      if (user) dispatch(login(user));

      setSuccess("Profile updated successfully!");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  if (userData && username === userData.name) {
    return (
      <div className="w-full py-8 bg-gray-50/50 min-h-screen">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

              {/* Header */}
              <div className="bg-gray-900 px-8 py-6 border-b border-lime-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <h1 className="text-3xl font-bold text-white relative z-10">
                  Profile Settings
                </h1>
                <p className="text-gray-400 mt-2 relative z-10">
                  Manage your account information and preferences
                </p>
              </div>

              <div className="p-8">
                <form onSubmit={handleSubmit(update)} className="space-y-8">

                  {/* Only Error/Success Messages */}
                  {error && (
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 animate-fade-in-up">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="p-4 rounded-lg bg-lime-50 border border-lime-200 text-lime-700 animate-fade-in-up">
                      {success}
                    </div>
                  )}

                  {/* Account Credentials Section */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-lime-500 rounded-full"></span>
                      Account Credentials
                      <span className="text-gray-400 text-sm">(These cannot be edited! For updating password, try forget password from login!)</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                      <Input
                        label="Username"
                        readOnly
                        className="bg-gray-100 cursor-not-allowed border-gray-200 text-gray-500 focus:ring-0 focus:border-gray-200"
                        {...register("username")}
                      />
                      <Input
                        label="Email Address"
                        readOnly
                        type="email"
                        className="bg-gray-100 cursor-not-allowed border-gray-200 text-gray-500 focus:ring-0 focus:border-gray-200"
                        {...register("email")}
                      />
                      <div className="md:col-span-2">
                        <Input
                          label="Password"
                          readOnly
                          type="password"
                          className="bg-gray-100 cursor-not-allowed border-gray-200 text-gray-500 focus:ring-0 focus:border-gray-200"
                          {...register("password")}
                        />
                        <p className="text-xs text-gray-400 mt-1 ml-1">
                          Password cannot be changed here for security reasons.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100"></div>

                  {/* Personal Details Section */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-lime-500 rounded-full"></span>
                      Personal Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        {...register("name")}
                      />
                      <Input
                        label="Country"
                        placeholder="Your Country"
                        {...register("country")}
                      />
                      <div className="md:col-span-2">
                        <Input
                          label="Phone Number"
                          type="tel"
                          placeholder="+1234567890"
                          {...register("phone")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button
                      type="submit"
                      disabled={loading}
                      className={`w-full md:w-auto min-w-[200px] font-semibold tracking-wide transition-all shadow-lg hover:shadow-lime-500/20 active:scale-95 ${loading ? 'opacity-70 cursor-wait' : ''}`}
                      bgColor="bg-gray-900 hover:bg-black"
                      textColor="text-lime-400"
                    >
                      {loading ? "Saving Changes..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  } else {

    return (
      <div className="w-full py-8 bg-gray-50/50 min-h-screen">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Public Profile Header */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-8">
              <div className="bg-gray-900 px-8 py-10 relative overflow-hidden text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl"></div>
                {/* Avatar Circle */}
                <div className="relative z-10 w-24 h-24 mx-auto bg-linear-to-br from-lime-400 to-lime-600 rounded-full flex items-center justify-center text-gray-900 text-4xl font-bold shadow-lg mb-4">
                  {username ? username.charAt(0).toUpperCase() : '?'}
                </div>
                <h1 className="text-3xl font-bold text-white relative z-10">
                  @{username}
                </h1>
              </div>
              <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-center">
                  <div>
                    <span className="block text-2xl font-bold text-gray-800">{userPosts.length}</span>
                    <span className="text-xs text-gray-500 uppercase tracking-widest">Posts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-8 bg-lime-500 rounded-full"></span>
                Latest Articles
              </h2>

              {loading ? (
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500 mx-auto"></div>
                  <p className="mt-4 text-gray-500">Loading articles...</p>
                </div>
              ) : userPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userPosts.map((post) => (
                    <div key={post.$id} className="h-full">
                      <Card {...post} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-xl text-gray-400 font-medium">No articles found yet.</p>
                  <p className="text-gray-400 mt-2">Check back later for updates from @{username}.</p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    )
  }

}

export default ProfilePage;