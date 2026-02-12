# 🚀 Expo + NativeWind + Zustand + Supabase + RevenueCat Boilerplate

A production-ready React Native boilerplate built with modern tools and best practices.

## ✨ Features

- 📱 **Expo SDK 54** - Latest Expo framework with file-based routing
- 🎨 **NativeWind v4** - Tailwind CSS for React Native
- 🔄 **Zustand** - Lightweight state management
- 🔐 **Supabase** - Backend as a Service (Auth + Database)
- 💰 **RevenueCat** - In-app purchases and subscriptions (ready to integrate)
- 📝 **TypeScript** - Full type safety
- 🎯 **ESLint** - Code quality and consistency

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| Expo | React Native framework |
| NativeWind | Styling with Tailwind CSS |
| Zustand | State management |
| Supabase | Authentication & Database |
| TypeScript | Type safety |
| Expo Router | File-based navigation |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- iOS Simulator (Mac only) or Android Emulator
- Expo Go app (for testing on physical devices)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd expo-nativewind-zustand-supabase-revenuecat-boilerplate
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**
   
   Copy the `.env` file and add your Supabase credentials:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   bun start
   # or
   npm start
   ```

## 📚 Documentation

- **[Supabase Setup Guide](./SUPABASE_SETUP.md)** - Complete Supabase integration guide
- **[Zustand Guide](./ZUSTAND_GUIDE.md)** - State management documentation
- **[Example Components](./components/examples/)** - Ready-to-use component examples

## 🏗️ Project Structure

```
├── app/                    # Expo Router pages
├── components/            # Reusable components
│   └── examples/         # Example implementations
├── hooks/                # Custom React hooks
│   ├── useAuth.ts       # Combined auth hook
│   └── useSupabaseAuth.ts # Supabase auth hook
├── lib/                  # Library configurations
│   └── supabase.ts      # Supabase client
├── store/               # Zustand stores
│   ├── authStore.ts    # Authentication state
│   ├── userStore.ts    # User profile state
│   ├── appStore.ts     # App-wide state
│   └── index.ts        # Store exports
├── types/              # TypeScript types
│   ├── database.types.ts # Supabase DB types
│   └── async-storage.d.ts # AsyncStorage types
├── .env               # Environment variables (gitignored)
└── global.css        # Global styles
```

## 🔐 Authentication

This boilerplate includes a complete authentication system powered by Supabase and Zustand.

### Quick Example

```typescript
import { useAuth } from '@/hooks/useAuth';

function LoginScreen() {
  const { signIn, loading, error } = useAuth();

  const handleLogin = async () => {
    const { error } = await signIn('user@example.com', 'password');
    if (!error) {
      // Navigate to home
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
}
```

See [ZUSTAND_GUIDE.md](./ZUSTAND_GUIDE.md) for complete documentation.

## 💾 Database

The boilerplate includes a pre-configured `users` table with Row Level Security (RLS) enabled.

### Schema

```sql
users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for database operations.

## 🎨 Styling

This project uses **NativeWind v4** for styling with Tailwind CSS.

```typescript
<View className="flex-1 items-center justify-center bg-white">
  <Text className="text-2xl font-bold text-gray-900">
    Hello World
  </Text>
</View>
```

## 🔄 State Management

Zustand stores are organized by domain:

- **authStore** - Authentication state
- **userStore** - User profile data
- **appStore** - App-wide settings (theme, notifications, etc.)

```typescript
import { useAuthStore } from '@/store/authStore';

function MyComponent() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
}
```

## 📱 Available Scripts

```bash
# Start development server
bun start

# Start on specific platform
bun run ios
bun run android
bun run web

# Lint code
bun run lint

# Reset project (removes example code)
bun run reset-project
```

## 🛠️ Adding RevenueCat

RevenueCat integration is ready to be added. Follow these steps:

1. Install RevenueCat SDK
   ```bash
   bun add react-native-purchases
   ```

2. Configure RevenueCat in your app
3. Create a `subscriptionStore.ts` in the `store/` directory
4. Add subscription components

## 📝 Environment Variables

Required environment variables:

```env
# Supabase
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# RevenueCat (when ready)
# EXPO_PUBLIC_REVENUECAT_API_KEY=your-api-key
```

## 🔒 Security

- ✅ Environment variables are gitignored
- ✅ Row Level Security (RLS) enabled on database
- ✅ Only public anon key used on client
- ✅ TypeScript for type safety

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this boilerplate for your projects!

## 🙏 Acknowledgments

- [Expo](https://expo.dev)
- [NativeWind](https://www.nativewind.dev)
- [Zustand](https://github.com/pmndrs/zustand)
- [Supabase](https://supabase.com)
- [RevenueCat](https://www.revenuecat.com)

## 📞 Support

For issues and questions:
- Check the [documentation files](./ZUSTAND_GUIDE.md)
- Review [example components](./components/examples/)
- Open an issue on GitHub

---

**Happy coding! 🎉**
