import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AllRoutes } from './AllRoutes'

const Routing = () => {
    const router = createBrowserRouter(AllRoutes);
    return (
        <RouterProvider router={router} />
    )
}

export default Routing
