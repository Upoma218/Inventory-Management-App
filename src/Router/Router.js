import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import EditModal from "../Pages/Modal/EditModal";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/editInfo/:id',
                element: <EditModal></EditModal>,
                loader: ({params}) => fetch(`https://inventory-management-app-server.vercel.app/item/${params.id}`)
            },
        ]
    }
])