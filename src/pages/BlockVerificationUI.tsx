// Auth Layout default view when verification is pending

import authService from "../appwrite/auth";

function BlockVerificationUI() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
            <h1 className="text-4xl font-bold mb-4 text-lime-600">Please verify your email</h1>
            <p className="text-xl text-gray-600">
                We've sent a verification link to your email. <br />
                Please check your inbox to continue.
            </p>
            <div className='flex gap-4 mt-8'>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-lime-500 px-6 py-2 rounded-lg font-bold hover:bg-lime-400 transition-colors"
                >
                    I've verified my email
                </button>
                <button
                    onClick={() => {
                        authService.logout().then(() => {
                            window.location.reload();
                        })
                    }}
                    className="bg-black text-white px-6 py-2 rounded-lg font-bold"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default BlockVerificationUI