import React from 'react'
import Header from './Header'

const Layout = ({ Page }) => {
    return (
        <div>
            <Header />
            <Page />
        </div>
    )
}

export default Layout
