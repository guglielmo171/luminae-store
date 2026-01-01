import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import RootLayout, { rootLoader } from './pages/RootLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage,{loader as productsLoader} from './pages/ProductsPage';
import ProductPage, { loader as productLoader } from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export const queryClient = new QueryClient();
function App() {

  const router = createBrowserRouter([
   
  { path: "/", element: <RootLayout />, loader: rootLoader(queryClient), children:[
     {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path:"/profile",
      element:<ProfilePage />
    },
    {path:"",element:<HomePage />},
    {path:"products",element:<ProductsPage />
      ,loader:productsLoader
    },
    // {path:"products/:id",loader:productLoader,children[
      
    // ]},
    {path:"products/:id",element:<ProductPage />},
    {path:"about",element:<AboutPage />},
    {path:"*",element:<h1>404</h1>}
  ]},
]);

return <QueryClientProvider client={queryClient}><RouterProvider router={router} /></QueryClientProvider>;
}

export default App
