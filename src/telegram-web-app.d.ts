interface TelegramWebAppUserData {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    auth_date: number;
    hash: string;
}

interface TelegramWebAppInitData {
    user: TelegramWebAppUserData;
}

interface TelegramWebApp {
    initData: TelegramWebAppInitData;
}

interface Window {
    Telegram: TelegramWebApp;
}
