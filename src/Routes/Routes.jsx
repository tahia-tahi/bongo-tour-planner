import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layout/MainLayout';
import Home from '../Pages/Home';
import AuthLayout from '../Layout/AuthLayout';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';

export const router = createBrowserRouter([

    {
        path: '/',
        Component: MainLayout,
        children: [

            {
                path: '/',
                Component: Home
            },
            {
                path: '/auth',
                Component: AuthLayout,
                children: [

                    {
                        path: '/auth/login',
                        Component: Login
                    },
                    {
                        path: '/auth/signup',
                        Component: SignUp
                    }

                ]
            }
        ]
    }

]);
