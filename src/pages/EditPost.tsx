import { useEffect, useState } from "react"
import { Container, PostForm } from "../components"
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
    const [post, setPost] = useState<any>(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getArticle(slug).then((post) => {
                if (post) {
                    setPost(post);
                }
            })
        } else {
            navigate('/');
        }
    }, [slug, navigate])
    return (
        post ? (
            <div className="py-8">
                <Container>
                    <PostForm post={post} />
                </Container>
            </div>
        ) : (
            <div>Post not found</div>
        )
    )
}

export default EditPost