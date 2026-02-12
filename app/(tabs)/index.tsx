import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View className="mx-4 mt-4 rounded-2xl border border-sky-500/30 bg-sky-500/10 p-4">
        <Text className="text-base font-semibold text-slate-900 dark:text-green-100">
          NativeWind is live
        </Text>
        <Text className="mt-1 text-sm text-slate-700 dark:text-slate-200">
          You can now style with Tailwind classes using `className`.
        </Text>
        <View className="mt-3 self-start rounded-full bg-sky-600 px-3 py-1">
          <Text className="text-xs font-semibold text-white">Try tweaking these classes</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

