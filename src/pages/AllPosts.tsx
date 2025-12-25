import appwriteService from "../appwrite/config";
import { Card, Container } from "../components";
import { useState, useEffect } from "react";

function AllPosts() {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        appwriteService.getAllArticles().then((posts) => {
            if (posts) {
                setPosts(posts);
            }
        })
    }, [])

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <Card title={post.title} featuredImage={post.featuredImage} $id={post.$id} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts;