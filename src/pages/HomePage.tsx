import { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, Card, Button } from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function HomePage() {
    const [posts, setPosts] = useState<any>([])
    const authStatus = useSelector((state: any) => state.auth.status);
    const user = useSelector((state: any) => state.auth.userData);
    useEffect(() => {
        if (authStatus) {
            appwriteService.getAllArticlesOfUser(user.$id).then((posts) => {
                if (posts) {
                    setPosts(posts)
                }
            })
        }


    }, [])

    if (!authStatus) {
        return (
            <div className='w-full'>
                <div className='w-full text-center py-20'>
                    <Container>
                        <div className='flex flex-col items-center justify-center space-y-4'>
                            <h1 className='text-8xl font-bold text-gradient-lime animate-fade-in-up py-4'>
                                Welcome to Bloggy!
                            </h1>
                            <h2 className='text-6xl py-4 font-light animate-fade-in-up opacity-0' style={{ animationDelay: '0.2s' }}>
                                Read. Write. Connect.
                            </h2>
                            <p className='py-12 text-3xl text-gray-700 max-w-4xl animate-fade-in-up opacity-0' style={{ animationDelay: '0.4s' }}>
                                Bloggy is a simple and powerful blogging platform built around one idea: Read. Write. Connect.
                                It gives creators a space to share their thoughts, stories, and ideas while discovering content from
                                others around the world. Whether you're writing your first blog post or building a growing audience,
                                Bloggy makes publishing effortless and meaningful by bringing readers and writers together in one connected
                                community.
                            </p>
                        </div>
                    </Container>
                </div>
                <div className='w-full py-15 bg-black text-center group translate-y-0  duration-500'>
                    <h2 className='text-5xl mb-12 font-semibold text-lime-500 animate-float'>
                        Launch your idea today!
                    </h2>
                    <Link to="/register">
                        <Button className="bg-lime-500 text-black text-3xl px-12 py-4 hover:bg-lime-400 hover:scale-110 duration-200 shadow-[0_0_20px_rgba(163,230,53,0.3)]" textColor='text-black'>
                            Register Now
                        </Button>
                    </Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className='w-full py-12 grow'>
                <Container>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>

                        {/* Left Column: Greeting & Stats */}
                        <div className='md:col-span-2 space-y-8'>
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
                                <div className='flex flex-wrap -mx-2'>
                                    {posts.map((post: any) => (
                                        <div key={post.$id} className='p-2 w-1/2'>
                                            <Card $id={post.$id} title={post.title} featuredImage={post.featuredImage} slug={post.slug} username={post.username} />
                                        </div>
                                    ))}
                                    {posts.length === 0 && (
                                        <div className='p-8 text-center w-full bg-white rounded-3xl border border-dashed border-gray-300'>
                                            <p className='text-gray-500'>You haven't posted anything yet. Start your journey today!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Account Info */}
                        <div className='space-y-8'>
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
                                <Link to="/profile">
                                    <Button className='w-full'>Edit Profile</Button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </Container>
            </div>
        )
    }
}

export default HomePage