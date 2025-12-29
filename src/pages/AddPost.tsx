// Add Post page

import { Container } from "../components"
import PostForm from "../tinymce/PostForm"

function AddPost() {
    return (
        <div className="py-8">
            <Container>
                <PostForm />
            </Container>
        </div>
    )
}

export default AddPost