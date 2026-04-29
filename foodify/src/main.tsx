import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, Navigate } from 'react-router-dom';

import './index.css';
import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Buyer/LayoutPage';
import FoodsCard from './components/Buyer/FoodsCard';
import FoodsDeatils from './components/Buyer/FoodsDeatils';
import CartFoods from './components/Buyer/CartFoods';
import Orders from './components/Buyer/Orders';
import SellerLayout from './components/Seller/Layout';
import Dashboard from './components/Seller/Dashboard';
import Products from './components/Seller/Products';
import OrderDetails from './components/Seller/OrderDetails';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/Auth/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/login' replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: 'buyer',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'foods',
        element: <FoodsCard />,
      },
      {
        path: 'details',
        element: <FoodsDeatils />,
      },
      {
        path: 'cartfood',
        element: <CartFoods />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
    ],
  },
  {
    path: 'seller',
    element: (
      <ProtectedRoute>
        <SellerLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'orders',
        element: <OrderDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
