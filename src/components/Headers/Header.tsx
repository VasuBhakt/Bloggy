import { Container, Logo, LogoutBtn, NavButton } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {

    const authStatus = useSelector((state: any) => state.auth.status);
    const navigate = useNavigate();

    if (!authStatus) {
        return (
            <header className="sticky top-0 z-50 py-3 shadow-sm bg-white/70 backdrop-blur-md border-b border-black/10 w-full">
                <Container>
                    <nav className="flex">
                        <div className="mr-4">
                            <Link to="/">
                                <Logo width="100px" />
                            </Link>
                        </div>
                        <ul className="flex mx-10">
                            <li>
                                <Link to="/">
                                    <button
                                        onClick={() => navigate("/")}
                                        className={`inline-block px-6 py-2 duration-200 font-semibold rounded-b-3xl hover:text-lime-500`}>Home</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/all-posts">
                                    <button
                                        onClick={() => navigate("/all-posts")}
                                        className={`inline-block px-6 py-2 duration-200 font-semibold rounded-b-3xl hover:text-lime-500`}>Explore</button>
                                </Link>
                            </li>
                        </ul>
                        <ul className="flex ml-auto items-center">
                            <li>
                                <Link to="/login">
                                    <button
                                        onClick={() => navigate("/login")}
                                        className={`inline-block px-6 py-2 duration-200 font-semibold rounded-b-3xl hover:text-lime-500`}>Sign in</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/register">
                                    <NavButton label="Register Now" />
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </Container>
            </header>
        )
    } else {
        return (
            <header className="sticky top-0 z-50 py-3 shadow-sm bg-white/70 backdrop-blur-md border-b border-black/10 w-full">
                <Container>
                    <nav className="flex">
                        <div className="mr-4">
                            <Link to="/">
                                <Logo width="100px" />
                            </Link>
                        </div>
                        <ul className="flex mx-10">
                            <li>
                                <Link to="/">
                                    <button
                                        onClick={() => navigate("/")}
                                        className={`inline-block px-6 py-2 duration-200 font-semibold rounded-b-3xl hover:text-lime-500`}>Home</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/all-posts">
                                    <button
                                        onClick={() => navigate("/all-posts")}
                                        className={`inline-block px-6 py-2 duration-200 font-semibold rounded-b-3xl hover:text-lime-500`}>Explore</button>
                                </Link>
                            </li>
                        </ul>
                        <ul className="flex ml-auto items-center">
                            <li>
                                <Link to="/add-post">
                                    <NavButton label=" + Add Post" />
                                </Link>
                            </li>
                            {authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    </nav>
                </Container>
            </header>
        )
    }

}

export default Header