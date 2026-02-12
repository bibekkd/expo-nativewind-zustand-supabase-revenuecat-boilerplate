import { supabase } from '@/lib/supabase';
import { AuthError, Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface AuthState {
    // State
    user: User | null;
    session: Session | null;
    loading: boolean;
    initialized: boolean;
    error: AuthError | null;

    // Actions
    initialize: () => Promise<void>;
    signUp: (email: string, password: string, metadata?: { full_name?: string }) => Promise<{ error: AuthError | null }>;
    signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
    signOut: () => Promise<{ error: AuthError | null }>;
    updateProfile: (updates: { full_name?: string; avatar_url?: string }) => Promise<{ error: AuthError | null }>;
    resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
    setUser: (user: User | null) => void;
    setSession: (session: Session | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: AuthError | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    // Initial state
    user: null,
    session: null,
    loading: true,
    initialized: false,
    error: null,

    // Initialize auth state and set up listener
    initialize: async () => {
        try {
            set({ loading: true, error: null });

            // Get initial session
            const { data: { session }, error } = await supabase.auth.getSession();

            if (error) {
                set({ error, loading: false, initialized: true });
                return;
            }

            set({
                session,
                user: session?.user ?? null,
                loading: false,
                initialized: true
            });

            // Set up auth state listener
            supabase.auth.onAuthStateChange((_event, session) => {
                set({
                    session,
                    user: session?.user ?? null
                });
            });
        } catch (error) {
            set({
                error: error as AuthError,
                loading: false,
                initialized: true
            });
        }
    },

    // Sign up new user
    signUp: async (email: string, password: string, metadata) => {
        try {
            set({ loading: true, error: null });

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: metadata,
                },
            });

            if (error) {
                set({ error, loading: false });
                return { error };
            }

            set({
                session: data.session,
                user: data.user,
                loading: false
            });

            return { error: null };
        } catch (error) {
            const authError = error as AuthError;
            set({ error: authError, loading: false });
            return { error: authError };
        }
    },

    // Sign in existing user
    signIn: async (email: string, password: string) => {
        try {
            set({ loading: true, error: null });

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                set({ error, loading: false });
                return { error };
            }

            set({
                session: data.session,
                user: data.user,
                loading: false
            });

            return { error: null };
        } catch (error) {
            const authError = error as AuthError;
            set({ error: authError, loading: false });
            return { error: authError };
        }
    },

    // Sign out user
    signOut: async () => {
        try {
            set({ loading: true, error: null });

            const { error } = await supabase.auth.signOut();

            if (error) {
                set({ error, loading: false });
                return { error };
            }

            set({
                session: null,
                user: null,
                loading: false
            });

            return { error: null };
        } catch (error) {
            const authError = error as AuthError;
            set({ error: authError, loading: false });
            return { error: authError };
        }
    },

    // Update user profile
    updateProfile: async (updates) => {
        try {
            set({ loading: true, error: null });

            const { data, error } = await supabase.auth.updateUser({
                data: updates,
            });

            if (error) {
                set({ error, loading: false });
                return { error };
            }

            set({ user: data.user, loading: false });
            return { error: null };
        } catch (error) {
            const authError = error as AuthError;
            set({ error: authError, loading: false });
            return { error: authError };
        }
    },

    // Reset password
    resetPassword: async (email: string) => {
        try {
            set({ loading: true, error: null });

            const { error } = await supabase.auth.resetPasswordForEmail(email);

            if (error) {
                set({ error, loading: false });
                return { error };
            }

            set({ loading: false });
            return { error: null };
        } catch (error) {
            const authError = error as AuthError;
            set({ error: authError, loading: false });
            return { error: authError };
        }
    },

    // Setters
    setUser: (user) => set({ user }),
    setSession: (session) => set({ session }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));
