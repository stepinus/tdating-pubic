import React, { useEffect, useState } from 'react';
import SwipeCards from "./SwipeCards.tsx";

const App:React.FC = () => {
    const [data, setData] = useState<TelegramWebAppInitData | null>(null)
    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe
            setData(initDataUnsafe)
        }
    }, []);
    const user = data?.user
    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h2>User Information</h2>
            <p>ID: {user.id}</p>
            <p>Name: {user.first_name} {user.last_name}</p>
            <p>Username: {user.username ?? 'Not provided'}</p>
            <SwipeCards />

        </div>
    );
}

export default App;
