import appwriteService from '../../appwrite/config'
import { Link } from 'react-router-dom';

interface CardProps {
    $id: string;
    title: string;
    featuredImage: string;
}

function Card({ $id, title, featuredImage }: CardProps) {
    return (
        <>
            <Link to={`/post/${$id}`}>
                <div className='w-full bg-blue-300 rounded-xl p-4'>
                    <div className='w-full justify-center mb-4'>
                        <img src={appwriteService.fileView(featuredImage)} alt={title} className='rounded-xl' />
                    </div>
                    <h2 className='text-2xl font-bold'>{title}</h2>
                </div>
            </Link>
        </>
    )
}

export default Card