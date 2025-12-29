// Algolia Search Service
import { algoliasearch } from 'algoliasearch';
import conf from '../config/conf';

// We use the ADMIN key here because we need permission to add/update/delete posts
const client = algoliasearch(conf.algoliaApplicationId, conf.algoliaAdminApiKey);

// Algolia Post with ObjectID
export interface AlgoliaPost {
    objectID: string;
    title: string;
    slug: string;
    featuredImage: string;
    status: string;
    userId: string;
    username: string;
    [key: string]: any;    // Allow other properties (fixes TypeScript error)
}

class AlgoliaService {
    private indexName: string;

    constructor() {
        // Algolia Index Name
        this.indexName = conf.algoliaIndexName;
    }

    // Add post to Algolia
    async addPost(post: AlgoliaPost): Promise<void> {
        try {
            await client.saveObject({
                indexName: this.indexName,
                body: post,
            });
            console.log('Post added to Algolia:', post.title);
        } catch (error) {
            console.error('Failed to add post to Algolia:', error);
            throw error;
        }
    }

    // Update post in Algolia
    async updatePost(post: AlgoliaPost): Promise<void> {
        try {
            await client.saveObject({
                indexName: this.indexName,
                body: post,
            });
            console.log('Post updated in Algolia:', post.title);
        } catch (error) {
            console.error('Failed to update post in Algolia:', error);
            throw error;
        }
    }

    // Delete post from Algolia
    async deletePost(postId: string): Promise<void> {
        try {
            await client.deleteObject({
                indexName: this.indexName,
                objectID: postId,
            });
            console.log('Post deleted from Algolia:', postId);
        } catch (error) {
            console.error('Failed to delete post from Algolia:', error);
            throw error;
        }
    }

    /**
     * Add MULTIPLE posts at once (batch operation)
     * Not used currently
     */
    async addMultiplePosts(posts: AlgoliaPost[]): Promise<void> {
        try {
            await client.saveObjects({
                indexName: this.indexName,
                objects: posts,
            });
            console.log(`Added ${posts.length} posts to Algolia`);
        } catch (error) {
            console.error('Failed to batch add posts:', error);
            throw error;
        }
    }
}

const algoliaService = new AlgoliaService();

export default algoliaService;
