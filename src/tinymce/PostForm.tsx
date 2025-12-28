import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, Container } from '../components/index'
import appwriteService from '../appwrite/config'
import algoliaService from '../algolia/algoliaService'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import RTE from './RTE'

interface PostFormData {
    title: string;
    slug: string;
    content: string;
    status: string;
    image: FileList;
}

function PostForm({ post }: any) {

    const navigate = useNavigate();
    const userData = useSelector((state: any) => state.auth.userData)

    const { register, handleSubmit, control, getValues, watch, setValue } = useForm<PostFormData>({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });

    const submit = async (data: any) => {
        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }
                const dbPost = await appwriteService.updateArticle(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                    status: data.status,
                    username: userData.name,
                    name: userData.prefs?.name
                })

                if (dbPost) {
                    await algoliaService.updatePost({
                        objectID: dbPost.$id,
                        title: dbPost.title,
                        slug: dbPost.slug,
                        featuredImage: dbPost.featuredImage,
                        status: dbPost.status,
                        userId: dbPost.userId,
                        username: userData.name,
                    });

                    navigate(`/post/${dbPost.$id}/${data.slug}`)
                }
            } else {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createArticle({
                        ...data,
                        userid: userData.$id,
                        username: userData.name,
                        name: userData.prefs?.name
                    });

                    if (dbPost) {
                        await algoliaService.addPost({
                            objectID: dbPost.$id,
                            title: dbPost.title,
                            slug: dbPost.slug,
                            featuredImage: dbPost.featuredImage,
                            status: dbPost.status,
                            userId: dbPost.userId,
                            username: userData.name,
                        });

                        navigate(`/post/${dbPost.$id}/${data.slug}`)
                    }
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    }

    const slugTransform = useCallback((value: any) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9\s]+/g, "-")
                .replace(/\s/g, "-")
        }
        return '';
    }, [])

    useEffect(() => {
        if (post) {
            setValue('slug', slugTransform(getValues('title')));
        }
        const subscription = watch((value, { name }) => {
            if (name === 'title' && value.title) {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue])

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const watchedImage = watch("image");

    useEffect(() => {
        if (watchedImage && watchedImage.length > 0) {
            const file = watchedImage[0];
            const url = URL.createObjectURL(file);
            setImagePreview(url);

            return () => URL.revokeObjectURL(url);
        }
    }, [watchedImage]);

    return (
        <div className="py-12 bg-gray-50/50 min-h-screen">
            <Container>
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {post ? "Edit Story" : "Create a new Story"}
                        </h1>
                        <p className="text-gray-500 mt-2">Share your thoughts with the world</p>
                    </div>

                    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-8 lg:flex-nowrap">
                        {/* Left Column: Content */}
                        <div className="w-full lg:w-2/3 flex flex-col gap-6">
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                <Input
                                    label="Title"
                                    placeholder="Enter a catchy title..."
                                    className="mb-6 text-xl font-semibold"
                                    {...register("title", { required: true })}
                                />
                                <Input
                                    label="Slug"
                                    placeholder="post-url-slug"
                                    className="mb-6 bg-gray-50 text-gray-500 font-mono text-sm"
                                    {...register("slug", { required: true })}
                                    readOnly
                                />
                                <div className="prose-editor">
                                    <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Settings & publishing */}
                        <div className="w-full lg:w-1/3 flex flex-col gap-6">
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Publishing</h3>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                                    <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-lime-400 transition-colors bg-gray-50 text-center group cursor-pointer">

                                        {/* Hidden real input, covering the whole area */}
                                        <input
                                            type="file"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            accept="image/png, image/jpg, image/jpeg, image/gif"
                                            {...register("image", { required: !post })}
                                        />

                                        {/* Visual styling */}
                                        <div className="flex flex-col items-center pointer-events-none">
                                            <div className="bg-white p-3 rounded-full mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                                                <svg className="w-6 h-6 text-gray-400 group-hover:text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <p className="text-sm font-medium text-gray-600">Click to upload image</p>
                                            <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF</p>
                                        </div>
                                    </div>
                                </div>

                                {(post || imagePreview) && (
                                    <div className="w-full mb-6 rounded-xl overflow-hidden border border-gray-200">
                                        <img
                                            src={imagePreview || appwriteService.fileView(post.featuredImage)}
                                            alt={post?.title || "Featured Image"}
                                            className="w-full h-40 object-cover"
                                        />
                                    </div>
                                )}

                                <Select
                                    options={["active", "inactive"]}
                                    label="Status"
                                    className="mb-6"
                                    {...register("status", { required: true })}
                                />

                                <Button
                                    type="submit"
                                    bgColor={post ? "bg-lime-400" : "bg-lime-400"}
                                    className="w-full text-black! font-bold py-3 rounded-xl shadow-lg hover:shadow-xl hover:bg-lime-500 transition-all transform hover:-translate-y-1"
                                >
                                    {post ? "Update Story" : "Publish Story"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    )
}

export default PostForm