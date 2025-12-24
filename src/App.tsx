import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './features/authSlice';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';

function App() {

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout()); // if not logged in, always logout
        }
      })
      .catch((error) => {
        console.log("App :: useEffect :: getCurrentUser :: error", error);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-blue-200 bg-no-repeat w-full h-full'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default App
