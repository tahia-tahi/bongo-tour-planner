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
import MyBookings from '../Pages/MyBookings';
import PaymentPage from '../Pages/PaymentPage';
import TouristDashboard from '../Layout/TouristDashboard';
import ManageProfile from '../Pages/ManageProfile';
import ManageStories from '../Pages/ManageStories';
import AddStories from '../Pages/AddStories';
import JoinAsTourGuide from '../Pages/JoinAsTourGuide';
import AdminDashboard from '../Layout/AdminDashboard';
import AdminManageProfile from '../Pages/AdminManageProfile';
import AdminAddStories from '../Pages/AdminAddStories';
import AdminManageStories from '../Pages/AdminManageStories';
import AdminAddPackage from '../Pages/AdminAddPackage';
import AdminManageCandidates from '../Pages/AdminManageCandidates';
import TourGuideDasboard from '../Layout/TourGuideDasboard';
import GuideManageProfile from '../Pages/GuideManageProfile';
import GuideAddStories from '../Pages/GuideAddStories';
import GuideAssignedTour from '../Pages/GuideAssignedTour';
import GuideManageStories from '../Pages/GuideManageStories';
import AdminManageUsers from '../Pages/AdminManageUsers';
import About from '../Pages/about';
import UpdateStories from '../Pages/UpdateStories';
import PrivateRoute from '../Provider/PrivateRoute';

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
                element: <PrivateRoute>
                    <PackageDetails></PackageDetails>

                </PrivateRoute>,
                loader: ({ params }) => fetch(`https://bongo-tour-server.vercel.app/api/packages/${params.id}`)

            },
            {
                path: "/guides/:id",
                element: <PrivateRoute>

                    <GuideDetails />
                </PrivateRoute>,
                loader: async ({ params }) => {
                    const res = await fetch(`https://bongo-tour-server.vercel.app/api/guides/${params.id}`);
                    if (!res.ok) throw new Error("Failed to load guide details");
                    return res.json();
                }
            }

            ,
            {
                path: '/allTrips',
                element: <AllTrips></AllTrips>,
                loader: () => fetch('https://bongo-tour-server.vercel.app/api/packages')
            },
            {
                path: '/community',
                element: <PrivateRoute>

                    <Community></Community>
                </PrivateRoute>,
                loader: () => fetch('https://bongo-tour-server.vercel.app/api/stories')
            },

            {
                path: '/about',
                element: <About></About>
            },

            {
                path: '/payment/:bookingId',
                element: <PrivateRoute>
                    <PaymentPage />
                </PrivateRoute>,
                loader: ({ params }) =>
                    fetch(`https://bongo-tour-server.vercel.app/api/bookings/${params.bookingId}`),
            },
            {
                path: '/tourist-dashboard',
                element: <PrivateRoute>
                    <TouristDashboard></TouristDashboard>
                </PrivateRoute>,
                children: [
                    {
                        path: '/tourist-dashboard/manage-profile',
                        element: <ManageProfile></ManageProfile>
                    },
                    {
                        path: '/tourist-dashboard/my-bookings',
                        element: <MyBookings></MyBookings>,
                    },
                    {
                        path: '/tourist-dashboard/manage-stories',
                        element: <ManageStories></ManageStories>
                    },
                    {
                        path: '/tourist-dashboard/add-stories',
                        element: <AddStories></AddStories>
                    },
                    {
                        path: '/tourist-dashboard/join-as-tourguide',
                        element: <JoinAsTourGuide></JoinAsTourGuide>
                    }
                ]
            },
            {
                path: '/admin-dashboard',
                element: <PrivateRoute>
                    <AdminDashboard></AdminDashboard>
                </PrivateRoute>,
                children: [
                    {
                        path: '/admin-dashboard/admin-manage-profile',
                        element: <AdminManageProfile></AdminManageProfile>
                    },

                    {
                        path: '/admin-dashboard/admin-add-stories',
                        element: <AdminAddStories></AdminAddStories>
                    },
                    {
                        path: '/admin-dashboard/admin-manage-stories',
                        element: <AdminManageStories></AdminManageStories>
                    },
                    {
                        path: '/admin-dashboard/admin-add-package',
                        element: <AdminAddPackage></AdminAddPackage>
                    },
                    {
                        path: '/admin-dashboard/admin-manage-candidates',
                        element: <AdminManageCandidates></AdminManageCandidates>
                    },
                    {
                        path: '/admin-dashboard/admin-manage-profile',
                        element: <AdminManageProfile></AdminManageProfile>
                    },
                    {
                        path: '/admin-dashboard/admin-manage-users',
                        element: <AdminManageUsers></AdminManageUsers>
                    },
                ]
            },
            {
                path: '/guide-dashboard',
                element: <PrivateRoute>
                    <TourGuideDasboard></TourGuideDasboard>
                </PrivateRoute>,
                children: [
                    {
                        path: '/guide-dashboard/guide-manage-profile',
                        element: <GuideManageProfile></GuideManageProfile>
                    },
                    {
                        path: '/guide-dashboard/guide-add-stories',
                        element: <GuideAddStories></GuideAddStories>
                    },
                    {
                        path: '/guide-dashboard/assigned-tour',
                        element: <GuideAssignedTour></GuideAssignedTour>
                    },

                    {
                        path: '/guide-dashboard/managed-stories',
                        element: <GuideManageStories></GuideManageStories>
                    }
                ]


            },
            {
                path: '/update-stories/:id',
                element: <PrivateRoute>
                    <UpdateStories></UpdateStories>
                </PrivateRoute>
            }

        ]
    }

]);
