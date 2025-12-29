// Signup Page

import SignupForm from "../components/auth/Signup"
import { motion } from 'framer-motion'

function Signup() {
    return (
        <div className='w-full min-h-screen py-10 flex items-center justify-center bg-linear-to-br from-lime-950 via-lime-400 to-lime-700'>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg mx-auto"
            >
                <SignupForm />
            </motion.div>
        </div>
    )
}

export default Signup;