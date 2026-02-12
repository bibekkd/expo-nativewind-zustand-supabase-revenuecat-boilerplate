import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';
import { create } from 'zustand';

type UserProfile = Database['public']['Tables']['users']['Row'];
type UserProfileUpdate = Database['public']['Tables']['users']['Update'];

interface UserState {
    // State
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;

    // Actions
    fetchProfile: (userId: string) => Promise<void>;
    updateProfile: (userId: string, updates: UserProfileUpdate) => Promise<{ error: string | null }>;
    createProfile: (profile: Omit<UserProfile, 'created_at' | 'updated_at'>) => Promise<{ error: string | null }>;
    clearProfile: () => void;
    setProfile: (profile: UserProfile | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
    // Initial state
    profile: null,
    loading: false,
    error: null,

    // Fetch user profile from database
    fetchProfile: async (userId: string) => {
        try {
            set({ loading: true, error: null });

            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                set({ error: error.message, loading: false });
                return;
            }

            set({ profile: data, loading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch profile',
                loading: false
            });
        }
    },

    // Update user profile in database
    updateProfile: async (userId: string, updates: UserProfileUpdate) => {
        try {
            set({ loading: true, error: null });

            const { data, error } = await supabase
                .from('users')
                .update({
                    ...updates,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', userId)
                .select()
                .single();

            if (error) {
                set({ error: error.message, loading: false });
                return { error: error.message };
            }

            set({ profile: data, loading: false });
            return { error: null };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
            set({ error: errorMessage, loading: false });
            return { error: errorMessage };
        }
    },

    // Create new user profile
    createProfile: async (profile) => {
        try {
            set({ loading: true, error: null });

            const { data, error } = await supabase
                .from('users')
                .insert([profile])
                .select()
                .single();

            if (error) {
                set({ error: error.message, loading: false });
                return { error: error.message };
            }

            set({ profile: data, loading: false });
            return { error: null };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to create profile';
            set({ error: errorMessage, loading: false });
            return { error: errorMessage };
        }
    },

    // Clear profile (on logout)
    clearProfile: () => set({ profile: null, error: null }),

    // Set profile directly
    setProfile: (profile) => set({ profile }),
}));
