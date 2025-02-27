import React from 'react'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Product from '../pages/Product'

export const AllRoutes = [
    {
        element: React.createElement(Layout, { Page: Home }),
        path: "/home",
    },
    {
        element: React.createElement(Layout, { Page: Product }),
        path: "/",
    },
]