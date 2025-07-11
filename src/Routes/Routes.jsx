import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layout/MainLayout';
import Home from '../Pages/Home';
import AuthLayout from '../Layout/AuthLayout';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import PackageDetails from '../Pages/PackageDetails';
import GuideDetails from '../Pages/GuideDetails';
import AllTrips from '../Pages/AllTrips';
import Community from '../Pages/Community';

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
            },
            {
                path: '/packages/:id',
                element: <PackageDetails></PackageDetails>,
                loader: ({ params }) => fetch(`http://localhost:3000/api/packages/${params.id}`)

            },
            {
                path: '/guides/:id',
                element: <GuideDetails />,
                loader: ({ params }) =>
                    fetch(`http://localhost:3000/api/guides/${params.id}`)
            },
            {
                path: '/allTrips',
                element: <AllTrips></AllTrips>,
                loader: () => fetch('http://localhost:3000/api/packages')
            },
            {
                path:'/community',
                element:<Community></Community>,
                loader:()=> fetch('http://localhost:3000/api/stories')
            }
        ]
    }

]);
