import { algoliasearch } from 'algoliasearch';
import conf from '../config/conf';

// Create a client that can talk to Algolia
// We use the ADMIN key here because we need permission to add/update/delete posts
const client = algoliasearch(conf.algoliaApplicationId, conf.algoliaAdminApiKey);

/**
 * This is the shape of a post when we send it to Algolia
 * It's similar to your Appwrite post, but Algolia needs an 'objectID' field
 */
export interface AlgoliaPost {
    objectID: string;
    title: string;
    slug: string;
    content: string;
    featuredImage: string;
    status: string;
    userId: string;
    [key: string]: any;    // Allow other properties (fixes TypeScript error)
}

class AlgoliaService {
    private indexName: string;

    constructor() {
        // This is the name of your Algolia index (like a database table)
        this.indexName = conf.algoliaIndexName;
    }

    /**
     * 📤 Add a NEW post to Algolia
     * 
     * When you create a blog post, this function sends it to Algolia
     * so people can search for it immediately.
     */
    async addPost(post: AlgoliaPost): Promise<void> {
        try {
            await client.saveObject({
                indexName: this.indexName,
                body: post,
            });
            console.log('✅ Post added to Algolia:', post.title);
        } catch (error) {
            console.error('❌ Failed to add post to Algolia:', error);
            throw error;
        }
    }

    /**
     * 📝 Update an EXISTING post in Algolia
     * 
     * When you edit a blog post, this updates it in Algolia
     * so the search results stay fresh.
     */
    async updatePost(post: AlgoliaPost): Promise<void> {
        try {
            await client.saveObject({
                indexName: this.indexName,
                body: post,
            });
            console.log('✅ Post updated in Algolia:', post.title);
        } catch (error) {
            console.error('❌ Failed to update post in Algolia:', error);
            throw error;
        }
    }

    /**
     * 🗑️ Delete a post from Algolia
     * 
     * When you delete a blog post, this removes it from Algolia
     * so it won't show up in search anymore.
     */
    async deletePost(postId: string): Promise<void> {
        try {
            await client.deleteObject({
                indexName: this.indexName,
                objectID: postId,
            });
            console.log('✅ Post deleted from Algolia:', postId);
        } catch (error) {
            console.error('❌ Failed to delete post from Algolia:', error);
            throw error;
        }
    }

    /**
     * 📦 Add MULTIPLE posts at once (batch operation)
     * 
     * This is more efficient than adding posts one by one.
     * We'll use this to upload all your existing posts.
     */
    async addMultiplePosts(posts: AlgoliaPost[]): Promise<void> {
        try {
            await client.saveObjects({
                indexName: this.indexName,
                objects: posts,
            });
            console.log(`✅ Added ${posts.length} posts to Algolia`);
        } catch (error) {
            console.error('❌ Failed to batch add posts:', error);
            throw error;
        }
    }
}

const algoliaService = new AlgoliaService();

export default algoliaService;
