// Auth Layout default view when verification is pending

import authService from "../appwrite/auth";
import { Button } from "../components";

function BlockVerificationUI() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
            <h1 className="text-4xl font-bold mb-4 text-lime-600">Please verify your email</h1>
            <p className="text-xl text-gray-600">
                We've sent a verification link to your email. <br />
                Please check your inbox to continue.
            </p>
            <div className='flex flex-wrap items-center justify-center gap-4 mt-8'>
                <Button
                    onClick={() => {
                        authService.verifyEmail().then(() => alert("Verification email resent!"));
                    }}
                    className="px-6 py-2 rounded-lg font-bold hover:bg-zinc-800 transition-colors"
                    bgColor="bg-zinc-900"
                    textColor="text-white"
                >
                    Resend Email
                </Button>
                <Button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 rounded-lg font-bold hover:bg-lime-400 transition-colors"
                    bgColor="bg-lime-500"
                    textColor="text-black"
                >
                    I've verified my email
                </Button>
                <Button
                    onClick={() => {
                        authService.logout().then(() => {
                            window.location.reload();
                        })
                    }}
                    className="px-6 py-2 rounded-lg font-bold border border-white/10 hover:bg-zinc-900 transition-colors"
                    bgColor="bg-black"
                    textColor="text-white"
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default BlockVerificationUI