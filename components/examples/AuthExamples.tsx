import { useAuth } from '@/hooks/useAuth';
import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';

/**
 * Example Login Component using Zustand + Supabase
 * 
 * This demonstrates how to use the auth store in your components
 */
export function LoginExample() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, loading, error, user } = useAuth();

    const handleLogin = async () => {
        const { error } = await signIn(email, password);
        if (error) {
            console.error('Login failed:', error.message);
        }
    };

    if (user) {
        return (
            <View className="flex-1 items-center justify-center p-4">
                <Text className="text-xl font-bold mb-2">Welcome!</Text>
                <Text className="text-gray-600">{user.email}</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 items-center justify-center p-4">
            <Text className="text-2xl font-bold mb-6">Login</Text>

            {error && (
                <View className="bg-red-100 p-3 rounded-lg mb-4 w-full">
                    <Text className="text-red-800">
                        {typeof error === 'string' ? error : error.message}
                    </Text>
                </View>
            )}

            <TextInput
                className="w-full border border-gray-300 rounded-lg p-3 mb-3"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                className="w-full border border-gray-300 rounded-lg p-3 mb-4"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                className="w-full bg-blue-500 rounded-lg p-4 items-center"
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text className="text-white font-semibold">Sign In</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

/**
 * Example Profile Component
 */
export function ProfileExample() {
    const { user, profile, signOut, updateUserProfile } = useAuth();
    const [fullName, setFullName] = useState(profile?.full_name || '');

    const handleUpdateProfile = async () => {
        if (!user) return;

        const { error } = await updateUserProfile(user.id, {
            full_name: fullName,
        });

        if (error) {
            console.error('Update failed:', error);
        }
    };

    const handleSignOut = async () => {
        const { error } = await signOut();
        if (error) {
            console.error('Sign out failed:', error.message);
        }
    };

    if (!user) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Please sign in</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 p-4">
            <Text className="text-2xl font-bold mb-6">Profile</Text>

            <Text className="text-gray-600 mb-2">Email</Text>
            <Text className="text-lg mb-4">{user.email}</Text>

            <Text className="text-gray-600 mb-2">Full Name</Text>
            <TextInput
                className="border border-gray-300 rounded-lg p-3 mb-4"
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
            />

            <TouchableOpacity
                className="bg-blue-500 rounded-lg p-4 items-center mb-4"
                onPress={handleUpdateProfile}
            >
                <Text className="text-white font-semibold">Update Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="bg-red-500 rounded-lg p-4 items-center"
                onPress={handleSignOut}
            >
                <Text className="text-white font-semibold">Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}
