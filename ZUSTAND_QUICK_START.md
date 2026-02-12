# Zustand State Management - Quick Reference

## 🚀 Quick Start

### 1. Initialize Auth in Root Layout

```typescript
// app/_layout.tsx
import { useAuthInit } from '@/hooks/useAuth';

export default function RootLayout() {
  const { initialized } = useAuthInit();

  if (!initialized) {
    return <SplashScreen />;
  }

  return <Stack />;
}
```

### 2. Use Auth in Components

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyScreen() {
  const { user, signIn, signOut, loading } = useAuth();

  if (loading) return <Loading />;
  if (!user) return <LoginScreen />;
  
  return <HomeScreen />;
}
```

## 📦 Available Stores

### Auth Store
```typescript
import { useAuthStore } from '@/store/authStore';

const user = useAuthStore((state) => state.user);
const signIn = useAuthStore((state) => state.signIn);
```

### User Store
```typescript
import { useUserStore } from '@/store/userStore';

const profile = useUserStore((state) => state.profile);
const updateProfile = useUserStore((state) => state.updateProfile);
```

### App Store
```typescript
import { useAppStore } from '@/store/appStore';

const theme = useAppStore((state) => state.theme);
const setTheme = useAppStore((state) => state.setTheme);
```

## 🎯 Common Patterns

### Protected Routes
```typescript
import { useIsAuthenticated } from '@/hooks/useAuth';
import { Redirect } from 'expo-router';

function ProtectedScreen() {
  const isAuthenticated = useIsAuthenticated();
  
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }
  
  return <YourContent />;
}
```

### Get User ID
```typescript
import { useUserId } from '@/hooks/useAuth';

function MyComponent() {
  const userId = useUserId();
  // userId is null if not authenticated
}
```

## 📚 Full Documentation

See [ZUSTAND_GUIDE.md](./ZUSTAND_GUIDE.md) for complete documentation.
