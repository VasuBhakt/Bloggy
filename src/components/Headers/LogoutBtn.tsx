// Logout Button 

import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../features/authSlice"
import { useNavigate } from "react-router-dom";

function LogoutBtn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // logout functionality
    const logoutUser = () => {
        authService.logout()
            .then(() => {
                dispatch(logout());
            })
            .then(() => {
                navigate("/"); // navigate to home page
            })
            .catch((error) => {
                console.log("LogoutBtn :: logoutUser :: error", error);
            })
    }

    return (
        <button className="inline-block px-6 py-2 duration-200 hover:text-red-500 rounded-b-3xl font-semibold" onClick={logoutUser} >Logout</button>
    )
}

export default LogoutBtn