import { motion } from 'framer-motion';
import { Container } from '../components';
import conf from '../config/conf';

function About() {
    const techStack = [
        { name: "React", description: "Frontend library for building dynamic user interfaces.", color: "bg-blue-500" },
        { name: "Appwrite", description: "Backend-as-a-Service for authentication, database, and storage.", color: "bg-pink-500" },
        { name: "Algolia", description: "High-performance search engine for instant results.", color: "bg-blue-600" },
        { name: "Redux Toolkit", description: "State management for predictable app behavior.", color: "bg-purple-600" },
        { name: "TinyMCE", description: "Rich text editor for content-creation.", color: "bg-yellow-500" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework for modern styling.", color: "bg-teal-500" },
        { name: "Framer Motion", description: "Animation library for smooth page transitions.", color: "bg-indigo-500" },
        { name: "Vercel", description: "Continuous deployment and hosting platform for modern web apps.", color: "bg-white text-black" },

    ];

    const futurePlans = [
        { title: "Social Connectivity", description: "Friends, followers, and real-time activity feeds to see what your community is writing." },
        { title: "Collaborative Editing", description: "Shared drafts and co-authoring tools to bring multiple perspectives into a single story." },
        { title: "Interactive Comments", description: "Deep threading and reactions to foster real conversations under every post." },
        { title: "Appwrite Server Power", description: "Secure account deletion, automated email newsletters, and advanced moderation via Server Functions." },
        { title: "Dark Mode", description: "A sleek, eye-friendly theme for late-night inspiration." },
    ];

    return (
        <div className="py-20 bg-black text-white min-h-screen">
            <Container>
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center mb-32"
                >
                    <h1 className="text-5xl md:text-7xl font-black pb-6 mb-6 bg-linear-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
                        The Vision
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                        Bloggy is evolving from a simple blogging engine into a collaborative social ecosystem.
                        A space where thoughts aren't just published, but shared, critiqued, and built upon by a
                        global community of thinkers and creators.
                    </p>
                </motion.div>

                {/* Developer Section */}
                <div className="flex flex-wrap items-center gap-12 mb-40">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-5/12"
                    >
                        <h2 className="text-4xl font-bold mb-6 text-white">The Developer</h2>
                        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                            Hey! I'm <span className="text-lime-400 font-semibold">Swastik Bose</span>, a.k.a. <span className="text-lime-400 font-semibold">VasuBhakt</span>, a developer passionate about building clean,
                            performant software applications. I love exploring new technologies and transforming them into functional projects. Let’s build something great together — catch me on my socials!
                        </p>

                        <div className="flex gap-4">
                            <a href={conf.githubUrl} target="_blank" rel="noreferrer" className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-lime-400 transition-colors">
                                GitHub
                            </a>
                            <a href={conf.linkedinUrl} target="_blank" rel="noreferrer" className="px-6 py-3 border border-gray-700 text-white font-bold rounded-xl hover:border-lime-400 transition-colors">
                                LinkedIn
                            </a>
                            <a href={conf.instagramUrl} target="_blank" rel="noreferrer" className="px-6 py-3 bg-linear-to-r from-pink-500 to-purple-700 text-black font-bold rounded-xl transition-colors">
                                Instagram
                            </a>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-6/12 bg-linear-to-br from-lime-500/20 to-emerald-500/10 p-1 rounded-3xl"
                    >
                        <div className="bg-zinc-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/5">
                            <pre className="text-sm font-mono text-lime-400/80 overflow-x-auto">
                                <code>{`{
  "name": "Swastik Bose",
  "role": "Software Developer",
  "mission": "Be a good software developer!",
  "status": "Available for collaboration",
  "university": "Jadavpur University",
  "location": "Kolkata, India"
}`}</code>
                            </pre>
                        </div>
                    </motion.div>
                </div>

                {/* Tech Stack */}
                <div className="mb-40">
                    <h2 className="text-4xl font-bold text-center mb-16">Tech Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {techStack.map((tech, index) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-zinc-900 border border-white/5 hover:border-lime-500/30 transition-all group"
                            >
                                <div className={`w-12 h-12 ${tech.color} rounded-2xl mb-6 flex items-center justify-center font-bold text-xl`}>
                                    {tech.name[0]}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{tech.name}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {tech.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Future Plans */}
                <div className="bg-zinc-900/30 border border-white/5 rounded-[3rem] p-12 md:p-20 text-center">
                    <h2 className="text-4xl font-bold mb-6 italic">Roadmap & Scaling</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-16">
                        Bloggy is designed to grow. Here's what's coming next as we scale from a project to a platform.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                        {futurePlans.map((plan) => (
                            <div key={plan.title} className="flex gap-4">
                                <span className="text-lime-500 font-bold">+</span>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">{plan.title}</h4>
                                    <p className="text-gray-500 text-sm">{plan.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default About;
