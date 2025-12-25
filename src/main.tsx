import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddPost, AllPosts, EditPost, HomePage, Login, Post, Signup } from './pages'
import Protected from './layout/AuthLayout.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />
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
        element: <AllPosts />
      },
      {
        path: "edit-post/:slug",
        element: (
          <Protected authentication>
            {" "}
            <EditPost />
          </Protected>
        )
      },
      {
        path: "post/:slug",
        element: <Post />
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
