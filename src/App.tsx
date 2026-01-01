import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage,{loader as productsLoader} from './pages/ProductsPage';
import ProductPage, { loader as productLoader } from './pages/ProductPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export const queryClient = new QueryClient();
function App() {

  const router = createBrowserRouter([
  { path: "/", element: <RootLayout /> ,children:[
    {path:"",element:<HomePage />},
    {path:"products",element:<ProductsPage />
      ,loader:productsLoader
    },
    {path:"products/:id",element:<ProductPage />,loader:productLoader},
    {path:"about",element:<AboutPage />},
    {path:"*",element:<h1>404</h1>}
  ]},
]);

return <QueryClientProvider client={queryClient}><RouterProvider router={router} /></QueryClientProvider>;
}

export default App
