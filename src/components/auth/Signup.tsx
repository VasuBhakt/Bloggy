import { useState } from 'react'
import authService from '../../appwrite/auth'
import { Link } from 'react-router-dom'
import { login } from '../../features/authSlice'
import { Button, Input, Logo } from '../index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {

    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const signup = async (data: any) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const user = await authService.getCurrentUser();
                if (user) {
                    dispatch(login(user));
                }
            }
        } catch (error: any) {
            setError(error.message);
        }
    }

    return (
        <>
            <div className='flex items-center justify-center w-full h-full'>
                <div className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black/10`}>
                    <div className='mb-2 flex justify-center'>
                        <span className='inline-block w-full max-w-[100px]'>
                            <Logo width='100%' />
                        </span>
                    </div>
                    <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create account</h2>
                    <p className='mt-2 text-center text-base text-black/60'>
                        Already have an account? &nbsp;
                        <Link to='/login' className='font-medium text-primary transition-all duration-200 hover:underline'>Sign in</Link>
                    </p>
                    <form onSubmit={handleSubmit(signup)}>
                        <div className='space-y-5'>
                            <Input label='Username: ' placeholder='Choose a username' type="text" {...register("username", {
                                required: true,
                            })} />
                            <Input label='Email: ' placeholder='Enter your email' type="email" {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address"
                                }
                            })} />
                            <Input label='Password: ' placeholder='Enter your password' type="password" {...register("password", {
                                required: true,
                            })} />
                            {error && <p className='text-red-500 text-center'>{error}</p>}
                            <Button type="submit" className='w-full'>Create Account</Button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup