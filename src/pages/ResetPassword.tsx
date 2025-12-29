import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import authService from "../appwrite/auth";
import { Button, Input, Logo } from "../components";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

function ResetPassword() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    const onReset = async (data: any) => {
        setError("");

        if (!userId || !secret) {
            setError("Invalid or expired reset link.");
            return;
        }

        setIsLoading(true);

        try {
            await authService.resetPassword({
                userId,
                secret,
                password: data.password
            });
            setMessage("Password reset successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (err: any) {
            setError(err.message || "Failed to reset password. The link may have expired.");
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
                <h2 className="text-center text-2xl font-bold leading-tight">Reset Password</h2>
                <p className="mt-2 text-center text-base text-black/60 mb-8">
                    Choose a strong new password for your account.
                </p>

                {error && <p className="text-red-600 mt-4 text-center bg-red-50 p-2 rounded-lg">{error}</p>}
                {message && <p className="text-lime-600 mt-4 text-center bg-lime-50 p-2 rounded-lg">{message}</p>}

                <form onSubmit={handleSubmit(onReset)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="New Password"
                            placeholder="Enter new password"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                }
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{(errors.password as any).message}</p>}

                        <Input
                            label="Confirm New Password"
                            placeholder="Confirm new password"
                            type="password"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === watch('password') || "Passwords do not match"
                            })}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{(errors.confirmPassword as any).message}</p>}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading || !!message}
                        >
                            {isLoading ? "Updating..." : "Update Password"}
                        </Button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Back to{" "}
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

export default ResetPassword;
