const conf = {
    appwriteUrl: import.meta.env.VITE_APPWRITE_ENDPOINT,
    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    appwriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
    tinymceApiKey: import.meta.env.VITE_TINY_MCE_API_KEY,
    algoliaApplicationId: import.meta.env.VITE_ALGOLIA_APPLICATION_ID,
    algoliaSearchApiKey: import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY,
    algoliaAdminApiKey: import.meta.env.VITE_ALGOLIA_ADMIN_API_KEY,
    algoliaIndexName: import.meta.env.VITE_ALGOLIA_INDEX_NAME,
}

export default conf