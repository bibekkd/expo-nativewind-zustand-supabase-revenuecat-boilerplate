# Supabase Integration Guide

## Overview
This boilerplate includes a fully configured Supabase backend with authentication and database setup.

## Project Details
- **Project Name**: boilerplate-repo
- **Project ID**: ycvsbeajysqheduzgxmm
- **Region**: ap-south-1 (Mumbai)
- **Status**: ✅ ACTIVE_HEALTHY
- **Database URL**: https://ycvsbeajysqheduzgxmm.supabase.co

## Database Schema

### Users Table
The `users` table has been created with the following schema:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `email` | TEXT | User email (unique, required) |
| `full_name` | TEXT | User's full name (optional) |
| `avatar_url` | TEXT | URL to user's avatar (optional) |
| `created_at` | TIMESTAMPTZ | Timestamp of creation |
| `updated_at` | TIMESTAMPTZ | Timestamp of last update |

### Row Level Security (RLS)
RLS is enabled with the following policies:
- Users can **view** their own data
- Users can **update** their own data
- Users can **insert** their own data

## Setup Instructions

### 1. Environment Variables
The `.env` file contains your Supabase credentials:
```env
EXPO_PUBLIC_SUPABASE_URL=https://ycvsbeajysqheduzgxmm.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

⚠️ **Important**: The `.env` file is gitignored to protect your credentials.

### 2. Supabase Client
The Supabase client is configured in `lib/supabase.ts`:
```typescript
import { supabase } from '@/lib/supabase';
```

### 3. Authentication Hook
Use the `useSupabaseAuth` hook for authentication:

```typescript
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

function MyComponent() {
  const { user, loading, signIn, signUp, signOut } = useSupabaseAuth();

  // Sign up
  const handleSignUp = async () => {
    const { data, error } = await signUp('email@example.com', 'password');
  };

  // Sign in
  const handleSignIn = async () => {
    const { data, error } = await signIn('email@example.com', 'password');
  };

  // Sign out
  const handleSignOut = async () => {
    const { error } = await signOut();
  };

  if (loading) return <Text>Loading...</Text>;
  
  return user ? <Text>Welcome {user.email}</Text> : <Text>Please sign in</Text>;
}
```

## Database Operations

### Insert Data
```typescript
const { data, error } = await supabase
  .from('users')
  .insert([
    { email: 'user@example.com', full_name: 'John Doe' }
  ]);
```

### Query Data
```typescript
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId);
```

### Update Data
```typescript
const { data, error } = await supabase
  .from('users')
  .update({ full_name: 'Jane Doe' })
  .eq('id', userId);
```

### Delete Data
```typescript
const { data, error } = await supabase
  .from('users')
  .delete()
  .eq('id', userId);
```

## TypeScript Support
Database types are defined in `types/database.types.ts` for full type safety:

```typescript
import { Database } from '@/types/database.types';

// Use typed client
const typedSupabase = supabase as SupabaseClient<Database>;
```

## Next Steps
1. ✅ Supabase client configured
2. ✅ Users table created with RLS
3. ✅ Authentication hook ready
4. ✅ TypeScript types generated
5. 🔄 Integrate auth into your app screens
6. 🔄 Add more tables as needed

## Resources
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Dashboard](https://supabase.com/dashboard/project/ycvsbeajysqheduzgxmm)
- [React Native Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)
