// Footer component
import { Link } from "react-router-dom";
import Logo from "../Logo";
import conf from "../../config/conf";

function Footer() {
    return (
        <section className="relative overflow-hidden py-12 bg-black w-full border-t border-white/10">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap justify-between">
                    {/* Brand & Copyright */}
                    <div className="w-full p-6 lg:w-4/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="120px" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-2 max-w-xs">
                                    Built with passion. A modern space for thoughts and stories, designed for thinkers and creators.
                                </p>
                                <p className="text-xs text-gray-600 font-mono">
                                    &copy; 2025 VasuBhakt. All Rights Reserved.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap lg:w-7/12 justify-between">
                        {/* Connect Section */}
                        <div className="w-1/2 p-6 sm:w-1/3 md:w-1/3 lg:w-auto">
                            <div className="h-full">
                                <h3 className="tracking-px mb-6 text-xs font-bold uppercase text-lime-500">
                                    Connect
                                </h3>
                                <ul className="flex flex-col gap-3">
                                    <li>
                                        <a target="_blank" rel="noreferrer"
                                            className="text-base text-gray-400 hover:text-lime-400 transition-colors duration-200"
                                            href={conf.githubUrl}>
                                            GitHub
                                        </a>
                                    </li>
                                    <li>
                                        <a target="_blank" rel="noreferrer"
                                            className="text-base text-gray-400 hover:text-lime-400 transition-colors duration-200"
                                            href={conf.linkedinUrl}>
                                            LinkedIn
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/*About Section*/}
                        <div className="w-1/2 p-6 sm:w-1/3 md:w-1/3 lg:w-auto">
                            <div className="h-full">
                                <h3 className="tracking-px mb-6 text-xs font-bold uppercase text-lime-500">
                                    About
                                </h3>
                                <ul className="flex flex-col gap-3">

                                    <li>
                                        <Link to="/about" className="text-base text-gray-400 hover:text-lime-400 transition-colors duration-200">
                                            About Me
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Project Section */}
                        <div className="w-full p-6 sm:w-1/3 md:w-1/3 lg:w-auto">
                            <div className="h-full">
                                <h3 className="tracking-px mb-6 text-xs font-bold uppercase text-lime-500">
                                    Project
                                </h3>
                                <ul className="flex flex-col gap-3">
                                    <li>
                                        <a target="_blank" rel="noreferrer"
                                            className="text-base text-gray-400 hover:text-lime-400 transition-colors duration-200"
                                            href={conf.sourceCodeUrl}>
                                            Source Code
                                        </a>
                                    </li>
                                    <li>
                                        <a target="_blank" rel="noreferrer"
                                            className="text-base text-gray-400 hover:text-lime-400 transition-colors duration-200"
                                            href={conf.documentationUrl}>
                                            Documentation
                                        </a>
                                    </li>
                                    <li>
                                        <a target="_blank" rel="noreferrer"
                                            className="text-base text-gray-400 hover:text-lime-400 transition-colors duration-200"
                                            href={conf.reportABugUrl}>
                                            Report a Bug
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;

