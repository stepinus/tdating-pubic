import React, { useEffect, useState } from 'react';

const App:React.FC = () => {
    const [user, setUser] = useState<TelegramWebAppUserData | null>(null);

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe
            setUser(initDataUnsafe.user);
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Information</h1>
            <p>ID: {user.id}</p>
            <p>Name: {user.first_name} {user.last_name}</p>
            <p>Username: {user.username ?? 'Not provided'}</p>
            <p>Photo URL: {user.photo_url ? <img src={user.photo_url} alt="User" /> : 'No photo'}</p>
        </div>
    );
}

export default App;
