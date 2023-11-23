import React, { useEffect } from 'react';
import SwipeCards from "./SwipeCards.tsx";
import { SDKProvider, SDKInitOptions, useWebApp } from '@tma.js/sdk-react';
import { postEvent } from '@tma.js/bridge';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: <SwipeCards />,

    }
]);
const App:React.FC = () => {
    const options: SDKInitOptions = {
        acceptCustomStyles: true,
        checkCompat: true,
        debug: true
    };
    const webApp = useWebApp();
    useEffect(() => {
        // Проверяем, что webApp доступен
        if (webApp) {
          // Раскрываем приложение на весь экран
          // Уведомляем Telegram о готовности приложения
          postEvent('web_app_expand');
          webApp.ready();
        }
      }, [webApp]);
    return (
        <SDKProvider initOptions={options}>
            <RouterProvider router={router} />
        </SDKProvider>
    );
}

export default App;
