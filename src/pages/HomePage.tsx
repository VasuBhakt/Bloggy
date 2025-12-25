import { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, Card, Button } from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function HomePage() {
    const [posts, setPosts] = useState<any>([])
    const authStatus = useSelector((state: any) => state.auth.status);
    useEffect(() => {
        appwriteService.getAllArticles().then((posts) => {
            if (posts) {
                setPosts(posts)
            }
        })
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
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post: any) => (
                            <div className='p-2 w-1/4'>
                                <Card title={post.title} featuredImage={post.featuredImage} $id={post.$id} />
                            </div>
                        ))}
                    </div>
                </Container>

            </div>
        )
    }
}

export default HomePage