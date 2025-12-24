import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../features/authSlice"

function LogoutBtn() {

    const dispatch = useDispatch();

    const logoutUser = () => {
        authService.logout()
            .then(() => {
                dispatch(logout());
            })
            .catch((error) => {
                console.log("LogoutBtn :: logoutUser :: error", error);
            })
    }

    return (
        <button className="inline-block px-6 py-2 duration-200 hover:bg-red-500 rounded-b-3xl">Logout</button>
    )
}

export default LogoutBtn