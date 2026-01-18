import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import RootLayout, { rootLoader } from './pages/RootLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage,{loader as productsLoader} from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { handleGlobalError } from './api/utils/errorHandler';
import AdminLayout, { adminLoader } from './pages/admin/AdminLayout';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ErrorPage from './pages/ErrorPage';
export const queryClient = new QueryClient({
  defaultOptions:{
    mutations:{
      onError:(error)=>handleGlobalError(error)
    }
  }
});
function App() {

  const router = createBrowserRouter([
   
  { path: "/", element: <RootLayout />, loader: rootLoader(queryClient), errorElement: <ErrorPage />, children:[
    {path:"",element:<HomePage />},
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path:"profile",
      element:<ProfilePage />
    },
    {
      path:"update-password",
      element:<UpdatePasswordPage />
    },
    {path:"products",element:<ProductsPage />
      ,loader:productsLoader
    },
    {path:"products/:id",element:<ProductPage />},
    {path:"about",element:<AboutPage />},
    {path:"unauthorized", element:<UnauthorizedPage />},
    {path:"*",element:<ErrorPage />}
  ]},
  {path:"/admin",loader:adminLoader(queryClient),element:<AdminLayout />,errorElement: <ErrorPage />,children:[

    {path:"",element:<AdminDashboardPage />},
    {path:"products", element:<AdminProductsPage />},
    {path:"categories", element:<AdminCategoriesPage />},
    {
      path:"profile",
      element:<ProfilePage />
    },
      
    ]}
]);

return <QueryClientProvider client={queryClient}><RouterProvider router={router} /></QueryClientProvider>;
}

export default App
