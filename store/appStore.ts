import { create } from 'zustand';

interface AppState {
    // Theme
    theme: 'light' | 'dark' | 'system';
    setTheme: (theme: 'light' | 'dark' | 'system') => void;

    // Navigation
    isNavigationReady: boolean;
    setNavigationReady: (ready: boolean) => void;

    // Loading states
    isAppLoading: boolean;
    setAppLoading: (loading: boolean) => void;

    // Network status
    isOnline: boolean;
    setOnline: (online: boolean) => void;

    // Notifications
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
    removeNotification: (id: string) => void;
    clearNotifications: () => void;
}

interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    timestamp: number;
}

export const useAppStore = create<AppState>((set) => ({
    // Theme
    theme: 'system',
    setTheme: (theme) => set({ theme }),

    // Navigation
    isNavigationReady: false,
    setNavigationReady: (ready) => set({ isNavigationReady: ready }),

    // Loading states
    isAppLoading: true,
    setAppLoading: (loading) => set({ isAppLoading: loading }),

    // Network status
    isOnline: true,
    setOnline: (online) => set({ isOnline: online }),

    // Notifications
    notifications: [],
    addNotification: (notification) =>
        set((state) => ({
            notifications: [
                ...state.notifications,
                {
                    ...notification,
                    id: Math.random().toString(36).substring(7),
                    timestamp: Date.now(),
                },
            ],
        })),
    removeNotification: (id) =>
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        })),
    clearNotifications: () => set({ notifications: [] }),
}));
