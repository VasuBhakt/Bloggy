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