import conf from "../config/conf";
import { Client, TablesDB, Storage, Query, ID } from 'appwrite';

interface Article {
    title: string;
    slug: string;
    content: string;
    featuredImage: string;
    status: string;
    userId: string;
}

interface UpdateRequest {
    title: string;
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

    async createArticle({ title, slug, content, featuredImage, status, userId }: Article) {
        try {
            return await this.tables.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            });
        } catch (error) {
            console.log("Appwrite service :: createArticle :: error", error);
        }
    }

    async updateArticle(slug: string, { title, content, featuredImage, status }: UpdateRequest) {
        try {
            return await this.tables.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            });
        } catch (error) {
            console.log("Appwrite service :: updateArticle :: error", error);
        }
    }

    async deleteArticle(slug: string) {
        try {
            await this.tables.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
            });
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteArticle :: error", error);
            return false;
        }
    }

    async getArticle(slug: string) {
        try {
            return await this.tables.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            });
        } catch (error) {
            console.log("Appwrite service :: getArticle :: error", error);
        }
    }

    async getAllArticles(queries = [Query.equal("status", "active")]) {
        try {
            return await this.tables.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                queries: queries
            });
        } catch (error) {
            console.log("Appwrite service :: getAllArticles :: error", error);
        }
    }

    // File upload

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

    async filePreview(fileId: string) {
        try {
            const preview = await this.bucket.getFilePreview({
                bucketId: conf.appwriteBucketId,
                fileId: fileId
            });
            return preview;
        } catch (error) {
            console.log("Appwrite service :: filePreview :: error", error);
        }
    }
}

const configService = new ConfigService();

export default configService;
