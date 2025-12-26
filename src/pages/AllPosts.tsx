import appwriteService from "../appwrite/config";
import { Card, Container } from "../components";
import { useState, useEffect } from "react";

function AllPosts() {
    const [posts, setPosts] = useState<any[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        appwriteService.getAllArticles().then((posts) => {
            if (posts) {
                setPosts(posts);
                setFilteredPosts(posts);
            }
        })
    }, [])

    useEffect(() => {
        if (searchTerm) {
            const filtered = posts.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts(posts);
        }
    }, [searchTerm, posts])

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-lime-50/30">
            {/* Hero Section */}
            <div className="bg-black text-white py-16">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-6xl font-bold mb-4">
                            Explore <span className="text-lime-400">Stories</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            Discover amazing content from our community of writers
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto">
                            <input
                                type="text"
                                placeholder="Search articles by title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 transition-all"
                            />
                            <svg
                                className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Stats Bar */}
            <div className="bg-white border-b border-gray-200 py-6">
                <Container>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600">
                                Showing <span className="font-bold text-black">{filteredPosts.length}</span> of <span className="font-bold text-black">{posts.length}</span> articles
                            </p>
                        </div>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="text-sm text-lime-600 hover:text-lime-700 font-semibold"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                </Container>
            </div>

            {/* Posts Grid */}
            <div className="py-12">
                <Container>
                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredPosts.map((post) => (
                                <div
                                    key={post.$id}
                                    className="transform transition-all duration-300 hover:scale-105"
                                >
                                    <Card
                                        title={post.title}
                                        featuredImage={post.featuredImage}
                                        $id={post.$id}
                                        slug={post.slug}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="max-w-md mx-auto">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">No articles found</h3>
                                <p className="text-gray-600">
                                    {searchTerm
                                        ? `No results for "${searchTerm}". Try a different search term.`
                                        : "No articles have been published yet. Check back soon!"
                                    }
                                </p>
                            </div>
                        </div>
                    )}
                </Container>
            </div>
        </div>
    )
}

export default AllPosts;