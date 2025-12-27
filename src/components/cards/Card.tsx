import appwriteService from '../../appwrite/config'
import { Link } from 'react-router-dom';

interface CardProps {
    $id: string;
    title: string;
    featuredImage: string;
    slug: string;
}

function Card({ $id, title, featuredImage, slug }: CardProps) {
    return (
        <Link to={`/post/${$id}/${slug}`} className="block h-full group">
            <div className='w-full h-full bg-white border border-lime-300 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-lime-500 flex flex-col'>
                <div className='w-full h-52 overflow-hidden relative'>
                    <img
                        src={appwriteService.fileView(featuredImage)}
                        alt={title}
                        className='w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-115'
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className='p-6 flex flex-col grow'>
                    <h2 className='text-xl font-bold text-gray-800 leading-tight mb-2 group-hover:text-lime-600 transition-colors line-clamp-2'>
                        {title}
                    </h2>
                    <div className="mt-auto pt-4 flex items-center text-sm font-medium text-gray-400 group-hover:text-lime-500 transition-colors">
                        <span>Read article</span>
                        <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card