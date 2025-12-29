import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './features/authSlice';
import { Outlet, useLocation } from 'react-router-dom';
import { Header, Footer } from './components';
import { motion, AnimatePresence } from 'framer-motion';


function App() {

  const [loading, setLoading] = useState(true);
  const location = useLocation();

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
    <div className='min-h-screen flex flex-col bg-no-repeat w-full items-center justify-center'>
      <Header />
      <main className="grow w-full flex flex-col h-full overflow-hidden">
        <AnimatePresence>
          <motion.div key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className='w-full grow flex flex-col'>
            <Outlet />
          </motion.div>
        </AnimatePresence>

      </main>
      <Footer />
    </div>
  ) : (
    <div className='h-screen flex items-center justify-center bg-black text-lime-400'>Loading...</div>
  )
}

export default App
