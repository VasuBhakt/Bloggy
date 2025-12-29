// All posts

import { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import SearchEngine from "../algolia/SearchEngine";
import { Container, Card } from "../components";
import { motion } from "framer-motion";

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    // This is the view we want to show when NOT searching
    // It's just the standard grid of latest posts
    const defaultView = (
        <div className="py-12">
            <Container>
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold mb-6 text-gray-800"
                >
                    Latest Stories
                </motion.h2>

                {posts.length === 0 && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-24 px-4 text-center"
                    >
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
                    </motion.div>
                )}

                {isLoading ? (
                    <div className="text-center py-20">Loading...</div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {posts.map((post) => (
                            <motion.div
                                key={post.$id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Card
                                    title={post.title}
                                    featuredImage={post.featuredImage}
                                    $id={post.$id}
                                    slug={post.slug}
                                    username={post.username}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </Container>
        </div>
    );

    return (
        <div className="w-full">
            <SearchEngine defaultView={defaultView} />
        </div>
    );
}


export default AllPosts;
