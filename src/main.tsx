import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { About, AddPost, AllPosts, EditPost, HomePage, Login, Post, Signup, Verify } from './pages'
import Protected from './layout/AuthLayout.tsx'
import ProfilePage from './pages/ProfilePage.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <Protected authentication={false}>
            <HomePage />
          </Protected>
        )
      },
      {
        path: "login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      },
      {
        path: "register",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        )
      },
      {
        path: "add-post",
        element: (
          <Protected>
            <AddPost />
          </Protected>
        )
      },
      {
        path: "all-posts",
        element: (
          <AllPosts />
        )
      },
      {
        path: "edit-post/:id/:slug",
        element: (
          <Protected authentication>
            {" "}
            <EditPost />
          </Protected>
        )
      },
      {
        path: "post/:id/:slug",
        element: (
          <Post />
        )
      },
      {
        path: "verify",
        element: <Verify />
      },
      {
        path: "profile/:username",
        element: (
          <Protected>
            <ProfilePage />
          </Protected>
        )
      },
      {
        path: "about",
        element: (
          <About />
        )
      },
    ]

  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
