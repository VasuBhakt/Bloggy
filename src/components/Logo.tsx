function Logo({ width = "120px" }: { width?: string }) {
    return (
        <div
            className="flex items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-105"
            style={{ width: width }}
        >
            <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-lime-500/20 blur-lg rounded-full group-hover:bg-lime-500/30 transition-colors"></div>

                {/* The "B" Icon */}
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full relative"
                >
                    {/* Main rounded body */}
                    <rect x="25" y="10" width="10" height="80" rx="5" className="fill-lime-500" />
                    <path
                        d="M35 15C35 15 75 15 75 35C75 55 35 55 35 55C35 55 85 55 85 75C85 95 35 95 35 95"
                        stroke="currentColor"
                        strokeWidth="12"
                        strokeLinecap="round"
                        className="text-lime-500"
                    />

                    {/* Small accent for flair */}
                    <path
                        d="M10 50L22 42V58L10 50Z"
                        className="fill-emerald-400"
                    />
                </svg>
            </div>

            <h1 className="text-2xl font-black tracking-tighter bg-linear-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent transform transition-all group-hover:tracking-normal">
                Bloggy
            </h1>
        </div>
    )
}

export default Logo