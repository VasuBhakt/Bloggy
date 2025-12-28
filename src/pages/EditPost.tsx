import { useEffect, useState } from "react"
import { Container } from "../components"
import PostForm from "../tinymce/PostForm"
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
    const [post, setPost] = useState<any>(null);
    const { id } = useParams(); // Use id from compound URL
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            appwriteService.getArticle(id).then((post) => {
                if (post) {
                    setPost(post);
                }
            })
        } else {
            navigate('/');
        }
    }, [id, navigate])
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