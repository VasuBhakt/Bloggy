// Home Page

import { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, Card, Button } from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import pic from "../../public/homepage_image.avif"

function HomePage() {
    const [posts, setPosts] = useState<any>([])
    const [publicPosts, setPublicPosts] = useState<any>([])
    const authStatus = useSelector((state: any) => state.auth.status);
    const user = useSelector((state: any) => state.auth.userData);

    useEffect(() => {
        if (authStatus && user?.$id) {
            appwriteService.getAllArticlesOfUser(user.$id).then((posts) => {
                if (posts) {
                    setPosts(posts)
                }
            })
        } else if (!authStatus) {
            appwriteService.getAllArticles().then((posts) => {
                if (posts) {
                    setPublicPosts(posts.slice(0, 3)) // Show only top 3 on landing
                }
            })
        }
    }, [authStatus, user?.$id])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    }

    // default page (Public Landing Page)
    if (!authStatus) {
        return (
            <div className='w-full bg-white'>
                {/* Hero Section */}
                <div className='relative overflow-hidden bg-white'>
                    <div className='absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-lime-100 rounded-full blur-3xl opacity-50'></div>
                    <div className='absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 bg-lime-200 rounded-full blur-3xl opacity-30'></div>

                    <Container>
                        <div className='flex flex-col lg:flex-row items-center justify-between py-16 md:py-24 relative z-10'>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={containerVariants}
                                className='lg:w-1/2 text-left space-y-8'
                            >
                                <motion.h1
                                    variants={itemVariants}
                                    className='text-5xl md:text-8xl font-black text-black leading-tight'
                                >
                                    Where ideas <span className='text-gradient-lime'>find a home.</span>
                                </motion.h1>
                                <motion.p
                                    variants={itemVariants}
                                    className='text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed'
                                >
                                    The modern publishing platform for creators, thinkers, and storytellers. Read, write, and connect with a global community.
                                </motion.p>
                                <motion.div variants={itemVariants} className='flex gap-4 pt-4'>
                                    <Link to="/register">
                                        <Button className='px-10 py-4 text-xl rounded-full shadow-lg hover:shadow-lime-500/20 active:scale-95 transition-all'>
                                            Start Writing
                                        </Button>
                                    </Link>
                                    <Link to="/all-posts">
                                        <Button className='px-10 py-4 text-xl rounded-full' bgColor='bg-black hover:bg-gray-800' textColor='text-white'>
                                            Explore
                                        </Button>
                                    </Link>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className='lg:w-1/2 mt-16 lg:mt-0 flex justify-center'
                            >
                                <div className='relative group'>
                                    <div className='absolute inset-0 bg-lime-400 rounded-3xl rotate-3 scale-95 group-hover:rotate-0 transition-transform duration-500'></div>
                                    <img
                                        src={pic}
                                        alt="Writer's Table"
                                        className='relative rounded-3xl shadow-2xl w-[500px] h-[400px] object-cover border-4 border-white'
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </Container>
                </div>

                {/* Features Section */}
                <div className='bg-gray-50 py-24'>
                    <Container>
                        <div className='text-center mb-16'>
                            <h2 className='text-4xl md:text-5xl font-bold text-black mb-4'>Why Choose Bloggy?</h2>
                            <p className='text-gray-600 text-xl'>Everything you need to share your story.</p>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
                            {[
                                { title: "Simple Writing", desc: "Minimalist editor designed for focus and creativity.", icon: "✍️" },
                                { title: "Connected", desc: "Build an audience and connect with like-minded thinkers.", icon: "🌐" },
                                { title: "Modern Design", desc: "Beautiful layouts that make your content look amazing.", icon: "✨" }
                            ].map((f, i) => (
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    key={i}
                                    className='bg-white p-10 rounded-3xl shadow-sm border border-black/5 hover:border-lime-300 transition-all'
                                >
                                    <div className='text-5xl mb-6'>{f.icon}</div>
                                    <h3 className='text-2xl font-bold mb-4'>{f.title}</h3>
                                    <p className='text-gray-600 leading-relaxed'>{f.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </Container>
                </div>

                {/* CTA Section */}
                <div className='py-20 bg-black overflow-hidden relative'>
                    <div className='absolute top-0 right-0 w-full h-full opacity-20'>
                        <div className='absolute top-10 left-10 w-20 h-20 bg-lime-500 blur-3xl rounded-full'></div>
                        <div className='absolute bottom-10 right-10 w-40 h-40 bg-lime-500 blur-3xl rounded-full'></div>
                    </div>
                    <Container>
                        <div className='bg-lime-500 rounded-[3rem] p-12 md:p-20 text-center relative z-10'>
                            <h2 className='text-4xl md:text-7xl font-black text-black mb-8'>
                                Ready to share <br className='hidden md:block' /> your story?
                            </h2>
                            <p className='text-xl md:text-2xl text-black/70 mb-12 max-w-2xl mx-auto font-medium'>
                                Join our community of storytellers and start your journey today. It's free, forever.
                            </p>
                            <Link to="/register">
                                <Button className='px-12 py-5 text-2xl rounded-full bg-black text-white hover:scale-105 active:scale-95 transition-all shadow-2xl'>
                                    Join Bloggy Now
                                </Button>
                            </Link>
                        </div>
                    </Container>
                </div>
            </div>
        )
    } else {
        // logged in user
        return (
            <div className='w-full py-12 grow'>
                <Container>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {/* Left Column: Greeting & Stats */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className='md:col-span-2 space-y-8'
                        >
                            <div className='bg-white p-10 rounded-3xl shadow-sm border border-black/20'>
                                <h1 className='text-5xl font-bold text-black mb-4'>
                                    Welcome back, <span className='text-lime-600'>{user?.name}</span>!
                                </h1>
                                <p className='text-xl text-gray-600 max-w-2xl'>
                                    It's a great day to share something new with the world. Your readers are waiting for your next big idea!
                                </p>
                                <div className='mt-8 flex gap-4'>
                                    <Link to="/add-post">
                                        <Button className='px-8 py-3 rounded-2xl hover:scale-105 duration-200'>
                                            + Create New Post
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/*Posts Section */}
                            <div>
                                <h2 className='text-2xl font-bold mb-6 px-4'>Your Blogs</h2>
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={containerVariants}
                                    className='flex flex-wrap -mx-2'
                                >
                                    {posts.map((post: any) => (
                                        <motion.div
                                            key={post.$id}
                                            variants={itemVariants}
                                            className='p-2 w-full sm:w-1/2'
                                        >
                                            <Card $id={post.$id} title={post.title} featuredImage={post.featuredImage} slug={post.slug} username={post.username} />
                                        </motion.div>
                                    ))}
                                    {posts.length === 0 && (
                                        <motion.div
                                            variants={itemVariants}
                                            className='p-8 text-center w-full bg-white rounded-3xl border border-dashed border-gray-300'
                                        >
                                            <p className='text-gray-500'>You haven't posted anything yet. Start your journey today!</p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right Column: Account Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='space-y-8'
                        >
                            <div className='bg-black text-white p-8 rounded-3xl shadow-xl shadow-lime-900/10'>
                                <h2 className='text-xl font-bold mb-6 text-lime-400'>Account Summary</h2>
                                <div className='space-y-6'>
                                    {(user.prefs?.name !== '') &&
                                        <div>
                                            <p className='text-gray-400 text-sm mb-1 uppercase tracking-wider'>Full Name</p>
                                            <p className='text-lg font-medium'>{user?.prefs?.name}</p>
                                        </div>
                                    }
                                    <div>
                                        <p className='text-gray-400 text-sm mb-1 uppercase tracking-wider'>Username</p>
                                        <p className='text-lg font-medium'>@{user?.name}</p>
                                    </div>
                                    <div>
                                        <p className='text-gray-400 text-sm mb-1 uppercase tracking-wider'>Email Address</p>
                                        <p className='text-lg font-medium'>{user?.email}</p>
                                    </div>
                                    {(user.prefs?.phone !== '') &&
                                        <div>
                                            <p className='text-gray-400 text-sm mb-1 uppercase tracking-wider'>Phone</p>
                                            <p className='text-lg font-medium'>{user?.prefs?.phone}</p>
                                        </div>
                                    }
                                    {(user.prefs?.country !== '') &&
                                        <div>
                                            <p className='text-gray-400 text-sm mb-1 uppercase tracking-wider'>Country</p>
                                            <p className='text-lg font-medium'>{user?.prefs?.country}</p>
                                        </div>
                                    }
                                </div>
                                <Link to={`/profile/${user?.name}`}>
                                    <Button className='w-full mt-6' bgColor='bg-lime-400 hover:bg-lime-300' textColor='text-black'>Edit Profile</Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default HomePage