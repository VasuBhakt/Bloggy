import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import algoliaService from "../algolia/algoliaService";
import { motion } from "framer-motion";

export default function Post() {
    const [post, setPost] = useState<any>();
    const { id } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state: any) => state.auth.userData);
    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        if (id) {
            appwriteService.getArticle(id).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [id, navigate]);

    const deletePost = () => {
        if (post) {
            if (window.confirm("Are you sure you want to delete this post?")) {
                appwriteService.deleteArticle(post.$id).then((status) => {
                    if (status) {
                        appwriteService.deleteFile(post.featuredImage);
                        navigate("/");
                    }
                });
                algoliaService.deletePost(post.$id);
            }
        }
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    }

    return post ? (
        <div className="py-12 min-h-screen">
            <Container>
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link to="/all-posts" className="inline-flex items-center text-gray-500 hover:text-lime-600 transition-colors font-medium">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to all articles
                    </Link>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full mx-auto bg-white rounded-3xl shadow-sm border border-lime-300 overflow-hidden"
                >

                    {/* Hero Image Section */}
                    <motion.div
                        variants={itemVariants}
                        className="relative w-full h-[400px] md:h-[600px] overflow-hidden"
                    >
                        <motion.img
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.5 }}
                            src={appwriteService.fileView(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent pointer-events-none" />

                        {/* Author Floating Actions */}
                        {isAuthor && (
                            <div className="absolute top-6 right-6 flex gap-3 z-10">
                                <Link to={`/edit-post/${post.$id}/${post.slug}`}>
                                    <Button
                                        bgColor="bg-lime-400"
                                        className="text-black! hover:bg-lime-500 shadow-lg hover:shadow-xl transition-all font-bold px-6 py-2 rounded-full flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    bgColor="bg-red-500"
                                    className="text-white! hover:bg-red-600 shadow-lg hover:shadow-xl transition-all font-bold px-6 py-2 rounded-full flex items-center gap-2"
                                    onClick={deletePost}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete
                                </Button>
                            </div>
                        )}
                        {post.status === 'inactive' && (
                            <div className="absolute top-6 left-6 flex gap-3 z-10">
                                <div className="text-white! bg-orange-600 shadow-lg font-bold px-6 py-2 rounded-full flex items-center gap-2">
                                    Inactive
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Content Section */}
                    <div className="p-8 md:p-12">
                        <motion.div variants={itemVariants} className="border-b border-gray-100 mb-4 pb-4">
                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center text-lime-700 font-bold">
                                        {post.username ? post.username.charAt(0).toUpperCase() : "A"}
                                    </div>
                                    <div className="flex text-black font-semibold hover:underline">
                                        <Link to={`/profile/${post.username}`}>
                                            <p className="text-xs">@{post.username || "author"}</p>
                                        </Link>
                                    </div>
                                </div>
                                <div className="hidden sm:block text-gray-300">|</div>
                                <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{new Date(post.$createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-lime-600 prose-img:rounded-2xl"
                        >
                            {parse(post.content)}
                        </motion.div>
                    </div >
                </motion.div >
            </Container >
        </div >
    ) : null;
}

