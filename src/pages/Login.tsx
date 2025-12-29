// Login Page
import { Login as LoginForm } from '../components'
import { motion } from 'framer-motion'

function Login() {
    return (
        <div className="w-full min-h-screen py-10 flex items-center justify-center bg-linear-to-br from-lime-950 via-lime-400 to-lime-700">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-lg mx-auto"
            >
                <LoginForm />
            </motion.div>
        </div>
    )
}

export default Login