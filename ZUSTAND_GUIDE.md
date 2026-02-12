# Zustand State Management Guide

## Overview
This boilerplate uses **Zustand** for state management, integrated with Supabase for authentication and data persistence.

## 📦 Installed Packages
- `zustand` - Lightweight state management library

## 🏪 Available Stores

### 1. Auth Store (`store/authStore.ts`)
Manages authentication state and Supabase auth operations.

**State:**
- `user` - Current authenticated user
- `session` - Current session
- `loading` - Loading state
- `initialized` - Whether auth has been initialized
- `error` - Authentication errors

**Actions:**
- `initialize()` - Initialize auth and set up listener
- `signUp(email, password, metadata)` - Register new user
- `signIn(email, password)` - Sign in user
- `signOut()` - Sign out user
- `updateProfile(updates)` - Update user metadata
- `resetPassword(email)` - Send password reset email

### 2. User Store (`store/userStore.ts`)
Manages user profile data from the database.

**State:**
- `profile` - User profile from database
- `loading` - Loading state
- `error` - Error messages

**Actions:**
- `fetchProfile(userId)` - Fetch user profile
- `updateProfile(userId, updates)` - Update profile in database
- `createProfile(profile)` - Create new profile
- `clearProfile()` - Clear profile on logout

### 3. App Store (`store/appStore.ts`)
Manages general app state.

**State:**
- `theme` - App theme ('light' | 'dark' | 'system')
- `isNavigationReady` - Navigation ready state
- `isAppLoading` - App loading state
- `isOnline` - Network status
- `notifications` - In-app notifications

**Actions:**
- `setTheme(theme)` - Change app theme
- `setNavigationReady(ready)` - Set navigation ready
- `setAppLoading(loading)` - Set app loading
- `setOnline(online)` - Set network status
- `addNotification(notification)` - Add notification
- `removeNotification(id)` - Remove notification
- `clearNotifications()` - Clear all notifications

## 🎣 Custom Hooks

### `useAuth()`
Combined hook providing complete auth functionality.

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const {
    user,           // Current user
    session,        // Current session
    loading,        // Loading state
    error,          // Error state
    profile,        // User profile from DB
    signIn,         // Sign in function
    signUp,         // Sign up function
    signOut,        // Sign out function
    updateProfile,  // Update auth metadata
    updateUserProfile, // Update DB profile
  } = useAuth();

  // Use the auth state and actions
}
```

### `useAuthInit()`
Initialize auth in your root layout.

```typescript
import { useAuthInit } from '@/hooks/useAuth';

export default function RootLayout() {
  const { initialized } = useAuthInit();

  if (!initialized) {
    return <SplashScreen />;
  }

  return <YourApp />;
}
```

### `useIsAuthenticated()`
Check if user is authenticated.

```typescript
import { useIsAuthenticated } from '@/hooks/useAuth';

function ProtectedScreen() {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <YourContent />;
}
```

### `useUserId()`
Get current user ID.

```typescript
import { useUserId } from '@/hooks/useAuth';

function MyComponent() {
  const userId = useUserId();
  // userId will be null if not authenticated
}
```

## 📝 Usage Examples

### Sign Up
```typescript
import { useAuth } from '@/hooks/useAuth';

function SignUpScreen() {
  const { signUp, loading } = useAuth();

  const handleSignUp = async () => {
    const { error } = await signUp(
      'user@example.com',
      'password123',
      { full_name: 'John Doe' }
    );

    if (error) {
      console.error('Sign up failed:', error.message);
    } else {
      // Navigate to home or show success
    }
  };

  return (
    <Button onPress={handleSignUp} disabled={loading}>
      Sign Up
    </Button>
  );
}
```

### Sign In
```typescript
import { useAuth } from '@/hooks/useAuth';

function LoginScreen() {
  const { signIn, loading, error } = useAuth();

  const handleLogin = async () => {
    const { error } = await signIn('user@example.com', 'password123');
    
    if (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View>
      {error && <Text>{error.message}</Text>}
      <Button onPress={handleLogin} disabled={loading}>
        Sign In
      </Button>
    </View>
  );
}
```

### Update Profile
```typescript
import { useAuth } from '@/hooks/useAuth';

function ProfileScreen() {
  const { user, updateUserProfile } = useAuth();

  const handleUpdate = async () => {
    if (!user) return;

    const { error } = await updateUserProfile(user.id, {
      full_name: 'Jane Doe',
      avatar_url: 'https://example.com/avatar.jpg',
    });

    if (error) {
      console.error('Update failed:', error);
    }
  };

  return <Button onPress={handleUpdate}>Update Profile</Button>;
}
```

### Sign Out
```typescript
import { useAuth } from '@/hooks/useAuth';

function SettingsScreen() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    
    if (!error) {
      // Navigate to login screen
    }
  };

  return <Button onPress={handleSignOut}>Sign Out</Button>;
}
```

### Using App Store
```typescript
import { useAppStore } from '@/store/appStore';

function ThemeToggle() {
  const { theme, setTheme } = useAppStore();

  return (
    <Button onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </Button>
  );
}
```

### Using Notifications
```typescript
import { useAppStore } from '@/store/appStore';

function MyComponent() {
  const { addNotification, notifications } = useAppStore();

  const showSuccess = () => {
    addNotification({
      type: 'success',
      title: 'Success!',
      message: 'Operation completed successfully',
    });
  };

  return (
    <View>
      {notifications.map((notif) => (
        <Notification key={notif.id} {...notif} />
      ))}
      <Button onPress={showSuccess}>Show Success</Button>
    </View>
  );
}
```

## 🔄 Direct Store Access

If you need to access stores outside of React components:

```typescript
import { useAuthStore } from '@/store/authStore';

// Get current state
const currentUser = useAuthStore.getState().user;

// Call actions
await useAuthStore.getState().signIn('email@example.com', 'password');

// Subscribe to changes
const unsubscribe = useAuthStore.subscribe((state) => {
  console.log('User changed:', state.user);
});

// Don't forget to unsubscribe
unsubscribe();
```

## 🎯 Best Practices

1. **Initialize Auth Early**: Use `useAuthInit()` in your root layout
2. **Combine Stores**: Use the `useAuth()` hook instead of accessing stores directly
3. **Handle Errors**: Always check for errors after async operations
4. **Clear State on Logout**: The stores automatically clear on sign out
5. **Type Safety**: All stores are fully typed with TypeScript
6. **Selective Subscriptions**: Use selectors to avoid unnecessary re-renders

```typescript
// ❌ Bad - Component re-renders on any auth state change
const auth = useAuthStore();

// ✅ Good - Only re-renders when user changes
const user = useAuthStore((state) => state.user);
```

## 📚 Additional Resources

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- Example components: `components/examples/AuthExamples.tsx`

## 🚀 Next Steps

1. ✅ Zustand installed and configured
2. ✅ Auth store integrated with Supabase
3. ✅ User profile store created
4. ✅ App store for general state
5. ✅ Custom hooks created
6. 🔄 Integrate stores into your app screens
7. 🔄 Add more stores as needed (e.g., cart, settings, etc.)
