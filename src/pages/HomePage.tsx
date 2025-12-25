import { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, Card } from '../components'

function HomePage() {
    const [posts, setPosts] = useState<any>([])
    useEffect(() => {
        appwriteService.getAllArticles().then((posts) => {
            if (posts) {
                setPosts(posts)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <Container>
                <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold hover:to-blue-950'>
                            Login to read posts!
                        </h1>
                    </div>
                </div>
            </Container>
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