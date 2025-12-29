import { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../appwrite/auth";
import { Button, Input, Logo } from "../components";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

function ForgotPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onForgot = async (data: any) => {
        setError("");
        setMessage("");
        setIsLoading(true);

        try {
            await authService.forgotPassword({ email: data.email });
            setMessage("Password reset link sent to your email!");
        } catch (err: any) {
            console.log(err.message);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-full min-h-[80vh] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black/10 shadow-sm"
            >
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Forgot Password?</h2>
                <p className="mt-2 text-center text-base text-black/60 mb-8">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                {error && <p className="text-red-600 mt-4 text-center bg-red-50 p-2 rounded-lg">{error}</p>}
                {message && <p className="text-lime-600 mt-4 text-center bg-lime-50 p-2 rounded-lg">{message}</p>}

                <form onSubmit={handleSubmit(onForgot)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Email Address"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address"
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{(errors.email as any).message}</p>}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading || !!message}
                        >
                            {isLoading ? "Sending..." : "Send Reset Link"}
                        </Button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Remembered your password?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-lime-600 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

export default ForgotPassword;
