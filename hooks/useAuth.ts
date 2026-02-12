import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';

/**
 * Hook that initializes auth and syncs user profile
 * Use this in your root layout or app entry point
 */
export function useAuthInit() {
    const { initialize, initialized, user } = useAuthStore();
    const { fetchProfile, clearProfile } = useUserStore();

    useEffect(() => {
        // Initialize auth on mount
        if (!initialized) {
            initialize();
        }
    }, [initialized, initialize]);

    useEffect(() => {
        // Sync user profile when user changes
        if (user) {
            fetchProfile(user.id);
        } else {
            clearProfile();
        }
    }, [user, fetchProfile, clearProfile]);

    return { initialized };
}

/**
 * Hook that provides complete auth state and actions
 */
export function useAuth() {
    const auth = useAuthStore();
    const user = useUserStore();

    return {
        // Auth state
        user: auth.user,
        session: auth.session,
        loading: auth.loading || user.loading,
        error: auth.error || user.error,
        initialized: auth.initialized,

        // User profile
        profile: user.profile,

        // Auth actions
        signUp: auth.signUp,
        signIn: auth.signIn,
        signOut: async () => {
            const result = await auth.signOut();
            if (!result.error) {
                user.clearProfile();
            }
            return result;
        },
        updateProfile: auth.updateProfile,
        resetPassword: auth.resetPassword,

        // Profile actions
        updateUserProfile: user.updateProfile,
        createUserProfile: user.createProfile,
    };
}

/**
 * Hook to check if user is authenticated
 */
export function useIsAuthenticated() {
    const user = useAuthStore((state) => state.user);
    return !!user;
}

/**
 * Hook to get current user ID
 */
export function useUserId() {
    const user = useAuthStore((state) => state.user);
    return user?.id ?? null;
}
