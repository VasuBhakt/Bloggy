// Configuraton file for managing blogs on Appwrite

import conf from "../config/conf";
import { Client, TablesDB, Storage, Query, ID } from 'appwrite';

// Article interface
export interface Article {
    title: string;
    slug: string;
    content: string;
    featuredImage: string;
    status: string;
    userid: string;
    username: string;
}

// Update article interface
interface UpdateRequest {
    title: string;
    slug: string;
    content: string;
    featuredImage: string;
    status: string;
}


export class ConfigService {

    client = new Client();
    tables: TablesDB; // TablesDB usually uses the Databases class but new methods
    bucket: Storage;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.tables = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    // Create article
    async createArticle({ title, slug, content, featuredImage, status, userid, username }: Article) {
        try {
            return await this.tables.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: ID.unique(), // Use unique ID instead of slug
                data: {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userid,
                    username,
                }
            });
        } catch (error) {
            console.log("Appwrite service :: createArticle :: error", error);
        }
    }

    // Update article
    async updateArticle(id: string, { title, slug, content, featuredImage, status }: UpdateRequest) {
        try {
            return await this.tables.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: id, // Use the unique ID, not slug
                data: {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                }
            });
        } catch (error) {
            console.log("Appwrite service :: updateArticle :: error", error);
        }
    }

    // Delete article
    async deleteArticle(id: string) {
        try {
            await this.tables.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: id,
            });
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteArticle :: error", error);
            return false;
        }
    }

    // Get Article by ID
    async getArticle(id: string) {
        try {
            return await this.tables.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: id
            });
        } catch (error) {
            console.log("Appwrite service :: getArticle :: error", error);
        }
    }

    // Get all articles of user with userid
    async getAllArticlesOfUser(userid: string, queries = [Query.equal("userid", userid)]) {
        try {
            const articles = await this.tables.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                queries: queries
            });
            return articles.rows;
        } catch (error) {
            console.log("Appwrite service :: getAllArticlesOfUser :: error", error);
        }
    }

    // Get all articles with status active
    async getAllArticles(queries = [Query.equal("status", "active")]) {
        try {
            const articles = await this.tables.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                queries: queries
            });
            return articles.rows;
        } catch (error) {
            console.log("Appwrite service :: getAllArticles :: error", error);
        }
    }

    // File upload

    // Image upload
    async uploadFile(file: File) {
        try {
            const fileUploaded = await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: file
            })
            return fileUploaded;
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
        }
    }

    // Image delete
    async deleteFile(fileId: string) {
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: fileId
            });
            return "File deleted successfully!";
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
        }
    }

    // View file
    fileView(fileId: string) {
        const preview = this.bucket.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId: fileId
        });
        console.log(preview);
        return preview.toString();
    }
}

const configService = new ConfigService();

export default configService;
