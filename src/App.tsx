import React from 'react';
import SwipeCards from "./SwipeCards.tsx";
import { SDKProvider, SDKInitOptions } from '@tma.js/sdk-react';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: <SwipeCards />,

    }
],{
    basename: import.meta.env.DEV ? '/' : '/tdating-pubic/',
});
const App:React.FC = () => {
    const options: SDKInitOptions = {
        acceptCustomStyles: true,
        checkCompat: true,
        debug: true
    };
    return (
        <SDKProvider initOptions={options}>
            <RouterProvider router={router} />
        </SDKProvider>
    );
}

export default App;
