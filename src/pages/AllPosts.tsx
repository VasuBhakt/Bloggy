import { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import SearchEngine from "../algolia/SearchEngine";
import { Container, Card } from "../components";

function AllPosts() {
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        appwriteService.getAllArticles().then((posts) => {
            if (posts) {
                setPosts(posts);
            }
            setIsLoading(false);
        });
    }, []);

    // This is the view we want to show when NOT searching
    // It's just the standard grid of latest posts
    const defaultView = (
        <div className="py-12">
            <Container>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Latest Stories</h2>
                {posts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
                        <div className="bg-gray-100 rounded-full p-5 mb-6">
                            <span className="text-4xl">📝</span>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                            Nothing to read… yet
                        </h3>
                        <p className="text-gray-500 max-w-md">
                            No stories here for now — but great ones are probably on the way.
                            Why not give it a try yourself?
                        </p>
                    </div>
                )}

                {isLoading ? (
                    <div className="text-center py-20">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <div
                                key={post.$id}
                                className="transform transition-all duration-300 hover:scale-105"
                            >
                                <Card
                                    title={post.title}
                                    featuredImage={post.featuredImage}
                                    $id={post.$id}
                                    slug={post.slug}
                                    username={post.username}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );

    return (
        <div className="w-full">
            {/* 
                We pass the defaultView to SearchEngine.
                SearchEngine handles the Header, Search Box, and decides:
                - If searching: Show Algolia Results
                - If NOT searching: Show this defaultView
            */}
            <SearchEngine defaultView={defaultView} />
        </div>
    );
}

export default AllPosts;