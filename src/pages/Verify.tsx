import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import authService from '../appwrite/auth'
import { Container } from '../components'
import { useDispatch } from 'react-redux'
import { logout } from '../features/authSlice'

function Verify() {
    const [searchParams] = useSearchParams()
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState('Verifying your email...')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const userId = searchParams.get('userId')
        const secret = searchParams.get('secret')

        if (userId && secret) {
            authService.updateVerify({ userId, secret })
                .then(() => {
                    setStatus('success')
                    setMessage('Email verified successfully!')
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000)
                })
                .catch((error: any) => {
                    setStatus('error')
                    setMessage(error.message || 'Verification failed. The link may be expired.')
                    authService.logout().then(() => dispatch(logout()))
                })
        } else {
            setStatus('error')
            setMessage('Invalid verification link.')
            authService.logout().then(() => dispatch(logout()))
        }

    }, [searchParams, navigate, dispatch])

    return (
        <div className='w-full py-20'>
            <Container>
                <div className='flex flex-col items-center justify-center text-center'>
                    <h1 className={`text-4xl font-bold mb-6 ${status === 'error' ? 'text-red-500' : 'text-lime-600'}`}>
                        {status === 'loading' ? 'Verifying...' : status === 'success' ? 'Success!' : 'Error'}
                    </h1>
                    <p className='text-xl text-gray-700'>
                        {message}
                    </p>
                    {status === 'success' && (
                        <p className='mt-4 text-gray-500'>Redirecting to home in 3 seconds...</p>
                    )}
                    {status === 'error' && (
                        <button
                            onClick={() => navigate('/login')}
                            className='mt-8 bg-black text-lime-400 px-6 py-2 rounded-lg font-semibold'
                        >
                            Go to Login
                        </button>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default Verify
